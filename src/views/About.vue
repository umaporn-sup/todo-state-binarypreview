<script setup>
import { useTodos } from '../stores/todos.js'
const myTodos = useTodos()
// const { getTodos } = useTodos()
</script>

<template>
  <div>
    <div>
      <p v-for="todo in myTodos.getTodos()">
        {{ todo }}
      </p>
    </div>
    <h2
      class="flex justify-center font-semibold text-xl p-20 bg-white shadow-lg"
    >
      B.Sc.IT, School of Information Technology, KMUTT
    </h2>
  </div>
</template>

<style scoped></style>
