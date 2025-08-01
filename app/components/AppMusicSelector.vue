<script setup lang="ts">
import { melodies } from '~/utils/musicUtils'

const musicGroups = {
  adventure: [melodies.eightBitAdventureLead, melodies.eightBitAdventureBass],
  chipQuest: [melodies.chipQuestLead, melodies.chipQuestBass],
  retroVoyage: [melodies.retroVoyageLead, melodies.retroVoyageBass],
  pixelDream: [melodies.pixelDreamLead, melodies.pixelDreamBass],
  spaceOdyssey: [melodies.spaceOdysseyLead, melodies.spaceOdysseyBass],
  forestWhispers: [melodies.forestWhispersLead, melodies.forestWhispersBass],
  cyberPulse: [melodies.cyberPulseLead, melodies.cyberPulseBass],
} as const

type GroupKey = keyof typeof musicGroups

const options: { label: string; value: GroupKey }[] = [
  { label: 'Adventure', value: 'adventure' },
  { label: 'Chiptune Quest', value: 'chipQuest' },
  { label: 'Retro Voyage', value: 'retroVoyage' },
  { label: 'Pixel Dream', value: 'pixelDream' },
  { label: 'Space Odyssey', value: 'spaceOdyssey' },
  { label: 'Forest Whispers', value: 'forestWhispers' },
  { label: 'Cyber Pulse', value: 'cyberPulse' },
]

const selected = useState<GroupKey>('music', () => 'forestWhispers')

const { isPlaying, hasStarted, pauseMusic, startMusic, restartMusic } =
  useMusicOnMount([...musicGroups[selected.value]])

watch(selected, async () => {
  const newMelodies = [...musicGroups[selected.value]]
  pauseMusic()
  await nextTick()
  startMusic(newMelodies)
})

function startStop() {
  if (isPlaying.value) {
    pauseMusic()
  } else {
    restartMusic()
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      size="md"
      variant="ghost"
      color="neutral"
      :icon="hasStarted && isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'"
      @click="startStop"
    />

    <USelect
      v-model="selected"
      class="[&_.ui-select-label]:hidden"
      leading-icon="i-heroicons-musical-note"
      trailing-icon=""
      :items="options"
      size="sm"
      color="primary"
      variant="soft"
      :content="{ side: 'top', align: 'end', sideOffset: 6 }"
      :ui="{ content: 'w-42', viewport: 'max-h-none overflow-visible' }"
    />
  </div>
</template>
