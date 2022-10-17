import { createSlice } from '@reduxjs/toolkit'

const remiderSlice = createSlice({
  name: 'reminder',
  initialState: {
    data: [],
  },
  reducers: {
    setReminderList: (state, action) => {
      console.log(action.type)
      console.log(action.payload)
      state.data = action.payload.reverse()
    },
    getReminderList: (state, action) => {
      console.log(...state.data)
      return [...state.data]
    },
  },
})

export const { setReminderList, getReminderList } = remiderSlice.actions

export const reminderReducer = remiderSlice.reducer
