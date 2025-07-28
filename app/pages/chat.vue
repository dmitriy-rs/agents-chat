<script setup lang="ts">
const { chat } = useChat()

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
  <ChatWindow />
</template>
