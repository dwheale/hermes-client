import notificationActionTypes from './notifications.types'

const INITIAL_STATE = {
  notifications: [],
}

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case notificationActionTypes.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          }
        ]
      }

    case notificationActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification => (
            (action.dismissAll || notification.key === action.key)
                ? { ...notification, dismissed: true }
                : { ...notification }
        ))
      }

    case notificationActionTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
            notification => notification.key !== action.key,
        )
      }

    default:
      return state
  }
}

export default notificationReducer