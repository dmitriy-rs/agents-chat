<script setup lang="ts">
defineProps<{
  title?: string
}>()
const appConfig = useAppConfig()
const { createChat } = useChats()
const { toggleSidebar } = useAppSidebar()
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-16 bg-muted border-b border-default flex items-center justify-between px-4 z-50"
  >
    <div class="flex items-center gap-4">
      <UButton
        icon="i-lucide-menu"
        color="primary"
        variant="soft"
        @click="toggleSidebar"
      />
      <UButton trailing-icon="i-lucide-plus" @click="createChat">
        New Chat
      </UButton>
    </div>
    <div class="text-lg font-semibold">
      {{ title ?? appConfig.title }}
    </div>
    <div class="header-right">
      <!-- Nothing to see here! -->
    </div>
  </header>
</template>
