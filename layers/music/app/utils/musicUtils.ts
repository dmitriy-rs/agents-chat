export interface MelodyNote {
  note: string
  duration: number
}

export interface Melody {
  name: string
  notes: readonly MelodyNote[]
  tempo: number
  volume: number
  waveType: 'triangle' | 'sine' | 'square' | 'sawtooth'
  modulator?: {
    type: 'sine' | 'square' | 'triangle' | 'sawtooth'
    frequency: number
    depth: number
    param: 'detune' | 'frequency'
  }
  filter?: {
    type: 'lowpass' | 'highpass' | 'bandpass'
    frequency: number
  }
}

export type BackgroundMelody = keyof typeof backgroundMelodies

export type SoundEffect = keyof typeof soundEffects
