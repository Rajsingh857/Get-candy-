// Procedural Web Audio API sound effects & low-volume spooky background music
// Everything can be muted with one icon.

class SpookySoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private bgmInterval: number | null = null;
  private bgmPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    if (mute) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // 1. Door Knock (3 wooden raps)
  public playDoorKnock(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const times = [0, 0.22, 0.44];
    times.forEach((offset, idx) => {
      const now = ctx.currentTime + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const baseFreq = idx === 2 ? 125 : 112;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.09);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    });
  }

  // 2. Creaky Door Open (slow frequency-modulated sawtooth creak)
  public playCreakyDoor(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const mainGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.45);
    osc.frequency.linearRampToValueAtTime(240, now + 0.85);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(18, now);
    lfoGain.gain.setValueAtTime(28, now);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    mainGain.gain.setValueAtTime(0.01, now);
    mainGain.gain.linearRampToValueAtTime(0.14, now + 0.15);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(mainGain);
    mainGain.connect(ctx.destination);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + 0.92);
    lfo.stop(now + 0.92);
  }

  // 3. Witch Cackle for Wrong Answer (staccato descending cackle notes)
  public playWitchCackle(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const pitches = [680, 620, 560, 510, 440, 370];
    pitches.forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.085;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.78, start + 0.07);

      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.005, start + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.08);
    });
  }

  // 4. Cheer / Fanfare for Right Answer
  public playCheer(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const start = ctx.currentTime + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.24, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.26);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.28);
    });
  }

  // 5. Candy "Ding" (bright crystal chime when candy drops in tray)
  public playCandyDing(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [1174.66, 1567.98]; // D6 -> G6 sparkle ding
    freqs.forEach((freq, idx) => {
      const t = now + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.46);
    });
  }

  // 6. Lock-Unlock Click
  public playLockUnlock(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [320, 580].forEach((freq, idx) => {
      const t = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    });
  }

  // 7. Black Cat Meow / Hint Chime
  public playCatHint(): void {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(860, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.36);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // 8. Low-volume spooky music box background loop
  public startBackgroundMusic(): void {
    if (this.muted || this.bgmPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.bgmPlaying = true;
    // Play a gentle, spooky-cute Danny-Elfman-esque music box arpeggio in A harmonic minor
    const melody = [
      220.0, 261.63, 329.63, 311.13, 329.63, 261.63, 246.94, 196.0,
    ];
    let step = 0;

    const playNote = () => {
      if (this.muted || !this.bgmPlaying) return;
      const audioCtx = this.getContext();
      if (!audioCtx || audioCtx.state !== 'running') return;

      const freq = melody[step % melody.length];
      step++;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Very low volume so it never overwhelms sound effects or party chatter
      gain.gain.setValueAtTime(0.032, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.55);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    };

    playNote();
    this.bgmInterval = window.setInterval(playNote, 620);
  }

  public stopBackgroundMusic(): void {
    this.bgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const spookySound = new SpookySoundEngine();
