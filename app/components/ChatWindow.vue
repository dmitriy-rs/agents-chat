<script setup lang="ts">
import type { UIMessage } from 'ai'

const props = defineProps<{
  id: string
  title: string
  messages: UIMessage[]
}>()

const messages = toRef(props.messages)
const isEmpty = computed(() => messages.value.length === 0)

const { sendMessage, isPending } = useChatMessageSend(messages)
const { shouldShowScrollButton, scrollToBottom } = useChatScroll(messages)
</script>

<template>
  <div ref="scrollContainer" class="overflow-y-auto h-full box-border">
    <UContainer class="max-w-4xl h-full space-y-6">
      <ChatEmptyState v-if="isEmpty">
        <ChatInputForm :is-pending @send-message="sendMessage" />
      </ChatEmptyState>

      <div v-else class="py-4">
        <ChatMessages :messages :is-pending />

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
