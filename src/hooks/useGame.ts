import { useState, useEffect, useCallback } from 'react';
import { Cell, Tetromino } from '../types.ts';
import { BOARD_HEIGHT, BOARD_WIDTH, POINTS_PER_LINE, TICK_SPEED_MS } from '../constants.ts';
import { 
  createEmptyBoard, 
  getRandomPiece, 
  rotateMatrix, 
  canMove, 
  lockPiece, 
  isGameOver 
} from '../utils/gameUtils.ts';

export const useGame = () => {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Tetromino>(getRandomPiece());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const moveLeft = useCallback(() => {
    if (!isPaused && !gameOver && canMove(currentPiece, { x: -1, y: 0 }, board)) {
      setCurrentPiece(prev => ({
        ...prev,
        position: { x: prev.position.x - 1, y: prev.position.y }
      }));
    }
  }, [currentPiece, board, isPaused, gameOver]);

  const moveRight = useCallback(() => {
    if (!isPaused && !gameOver && canMove(currentPiece, { x: 1, y: 0 }, board)) {
      setCurrentPiece(prev => ({
        ...prev,
        position: { x: prev.position.x + 1, y: prev.position.y }
      }));
    }
  }, [currentPiece, board, isPaused, gameOver]);

  const rotate = useCallback(() => {
    if (!isPaused && !gameOver) {
      const rotated = rotateMatrix(currentPiece.shape);
      if (canMove({ ...currentPiece, shape: rotated }, { x: 0, y: 0 }, board)) {
        setCurrentPiece(prev => ({
          ...prev,
          shape: rotated
        }));
      }
    }
  }, [currentPiece, board, isPaused, gameOver]);

  const drop = useCallback(() => {
    if (!isPaused && !gameOver) {
      if (canMove(currentPiece, { x: 0, y: 1 }, board)) {
        setCurrentPiece(prev => ({
          ...prev,
          position: { x: prev.position.x, y: prev.position.y + 1 }
        }));
      } else {
        const { newBoard, linesCleared } = lockPiece(currentPiece, board);
        setBoard(newBoard);
        setScore(prev => prev + (linesCleared * POINTS_PER_LINE));
        
        const newPiece = getRandomPiece();
        if (isGameOver(newPiece, newBoard)) {
          setGameOver(true);
        } else {
          setCurrentPiece(newPiece);
        }
      }
    }
  }, [currentPiece, board, isPaused, gameOver]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Game tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused && !gameOver) {
      interval = setInterval(drop, TICK_SPEED_MS);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [drop, isPaused, gameOver]);

  return {
    board,
    currentPiece,
    score,
    gameOver,
    isPaused,
    moveLeft,
    moveRight,
    rotate,
    drop,
    startGame,
    pauseGame
  };
}; 