import type { HandLandmarks, HandGesture } from '../../types';
import { LANDMARK_INDICES } from './constants';

export const analyzeHandPosition = (landmarks: HandLandmarks[]): HandGesture['position'] & { isRaised: boolean } => {
  const wristY = landmarks[LANDMARK_INDICES.WRIST].y;
  const palmY = (
    landmarks[LANDMARK_INDICES.PALM_BASE_LEFT].y +
    landmarks[LANDMARK_INDICES.PALM_BASE_RIGHT].y
  ) / 2;

  return {
    isRaised: wristY > palmY,
    x: landmarks[LANDMARK_INDICES.WRIST].x,
    y: landmarks[LANDMARK_INDICES.WRIST].y
  };
};

export const analyzeFingerStates = (landmarks: HandLandmarks[]) => ({
  thumb: landmarks[LANDMARK_INDICES.THUMB_TIP].y < landmarks[LANDMARK_INDICES.THUMB_BASE].y,
  index: landmarks[LANDMARK_INDICES.INDEX_TIP].y < landmarks[LANDMARK_INDICES.INDEX_BASE].y,
  middle: landmarks[LANDMARK_INDICES.MIDDLE_TIP].y < landmarks[LANDMARK_INDICES.MIDDLE_BASE].y,
  ring: landmarks[LANDMARK_INDICES.RING_TIP].y < landmarks[LANDMARK_INDICES.RING_BASE].y,
  pinky: landmarks[LANDMARK_INDICES.PINKY_TIP].y < landmarks[LANDMARK_INDICES.PINKY_BASE].y
});

export const isHandClosed = (fingerStates: Record<string, boolean>): boolean => {
  return !Object.values(fingerStates).some(isExtended => isExtended);
};