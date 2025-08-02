<script setup lang="ts">
const route = useRoute()
const { chat, messages, sendMessage, isPending } = useChat(
  route.params.id as string,
)

if (!chat.value) {
  await navigateTo(`/projects/${route.params.projectId}`, {
    replace: true,
  })
}

useChatPageHead(chat)
</script>

<template>
  <ChatWindow
    v-if="chat"
    :id="chat.id"
    :title="chat.title"
    :messages
    :is-pending
    @send-message="sendMessage"
  />
</template>
