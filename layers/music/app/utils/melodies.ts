const eightBitAdventureLead: Melody = {
  name: '8-Bit Adventure Lead',
  notes: [
    { note: 'C4', duration: 500 },
    { note: 'E4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'C5', duration: 700 },

    { note: 'B4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'D4', duration: 500 },
    { note: 'G4', duration: 700 },
  ],
  tempo: 500, // Snappy 8-bit tempo
  volume: 0.14,
  waveType: 'triangle', // Softer chiptune wave
  modulator: {
    type: 'triangle',
    frequency: 4, // Gentle vibrato
    depth: 15,
    param: 'frequency',
  },
  filter: {
    type: 'lowpass',
    frequency: 1600, // Allow more treble
  },
}

const eightBitAdventureBass: Melody = {
  name: '8-Bit Adventure Bass',
  notes: [
    { note: 'C2', duration: 1000 },
    { note: 'C2', duration: 1000 },
    { note: 'D2', duration: 1000 },
    { note: 'E2', duration: 1000 },

    { note: 'G1', duration: 1000 },
    { note: 'G1', duration: 1000 },
    { note: 'A1', duration: 1000 },
    { note: 'B1', duration: 1000 },
  ],
  tempo: 1000, // Half-time to the lead
  volume: 0.12,
  waveType: 'triangle', // Softer low-end
  filter: {
    type: 'lowpass',
    frequency: 700, // Brighter bass
  },
}

const chipQuestLead: Melody = {
  name: 'Chiptune Quest Lead',
  notes: [
    { note: 'E4', duration: 600 },
    { note: 'G4', duration: 600 },
    { note: 'B4', duration: 600 },
    { note: 'E5', duration: 800 },

    { note: 'D5', duration: 600 },
    { note: 'B4', duration: 600 },
    { note: 'G4', duration: 600 },
    { note: 'E4', duration: 800 },
  ],
  tempo: 600,
  volume: 0.15,
  waveType: 'square',
  filter: {
    type: 'lowpass',
    frequency: 1800,
  },
}

const chipQuestBass: Melody = {
  name: 'Chiptune Quest Bass',
  notes: [
    { note: 'E2', duration: 1200 },
    { note: 'E2', duration: 1200 },
    { note: 'G2', duration: 1200 },
    { note: 'B1', duration: 1200 },
  ],
  tempo: 1200,
  volume: 0.1,
  waveType: 'triangle',
  filter: {
    type: 'lowpass',
    frequency: 700,
  },
}

const retroVoyageLead: Melody = {
  name: 'Retro Voyage Lead',
  notes: [
    { note: 'A4', duration: 700 },
    { note: 'C5', duration: 700 },
    { note: 'E5', duration: 700 },
    { note: 'A5', duration: 900 },

    { note: 'G5', duration: 700 },
    { note: 'E5', duration: 700 },
    { note: 'C5', duration: 700 },
    { note: 'A4', duration: 900 },
  ],
  tempo: 700,
  volume: 0.13,
  waveType: 'square',
  filter: { type: 'lowpass', frequency: 1500 },
}

const retroVoyageBass: Melody = {
  name: 'Retro Voyage Bass',
  notes: [
    { note: 'A2', duration: 1400 },
    { note: 'A2', duration: 1400 },
    { note: 'C3', duration: 1400 },
    { note: 'E2', duration: 1400 },
  ],
  tempo: 1400,
  volume: 0.1,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 650 },
}

const pixelDreamLead: Melody = {
  name: 'Pixel Dream Lead',
  notes: [
    { note: 'D4', duration: 550 },
    { note: 'F#4', duration: 550 },
    { note: 'A4', duration: 550 },
    { note: 'D5', duration: 750 },

    { note: 'C#5', duration: 550 },
    { note: 'A4', duration: 550 },
    { note: 'F#4', duration: 550 },
    { note: 'D4', duration: 750 },
  ],
  tempo: 550,
  volume: 0.14,
  waveType: 'square',
  filter: { type: 'lowpass', frequency: 1700 },
}

const pixelDreamBass: Melody = {
  name: 'Pixel Dream Bass',
  notes: [
    { note: 'D2', duration: 1100 },
    { note: 'D2', duration: 1100 },
    { note: 'F#2', duration: 1100 },
    { note: 'A1', duration: 1100 },
  ],
  tempo: 1100,
  volume: 0.09,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 600 },
}

const spaceOdysseyLead: Melody = {
  name: 'Space Odyssey Lead',
  notes: [
    { note: 'E4', duration: 600 },
    { note: 'D#4', duration: 600 },
    { note: 'B3', duration: 600 },
    { note: 'G3', duration: 900 },

    { note: 'A3', duration: 600 },
    { note: 'B3', duration: 600 },
    { note: 'D4', duration: 600 },
    { note: 'E4', duration: 900 },
  ],
  tempo: 600,
  volume: 0.16,
  waveType: 'square',
  filter: { type: 'lowpass', frequency: 1700 },
}

const spaceOdysseyBass: Melody = {
  name: 'Space Odyssey Bass',
  notes: [
    { note: 'E2', duration: 1200 },
    { note: 'E2', duration: 1200 },
    { note: 'G2', duration: 1200 },
    { note: 'B1', duration: 1200 },
  ],
  tempo: 1200,
  volume: 0.09,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 600 },
}

const forestWhispersLead: Melody = {
  name: 'Forest Whispers Lead',
  notes: [
    { note: 'C4', duration: 700 },
    { note: 'E4', duration: 700 },
    { note: 'G4', duration: 700 },
    { note: 'B4', duration: 900 },

    { note: 'A4', duration: 700 },
    { note: 'G4', duration: 700 },
    { note: 'E4', duration: 700 },
    { note: 'C4', duration: 900 },
  ],
  tempo: 700,
  volume: 0.15,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 1500 },
}

