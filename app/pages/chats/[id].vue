<script setup lang="ts">
const { chat, messages } = useChatQuery()

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
  <ChatWindow :id="chat.id" :title="chat.title" :messages />
</template>
