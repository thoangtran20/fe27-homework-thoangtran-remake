import { useContext } from 'react'
import { ReminderContext } from '../../../context/ReminderContext'
import { compareWithToday } from '../../utils/index,'
import './style.scss'

function ReminderList(props) {
  const { listReminder, handleDelete } = useContext(ReminderContext)

  return (
    <div className="ReminderList">
      {listReminder?.map((item) => {
        const isEqualToday = compareWithToday(item?.date)
        console.log(isEqualToday)
        console.log(item?.date)

        return (
          <div
            key={item?.id}
            className={`reminder-item ${isEqualToday ? 'active' : ''}`}
          >
            <div className="reminder-item-content">
              <div>Ngày: {item?.date}</div>
              <div>Tiêu đề: {item?.title}</div>
            </div>
            <div
              onClick={() => handleDelete(item?.id)}
              className="reminder-item-delete-button"
            >
              x
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReminderList
