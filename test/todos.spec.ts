import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Todos, { STORAGE_KEY, TodoState } from '~/store/todos'
import { initialiseStores, TodoStore } from '~/utils/store-accessor'

const Vue = createLocalVue()
Vue.use(Vuex)

const initialState: TodoState = {
  todos: [
    { id: 1, name: 'initial item', done: true },
    { id: 2, name: 'initial item 2', done: false },
  ],
  lastId: 2,
}

describe('store/todos.ts', () => {
  beforeEach(() => {
    const store = new Vuex.Store({ modules: { todos: Todos } })
    initialiseStores(store)
    TodoStore.setState({ ...initialState })
  })
  afterAll(() => jest.restoreAllMocks())

  test('initial state should be equal to the initialState', () => {
    expect(TodoStore.todos).toEqual(initialState.todos)
    expect(TodoStore.lastId).toEqual(initialState.lastId)
  })

  describe('actions', () => {
    describe('add()', () => {
      it('add() should add an entry', () => {
        TodoStore.add('added item')
        expect(TodoStore.todoState).toEqual({
          todos: [
            { id: 1, name: 'initial item', done: true },
            { id: 2, name: 'initial item 2', done: false },
            { id: 3, name: 'added item', done: false },
          ],
          lastId: 3,
        })
      })
    })

    describe('toggle', () => {
      it('should toggle an entry', () => {
        TodoStore.toggle(2)
        expect(TodoStore.todos).toEqual([
          { id: 1, name: 'initial item', done: true },
          { id: 2, name: 'initial item 2', done: true },
        ])
      })
    })

    describe('fetchTodos', () => {
      it('should set default values if localStorage does not have a value', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

        TodoStore.fetchTodos()
        expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY)
        expect(TodoStore.todoState).toEqual({
          todos: [
            { id: 1, done: true, name: 'Buy a milk for my boss' },
            { id: 2, done: false, name: 'Send a mail to a client' },
          ],
          lastId: 2,
        })
      })

      it('should read from localStorage if value exists', () => {
        jest
          .spyOn(Storage.prototype, 'getItem')
          .mockReturnValue(JSON.stringify({ todos: [], lastId: 0 }))

        TodoStore.fetchTodos()
        expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY)
        expect(TodoStore.todoState).toEqual({ todos: [], lastId: 0 })
      })

      it('should read from localStorage and migrate if the value format is old', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
          JSON.stringify({
            list: [{ id: 1, name: 'initial item', done: true }],
            counter: 1,
          })
        )

        TodoStore.fetchTodos()
        expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY)
        expect(TodoStore.todoState).toEqual({
          todos: [{ id: 1, name: 'initial item', done: true }],
          lastId: 1,
        })
      })
    })
  })

  describe('mutations', () => {
    describe('removeById()', () => {
      it('should remove an entry', () => {
        TodoStore.removeById(1)
        expect(TodoStore.todoState).toEqual({
          todos: [{ id: 2, name: 'initial item 2', done: false }],
          lastId: 2,
        })
      })
    })
  })
})
