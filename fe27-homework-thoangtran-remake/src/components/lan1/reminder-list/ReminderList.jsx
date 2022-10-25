import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReminderContext } from '../../../context/ReminderContext'
import { usePagination } from '../../../hook'
import { deleteReminderListAsync } from '../../../redux/saga/reminderSaga'
// import { deleteReminderListAsync } from '../../../redux/slice/remiderSlice'
import { ITEM_PER_PAGE } from '../../const'
import { compareWithToday } from '../../utils/index,'
import Pagination from '../paginaiton/Pagination'
import ReminderListChild from './ReminderListChild'
import './style.scss'

function ReminderList() {
  // const { handleDelete, listReminder } = useContext(ReminderContext)
  const data = useSelector((state) => state.reminderReducer.data)
  console.log(data)
  const dispatch = useDispatch()
  const { jumpPage, dataPerPage, currentPage, maxPage } = usePagination(
    data,
    ITEM_PER_PAGE,
  )

  const handleDelete = (e, index) => {
    e.preventDefault()
    dispatch(deleteReminderListAsync(index))
  }

  return (
    <div className="container">
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
                onClick={(e) => handleDelete(e, item?.id)}
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
