import { gestureService } from '../../services/gesture/GestureService';
import { analyzeHandPosition, analyzeFingerStates, isHandClosed } from './handAnalysis';
import { validateLandmarks } from './validation';
import type { GestureDetectionResult } from '../../types';

export const detectHandGesture = async (
  video: HTMLVideoElement
): Promise<GestureDetectionResult> => {
  if (!video.readyState) {
    return { gesture: null, error: null };
  }

  try {
    const landmarks = await gestureService.detectHand(video);

    if (!landmarks || !validateLandmarks(landmarks)) {
      return { gesture: null, error: null };
    }

    const position = analyzeHandPosition(landmarks);
    const fingerStates = analyzeFingerStates(landmarks);

    return {
      gesture: {
        isRaised: position.isRaised,
        isClosed: isHandClosed(fingerStates),
        position: { x: position.x, y: position.y },
        fingers: fingerStates
      },
      error: null
    };
  } catch (error) {
    console.error('Hand detection error:', error);
    return {
      gesture: null,
      error: error instanceof Error ? error : new Error('Hand detection failed')
    };
  }
};