// audio.js — tiny synthesised sounds, no audio files. Everything is made with
// the Web Audio API on the first user gesture, so the game stays silent until
// the player interacts, and the mute toggle silences it for good.
let audioCtx = null;
let muted = false;

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

function ctx() {
  if (audioCtx === null) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') void audioCtx.resume();
  return audioCtx;
}

/** One short oscillator note with a quick fade. */
function note(freq, startAt, dur, type, gain) {
  const ac = ctx();
  if (ac === null || muted) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0.0001, ac.currentTime + startAt);
  amp.gain.exponentialRampToValueAtTime(gain, ac.currentTime + startAt + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + startAt + dur);
  osc.connect(amp);
  amp.connect(ac.destination);
  osc.start(ac.currentTime + startAt);
  osc.stop(ac.currentTime + startAt + dur + 0.05);
}

/** Two-note chime when a difference is found. */
export function playFound() {
  note(660, 0, 0.16, 'sine', 0.22);
  note(990, 0.09, 0.26, 'sine', 0.22);
}

/** A low buzz for a wrong click. */
export function playMiss() {
  note(160, 0, 0.22, 'square', 0.08);
}

/** A soft ping when a hint is spent. */
export function playHint() {
  note(520, 0, 0.12, 'triangle', 0.16);
  note(780, 0.08, 0.14, 'triangle', 0.14);
}

/** A rising arpeggio when a scene is completed. */
export function playWin() {
  const scale = [523, 659, 784, 1047];
  scale.forEach((freq, i) => note(freq, i * 0.11, 0.3, 'sine', 0.2));
}
