<template>
  <div class="container todolist">
    <form @submit.prevent="add(newTodo)" class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="newTodo.name"
          class="input"
          type="text"
          placeholder="Name"
        />
      </div>
      <div class="control">
        <button class="button is-primary" :disabled="!newTodo.name">
          add
        </button>
      </div>
    </form>

    <strong>Todos</strong>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th class="is-fullwidth">Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>
            <button @click="remove(todo.id)" class="button is-danger">
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let lastIndex = 1
const getNewIndex = () => lastIndex++

export default {
  name: 'TodoList',
  data: () => ({
    todos: [{ id: getNewIndex(), name: 'Buy a milk for wife' }],
    newTodo: {
      name: ''
    }
  }),
  methods: {
    add(newTodo) {
      this.todos.push({ id: getNewIndex(), ...newTodo })
      this.reset()
    },
    reset() {
      this.newTodo.name = ''
    },
    remove(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/initial-variables.sass';
.todolist {
  padding: 0 $size-4;
}
th.is-fullwidth {
  width: 100%;
}
</style>
