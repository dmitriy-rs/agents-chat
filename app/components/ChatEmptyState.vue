<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="flex items-center justify-center flex-1 min-h-full rounded">
    <div class="bg-elevated p-8 w-full flex flex-col gap-8">
      <h2 class="text-xl font-medium text-muted text-center">
        Start your chat
      </h2>

      <slot />
    </div>
  </div>
</template>
