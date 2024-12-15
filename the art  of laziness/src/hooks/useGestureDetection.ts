import { useState, useCallback, useRef } from 'react';
import { detectHandGesture } from '../utils/gestureProcessing/handDetection';
import type { HandGesture } from '../types';

export const useGestureDetection = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [gesture, setGesture] = useState<HandGesture | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const processingRef = useRef(false);

  const processFrame = useCallback(async () => {
    if (!videoRef.current || processingRef.current || !videoRef.current.readyState) {
      return;
    }
    
    processingRef.current = true;
    try {
      const result = await detectHandGesture(videoRef.current);
      
      if (result.error) {
        setError(result.error);
        setGesture(null);
      } else {
        setError(null);
        setGesture(result.gesture);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Detection failed'));
      setGesture(null);
    } finally {
      processingRef.current = false;
    }
  }, [videoRef]);

  return {
    gesture,
    error,
    processFrame
  };
};