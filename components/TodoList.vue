<template>
  <div class="container todolist">
    <form class="field has-addons" @submit.prevent="add(name)">
      <div class="control is-expanded has-icons-left">
        <input v-model="name" class="input" type="text" placeholder="Name" />
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
              <input
                :checked="todo.done"
                type="checkbox"
                @change="toggle(todo)"
              />
            </label>
          </td>
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

<script lang="ts">
import { TodoStore } from '@/store'
import DeleteModal from './DeleteModal'
import { Todo } from '~/store/todo'

export default {
  name: 'TodoList',
  components: { DeleteModal },
  data() {
    TodoStore.fetchTodos()
    return {
      name: '',
    }
  },
  computed: {
    todos: () => TodoStore.getTodos,
  },
  methods: {
    remove: (todo: Todo) => TodoStore.deleteTodo(todo.id),
    add(name) {
      TodoStore.createTodo(name)
      this.name = ''
    },
    toggle: (todo: Todo) => TodoStore.toggle(todo.id),
  },
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
