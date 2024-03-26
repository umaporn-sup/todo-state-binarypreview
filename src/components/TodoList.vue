<script setup>
import BaseCard from './BaseCard.vue'
import ListModel from './ListModel.vue'
import AddTodoIcon from './icons/AddTodoIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
defineEmits(['deleteTodo', 'editMode', 'addMode'])
const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})
const gotoTodoId = (id) => {
  router.push({ name: 'TodoDetail', params: { todo: id } })
}
</script>

<template>
  <div>
    <ListModel :items="todos">
      <template #header
        ><AddTodoIcon class="cursor-pointer" @click="$emit('addMode')" />TODO
        List</template
      >
      <template #default="slotProps">
        <BaseCard size="sm" variant="flat">
          <template v-slot:title>
            <!-- <router-link
              :to="{
                name: 'TodoDetail',
                params: {
                  // todo: JSON.stringify(slotProps.item)
                  todo: slotProps.item.id
                }
              }"
              ><p class="text-purple-400 cursor-pointer">
                {{ slotProps.item.id }}
              </p>
            </router-link> -->

            <p
              @click="gotoTodoId(slotProps.item.id)"
              class="text-purple-400 cursor-pointer"
            >
              {{ slotProps.item.id }}
            </p>
          </template>

          <template v-slot:subtitle>{{ slotProps.item.category }} </template>
          <template v-slot:content>{{ slotProps.item.description }}</template>
          <template v-slot:action>
            <button
              @click="$emit('editMode', slotProps.item)"
              class="text-sm text-purple-600 hover:text-purple-400"
            >
              Edit
            </button>
            <button
              @click="$emit('deleteTodo', slotProps.item.id)"
              class="text-sm text-red-600 hover:text-red-400"
            >
              Delete
            </button>
          </template>
        </BaseCard>
      </template>
    </ListModel>
  </div>
</template>

<style scoped></style>
