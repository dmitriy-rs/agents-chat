<script setup lang="ts">
const { chats } = useChats()
const { isOpen } = useAppSidebar()
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-muted border-r-default border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="overflow-y-auto p-4">
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-sm font-semibold text-muted">Chats</h2>
        </div>
        <div class="space-y-1">
          <NuxtLink
            v-for="chat in chats"
            :key="chat.id"
            :to="`/chats/${chat.id}`"
            class="block px-3 py-1 text-sm rounded-md transition-colors duration-200 ease-in-out hover:bg-elevated"
            active-class="text-default bg-elevated"
          >
            {{ chat.title || 'Untitled Chat' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>
