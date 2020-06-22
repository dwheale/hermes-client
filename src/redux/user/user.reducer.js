import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isLoading: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      }
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isLoading: true,
      }
    case UserActionTypes.NO_USER_SESSION:
      return {
        ...state,
        isLoading: false,
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false,
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false,
      }
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: {
          code: 'FORGOT_PASSWORD_SUCCESS',
          message: 'A password reset will be emailed to the provided address if it exists.'
        }
      }
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default userReducer