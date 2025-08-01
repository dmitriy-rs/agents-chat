<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Chat } from '~/types'

const { chats } = useChats()
const { isOpen } = useAppSidebar()
const route = useRoute()

const chatsWithoutProject = computed(() =>
  chats.value.filter((c) => !c.projectId),
)

function filterChats(startDays: number, endDays?: number) {
  return filterChatsByDateRange(
    chatsWithoutProject.value,
    startDays,
    endDays,
  ).map(formatChatItem)
}

function formatChatItem(chat: Chat): NavigationMenuItem {
  return {
    label: chat.title ?? 'Untitled Chat',
    to: `/chats/${chat.id}`,
    defaultOpen: true,
    active: route.params.id === chat.id,
  }
}

const chatsNavigation = computed(() =>
  [
    {
      title: 'Today',
      list: filterChats(-1, 1),
    },
    {
      title: 'Last week',
      list: filterChats(1, 7),
    },
    {
      title: 'Last month',
      list: filterChats(7, 30),
    },
    {
      title: 'Older chats',
      list: filterChats(30),
    },
  ].filter((x) => x.list.length > 0),
)
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-muted border-r-default border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div v-if="chatsWithoutProject.length > 0" class="overflow-y-auto p-4">
      <div v-for="{ title, list } of chatsNavigation" :key="title" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-sm font-semibold text-muted">{{ title }}</h2>
        </div>
        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="list"
          default-open
        />
      </div>
    </div>

    <div v-else class="overflow-y-auto p-4">
      <UAlert
        title="No Chats"
        description="Create a new chat to get started."
        color="neutral"
        variant="soft"
        class="mt-2"
      />
    </div>
  </aside>
</template>
