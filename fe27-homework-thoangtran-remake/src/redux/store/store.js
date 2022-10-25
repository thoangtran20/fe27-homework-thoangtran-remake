import { configureStore } from '@reduxjs/toolkit'
import { reminderReducer } from '../slice/remiderSlice'

const rootReducer = {
  reminderReducer: reminderReducer,
}

export const appStore = configureStore({
  reducer: rootReducer,
})
