import WaitListActionTypes from './wait-list.types'

export const removeCustomerFromWaitStart = (customer) => ({
  type: WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_START,
  payload: customer
})

export const removeCustomerFromWaitFailure = (error) => ({
  type: WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_FAILURE,
  payload: error
})

export const removeCustomerFromWaitSuccess = (customer) => ({
  type: WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_SUCCESS,
  payload: customer
})

export const addCustomerToWaitStart = (newCustomer) => ({
  type: WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_START,
  payload: newCustomer
})

export const addCustomerToWaitSuccess = (customer) => ({
    type: WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_SUCCESS,
    payload: customer,
  })


export const addCustomerToWaitFailure = (error) => ({
  type: WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_FAILURE,
  payload: error
})

export const updateCustomerInWaitStart = (data) => ({
  type: WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_START,
  payload: data,
})

export const updateCustomerInWaitSuccess = (data) => ({
  type: WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_SUCCESS,
  payload: data,
})

export const updateCustomerInWaitFailure = (error) => ({
  type: WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_FAILURE,
  payload: error,
})

export const sendWaitListMessageStart = (data) => ({
  type: WaitListActionTypes.SEND_WAIT_MESSAGE_START,
  payload: data
})

export const sendWaitListMessageSuccess = (data) => ({
  type: WaitListActionTypes.SEND_WAIT_MESSAGE_SUCCESS,
  payload: data
})

export const sendWaitListMessageFailure = (error) => ({
  type: WaitListActionTypes.SEND_WAIT_MESSAGE_FAILURE,
  payload: error
})

export const loadWaitListStart = () => ({
  type: WaitListActionTypes.LOAD_WAIT_LIST_START
})

export const loadWaitListSuccess = (waitList) => ({
  type: WaitListActionTypes.LOAD_WAIT_LIST_SUCCESS,
  payload: waitList
})

export const receiveWaitListData = (data) => ({
  type: WaitListActionTypes.RECEIVE_WAIT_LIST_DATA,
  payload: data
})