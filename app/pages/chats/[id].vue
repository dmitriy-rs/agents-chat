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

const appConfig = useAppConfig()
const title = computed(() =>
  chat.value?.title
    ? [chat.value.title, appConfig.title].join(' - ')
    : appConfig.title,
)
useHead({
  title,
})
</script>

<template>
  <NuxtLayout v-if="chat" name="no-header">
    <AppHeader :title="chat.title" />
    <AppSidebar />

    <ChatWindow
      :id="chat.id"
      :title="chat.title"
      :messages
      :is-pending
      @send-message="sendMessage"
    />
  </NuxtLayout>
</template>
