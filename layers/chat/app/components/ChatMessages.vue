<script setup lang="ts">
import type { UIMessage } from 'ai'
defineProps<{
  messages: UIMessage[]
  isPending?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-4 overflow-y-auto pb-32">
    <div
      v-for="(message, messageIndex) in messages"
      :key="message.id ? message.id : messageIndex"
      class="p-4 rounded-sm transition-all duration-200"
      :class="{
        'bg-muted border border-muted w-[70%] self-end':
          message.role === 'user',
        'w-full py-4': message.role === 'assistant',
      }"
    >
      <div
        v-for="(part, index) in message.parts"
        :key="`${message.id}-${part.type}-${index}`"
        class="break-words whitespace-pre-wrap"
      >
        <span v-if="part.type === 'text'">
          <!-- <MarkdownRenderer :content="part.text" /> -->
          {{ part.text }}
        </span>
      </div>
    </div>

    <span v-if="isPending" class="inline-block animate-pulse ml-1">
      &#9611;
    </span>
  </div>
</template>
