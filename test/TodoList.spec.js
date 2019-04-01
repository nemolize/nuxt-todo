import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import TodoList from '../components/TodoList'
import * as todoStore from '../store/todos'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodoList', () => {
  let wrapper
  let store
  let todo1
  beforeEach(() => {
    todo1 = { id: '1', name: 'title_1', done: false }
    store = new Vuex.Store({
      modules: { todos: { ...todoStore, state: { list: [todo1], counter: 1 } } }
    })
    wrapper = mount(TodoList, { store, localVue })
  })

  describe('template', () => {
    let trs, tds
    beforeEach(() => {
      trs = wrapper.findAll('tbody tr')
      tds = trs.at(0).findAll('td')
    })
    test('todo list renders the entry', () => {
      expect(trs.length).toBe(1)
      expect(tds.at(0).find(':not(:checked)')).toBeTruthy()
      expect(tds.at(1).text()).toBe(todo1.name)
    })

    describe('on clicking checkbox of a todo', () => {
      test('toggle(todo) should be called', () => {
        const mock = jest.fn(todo => todo)
        wrapper.setMethods({ toggle: mock })
        wrapper.find('input[type=checkbox]').trigger('click')
        expect(mock).toBeCalledWith(todo1)
        expect(mock.mock.results[0].value).toBe(todo1)
      })
    })
  })

  describe('script', () => {
    describe('computed', () => {
      describe('todos', () => {
        test('should be retrieved from store', () => {
          expect(wrapper.vm.todos).toEqual(expect.arrayContaining([todo1]))
        })
      })
    })

    describe('methods', () => {
      describe('add', () => {
        test('action addTodo(name) should be published', async done => {
          wrapper.setMethods({ addTodo: jest.fn() })
          await wrapper.vm.add('dummyTodo')
          expect(wrapper.vm.addTodo).toBeCalledWith('dummyTodo')
          done()
        })
      })
      describe('remove', () => {
        test('action removeTodo(todo) should be published with todo', async done => {
          wrapper.setMethods({ removeTodo: jest.fn() })
          await wrapper.vm.remove(todo1)
          expect(wrapper.vm.removeTodo).toBeCalledWith(todo1)
          done()
        })
      })
      describe('toggle', () => {
        test('action updateTodo(todo) should be published with todo.done=true', async done => {
          wrapper.setMethods({ updateTodo: jest.fn(({ done }) => !!done) })
          await wrapper.vm.toggle(todo1)
          expect(wrapper.vm.updateTodo.mock.results[0].value).toBe(true)
          done()
        })
      })
    })
  })
})
