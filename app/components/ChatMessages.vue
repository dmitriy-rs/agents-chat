<script setup lang="ts">
const { messages } = useChat()
</script>

<template>
  <div class="flex flex-col gap-4 overflow-y-auto pb-32">
    <div
      v-for="message in messages"
      :key="message.id"
      class="p-4 rounded-sm transition-all duration-200"
      :class="{
        'bg-muted border border-muted w-[70%] self-end': message.role === 'user',
        'w-full py-4': message.role === 'assistant',
      }"
    >
      <div class="break-words whitespace-pre-wrap">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>
