<script setup lang="ts">
import type { Chat } from '~~/layers/chat/shared/types/chat'

const route = useRoute()
const projectId = route.params.projectId as string

const { chatsInProject } = useChats()

const chats = chatsInProject(projectId)

function getLastUserMessage(chat: Chat) {
  return chat.messages.find((message) => message.role === 'user')
}
</script>

<template>
  <div>
    <div
      v-if="chats?.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <NuxtLink
        v-for="chat in chats"
        :key="chat.id"
        :to="`/projects/${projectId}/chats/${chat.id}`"
      >
        <UCard class="h-full">
          <template #header>
            <h3 class="text-md font-medium">
              {{ chat.title || 'Untitled Chat' }}
            </h3>
          </template>

          <ChatTextMessage
            v-if="chat.messages?.length"
            class="text-sm line-clamp-2 text-dimmed"
            :message="getLastUserMessage(chat)!"
          />
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
