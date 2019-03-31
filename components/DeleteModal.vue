<template>
  <div v-if="isModalActive" class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Deleting an item
        </p>
        <button class="delete" aria-label="close" @click="cancelRemove()" />
      </header>
      <section class="modal-card-body">
        <p>Are you sure to delete the following item?</p>
        <div class="notification">
          <div class="has-circle-indicator">
            name: <strong>{{ deleteTarget.name }}</strong>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-justified-end">
        <button class="button is-danger is-pulled-right" @click="remove()">
          Delete
        </button>
        <button class="button" @click="cancelRemove()">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  data: () => ({
    isModalActive: false,
    deleteTarget: null
  }),
  methods: {
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
      this.closeModal()
      this.$emit('remove', this.deleteTarget)
      this.deleteTarget = null
    }
  }
}
</script>
