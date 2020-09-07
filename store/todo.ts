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
  name: 'todo',
  stateFactory: true,
  namespaced: true,
})
export default class Todos extends VuexModule {
  private todos: Todo[] = []

  private lastId: number = 1

  // constructor(module: VuexModule) {
  //   super(module)
  //
  //   const storage = getStorage()
  //   this.todos = storage.todos
  //   this.lastId = storage.lastId
  // }

  public get getTodos() {
    return this.todos
  }

  public get getTodo() {
    return (id: Number) => this.todos.find((todo) => todo.id === id)
  }

  public get getTodoCount() {
    return this.todos.length
  }

  @Mutation
  private add(todo: Todo) {
    this.todos.push(todo)
  }

  @Mutation
  private remove(id: Number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  @Mutation set(todos: Todo[]) {
    this.todos = todos
  }

  @Mutation setLastId(lastId: number) {
    this.lastId = lastId
  }

  @Action({ rawError: true })
  public fetchTodos() {
    // const { data } = await $axios.get<Todo[]>('/api/todos')
    const { todos, lastId } = getStorage()
    this.set(todos)
    this.setLastId(lastId)
  }

  @Action({ rawError: true })
  public createTodo(name: string) {
    // const { data } = await $axios.post<Todo>('/api/todo', payload)
    const newId = this.lastId + 1
    this.add({
      id: newId,
      name,
      done: false,
    })
    this.setLastId(newId)
  }

  @Action({ rawError: true })
  deleteTodo(id: Todo['id']) {
    this.remove(id)
  }

  @Action({ rawError: true })
  toggle(id: number) {
    this.set(
      this.todos.map((todo) => {
        if (todo.id !== id) return todo
        return { ...todo, done: !todo.done }
      })
    )
  }
}
