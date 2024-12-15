import { HandGesture } from '../../types';

export const validateGesture = (gesture: HandGesture | null): boolean => {
  if (!gesture) return false;

  return (
    typeof gesture.isRaised === 'boolean' &&
    typeof gesture.isClosed === 'boolean' &&
    typeof gesture.position?.x === 'number' &&
    typeof gesture.position?.y === 'number' &&
    typeof gesture.fingers === 'object' &&
    Object.keys(gesture.fingers).length === 5 &&
    Object.values(gesture.fingers).every(value => typeof value === 'boolean')
  );
};