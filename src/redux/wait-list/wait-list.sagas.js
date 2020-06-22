import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import WaitListActionTypes from './wait-list.types'
import {
  addCustomerToWaitFailure,
  addCustomerToWaitSuccess,
  removeCustomerFromWaitFailure,
  removeCustomerFromWaitSuccess,
  sendWaitListMessageFailure,
  sendWaitListMessageSuccess,
  updateCustomerInWaitFailure, updateCustomerInWaitSuccess,
} from './wait-list.actions'
import { sendMessage } from './wait-list.utils'
import { enqueueSnackbar } from '../notification-snacks/notifications.actions'
import { formatWaitListCustomer } from '../../utils/wait-list.utils'
import { store } from '../store'
import { db } from '../../utils/firebase.utils'
import { currentDate } from '../../utils/date-time.utils'

function* enqueueSnack(message, type = 'info', duration = 3000) {
  yield put(enqueueSnackbar({
    message: message,
    options: {
      key: new Date().getTime() + Math.random(),
      variant: type,
      autoHideDuration: duration
    }
  }))
}

function* receiveData({ payload: { type, customer } }) {
  switch(type) {
    case 'added':
      yield loadCustomerFromDataReceived(customer)
      return
    case 'removed':
      yield put(removeCustomerFromWaitSuccess(customer))
      return
    case 'modified':
    case 'updated':
      yield updateCustomerFromDataReceived(customer)
      return
    default:
      return
  }
}

function* loadCustomerFromDataReceived(customer) {
  // Check if the customer was last updated in the last 10 seconds. If true, then notify the
  // user of the success or failure
  const notify = Date.now() - customer.lastUpdated < 10000
  const isValid = yield isCustomerValid(customer, notify)
  if (isValid) {
    if(notify) yield enqueueSnack(`${ customer.partyName } added to the wait`, 'success')
    yield put(addCustomerToWaitSuccess(customer))
  }
}

function* updateCustomerFromDataReceived(customer) {
  const notify = Date.now() - customer.lastUpdated < 10000
  const isUpdate = true
  const isValid = yield isCustomerValid(customer, notify, isUpdate)
  if(isValid) {
    if(notify) yield enqueueSnack(`${customer.partyName} has been updated`, 'success')
    yield put(updateCustomerInWaitSuccess(customer))
  }
}

// This function checks a customer to ensure it's format follows the database and state requirements
function* isCustomerValid(customer, notify = true, isUpdate = false) {
  // Check if there is a name (required)
  if (!customer.partyName) {
    if(notify) {
      yield put(addCustomerToWaitFailure('Name is required'))
    }
    return false
  }

  // Check to ensure data is not null
  if (!customer) {
    if(notify) {
      yield put(addCustomerToWaitFailure('Null Customer Reference Error'))
    }
    return false
  }

  // current customers
  const currentCustomers = store.getState().waitList.customers

  // Check if the customer's phone is already in the wait list
  if (currentCustomers.find(current => current.phone === customer.phone) && !isUpdate) {
    // If customer is already on the wait, send an error
    if(notify) {
      yield put(addCustomerToWaitFailure(`${ customer.phone } is already on the wait list`))
    }
    return false
  }
  return true
}


export function* addCustomerToWaitList({payload: newCustomer}) {
  const isValid = yield isCustomerValid(newCustomer)
  if(isValid) {
    const formattedCustomer = yield formatWaitListCustomer(newCustomer)
    const user = store.getState().user.currentUser

    // If the user doesn't have a restaurant assigned, do not allow adding to the wait
    if(!user.currentRestaurant) {
      yield put(addCustomerToWaitFailure('Cannot add customer to wait - No restaurant specified'))
      return
    }

    // If arrival time is empty - fill in current date/time
    if(!newCustomer.timeArrived) newCustomer.timeArrived = new Date.now()

    const collectionRef =
        db.collection(`restaurants/${ user.currentRestaurant }/wait_lists/${ currentDate() }/currentWait`)
    try {
      yield collectionRef.doc(`${ formattedCustomer.phone }`).set({
        customer: formattedCustomer
      }, { merge: true })
    } catch (error) {
      yield put(addCustomerToWaitFailure(error))
    }
  }
}

function* removeCustomerFromWait(customer) {
  const user = store.getState().user.currentUser
  const collectionRef =
      db.collection(`restaurants/${ user.currentRestaurant }/wait_lists/${ currentDate() }/currentWait`)
  try {
    yield collectionRef.doc(customer.payload.phone).delete()
    yield put(removeCustomerFromWaitSuccess(customer))
    yield enqueueSnack(`${customer.payload.partyName} has been removed from the wait.`, 'success')
  } catch(error) {
    yield console.error(error)
    yield put(removeCustomerFromWaitFailure(error))
  }
}

export function* updateCustomerInWaitList(customer) {
  customer.payload.lastUpdated = Date.now()
  const user = store.getState().user.currentUser
  const collectionRef =
      db.collection(`restaurants/${ user.currentRestaurant }/wait_lists/${ currentDate() }/currentWait`)
  try {
    yield collectionRef.doc(customer.payload.phone).update({customer: customer.payload})
  } catch (error) {
    yield put(updateCustomerInWaitFailure(error))
  }
}

export function* waitListFailure(error) {
  yield enqueueSnack(`An error occurred: ${ error.payload }`, 'error', 5000)
}

export function* sendWaitMessage({ payload: { data } }) {
  try {
    const response = yield sendMessage(undefined, data)
    yield put(sendWaitListMessageSuccess(response))
  } catch (error) {
    yield put(sendWaitListMessageFailure(error))
  }
}

export function* onAddCustomerToWaitStart() {
  yield takeLatest(WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_START, addCustomerToWaitList)
}

export function* onSendWaitMessageStart() {
  yield takeLatest(WaitListActionTypes.SEND_WAIT_MESSAGE_START, sendWaitMessage)
}

export function* onSendWaitMessageFailure() {
  yield takeEvery(WaitListActionTypes.SEND_WAIT_MESSAGE_FAILURE, waitListFailure)
}

export function* onAddCustomerToWaitFailure() {
  yield takeEvery(WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_FAILURE, waitListFailure)
}

export function* onReceiveData() {
  yield takeEvery(WaitListActionTypes.RECEIVE_WAIT_LIST_DATA, receiveData)
}

export function* onRemoveCustomerFromWaitStart() {
  yield takeLatest(WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_START, removeCustomerFromWait)
}

export function* onUpdateCustomerInWaitStart() {
  yield takeEvery(WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_START, updateCustomerInWaitList)
}

export function* onUpdateCustomerInWaitFailure() {
  yield takeEvery(WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_FAILURE, waitListFailure)
}

export function* waitListSagas() {
  yield all([
    call(onAddCustomerToWaitStart),
    call(onSendWaitMessageStart),
    call(onAddCustomerToWaitFailure),
    call(onSendWaitMessageFailure),
    call(onReceiveData),
    call(onRemoveCustomerFromWaitStart),
    call(onUpdateCustomerInWaitStart),
    call(onUpdateCustomerInWaitFailure),
  ])
}