<script setup lang="ts">
const options: { label: string; value: BackgroundMelody }[] = [
  { label: 'Adventure', value: 'adventure' },
  { label: 'Chiptune Quest', value: 'chipQuest' },
  { label: 'Retro Voyage', value: 'retroVoyage' },
  { label: 'Pixel Dream', value: 'pixelDream' },
  { label: 'Space Odyssey', value: 'spaceOdyssey' },
  { label: 'Forest Whispers', value: 'forestWhispers' },
  { label: 'Cyber Pulse', value: 'cyberPulse' },
  { label: 'Starfall Serenade', value: 'starfallSerenade' },
  { label: 'Laser Lagoon', value: 'laserLagoon' },
]

const { selected, toggleMusic, hasStarted, isPlaying } = useBackgroundMusic()
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      size="md"
      variant="ghost"
      color="neutral"
      :icon="hasStarted && isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'"
      @click="toggleMusic"
    />

    <USelect
      v-model="selected"
      class=""
      leading-icon="i-heroicons-musical-note"
      trailing-icon=""
      :items="options"
      size="sm"
      color="primary"
      variant="soft"
      :content="{ side: 'top', align: 'end', sideOffset: 6 }"
      :ui="{
        content: 'w-42',
        viewport:
          'scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-950 scrollbar-thin scrollbar-thumb-rounded-none scrollbar-track-rounded-none',
      }"
    />
  </div>
</template>
