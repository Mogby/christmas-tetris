export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  filled: boolean;
  color: TetrominoColor;
}

export type TetrominoColor = 'cyan' | 'blue' | 'orange' | 'yellow' | 'green' | 'purple' | 'red';

export interface Tetromino {
  shape: boolean[][];
  color: TetrominoColor;
  position: Position;
}

export type GameState = 'playing' | 'paused' | 'gameOver'; 