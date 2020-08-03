import { mount } from '@vue/test-utils'
import index from '../pages/index'

describe('index', () => {
  let wrapper
  beforeEach(
    () =>
      (wrapper = mount(index, {
        stubs: {
          TodoList: true,
        },
      }))
  )
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
