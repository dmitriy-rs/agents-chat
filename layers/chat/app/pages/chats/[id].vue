<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
const chatId = route.params.id as string

const { data } = await useFetch(`/api/chats/${chatId}/messages`)
const initialMessages = toValue(data)

const { chat, messages, sendMessage, isPending } = useChat(
  chatId,
  initialMessages ?? [],
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
      :messages="messages"
      :is-pending
      @send-message="sendMessage"
    />
  </NuxtLayout>
</template>
