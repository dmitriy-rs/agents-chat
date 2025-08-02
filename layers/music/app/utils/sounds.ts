const retroClick: Melody = {
  name: 'Retro Click',
  notes: [
    { note: 'C6', duration: 60 },
    { note: 'E6', duration: 40 },
  ],
  tempo: 60,
  volume: 0.18,
  waveType: 'square',
  filter: { type: 'lowpass', frequency: 2200 },
}

const retroConfirm: Melody = {
  name: 'Retro Confirm',
  notes: [
    { note: 'G5', duration: 80 },
    { note: 'C6', duration: 120 },
  ],
  tempo: 100,
  volume: 0.18,
  waveType: 'triangle',
  modulator: {
    type: 'sine',
    frequency: 6,
    depth: 20,
    param: 'frequency',
  },
}

const retroError: Melody = {
  name: 'Retro Error',
  notes: [
    { note: 'E4', duration: 120 },
    { note: 'Eb4', duration: 140 },
    { note: 'D4', duration: 160 },
  ],
  tempo: 140,
  volume: 0.22,
  waveType: 'sawtooth',
  filter: { type: 'lowpass', frequency: 1600 },
}

export const win3xBeep: Melody = {
  name: 'Win3.x Beep',
  notes: [{ note: 'A5', duration: 120 }],
  tempo: 120,
  volume: 0.22,
  waveType: 'square',
}

export const win95Startup: Melody = {
  name: 'Win95 Startup',
  notes: [
    { note: 'C4', duration: 250 },
    { note: 'E4', duration: 250 },
    { note: 'G4', duration: 600 },
  ],
  tempo: 250,
  volume: 0.2,
  waveType: 'triangle',
  modulator: { type: 'triangle', frequency: 4, depth: 25, param: 'frequency' },
}

export const macQuadraStart: Melody = {
  name: 'Mac Quadra Start',
  notes: [
    { note: 'C3', duration: 400 },
    { note: 'E3', duration: 400 },
    { note: 'G3', duration: 400 },
    { note: 'B3', duration: 650 },
  ],
  tempo: 400,
  volume: 0.23,
  waveType: 'sawtooth',
  filter: { type: 'lowpass', frequency: 1800 },
}

export const macAlertChime: Melody = {
  name: 'Mac Alert',
  notes: [
    { note: 'C6', duration: 80 },
    { note: 'E6', duration: 80 },
    { note: 'C6', duration: 120 },
  ],
  tempo: 80,
  volume: 0.18,
  waveType: 'square',
  filter: { type: 'highpass', frequency: 1000 },
}

export const macTrash: Melody = {
  name: 'Mac Trash',
  notes: [
    { note: 'F5', duration: 60 },
    { note: 'Eb5', duration: 60 },
    { note: 'D5', duration: 60 },
    { note: 'C5', duration: 120 },
  ],
  tempo: 60,
  volume: 0.19,
  waveType: 'triangle',
}

/** Pixel pop‑up – tiny bubble burst for tooltips or notifications */
export const pixelPop: Melody = {
  name: 'Pixel Pop',
  notes: [
    { note: 'C6', duration: 40 },
    { note: 'G6', duration: 30 },
    { note: 'C7', duration: 90 },
  ],
  tempo: 40,
  volume: 0.17,
  waveType: 'square',
  modulator: { type: 'sine', frequency: 8, depth: 10, param: 'frequency' },
  filter: { type: 'highpass', frequency: 1500 },
}

/** Glitch swoosh – sweep with detune for toggling dark/light mode */
export const glitchSweep: Melody = {
  name: 'Glitch Sweep',
  notes: [
    { note: 'A4', duration: 80 },
    { note: 'C5', duration: 100 },
    { note: 'E5', duration: 120 },
  ],
  tempo: 80,
  volume: 0.2,
  waveType: 'sawtooth',
  modulator: { type: 'square', frequency: 14, depth: 30, param: 'detune' },
  filter: { type: 'bandpass', frequency: 1200 },
}

/** Laser chirp – for sending data / sharing */
export const laserChirp: Melody = {
  name: 'Laser Chirp',
  notes: [
    { note: 'E6', duration: 50 },
    { note: 'B6', duration: 50 },
    { note: 'G7', duration: 140 },
  ],
  tempo: 50,
  volume: 0.19,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 2400 },
}

/** Floppy save – crunchy detuned buzz (save action) */
export const floppySave: Melody = {
  name: 'Floppy Save',
  notes: [
    { note: 'F4', duration: 70 },
    { note: 'A4', duration: 70 },
    { note: 'C5', duration: 160 },
  ],
  tempo: 70,
  volume: 0.21,
  waveType: 'square',
  modulator: { type: 'triangle', frequency: 3, depth: 18, param: 'frequency' },
}

/** Modal open – airy upward arpeggio */
export const modalOpen: Melody = {
  name: 'Modal Open',
  notes: [
    { note: 'D5', duration: 60 },
    { note: 'G5', duration: 60 },
    { note: 'B5', duration: 60 },
    { note: 'D6', duration: 140 },
  ],
  tempo: 60,
  volume: 0.16,
  waveType: 'triangle',
  filter: { type: 'lowpass', frequency: 2000 },
}

export const msgSend: Melody = {
  name: 'Message Send',
  notes: [
    { note: 'G5', duration: 60 },
    { note: 'C6', duration: 100 },
  ],
  tempo: 60,
  volume: 0.18,
  waveType: 'triangle',
  modulator: { type: 'sine', frequency: 5, depth: 12, param: 'frequency' },
}

export const msgReceive: Melody = {
  name: 'Message Receive',
  notes: [
    { note: 'E5', duration: 90 },
    { note: 'C5', duration: 110 },
  ],
  tempo: 90,
  volume: 0.16,
  waveType: 'square',
  filter: { type: 'highpass', frequency: 800 },
}

export const soundEffects = {
  retroClick,
  retroConfirm,
  retroError,
  macAlertChime,
  macQuadraStart,
  macTrash,
  win3xBeep,
  win95Startup,
  pixelPop,
  glitchSweep,
  laserChirp,
  floppySave,
  modalOpen,
  msgSend,
  msgReceive,
} as const
