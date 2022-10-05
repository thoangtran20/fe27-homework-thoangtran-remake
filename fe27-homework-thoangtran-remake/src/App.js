import { useEffect, useState } from 'react'
import './App.css'
import { REMINDER_LIST_KEY } from './components/const'
import Reminder from './components/lan1/reminder/Reminder'
import { compareWithToday, localStorageUtil } from './components/utils/index,'
import { ReminderContext } from './context/ReminderContext'

function App() {
  const { set, get } = localStorageUtil(REMINDER_LIST_KEY, [])
  const [reminderData, setReminderData] = useState([])

  useEffect(() => {
    const localStorageListData = JSON.parse(get())
    console.log(localStorageListData)
    setReminderData(localStorageListData)

    localStorageListData.map((item) => {
      if (compareWithToday(item?.date)) {
        alert(item?.title)
      }
    })
  }, [])

  const handleAddNewReminder = (newReminderData) => {
    const newList = [newReminderData, ...reminderData]
    setReminderData(newList)
    set(newList)
  }

  const handleDeleteReminder = (id) => {
    const newList = reminderData.filter((item) => item?.id !== id)
    setReminderData(newList)
    set(newList)
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
