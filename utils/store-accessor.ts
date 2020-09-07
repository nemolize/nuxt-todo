import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Todo from '~/store/todo'

// eslint-disable-next-line import/no-mutable-exports
let TodoStore: Todo
function initialiseStores(store: Store<any>): void {
  TodoStore = getModule(Todo, store)
}

export { initialiseStores, TodoStore }
