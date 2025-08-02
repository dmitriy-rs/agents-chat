<script lang="ts">
import type { ButtonProps, ButtonSlots } from '@nuxt/ui'

export interface SoundButtonProps extends /* @vue-ignore */ ButtonProps {
  sound: SoundEffect
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: true,
})

const { sound } = defineProps<SoundButtonProps>()
defineSlots<ButtonSlots>()
const emit = defineEmits(['click'])

const { playSound } = useSoundPlayer(soundEffects[sound])

function onClick() {
  playSound()
  emit('click')
}
</script>

<template>
  <UButton v-bind="$attrs" @click="onClick">
    <slot />
  </UButton>
</template>
