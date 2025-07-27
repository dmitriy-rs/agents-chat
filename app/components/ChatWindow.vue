<script setup lang="ts">
const { isEmpty } = useChat()

const { shouldShowScrollButton, scrollToBottom } = useChatScroll()
</script>

<template>
  <div ref="scrollContainer" class="overflow-y-auto h-full box-border">
    <UContainer class="max-w-4xl h-full space-y-6">
      <ChatEmptyState v-if="isEmpty">
        <ChatInputForm />
      </ChatEmptyState>

      <template v-else>
        <ChatHeader />
        <ChatMessages />

        <div class="fixed bottom-6 max-w-4xl w-[calc(100%-3rem)] z-10">
          <ChatScrollButton
            v-if="shouldShowScrollButton"
            @click="scrollToBottom"
          />

          <ChatInputForm />
        </div>
      </template>
    </UContainer>
  </div>
</template>
