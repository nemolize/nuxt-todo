import { mount } from '@vue/test-utils'
import DeleteModal from '../components/DeleteModal'

const todo = { id: 1, name: 'title_1', done: false }

describe('DeleteModal', () => {
  let wrapper
  beforeEach(async done => {
    wrapper = mount(DeleteModal)
    await wrapper.setData({ deleteTarget: todo })
    done()
  })

  describe('script', () => {
    describe('methods', () => {
      describe('askRemove', () => {
        test('activates modal DOM', async done => {
          await wrapper.setData({ deleteTarget: todo })
          await wrapper.vm.askRemove(todo)
          expect(wrapper.find('div.modal.isactive')).toBeTruthy()
          done()
        })
      })
      describe('cancelRemove', () => {
        test('cancelRemove() should be called', async done => {
          await wrapper.setMethods({ closeModal: jest.fn(a => a) })
          await wrapper.vm.cancelRemove()
          expect(wrapper.vm.closeModal).toBeCalled()
          done()
        })
      })

      describe('closeModal', () => {
        test('closeModal() should close the modal', async done => {
          await wrapper.vm.closeModal()
          expect(wrapper.vm.deleteTarget).toEqual(null)
          done()
        })
      })

      describe('remove', () => {
        beforeEach(() => {
          wrapper.setMethods({ closeModal: jest.fn(() => {}) })
          wrapper.vm.remove()
        })

        test('remove should be emitted the modal', () =>
          expect(wrapper.emitted().remove).toBeTruthy())

        test('closeModal should be called', () =>
          expect(wrapper.vm.closeModal).toBeCalled())
      })
    })
  })
})
