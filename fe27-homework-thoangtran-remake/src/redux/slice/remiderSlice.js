import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { compareWithToday } from '../../components/utils/index,'
import { clientServer } from '../../server/ClientServer'
import {
  addRemiderListAsyncError,
  addRemiderListAsyncSuccess,
  addReminderListAsync,
  deleteReminderListAsync,
  deleteReminderListAsyncError,
  deleteReminderListAsyncSuccess,
  fetchReminderListAsync,
  fetchReminderListAsyncError,
  fetchReminderListAsyncSuccess,
} from '../saga/reminderSaga'

// export const fetchReminderList = createAsyncThunk(
//   'reminderList/fetchReminderList',
//   async (payload, thunkAPI) => {
//     const response = await clientServer.get('listReminders')
//     response.data.map((item) => {
//       if (compareWithToday(item?.date)) {
//         alert(item?.title)
//       }
//     })
//     return response.data.reverse()
//   },
// )

// export const addReminderListAsync = createAsyncThunk(
//   'reminderList/addReminderListAsync',
//   async (payload, thunkAPI) => {
//     console.log(payload)
//     const response = await clientServer.post('listReminders', payload)
//     thunkAPI.dispatch(fetchReminderList())
//     return response.data
//   },
// )

// export const deleteReminderListAsync = createAsyncThunk(
//   'reminderList/deleteReminderListAsync',
//   async (payload, thunkAPI) => {
//     console.log(payload)
//     const response = await clientServer.delete(
//       `listReminders/${payload}`,
//       payload,
//     )
//     thunkAPI.dispatch(fetchReminderList())
//     return response.data
//   },
// )

const remiderSlice = createSlice({
  name: 'reminderList',
  initialState: {
    loading: false,
    loadingAddItem: false,
    loadingEdititem: false,
    loadingDeleteItem: false,
    error: null,
    addItemError: null,
    deleteItemError: null,
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
  extraReducers: (builder) => {
    /// Redux-thunk
    // // fetch reminder
    // builder.addCase(fetchReminderList.pending, (state, action) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchReminderList.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.data = action.payload
    // })
    // builder.addCase(fetchReminderList.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.error
    // })
    // // add reminder
    // builder.addCase(addReminderListAsync.pending, (state, action) => {
    //   state.loadingAddItem = true
    // })
    // builder.addCase(addReminderListAsync.fulfilled, (state, action) => {
    //   state.loadingAddItem = false
    // })
    // builder.addCase(addReminderListAsync.rejected, (state, action) => {
    //   state.loadingAddItem = false
    //   state.error = action.error
    // })
    // // delete reminder
    // builder.addCase(deleteReminderListAsync.pending, (state, action) => {
    //   state.loadingDeleteItem = true
    // })
    // builder.addCase(deleteReminderListAsync.fulfilled, (state, action) => {
    //   state.loadingDeleteItem = false
    // })
    // builder.addCase(deleteReminderListAsync.rejected, (state, action) => {
    //   state.loadingDeleteItem = false
    //   state.error = action.error
    // })

    /// Redux-saga
    // fetch reminder
    builder.addCase(fetchReminderListAsync, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchReminderListAsyncSuccess.type, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchReminderListAsyncError.type, (state, action) => {
      state.loading = false
      state.error = action.error
    })
    // add reminder
    builder.addCase(addReminderListAsync, (state, action) => {
      state.loadingAddItem = true
    })
    builder.addCase(addRemiderListAsyncSuccess.type, (state, action) => {
      state.loadingAddItem = false
    })
    builder.addCase(addRemiderListAsyncError.type, (state, action) => {
      state.loadingAddItem = false
      state.error = action.error
    })
    // delete reminder
    builder.addCase(deleteReminderListAsync, (state, action) => {
      state.loadingDeleteItem = true
    })
    builder.addCase(deleteReminderListAsyncSuccess.type, (state, action) => {
      state.loadingDeleteItem = false
    })
    builder.addCase(deleteReminderListAsyncError.type, (state, action) => {
      state.loadingDeleteItem = false
      state.error = action.error
    })
  },
})

export const { setReminderList, getReminderList } = remiderSlice.actions

export const reminderReducer = remiderSlice.reducer
