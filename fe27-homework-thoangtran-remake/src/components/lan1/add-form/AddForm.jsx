import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

function AddForm(props) {
  const { onAddNewReminder } = props

  const [data, setData] = useState({
    title: '',
    date: '',
  })

  const [errors, setErrors] = useState([])

  const validate = () => {
    const date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/

    if (errors === undefined) return

    let _errors = new Set(errors)
    console.log(data.title)

    if (data.title === '') {
      _errors = _errors.add('Bạn chưa nhập nội dung')
    }
    if (data.title !== '') {
      _errors.delete('Bạn chưa nhập nội dung')
    }
    if (data.date === '') {
      _errors = _errors.add('Bạn chưa nhập ngày nhắc')
    }
    // if (!date_regex.test(data.date)) {
    //   _errors = _errors.add('Bạn nhập ngày không hợp lệ')
    // }
    if (!date_regex.test(data.date)) {
      alert('Bạn nhập ngày không hợp lệ')
    }

    console.log(_errors)

    setErrors(Array.from(_errors))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    if (errors.size > 0) return
    const newReminderData = { id: uuidv4(), ...data }
    console.log(newReminderData)
    onAddNewReminder(newReminderData)
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
            setData({
              ...data,
              title: e.target.value,
            })
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
            setData({
              ...data,
              date: e.target.value,
            })
          }}
          className="form-date"
          id="date"
        />
        <button onClick={handleSubmit} className="btn-save">
          Lưu ngày
        </button>
      </div>
      <div className="validation-message">
        {console.log(Array.from(errors))}
        {Array.from(errors)?.map((item) => {
          return (
            <div key={item} className="message">
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AddForm
