import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ReminderContext } from '../../../context/ReminderContext'
import './style.scss'

function AddForm(props) {
  const { onAddNewReminder } = props
  const { handleAdd } = useContext(ReminderContext)

  const [date, setDate] = useState()
  const [title, setTitle] = useState()
  const [dateDanger, setDateDanger] = useState()
  const [titleDanger, setTitleDanger] = useState()

  const validate = () => {
    let date_input = new Date(date)

    const time = date_input.getTime()
    console.log(time)

    let dd = String(date_input.getDate()).padStart(2, '0')
    let mm = String(date_input.getMonth() + 1).padStart(2, '0')
    let yyyy = date_input.getFullYear()

    date_input = dd + '/' + mm + '/' + yyyy
    console.log(date_input)
    const date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
    if (!title) {
      setTitleDanger('Bạn chưa nhập nội dung')
      return false
    }
    if (!date) {
      setDateDanger('Bạn chưa nhập ngày nhắc')
      return false
    }
    if (!date_regex.test(date_input)) {
      alert('Bạn nhập ngày nhắc không hợp lệ')
      return false
    }
    // if (!date_regex.test(data.date)) {
    //   _errors = _errors.add('Bạn nhập ngày không hợp lệ')
    //   return false
    // }
    // if (!date_regex.test(data.date)) {
    //   alert('Bạn nhập ngày không hợp lệ')
    //   return false
    // }
    if (date < today) {
      alert('Bạn không được nhập ngày quá khứ')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    validate()
    const newReminderData = { id: uuidv4(), date, title }
    handleAdd(newReminderData)
  }

  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  let yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd
  console.log(today)

  return (
    <div className="AddForm">
      <div className="form-content">
        <label htmlFor="" className="form-label">
          Nội dung
        </label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Nhập nội dung của ngày"
          className="form-input"
          id="title"
        />
      </div>
      <div className="form-content">
        <label htmlFor="" className="form-label">
          Ngày nhắc
        </label>
        <input
          min={today}
          type={'date'}
          onChange={(e) => {
            setDate(e.target.value)
          }}
          className="form-date"
          id="date"
        />
        <button onClick={handleSubmit} className="btn-save">
          Lưu ngày
        </button>
      </div>
      <div className="validation-message">
        <div className="message">
          <span>{!title ? titleDanger : ''}</span>
          <span>{!date ? dateDanger : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default AddForm
