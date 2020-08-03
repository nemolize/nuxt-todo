import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { mutations, state, STORAGE_KEY } from '../store/todos'

const localVue = createLocalVue()
localVue.use(Vuex)

const initialState = {
  list: [{ id: 1, done: true, name: 'initial item' }],
  counter: 2,
}

describe('store/todos.js', () => {
  let store

  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'setItem')
  })
  afterAll(() => jest.restoreAllMocks())
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        todos: {
          state,
          mutations: {
            ...mutations,
          },
          namespaced: true,
        },
      },
    })
    store.replaceState({ todos: JSON.parse(JSON.stringify(initialState)) })
  })

  describe('actions', () => {
    test('initial state should be equal to the initialState', () => {
      expect(store.state.todos).toEqual(initialState)
    })

    describe('add', () => {
      beforeEach(() => store.commit('todos/add', 'added item'))
      test('should add an entry', () =>
        expect(store.state.todos).toEqual({
          list: [
            { id: 1, name: 'initial item', done: true },
            { id: 2, name: 'added item', done: false },
          ],
          counter: 3,
        }))
    })

    describe('remove', () => {
      beforeEach(() => store.commit('todos/remove', { id: 1 }))
      test('should remove an entry', () =>
        expect(store.state.todos).toEqual({ list: [], counter: 2 }))
    })

    describe('update', () => {
      beforeEach(() =>
        store.commit('todos/update', {
          id: 1,
          name: 'update item',
          done: false,
        })
      )
      test('should update an entry', () =>
        expect(store.state.todos).toEqual({
          list: [{ id: 1, name: 'update item', done: false }],
          counter: 2,
        }))
    })

    describe('persist', () => {
      beforeEach(() => store.commit('todos/persist'))
      test('should write to localStorage', () => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          STORAGE_KEY,
          JSON.stringify(initialState)
        )
      })
    })
  })
})
