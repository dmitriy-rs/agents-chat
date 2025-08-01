<script setup lang="ts">
import { melodies } from '~/utils/musicUtils'

const { createChat } = useChats()

// Dynamic adventure music with melody + bass harmony
useMusicOnMount([melodies.adventureBegins, melodies.adventureBass])
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center h-full">
    <UButton size="xl" @click="createChat"> Start a new chat journey </UButton>
  </UContainer>
</template>
