<template>
  <div class="container todolist">
    <form @submit.prevent="add(name)" class="field has-addons">
      <div class="control is-expanded has-icons-left">
        <input v-model="name" class="input" type="text" placeholder="Name">
        <span class="icon is-small is-left">
          <i class="fas fa-pen" />
        </span>
      </div>
      <div class="control">
        <button :disabled="!name" class="button is-primary">
          <span class="icon is-small">
            <i class="fas fa-check" />
          </span>
          <span>add</span>
        </button>
      </div>
    </form>

    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>Done</th>
          <th class="is-fullwidth">
            Name
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td class="has-text-centered">
            <label class="checkbox">
              <input @change="toggle(todo)" :checked="todo.done" type="checkbox">
            </label>
          </td>
          <td>{{ todo.name }}</td>
          <td>
            <button
              @click="$refs.deleteModal.askRemove(todo)"
              class="button is-danger"
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
import { mapMutations } from 'vuex'
import DeleteModal from './DeleteModal'

export default {
  name: 'TodoList',
  components: { DeleteModal },
  data: () => ({
    name: ''
  }),
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  methods: {
    remove(todo) {
      this.removeTodo(todo)
    },
    add(name) {
      this.addTodo(name)
      this.name = ''
    },
    ...mapMutations({
      addTodo: 'todos/add',
      toggle: 'todos/toggle',
      removeTodo: 'todos/remove'
    })
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
