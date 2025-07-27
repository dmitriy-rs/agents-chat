<script setup lang="ts">
const { sendMessage, isEmpty } = useChat()
</script>

<template>
  <div ref="scrollContainer" class="overflow-y-auto h-full box-border">
    <UContainer class="max-w-4xl h-full space-y-6">
      <ChatEmptyState v-if="isEmpty">
        <div id="input-slot-empty" />
      </ChatEmptyState>

      <template v-else>
        <ChatHeader />
        <ChatMessages />
      </template>

      <div
        id="input-slot-footer"
        class="fixed bottom-6 max-w-4xl w-[calc(100%-3rem)] z-10"
      />
    </UContainer>
  </div>

  <ClientOnly>
    <Teleport :to="isEmpty ? '#input-slot-empty' : '#input-slot-footer'">
      <ChatInput @send-message="sendMessage" />
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.scroll-to-bottom-button-container {
  position: absolute;
  bottom: calc(100% + 1rem);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.scroll-to-bottom-button-container :deep(button) {
  pointer-events: auto;
}

.message-input {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.message-input::-webkit-scrollbar {
  display: none;
}
</style>
