<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
const { chat, messages, sendMessage, isPending } = useChat(
  route.params.id as string,
)

if (!chat.value) {
  await navigateTo('/', { replace: true })
}

useChatPageHead(chat)
</script>

<template>
  <NuxtLayout v-if="chat" name="no-header">
    <AppHeader :title="chat.title" />

    <ChatWindow
      :id="chat.id"
      :title="chat.title"
      :messages
      :is-pending
      @send-message="sendMessage"
    />
  </NuxtLayout>
</template>
