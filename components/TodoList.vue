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
            <button @click="askRemove(todo)" class="button is-danger">
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" :class="{ 'is-active': isModalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deleting an item</p>
          <button
            @click="cancelRemove()"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          Are you sure to delete this item?
          {{ deleteTarget }}
        </section>
        <footer class="modal-card-foot is-justified-end">
          <button @click="remove()" class="button is-danger is-pulled-right">
            Delete
          </button>
          <button @click="cancelRemove()" class="button">Cancel</button>
        </footer>
      </div>
    </div>
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
    },
    isModalActive: false,
    deleteTarget: null
  }),
  methods: {
    add(newTodo) {
      this.todos.push({ id: getNewIndex(), ...newTodo })
      this.reset()
    },
    reset() {
      this.newTodo.name = ''
    },
    askRemove(todo) {
      this.isModalActive = true
      this.deleteTarget = todo
    },
    cancelRemove() {
      this.deleteTarget = null
      this.closeModal()
    },
    closeModal() {
      this.isModalActive = false
    },
    remove() {
      this.todos = this.todos.filter(({ id }) => id !== this.deleteTarget.id)
      this.deleteTarget = null
      this.closeModal()
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
