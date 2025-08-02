export default function useSoundEffect(initialSound: SoundEffect) {
  const player = useSoundPlayer(soundEffects[initialSound])

  function playSound(sound?: SoundEffect) {
    player.playSound(soundEffects[sound ?? initialSound])
  }

  return {
    playSound,
  }
}
