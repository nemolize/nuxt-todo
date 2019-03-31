const initialList = [
  { id: 1, done: true, name: 'Buy a milk for my boss' },
  { id: 2, done: false, name: 'Send a mail to a client' }
]
export const state = () => ({
  list: initialList,
  counter: initialList.length + 1
})

export const mutations = {
  add(state, name) {
    state.list.push({
      id: state.counter++,
      done: false,
      name
    })
  },
  remove(state, todo) {
    state.list = state.list.filter(t => t !== todo)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
