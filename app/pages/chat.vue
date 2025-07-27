<script setup lang="ts">
const { chat } = useChat()

useHead({
  title: chat.value.title
})
</script>

<template>
  <ChatWindow />
</template>