const forestWhispersBass: Melody = {
  name: 'Forest Whispers Bass',
  notes: [
    { note: 'C2', duration: 1400 },
    { note: 'C2', duration: 1400 },
    { note: 'E2', duration: 1400 },
    { note: 'G1', duration: 1400 },
  ],
  tempo: 1400,
  volume: 0.09,
  waveType: 'sine',
  filter: { type: 'lowpass', frequency: 500 },
}

const cyberPulseLead: Melody = {
  name: 'Cyber Pulse Lead',
  notes: [
    { note: 'F#4', duration: 500 },
    { note: 'A4', duration: 500 },
    { note: 'C#5', duration: 500 },
    { note: 'F#5', duration: 700 },

    { note: 'E5', duration: 500 },
    { note: 'C#5', duration: 500 },
    { note: 'A4', duration: 500 },
    { note: 'F#4', duration: 700 },
  ],
  tempo: 500,
  volume: 0.17,
  waveType: 'square',
  modulator: { type: 'triangle', frequency: 6, depth: 25, param: 'frequency' },
  filter: { type: 'highpass', frequency: 900 },
}

const cyberPulseBass: Melody = {
  name: 'Cyber Pulse Bass',
  notes: [
    { note: 'F#2', duration: 1000 },
    { note: 'F#2', duration: 1000 },
    { note: 'A1', duration: 1000 },
    { note: 'C#2', duration: 1000 },
  ],
  tempo: 1000,
  volume: 0.1,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 650 },
}

/* ─── Laser Lagoon ─────────────────────────────────────────────── */
const laserLagoonLead: Melody = {
  name: 'Laser Lagoon Lead',
  notes: [
    { note: 'G#4', duration: 480 },
    { note: 'B4', duration: 480 },
    { note: 'D#5', duration: 480 },
    { note: 'G#5', duration: 640 },

    { note: 'F#5', duration: 480 },
    { note: 'D#5', duration: 480 },
    { note: 'B4', duration: 480 },
    { note: 'G#4', duration: 640 },
  ],
  tempo: 480,
  volume: 0.16,
  waveType: 'sawtooth', // glossy FM-ish chip lead
  modulator: {
    type: 'sine',
    frequency: 5, // mild vibrato
    depth: 20,
    param: 'detune',
  },
  filter: { type: 'lowpass', frequency: 1900 },
}

const laserLagoonBass: Melody = {
  name: 'Laser Lagoon Bass',
  notes: [
    { note: 'G#2', duration: 960 },
    { note: 'G#2', duration: 960 },
    { note: 'B1', duration: 960 },
    { note: 'D#2', duration: 960 },
  ],
  tempo: 960, // half-time pulse vs. lead
  volume: 0.1,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 600 },
}

/* ─── Starfall Serenade ────────────────────────────────────────── */
const starfallSerenadeLead: Melody = {
  name: 'Starfall Serenade Lead',
  notes: [
    { note: 'C5', duration: 650 },
    { note: 'A4', duration: 650 },
    { note: 'F4', duration: 650 },
    { note: 'C4', duration: 850 },

    { note: 'D4', duration: 650 },
    { note: 'F4', duration: 650 },
    { note: 'A4', duration: 650 },
    { note: 'C5', duration: 850 },
  ],
  tempo: 650,
  volume: 0.14,
  waveType: 'triangle', // mellow, almost flute-like
  modulator: { type: 'sine', frequency: 3, depth: 15, param: 'frequency' },
  filter: { type: 'highpass', frequency: 900 }, // airy shimmer
}

const starfallSerenadeBass: Melody = {
  name: 'Starfall Serenade Bass',
  notes: [
    { note: 'C3', duration: 1300 },
    { note: 'C3', duration: 1300 },
    { note: 'F2', duration: 1300 },
    { note: 'A1', duration: 1300 },
  ],
  tempo: 1300,
  volume: 0.09,
  waveType: 'sine', // round sub-bass
  filter: { type: 'lowpass', frequency: 500 },
}

const typingLeadLoop: Melody = {
  name: 'Typing Lead Loop',
  notes: [
    { note: 'C5', duration: 80 },
    { note: 'C5', duration: 80 },
    { note: 'C5', duration: 80 },
    { note: 'C5', duration: 80 },
  ],
  tempo: 160, // 2 ticks per second (4 notes per cycle)
  volume: 0.08,
  waveType: 'square',
  modulator: { type: 'square', frequency: 10, depth: 12, param: 'detune' },
  filter: { type: 'bandpass', frequency: 1200 },
}

const typingBassLoop: Melody = {
  name: 'Typing Bass Loop',
  notes: [{ note: 'C2', duration: 320 }],
  tempo: 320, // one thump per second
  volume: 0.06,
  waveType: 'triangle',
  modulator: { type: 'sine', frequency: 2, depth: 8, param: 'frequency' },
  filter: { type: 'lowpass', frequency: 400 },
}

export const backgroundMelodies = {
  adventure: [eightBitAdventureLead, eightBitAdventureBass],
  chipQuest: [chipQuestLead, chipQuestBass],
  retroVoyage: [retroVoyageLead, retroVoyageBass],
  pixelDream: [pixelDreamLead, pixelDreamBass],
  spaceOdyssey: [spaceOdysseyLead, spaceOdysseyBass],
  forestWhispers: [forestWhispersLead, forestWhispersBass],
  cyberPulse: [cyberPulseLead, cyberPulseBass],
  laserLagoon: [laserLagoonLead, laserLagoonBass],
  starfallSerenade: [starfallSerenadeLead, starfallSerenadeBass],
  typing: [typingLeadLoop, typingBassLoop],
} as const
