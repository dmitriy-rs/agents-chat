export interface MelodyNote {
  note: string
  duration: number
}

export interface MelodyConfig {
  name: string
  notes: readonly MelodyNote[]
  tempo: number // Time between notes in ms
  volume: number // 0-1
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

const adventureBegins: MelodyConfig = {
  name: 'Gentle Adventure',
  notes: [
    // Soft opening - gentle anticipation
    { note: 'C4', duration: 2400 },
    { note: 'E4', duration: 2400 },
    { note: 'G4', duration: 3200 },

    // Calm adventure motif
    { note: 'A4', duration: 2000 },
    { note: 'G4', duration: 2000 },
    { note: 'E4', duration: 2400 },
    { note: 'F4', duration: 3200 },

    // Peaceful resolution
    { note: 'G4', duration: 2400 },
    { note: 'F4', duration: 2400 },
    { note: 'E4', duration: 2400 },
    { note: 'D4', duration: 3200 },
    { note: 'C4', duration: 4800 }, // Gentle ending
  ],
  tempo: 2800, // Much slower for ambient feel
  volume: 0.12, // Quiet background volume
  waveType: 'sine', // Softest waveform
  modulator: {
    type: 'sine',
    frequency: 0.8, // Very slow, subtle modulation
    depth: 15, // Gentle effect
    param: 'detune',
  },
  filter: {
    type: 'lowpass',
    frequency: 500, // Heavy filtering for soft ambient sound
  },
}

// Gentle bass harmony
const adventureBass: MelodyConfig = {
  name: 'Gentle Bass',
  notes: [
    { note: 'C2', duration: 4800 }, // Deep, sustained bass notes
    { note: 'F2', duration: 4800 },
    { note: 'G2', duration: 4800 },
    { note: 'C2', duration: 6400 }, // Long resolution
    { note: 'A1', duration: 4800 },
    { note: 'D2', duration: 4800 },
    { note: 'G1', duration: 4800 },
    { note: 'C2', duration: 9600 }, // Very long sustain
  ],
  tempo: 4800, // Very slow bass rhythm
  volume: 0.08, // Very quiet bass
  waveType: 'sine', // Smoothest bass
  modulator: {
    type: 'sine',
    frequency: 0.3, // Very slow modulation
    depth: 10, // Minimal effect
    param: 'detune',
  },
  filter: {
    type: 'lowpass',
    frequency: 200, // Very deep, muffled bass
  },
}

export const melodies = {
  adventureBegins,
  adventureBass,
} as const
