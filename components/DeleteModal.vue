<template>
  <div v-if="!!deleteTarget" class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Deleting an item
        </p>
        <button @click="cancelRemove()" class="delete" aria-label="close" />
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>Are you sure to delete the following item?</p>
          <p class="tag">
            name:&nbsp;<strong>{{ deleteTarget.name }}</strong>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot is-justified-end">
        <button @click="remove()" class="button is-danger is-pulled-right">
          Delete
        </button>
        <button @click="cancelRemove()" class="button">
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
    deleteTarget: null
  }),
  methods: {
    askRemove(todo) {
      this.deleteTarget = todo
    },
    cancelRemove() {
      this.closeModal()
    },
    closeModal() {
      this.deleteTarget = null
    },
    remove() {
      this.$emit('remove', this.deleteTarget)
      this.closeModal()
    }
  }
}
</script>
