<script setup lang="ts">
definePageMeta({
  layout: 'with-music',
})

const { createChat } = useChats()
</script>

<template>
  <div class="relative h-full">
    <UContainer class="flex flex-col items-center justify-center h-full">
      <UButton size="xl" @click="createChat">
        Start a new chat journey
      </UButton>
    </UContainer>
  </div>
</template>
