<script setup lang="ts">
const { disabled } = defineProps<{
  disabled?: boolean
}>()

const valueModel = defineModel<string>()
const emit = defineEmits(['enter'])

const textareaRef = useTemplateRef('textareaRef')

async function adjustTextareaHeight() {
  if (!textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  await nextTick()
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

function onEnterPress() {
    emit('enter')
    valueModel.value = ""
    adjustTextareaHeight()
}

whenever(
  () => !disabled,
  async () => {
    await nextTick()
    textareaRef.value?.focus()
  },
)

onMounted(() => {
  textareaRef.value?.focus()
})
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model.trim="valueModel"
    class="w-full p-0 mr-6 resize-none bg-transparent outline-none disabled:cursor-not-allowed"
    :disabled="disabled"
    :rows="1"
    @input="adjustTextareaHeight"
    @keydown.enter.exact.prevent="onEnterPress"
  />
</template>
