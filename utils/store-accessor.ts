import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Todos from '~/store/todos'

// eslint-disable-next-line import/no-mutable-exports
export let TodoStore: Todos
export const initialiseStores = (store: Store<any>): void => {
  TodoStore = getModule(Todos, store)
}
