import { createAction } from '@reduxjs/toolkit'
import { action } from 'mobx'
import { put, takeEvery } from 'redux-saga/effects'
import { compareWithToday } from '../../components/utils/index,'
import { clientServer } from '../../server/ClientServer'

// fetch reminder
export const fetchReminderListAsync = createAction(
  'reminderList/fetchReminderListAsync',
)
export const fetchReminderListAsyncSuccess = createAction(
  'reminderList/fetchReminderListAsync/success',
)

export const fetchReminderListAsyncError = createAction(
  'reminderList/fetchReminderListAsync/error',
)

// add reminder
export const addReminderListAsync = createAction(
  'reminderList/addRemiderListAsync',
)
export const addRemiderListAsyncSuccess = createAction(
  'reminderList/addRemiderListAsync/success',
)
export const addRemiderListAsyncError = createAction(
  'reminderList/addRemiderListAsync/error',
)

// delete reminder
export const deleteReminderListAsync = createAction(
  'reminderList/deleteReminderListAsync',
)
export const deleteReminderListAsyncSuccess = createAction(
  'reminderList/deleteReminderListAsync/success',
)
export const deleteReminderListAsyncError = createAction(
  'reminderList/deleteReminderListAsync/error',
)

// Worker saga
function* fetchReminder() {
  try {
    const reminderList = yield clientServer.get('listReminders')
    reminderList.data.map((item) => {
      if (compareWithToday(item?.date)) {
        alert(item?.title)
      }
    })
    yield put(fetchReminderListAsyncSuccess(reminderList.data.reverse()))
    console.log(reminderList.data)
  } catch (error) {
    yield put(fetchReminderListAsyncError(error))
    console.log(error)
  }
}

function* addReminder(action) {
  try {
    yield clientServer.post('listReminders', action.payload)
    yield put(fetchReminderListAsync())
    yield put(addRemiderListAsyncSuccess())
  } catch (error) {
    yield put(addRemiderListAsyncError(error))
    console.log(error)
  }
}

function* deleteReminder(action) {
  try {
    yield clientServer.delete(`listReminders/${action.payload}`)
    yield put(fetchReminderListAsync())
    yield put(deleteReminderListAsyncSuccess())
  } catch (error) {
    yield put(deleteReminderListAsyncError(error))
  }
}

// Watcher saga
export function* watchReminderSaga() {
  yield takeEvery(fetchReminderListAsync, fetchReminder)
  yield takeEvery(addReminderListAsync, addReminder)
  yield takeEvery(deleteReminderListAsync, deleteReminder)
}
