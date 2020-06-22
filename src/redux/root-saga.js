import { all, call } from 'redux-saga/effects'
import { userSagas } from './user/user.sagas'
import { waitListSagas } from './wait-list/wait-list.sagas'

export default function* rootSaga() {
  yield all([
      // Generators to call
      call(userSagas),
      call(waitListSagas),
  ])
}