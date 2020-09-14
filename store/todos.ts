import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
export const STORAGE_KEY = 'todos'

export type Todo = {
  id: number
  name: string
  done: boolean
}

export type TodoState = {
  todos: Todo[]
  lastId: number
}

const getStorage = (): { todos: Todo[]; lastId: number } => {
  const jsonString = localStorage.getItem(STORAGE_KEY)

  const { todos, list = null, lastId, counter = null } = jsonString
    ? JSON.parse(jsonString)
    : {
        todos: [
          { id: 1, done: true, name: 'Buy a milk for my boss' },
          { id: 2, done: false, name: 'Send a mail to a client' },
        ],
        lastId: 2,
      }

  const migrated = {
    todos: list || todos,
    lastId: counter || lastId,
  }

  if (list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
  }

  return migrated
}

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true,
})
export default class Todos extends VuexModule {
  todoState: TodoState = { todos: [], lastId: 0 }

  get todos() {
    return this.todoState.todos
  }

  get lastId() {
    return this.todoState.lastId
  }

  @Mutation
  removeById(id: Number) {
    this.todoState.todos = this.todoState.todos.filter((todo) => todo.id !== id)
  }

  @Mutation
  private setItems(todos: Todo[]) {
    this.todoState.todos = todos
  }

  @Mutation
  private setLastId(lastId: number) {
    this.todoState.lastId = lastId
  }

  @Mutation
  setState(state: TodoState) {
    this.todoState = state
  }

  @Action({ rawError: true })
  public fetchTodos() {
    const { todos, lastId } = getStorage()
    this.setItems(todos)
    this.setLastId(lastId)
  }

  @Action({ rawError: true })
  public add(name: string) {
    const id = this.lastId + 1
    this.setItems(this.todos.concat({ id, name, done: false }))
    this.setLastId(id)
  }

  @Action({ rawError: true })
  toggle(id: number) {
    this.setItems(
      this.todos.map((todo) => {
        if (todo.id !== id) return todo
        return { ...todo, done: !todo.done }
      })
    )
  }
}
