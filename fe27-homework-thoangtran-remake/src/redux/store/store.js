import { configureStore } from '@reduxjs/toolkit'
import { reminderReducer } from '../slice/remiderSlice'
import createSagaMiddleware from 'redux-saga'
import { appSaga } from '../saga'

// Tạo sagaMiddleware

const sagaMiddleware = createSagaMiddleware()

const rootReducer = {
  reminderReducer: reminderReducer,
}

// Trong middleware của redux-toolkit có chứa các middleware
// redux-thunk
// redux-devtool compose

export const appStore = configureStore({
  reducer: rootReducer,

  // lấy mảng middleware gọi saga, ẩn thunk đi
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }), // [redux-thunk-middleware, redux-devtool compose,...]
    sagaMiddleware,
  ],
})

// Khởi chạy saga
sagaMiddleware.run(appSaga)
