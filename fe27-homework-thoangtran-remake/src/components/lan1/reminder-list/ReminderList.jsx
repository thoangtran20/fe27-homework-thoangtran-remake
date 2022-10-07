import { useContext } from 'react'
import { ReminderContext } from '../../../context/ReminderContext'
import { usePagination } from '../../../hook'
import { ITEM_PER_PAGE } from '../../const'
import { compareWithToday } from '../../utils/index,'
import Pagination from '../paginaiton/Pagination'
import ReminderListChild from './ReminderListChild'
import './style.scss'

function ReminderList() {
  const { handleDelete, listReminder } = useContext(ReminderContext)
  const { jumpPage, dataPerPage, currentPage, maxPage } = usePagination(
    listReminder,
    ITEM_PER_PAGE,
  )

  return (
    <div className='container'>
      <div className="ReminderList">
        <ReminderListChild />
        {dataPerPage?.map((item) => {
          const isEqualToday = compareWithToday(item?.date)
          // console.log(isEqualToday)
          // console.log(item?.date)

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

      <Pagination 
        currentPage={currentPage}
        jumpPage={jumpPage}
        maxPage={maxPage}
      />
    </div>
  )
}

export default ReminderList
