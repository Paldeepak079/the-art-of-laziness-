import * as Tone from 'tone';
import { AudioError } from '../../utils/errors';

export class AudioService {
  private static instance: AudioService;
  private synth: Tone.PolySynth;
  private isInitialized = false;
  private isPlaying = false;
  private volume = 0.5;

  private constructor() {
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.05,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
  }

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await Tone.start();
      this.isInitialized = true;
      console.log('Audio initialized successfully');
    } catch (error) {
      throw new AudioError('Failed to initialize audio');
    }
  }

  async start(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }
      this.isPlaying = true;
      await Tone.Transport.start();
      console.log('Audio started');
    } catch (error) {
      throw new AudioError('Failed to start audio');
    }
  }

  stop(): void {
    this.isPlaying = false;
    this.synth.releaseAll();
    Tone.Transport.stop();
    console.log('Audio stopped');
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    const dbVolume = Tone.gainToDb(this.volume);
    this.synth.volume.rampTo(dbVolume, 0.1);
  }

  playNote(note: string): void {
    if (!this.isPlaying) return;
    this.synth.triggerAttackRelease(note, '8n');
    console.log(`Playing note: ${note}`);
  }

  isActive(): boolean {
    return this.isPlaying;
  }
}

export const audioService = AudioService.getInstance();