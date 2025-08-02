<script setup lang="ts">
const { id, initialMessages } = defineProps<{
  id: string
  initialMessages: ChatMessage[]
}>()

const { chat, isPending, sendMessage } = useChat(id, initialMessages)

const isEmpty = computed(() => chat.messages.length === 0)
const messages = computed(() => chat.messages)

const { shouldShowScrollButton, scrollToBottom } = useChatScroll(messages)
</script>

<template>
  <div
    ref="scrollContainer"
    class="overflow-y-auto h-full w-full box-border font-mono"
  >
    <UContainer class="max-w-4xl h-full space-y-6">
      <ChatEmptyState v-if="isEmpty">
        <ChatInputForm :is-pending @send-message="sendMessage" />
      </ChatEmptyState>

      <div v-else class="py-4">
        <ChatMessages :messages="chat.messages" :is-pending />

        <div class="fixed bottom-6 max-w-4xl w-[calc(100%-3rem)] z-10">
          <ChatScrollButton
            v-if="shouldShowScrollButton"
            @click="scrollToBottom"
          />

          <ChatInputForm :is-pending @send-message="sendMessage" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
