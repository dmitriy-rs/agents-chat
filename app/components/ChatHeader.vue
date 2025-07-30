<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="py-4 flex items-center justify-between">
    <h1 class="text-2xl font-bold text-default">
      {{ title ?? 'Untitled chat' }}
    </h1>
  </div>
</template>
