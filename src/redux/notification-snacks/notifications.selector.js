import { createSelector } from 'reselect'

const selectNotificationsLog = state => state.notifications

export const selectNotifications = createSelector(
    [selectNotificationsLog],
    notificationLog => notificationLog
)
