<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
const { chat, messages } = useChat(route.params.id as string)

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
  <NuxtLayout name="no-header">
    <AppHeader :title="chat?.title" />

    <ChatWindow v-if="chat" :id="chat.id" :title="chat.title" :messages />
  </NuxtLayout>
</template>
