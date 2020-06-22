import WaitListActionTypes from './wait-list.types'
import { updateObject } from '../../utils/wait-list.utils'

const INITIAL_STATE = {
  customers: [],
  error: null,
}

const waitListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WaitListActionTypes.LOAD_WAIT_LIST_SUCCESS:
      console.log('waitList reducer LOAD_WAIT_LIST_SUCCESS: \naction: ', action)
      return {
        ...state,
        customers: action.payload
      }
    case WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_SUCCESS:
      const data = [...state.customers]
      data.push(action.payload)
      return {
        ...state,
        customers: data,
        error: null,
      }
    case WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.phone !== action.payload.phone),
        error: null
      }
    case WaitListActionTypes.UPDATE_CUSTOMER_IN_WAIT_SUCCESS:
      // Create a copy of the customers array
      const customers = [...state.customers]
      // Get the customer needing to be updated
      const customerIndex = customers.findIndex(i => i.phone === action.payload.phone)
      const customerToUpdate = customers[customerIndex]
      // Update the customer
      updateObject(customerToUpdate, action.payload)
      customers[customerIndex] = customerToUpdate
      return {
        ...state,
        customers: customers
      }
    case WaitListActionTypes.REMOVE_CUSTOMER_FROM_WAIT_FAILURE:
    case WaitListActionTypes.ADD_CUSTOMER_TO_WAIT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case WaitListActionTypes.SEND_WAIT_MESSAGE_SUCCESS:
      return {
        ...state
      }
    case WaitListActionTypes.SEND_WAIT_MESSAGE_FAILURE:
      console.log('SEND_WAIT_MESSAGE_FAILURE: ', action.payload)
      return {
        ...state,
        error: action.payload
      }
    default: {
      return state
    }
  }
}

export default waitListReducer