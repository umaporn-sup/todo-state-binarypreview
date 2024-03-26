<script setup>
import { useTodos } from '../stores/todos.js'
import TodoList from './TodoList.vue'
// import { TodoManagement } from '../libs/TodoManagement.js'
import AddEditTodo from './AddEditTodo.vue'
import {
  getItems,
  deleteItemById,
  addItem,
  editItem
} from '../libs/fetchUtils.js'
import { ref, onMounted } from 'vue'

const showModal = ref(false)

const updateTodo = async (newTodo) => {
  //adding new todo
  if (newTodo.id === undefined) {
    const addedItem = await addItem(`${import.meta.env.VITE_BASE_URL}/todos`, {
      category: newTodo.category,
      description: newTodo.description
    })
    myTodos.addTodo(addedItem.id, addedItem.category, addedItem.description)
  }
  //editing todo
  else {
    const editedItem = await editItem(
      `${import.meta.env.VITE_BASE_URL}/todos`,
      newTodo.id,
      newTodo
    )
    myTodos.updateTodo(
      editedItem.id,
      editedItem.category,
      editedItem.description
    )
  }
  showModal.value = false
  editingTodo.value = { id: undefined, category: '', description: '' }
  // console.log(myTodos.getTodos())
}
const clearModal = () => {
  showModal.value = false
}
//delete todo
const removeItem = async (removeId) => {
  const removeStatus = await deleteItemById(
    `${import.meta.env.VITE_BASE_URL}/todos`,
    removeId
  )
  if (removeStatus === 200) {
    myTodos.removeTodo(removeId)
  } else console.log('error: delete fails')
}

const editingTodo = ref({ id: undefined, category: '', description: '' })
const openModalToAddEdit = (previousTodo) => {
  showModal.value = true
  if (previousTodo?.id === undefined)
    editingTodo.value = { id: undefined, category: '', description: '' }
  else editingTodo.value = previousTodo
}

//get todos
const myTodos = useTodos()
onMounted(async () => {
  myTodos.resetTodos()
  const items = await getItems(`${import.meta.env.VITE_BASE_URL}/todos`)
  myTodos.addTodos(items)
})
</script>

<template>
  <div class="w-full">
    <div>
      <TodoList
        :todos="myTodos.getTodos()"
        @deleteTodo="removeItem"
        @editMode="openModalToAddEdit"
        @addMode="openModalToAddEdit"
      />
    </div>

    <Teleport to="#addEditModal">
      <div
        class="absolute left-0 right-0 top-1/3 m-auto bg-slate-50 flex h-auto w-1/4 shadow-lg rounded-md"
        v-if="showModal"
      >
        <AddEditTodo
          :todo="editingTodo"
          @saveNewTodo="updateTodo"
          @closeModal="clearModal"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped></style>
