<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="flex items-center gap-2 text-3xl font-semibold tracking-wide">
      <slot name="header"></slot>
    </div>
    <slot v-for="(item, index) in items" :key="index" :item="item"> </slot>
  </div>
</template>

<style scoped></style>
