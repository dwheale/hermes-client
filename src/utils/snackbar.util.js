import { enqueueSnackbar } from '../redux/notification-snacks/notifications.actions'

export function enqueueSnack(message, type = 'info', duration = 3000) {
  console.log()
  enqueueSnackbar({
    message: message,
    options: {
      key: new Date().getTime() + Math.random(),
      variant: type,
      autoHideDuration: duration
    }
  })
}