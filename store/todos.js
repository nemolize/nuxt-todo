const STORAGE_KEY = 'todos'
const jsonString = localStorage.getItem(STORAGE_KEY)
const data = jsonString
  ? JSON.parse(jsonString)
  : {
      list: [
        { id: 1, done: true, name: 'Buy a milk for my boss' },
        { id: 2, done: false, name: 'Send a mail to a client' }
      ],
      counter: 3
    }

const persist = state =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

export const state = () => data
export const mutations = {
  add(state, name) {
    state.list.push({
      id: state.counter++,
      done: false,
      name
    })
    persist(state)
  },
  remove(state, todo) {
    state.list = state.list.filter(t => t !== todo)
    persist(state)
  },
  update(state, todo) {
    state.list
      .filter(({ id }) => id === todo.id)
      .forEach(t => Object.assign(t, todo))
  }
}
