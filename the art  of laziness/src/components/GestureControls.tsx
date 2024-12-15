import React from 'react';
import { Music, HandMetal } from 'lucide-react';
import { useAudioStore } from '../store/useAudioStore';

export const GestureControls: React.FC = () => {
  const { isPlaying, volume } = useAudioStore();

  return (
    <div className="mt-8 max-w-md mx-auto bg-white/10 rounded-lg p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <span className={`font-medium ${isPlaying ? 'text-green-400' : 'text-red-400'}`}>
            {isPlaying ? 'Playing' : 'Paused'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Volume:</span>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};