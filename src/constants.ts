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
    // I piece - Ice Blue
    shape: [
      [true, true, true, true]
    ],
    color: 'ice'
  },
  {
    // J piece - Dark Green (Christmas Tree)
    shape: [
      [true, false, false],
      [true, true, true]
    ],
    color: 'pine'
  },
  {
    // L piece - Gold
    shape: [
      [false, false, true],
      [true, true, true]
    ],
    color: 'gold'
  },
  {
    // O piece - Red (Christmas Ball)
    shape: [
      [true, true],
      [true, true]
    ],
    color: 'berry'
  },
  {
    // S piece - Silver
    shape: [
      [false, true, true],
      [true, true, false]
    ],
    color: 'silver'
  },
  {
    // T piece - White (Snow)
    shape: [
      [false, true, false],
      [true, true, true]
    ],
    color: 'snow'
  },
  {
    // Z piece - Red (Candy Cane)
    shape: [
      [true, true, false],
      [false, true, true]
    ],
    color: 'candy'
  }
]; 