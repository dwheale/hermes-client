import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import userReducer from './user/user.reducer'
import waitListReducer from './wait-list/wait-list.reducer'
import notificationReducer from './notification-snacks/notifications.reducer'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const rootReducer = combineReducers({
  // Reducers to combine
  user: userReducer,
  waitList: waitListReducer,
  notificationLog: notificationReducer,
})

export default persistReducer(persistConfig, rootReducer)