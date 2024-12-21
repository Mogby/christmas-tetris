export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  filled: boolean;
  color: TetrominoColor;
}

export type TetrominoColor = 'ice' | 'pine' | 'gold' | 'berry' | 'silver' | 'snow' | 'candy';

export interface Tetromino {
  shape: boolean[][];
  color: TetrominoColor;
  position: Position;
}

export type GameState = 'playing' | 'paused' | 'gameOver'; 