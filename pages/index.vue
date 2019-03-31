<template>
  <section class="container">
    <div>
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              nuxt-todo
            </h1>
            <h2 class="subtitle">
              A todo list manager made with Nuxt.js
            </h2>
          </div>
        </div>
      </section>
      <TodoList />
    </div>
  </section>
</template>

<script>
import TodoList from '../components/TodoList'

export default {
  components: {
    TodoList
  }
}
</script>

<style>
</style>
