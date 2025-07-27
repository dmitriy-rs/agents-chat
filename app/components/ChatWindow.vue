<script setup lang="ts">
const { sendMessage, isEmpty, messages } = useChat()

const containerRef = useTemplateRef('scrollContainer')
const { shoulShowScrollButton, scrollToBottom, pinToBottom } =
  useChatScroll(containerRef)

watch(() => messages.value, pinToBottom, { deep: true })
</script>

<template>
  <div ref="scrollContainer" class="overflow-y-auto h-full box-border">
    <UContainer class="max-w-4xl h-full space-y-6">
      <ChatEmptyState v-if="isEmpty">
        <ChatInput @send-message="sendMessage" />
      </ChatEmptyState>

      <template v-else>
        <ChatHeader />
        <ChatMessages />
      </template>

      <div
        id="input-slot-footer"
        class="fixed bottom-6 max-w-4xl w-[calc(100%-3rem)] z-10"
      >
        <ChatScrollButton
          v-if="shoulShowScrollButton"
          @click="() => scrollToBottom()"
        />

        <ChatInput @send-message="sendMessage" />
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.message-input {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.message-input::-webkit-scrollbar {
  display: none;
}
</style>
