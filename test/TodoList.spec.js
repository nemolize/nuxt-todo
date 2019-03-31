import { mount } from '@vue/test-utils'
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TodoList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
