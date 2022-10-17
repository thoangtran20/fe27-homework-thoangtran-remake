import { useEffect } from 'react'
import { clientServer } from './server/ClientServer'
import './App.css'
// import { REMINDER_LIST_KEY } from './components/const'
import Reminder from './components/lan1/reminder/Reminder'
import { compareWithToday } from './components/utils/index,'
import { ReminderContext } from './context/ReminderContext'
import { observer } from 'mobx-react'
import { useDispatch, useSelector } from 'react-redux'
import { setReminderList } from './redux/slice/remiderSlice'

const App = () => {
  // const { set, get } = localStorageUtil(REMINDER_LIST_KEY, [])
  // const [reminderData, setReminderData] = useState([])

  const reminderData = useSelector((state) => state.reminderReducer.data)
  console.log(reminderData)

  const dispatch = useDispatch()

  // console.log(reminderListStore.listRemindersCount)
  // console.log(reminderListStore.getListReminders())

  // const setReminderData = (reminderData) => {
  //   reminderListStore.setListReminders(reminderData)
  // }

  // const reminderData = reminderListStore.getListReminders()

  useEffect(() => {
    fetchReminderList()
  }, [])

  const fetchReminderList = () => {
    clientServer
      .get('listReminders')
      .then((res) => {
        dispatch(setReminderList(res.data ?? []))
        console.log(res)
        res.data.map((item) => {
          if (compareWithToday(item?.date)) {
            alert(item?.title)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleAddNewReminder = (newReminderData) => {
    // const newList = [newReminderData, ...reminderData]
    // setReminderData(newList)
    // set(newList)
    clientServer
      .post('listReminders', newReminderData)
      .then((res) => {
        console.log(res)
        fetchReminderList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDeleteReminder = (id) => {
    // const newList = reminderData.filter((item) => item?.id !== id)
    // setReminderData(newList)
    // set(newList)
    clientServer
      .delete(`listReminders/${id}`)
      .then((res) => {
        console.log(res)
        fetchReminderList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <ReminderContext.Provider
        value={{
          listReminder: reminderData,
          handleAdd: handleAddNewReminder,
          handleDelete: handleDeleteReminder,
        }}
      >
        <Reminder />
      </ReminderContext.Provider>
    </div>
  )
}

export default App
