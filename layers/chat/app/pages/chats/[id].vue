<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
const chatId = route.params.id as ChatId
const chat = await useChatQuery(chatId)

if (!chat.value) {
  await navigateTo('/', { replace: true })
}

const { messages, error, pending } = await useChatMessagesQuery(chatId)

useChatPageHead(chat.value)
</script>

<template>
  <NuxtLayout v-if="chat" name="no-header">
    <AppHeader :title="chat.title" />

    <NuxtErrorBoundary v-if="!error && !pending">
      <ChatWindow :id="chat.id" :initial-messages="messages" />

      <template #error>
        <UAlert
          :title="`Ops, error appeared`"
          description="Please try again later."
        />
      </template>
    </NuxtErrorBoundary>

    <UAlert
      v-else-if="error"
      title="Ops, error appeared"
      description="Please try again later. Make sure that chat exists and you have a permission for it"
    />
  </NuxtLayout>
</template>
