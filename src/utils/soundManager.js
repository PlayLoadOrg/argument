// Sound manager for ARGUMENT game
// Handles all audio playback with volume control and muting

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = this.loadSoundPreference();
    this.volume = 0.3; // Default volume (30%)
  }

  // Load sound preference from localStorage
  loadSoundPreference() {
    const saved = localStorage.getItem('argument_sound_enabled');
    return saved === null ? true : saved === 'true';
  }

  // Save sound preference to localStorage
  saveSoundPreference(enabled) {
    this.enabled = enabled;
    localStorage.setItem('argument_sound_enabled', enabled.toString());
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    this.saveSoundPreference(this.enabled);
    return this.enabled;
  }

  // Preload a sound
  load(name, path) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    audio.volume = this.volume;
    this.sounds[name] = audio;
  }

  // Play a sound
  play(name) {
    if (!this.enabled) return;
    
    const sound = this.sounds[name];
    if (sound) {
      // Clone the audio to allow overlapping sounds
      const audioClone = sound.cloneNode();
      audioClone.volume = this.volume;
      audioClone.play().catch(err => {
        console.warn(`Could not play sound ${name}:`, err);
      });
    }
  }

  // For simple beep sounds, we can generate them programmatically
  // This avoids needing actual audio files for the prototype
  playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, 0.1, 'sine'); // C5 note, short duration
  }

  playIncorrect() {
    if (!this.enabled) return;
    this.playTone(220, 0.15, 'sine'); // A3 note, slightly longer
  }

  playPageTurn() {
    if (!this.enabled) return;
    this.playTone(440, 0.05, 'sine'); // A4 note, very short
  }

  playTone(frequency, duration, type = 'sine') {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(this.volume * 0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }
}

// Export singleton instance
export const soundManager = new SoundManager();