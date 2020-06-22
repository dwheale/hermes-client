import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import notificationActionTypes from './notifications.types'
import {
  enqueueSnackbar, closeSnackbar, removeSnackbar
} from './notifications.actions'

function* sendSnackError(notification, time = 5000) {

}

function* sendSnackWarning(notification, time = 5000) {

}

function* sendSnackInfo(notification, time = 5000) {

}

function* sendSnackSuccess(notification, time = 5000) {

}



export function* notificationSagas() {
  yield all([

  ])
}