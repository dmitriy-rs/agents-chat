<script setup lang="ts">
import type { UIMessage } from 'ai'

defineProps<{
  message: UIMessage
}>()
</script>

<template>
  <div v-for="(part, index) of message.parts" :key="index" v-bind="$attrs">
    <span v-if="part.type === 'text'">
      <MarkdownRenderer :content="part.text" />
    </span>
  </div>
</template>
