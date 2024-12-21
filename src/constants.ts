import { TetrominoColor } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const TICK_SPEED_MS = 1000;
export const POINTS_PER_LINE = 100;

interface TetrominoConfig {
  shape: boolean[][];
  color: TetrominoColor;
}

export const TETROMINOES: TetrominoConfig[] = [
  {
    // I piece
    shape: [
      [true, true, true, true]
    ],
    color: 'cyan'
  },
  {
    // J piece
    shape: [
      [true, false, false],
      [true, true, true]
    ],
    color: 'blue'
  },
  {
    // L piece
    shape: [
      [false, false, true],
      [true, true, true]
    ],
    color: 'orange'
  },
  {
    // O piece
    shape: [
      [true, true],
      [true, true]
    ],
    color: 'yellow'
  },
  {
    // S piece
    shape: [
      [false, true, true],
      [true, true, false]
    ],
    color: 'green'
  },
  {
    // T piece
    shape: [
      [false, true, false],
      [true, true, true]
    ],
    color: 'purple'
  },
  {
    // Z piece
    shape: [
      [true, true, false],
      [false, true, true]
    ],
    color: 'red'
  }
]; 