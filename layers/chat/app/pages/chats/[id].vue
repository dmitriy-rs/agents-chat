<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
const chatId = route.params.id as string

const chat = await useChatQuery(chatId)

if (!chat.value) {
  await navigateTo('/', { replace: true })
}

const { messages, error, pending } = await useChatMessagesQuery(chatId)

watch(chat, (v) => {
  console.log(v)
})

useChatPageHead(chat.value)
</script>

<template>
  <NuxtLayout v-if="chat" name="no-header">
    <AppHeader :title="chat.title" />

    <ChatWindow
      v-if="!error && !pending"
      :id="chat.id"
      :initial-messages="messages"
    />

    <UAlert
      v-if="error"
      title="Ops, error appeared"
      description="Please try again later. Make sure that chat exists and you have a permission for it"
    />
  </NuxtLayout>
</template>
