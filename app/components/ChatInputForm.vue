<script setup lang="ts">
const { isStreaming = false } = defineProps<{
  isStreaming?: boolean
}>()

const { sendMessage } = useChat()
const message = ref('')

function onMessageSend() {
  if (!message.value || isStreaming) {
    return
  }
  sendMessage(message.value)
}
</script>

<template>
  <form
    class="relative flex items-center justify-center transition-all ease-in-out duration-150 border border-default rounded-4xl overflow-hidden py-4 pl-5 pr-8 bg-default focus-within:transform-none hover:transform-none hover:outline-none hover:shadow-md"
    @submit.prevent="onMessageSend"
  >
    <ChatTextarea
      v-model="message"
      :disabled="isStreaming"
      @enter="onMessageSend"
    />

    <UButton
      type="submit"
      :disabled="!message || isStreaming"
      color="primary"
      variant="solid"
      icon="i-heroicons-paper-airplane"
      class="absolute right-3 bottom-3 rounded-full"
      square
    />
  </form>
</template>
