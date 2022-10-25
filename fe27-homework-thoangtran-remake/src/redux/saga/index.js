import { all, fork } from 'redux-saga/effects'
import { watchReminderSaga } from './reminderSaga'

export function* appSaga() {
  yield all([fork(watchReminderSaga)])
}
