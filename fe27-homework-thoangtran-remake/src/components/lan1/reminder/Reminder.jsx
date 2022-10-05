import { useContext } from 'react'
import { ReminderContext } from '../../../context/ReminderContext'
import AddForm from '../add-form/AddForm'
import ReminderList from '../reminder-list/ReminderList'
import './style.scss'

function Reminder() {
  const { handleAdd } = useContext(ReminderContext)

  return (
    <div className="Reminder">
      <h1 className="reminder-header">Nhắc nhở ngày quan trọng của bạn</h1>
      <div className="reminder-body">
        <AddForm onAddNewReminder={handleAdd} />
        <ReminderList />
      </div>
    </div>
  )
}

export default Reminder
