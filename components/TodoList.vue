<template>
  <div class="container todolist">
    <form class="field has-addons" @submit.prevent="add(newTodo)">
      <div class="control is-expanded has-icons-left">
        <input
          v-model="newTodo.name"
          class="input"
          type="text"
          placeholder="Name"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-pen"></i>
        </span>
      </div>
      <div class="control">
        <button :disabled="!newTodo.name" class="button is-primary">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>add</span>
        </button>
      </div>
    </form>

    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th class="is-fullwidth">
            Name
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>
            <button
              class="button is-danger"
              @click="$refs.deleteModal.askRemove(todo)"
            >
              <span class="icon is-small"><i class="fas fa-times" /></span>
              <span>delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteModal ref="deleteModal" @remove="remove" />
  </div>
</template>

<script>
import DeleteModal from './DeleteModal'

let lastIndex = 1
const getNewIndex = () => lastIndex++

export default {
  name: 'TodoList',
  components: { DeleteModal },
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
    remove(emit) {
      this.todos = this.todos.filter(({ id }) => id !== emit.id)
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
.is-justified-end {
  justify-content: flex-end;
}
</style>
