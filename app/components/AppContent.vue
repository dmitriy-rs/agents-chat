<script setup lang="ts">
const { isOpen } = useAppSidebar()
</script>

<template>
  <main
    class="main-content transition-all duration-300 ease-in-out"
    :class="{
      'ml-64': isOpen,
    }"
  >
    <slot />
  </main>
</template>
