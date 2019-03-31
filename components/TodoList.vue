<template>
  <div class="container todolist">
    <form @submit.prevent="add(newTodo)" class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="newTodo.name"
          class="input"
          type="text"
          placeholder="Name"
        >
      </div>
      <div class="control">
        <button :disabled="!newTodo.name" class="button is-primary">
          add
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
        <tr v-for="todo in todos">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>
            <button
              @click="$refs.deleteModal.askRemove(todo)"
              class="button is-danger"
            >
              delete
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
