<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <div
    class="absolute bottom-16 left-0 w-full flex justify-center pointer-events-none"
  >
    <UButton
      color="neutral"
      variant="outline"
      icon="i-heroicons-arrow-down"
      class="rounded-full shadow-sm pointer-events-auto"
      @click="emit('click')"
    />
  </div>
</template>
