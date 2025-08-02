<script setup lang="ts">
const { isPending = false } = defineProps<{
  isPending?: boolean
}>()
const emit = defineEmits<{
  (e: 'send-message', message: string): void
}>()

const message = ref('')

const { playSound } = useSoundEffect('macTrash')

function onMessageSend() {
  if (!message.value || isPending) {
    return
  }
  emit('send-message', message.value)
  playSound()
}
</script>

<template>
  <form
    class="relative flex items-center justify-center transition-all ease-in-out duration-150 border border-default overflow-hidden py-4 pl-5 pr-8 bg-default focus-within:transform-none hover:transform-none hover:outline-none hover:shadow-md"
    @submit.prevent="onMessageSend"
  >
    <ChatTextarea
      v-model="message"
      :disabled="isPending"
      @enter="onMessageSend"
    />

    <UButton
      type="submit"
      :disabled="!message || isPending"
      color="primary"
      variant="solid"
      icon="i-heroicons-paper-airplane"
      class="absolute right-3 bottom-3 rounded-full"
      square
    />
  </form>
</template>
