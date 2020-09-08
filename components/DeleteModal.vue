<template>
  <div v-if="!!deleteTarget" class="modal is-active">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Deleting an item
        </p>
        <button class="delete" aria-label="close" @click="cancelRemove()" />
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Todo } from '~/store/todo'

@Component
export default class DeleteModal extends Vue {
  deleteTarget: Todo | null = null

  askRemove(todo: Todo) {
    this.deleteTarget = todo
  }

  cancelRemove() {
    this.closeModal()
  }

  closeModal() {
    this.deleteTarget = null
  }

  remove() {
    this.$emit('remove', this.deleteTarget)
    this.closeModal()
  }
}
</script>
