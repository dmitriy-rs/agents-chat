<script setup lang="ts">
const { isStreaming = false } = defineProps<{
  isStreaming?: boolean
}>()

const emit = defineEmits<{
  (e: 'send-message', message: string): void
}>()

const message = ref('')
const textareaRef = useTemplateRef('textareaRef')

onMounted(() => {
  textareaRef.value?.focus()
})

whenever(
  () => !isStreaming,
  async () => {
    await nextTick()
    textareaRef.value?.focus()
  },
)

async function adjustTextareaHeight() {
  if (!textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  await nextTick()
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

function onMessageSend() {
  if (!message.value || isStreaming) {
    return
  }
  emit('send-message', message.value)
  message.value = ''

  nextTick(() => {
    adjustTextareaHeight()
    textareaRef.value?.focus()
  })
}
</script>

<template>
  <form
    class="relative flex items-center justify-center transition-all ease-in-out duration-150 border border-default rounded-4xl overflow-hidden py-4 pl-5 pr-8 bg-default focus-within:transform-none hover:transform-none hover:outline-none hover:shadow-md"
    @submit.prevent="onMessageSend"
  >
    <textarea
      ref="textareaRef"
      v-model.trim="message"
      class="w-full p-0 mr-6 resize-none bg-transparent outline-none disabled:cursor-not-allowed"
      :disabled="isStreaming"
      :rows="1"
      @input="adjustTextareaHeight"
      @keydown.enter.exact.prevent="onMessageSend"
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
