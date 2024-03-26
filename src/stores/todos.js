import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
export const useTodos = defineStore('todos', () => {
  const todos = ref([])
  const addTodos = (newTodos) => {
    newTodos.forEach((newTodo) =>
      addTodo(newTodo.id, newTodo.category, newTodo.description)
    )
  }
  const addTodo = (id, category, desc) => {
    todos.value.push({
      id: id,
      category: category,
      description: desc
    })
  }
  const updateTodo = (id, category, description) => {
    todos.value = todos.value.map((todo) => {
      return todo.id === id
        ? { ...todo, category: category, description: description }
        : todo
    })
  }
  const findTodo = (searchId) => {
    todos.value.find((todo) => todo.id === searchId)
  }
  const findIndexTodo = (searchId) => {
    todos.value.findIndex((todo) => todo.id === searchId)
  }
  const removeTodo = (removeId) => {
    todos.value.splice(
      todos.value.findIndex((todo) => todo.id === removeId),
      1
    )
  }
  const getTodos = () => {
    return todos.value
  }
  const resetTodos = () => {
    todos.value = []
  }

  return {
    getTodos,
    resetTodos,
    addTodos,
    addTodo,
    updateTodo,
    findTodo,
    findIndexTodo,
    removeTodo
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodos, import.meta.hot))
}
