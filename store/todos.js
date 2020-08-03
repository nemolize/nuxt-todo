export const STORAGE_KEY = 'todos'

export const state = () => {
  const jsonString = localStorage.getItem(STORAGE_KEY)
  return jsonString
    ? JSON.parse(jsonString)
    : {
        list: [
          { id: 1, done: true, name: 'Buy a milk for my boss' },
          { id: 2, done: false, name: 'Send a mail to a client' },
        ],
        counter: 3,
      }
}
export const mutations = {
  add(state, name) {
    state.list.push({
      id: state.counter++,
      done: false,
      name,
    })
    this.commit('todos/persist', state)
  },
  remove(state, todo) {
    state.list = state.list.filter(({ id }) => id !== todo.id)
    this.commit('todos/persist', state)
  },
  update(state, todo) {
    state.list
      .filter(({ id }) => id === todo.id)
      .forEach((t) => Object.assign(t, todo))
    this.commit('todos/persist', state)
  },
  persist(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
}
