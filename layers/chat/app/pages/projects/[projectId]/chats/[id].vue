<script setup lang="ts">
const route = useRoute()
const chatId = route.params.id as ChatId
const chat = await useChatQuery(chatId)

if (!chat.value) {
  await navigateTo('/', { replace: true })
}

const { messages, error, pending } = await useChatMessagesQuery(chatId)

useChatPageHead(chat)
</script>

<template>
  <ChatWindow
    v-if="!error && !pending"
    :id="chatId"
    :initial-messages="messages"
  />

  <UAlert
    v-else-if="error"
    title="Ops, error appeared"
    description="Please try again later. Make sure that chat exists and you have a permission for it"
  />
</template>
