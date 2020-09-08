import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
export const STORAGE_KEY = 'todos'

export type Todo = {
  id: number
  name: string
  done: boolean
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
  private _todos: Todo[] = []
  private lastId: number = 1

  public get todos() {
    return this._todos
  }

  @Mutation
  private push(todo: Todo) {
    this._todos.push(todo)
  }

  @Mutation
  private removeById(id: Number) {
    this._todos = this._todos.filter((todo) => todo.id !== id)
  }

  @Mutation
  private setItems(todos: Todo[]) {
    this._todos = todos
  }

  @Mutation
  private setLastId(lastId: number) {
    this.lastId = lastId
  }

  @Action({ rawError: true })
  public fetchTodos() {
    const { todos, lastId } = getStorage()
    this.setItems(todos)
    this.setLastId(lastId)
  }

  @Action({ rawError: true })
  public add(name: string) {
    const newId = this.lastId + 1
    this.push({
      id: newId,
      name,
      done: false,
    })
    this.setLastId(newId)
  }

  @Action({ rawError: true })
  remove(todo: Todo) {
    this.removeById(todo.id)
  }

  @Action({ rawError: true })
  toggle(id: number) {
    this.setItems(
      this._todos.map((todo) => {
        if (todo.id !== id) return todo
        return { ...todo, done: !todo.done }
      })
    )
  }
}
