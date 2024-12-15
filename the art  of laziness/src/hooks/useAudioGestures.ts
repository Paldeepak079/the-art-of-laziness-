import { useEffect } from 'react';
import { HandGesture } from '../types';
import { audioService } from '../services/audio/AudioService';
import { FINGER_TO_NOTE_MAP } from '../utils/audio/constants';

export const useAudioGestures = (gesture: HandGesture | null) => {
  useEffect(() => {
    const processGesture = async () => {
      if (!gesture) return;

      try {
        // Handle hand raise/close
        if (gesture.isRaised && !audioService.isActive()) {
          await audioService.start();
        } else if (gesture.isClosed && audioService.isActive()) {
          audioService.stop();
          return;
        }

        // Update volume based on hand position
        if (audioService.isActive()) {
          const normalizedVolume = 1 - gesture.position.y;
          audioService.setVolume(normalizedVolume);

          // Play notes for extended fingers
          Object.entries(gesture.fingers).forEach(([finger, isExtended]) => {
            if (isExtended) {
              const note = FINGER_TO_NOTE_MAP[finger as keyof typeof FINGER_TO_NOTE_MAP];
              audioService.playNote(note);
            }
          });
        }
      } catch (error) {
        console.error('Error processing audio gesture:', error);
      }
    };

    processGesture();
  }, [gesture]);
};