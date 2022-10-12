import { action, makeObservable, observable, computed } from 'mobx'
import { clientServer } from '../server/ClientServer'

class ReminderStore {
  listReminders = []

  constructor() {
    makeObservable(this, {
      listReminders: observable,
      setListReminders: action,
      listRemindersCount: computed,
      fetchListReminders: action,
    })
  }

  fetchListReminders = () => {
    clientServer
      .get('listReminders')
      .then((res) => {
        this.listReminders = (res.data ?? []).reverse()
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  setListReminders(listReminders) {
    this.listReminders = listReminders
  }

  getListReminders() {
    return this.listReminders
  }

  get listRemindersCount() {
    return this.listReminders.length
  }
}

export const listReminder = new ReminderStore()
