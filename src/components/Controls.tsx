import React, { useEffect } from 'react';
import Hammer from 'hammerjs';

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDrop: () => void;
  onRotate: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onDrop,
  onRotate
}) => {
  useEffect(() => {
    // Desktop controls
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          onMoveLeft();
          break;
        case 'ArrowRight':
        case 'd':
          onMoveRight();
          break;
        case 'ArrowDown':
        case 's':
          onDrop();
          break;
        case ' ':
          onRotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Mobile controls
    const hammer = new Hammer(document.body);
    
    hammer.on('swipeleft', onMoveLeft);
    hammer.on('swiperight', onMoveRight);
    hammer.on('swipedown', onDrop);
    hammer.on('tap', onRotate);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      hammer.destroy();
    };
  }, [onMoveLeft, onMoveRight, onDrop, onRotate]);

  return null;
}; 