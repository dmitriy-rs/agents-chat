export default function useBackgroundMusic() {
  const selected = useState<BackgroundMelody>('music', () => 'laserLagoon')

  const player = useBackgroundMusicPlayer()

  async function startSelectedMelody() {
    const melody = [...backgroundMelodies[selected.value]]
    await player.startMusic(melody)
  }

  function toggleMusic() {
    if (player.isPlaying.value) {
      player.pauseMusic()
    } else {
      player.restartMusic()
    }
  }

  useEventListener('click', startSelectedMelody, { once: true })
  useEventListener('keydown', startSelectedMelody, { once: true })
  useEventListener('touchstart', startSelectedMelody, { once: true })

  watch(selected, async () => {
    player.pauseMusic()
    await nextTick()
    startSelectedMelody()
  })

  return {
    selected,
    hasStarted: player.hasStarted,
    isPlaying: player.isPlaying,

    toggleMusic,
  }
}
