<script setup>
import { ref, computed } from 'vue'
import { previewBinaryFile } from '../libs/previewBinary.js'
const props = defineProps({
  todo: {
    type: Object,
    default: { id: undefined, category: '', description: '' }
  }
})
const previousTodo = computed(() => props.todo)
defineEmits(['saveNewTodo', 'closeModal'])

const previewImageURL = ref('')
const previewDocURL = ref('')
const fn = ref('')
const chooseBinaryFile = (event) => {
  previewImageURL.value = ''
  previewDocURL.value = ''
  console.log(event.target)
  console.log(event.target.files)
  console.log(event.target.files[0])
  console.log(event.target.files[0].name)
  fn.value = event.target.files[0].name.toLowerCase()
  const extension = fn.value.substring(fn.value.lastIndexOf('.'))
  console.log(extension)
  if (['.jpg', '.jpeg', '.png'].includes(extension)) {
    previewImageURL.value = previewBinaryFile(event.target.files[0])
    console.log(previewImageURL.value)
  } else if (fn.value.endsWith('.pdf')) {
    previewDocURL.value = previewBinaryFile(event.target.files[0])
    console.log(previewDocURL.value)
  }
}
</script>

<template>
  <div class="flex flex-col p-2 gap-5">
    <h1 class="font-semibold text-xl">
      {{ todo.id === undefined ? 'Adding' : 'Editing' }} Todo
    </h1>
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <span>Category</span>
        <input type="radio" v-model="previousTodo.category" value="home" />
        <span>home</span>
        <input type="radio" v-model="previousTodo.category" value="work" />
        <span>work</span>
      </div>
      <div class="flex gap-3">
        <span>Description</span>
        <input
          type="text"
          v-model.trim="previousTodo.description"
          class="w-full p-0.5 border border-gray-300 rounded-lg outline-none"
        />
      </div>
      <div class="flex flex-col gap-3">
        <div>
          Attached Image/PDF:<input
            @change="chooseBinaryFile"
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
          />
        </div>

        <img
          v-show="previewImageURL"
          :src="previewImageURL"
          class="w-24 h-24"
        />
        <a
          class="text-purple-500 hover:text-purple-300 italic"
          v-show="previewDocURL"
          :href="previewDocURL"
          target="_blank"
          >{{ fn }}</a
        >
      </div>
    </div>
    <div class="flex gap-3">
      <button
        @click="$emit('saveNewTodo', previousTodo)"
        class="bg-slate-100 border border-gray-300 rounded-md hover:opacity-80 px-2 py-0.5"
      >
        Save
      </button>
      <button
        @click="$emit('closeModal', false)"
        class="bg-slate-100 border border-gray-300 rounded-md hover:opacity-80 px-2 py-0.5"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped></style>
