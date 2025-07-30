<script setup lang="ts">
const appConfig = useAppConfig()
const { createChat } = useChats()
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center h-screen">
    <span class="text-2xl font-bold mb-2">{{ appConfig.title }}</span>

    <UButton size="xl" @click="createChat"> Start chat </UButton>
  </UContainer>
</template>
