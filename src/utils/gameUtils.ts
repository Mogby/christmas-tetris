import { Cell, Position, Tetromino } from '../types.ts';
import { BOARD_HEIGHT, BOARD_WIDTH, TETROMINOES } from '../constants.ts';

export const createEmptyBoard = (): Cell[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() =>
    Array(BOARD_WIDTH).fill(null).map(() => ({ filled: false, color: 'cyan' }))
  );
};

export const getRandomPiece = (): Tetromino => {
  const piece = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  return {
    shape: piece.shape,
    color: piece.color,
    position: {
      x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
      y: 0
    }
  };
};

export const rotateMatrix = (matrix: boolean[][]): boolean[][] => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array(cols).fill(null).map(() => Array(rows).fill(false));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c];
    }
  }

  return rotated;
};

export const canMove = (
  piece: Tetromino,
  movement: Position,
  board: Cell[][]
): boolean => {
  const newX = piece.position.x + movement.x;
  const newY = piece.position.y + movement.y;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;

        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX].filled)
        ) {
          return false;
        }
      }
    }
  }

  return true;
};

export const lockPiece = (
  piece: Tetromino,
  board: Cell[][]
): { newBoard: Cell[][], linesCleared: number } => {
  const newBoard = board.map(row => [...row]);
  
  // Place the piece
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = { filled: true, color: piece.color };
        }
      }
    }
  }

  // Check for completed lines
  let linesCleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (newBoard[y].every(cell => cell.filled)) {
      // Remove the line and add empty line at top
      newBoard.splice(y, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(null).map(() => 
        ({ filled: false, color: 'cyan' })
      ));
      linesCleared++;
    }
  }

  return { newBoard, linesCleared };
};

export const isGameOver = (piece: Tetromino, board: Cell[][]): boolean => {
  return !canMove(piece, { x: 0, y: 0 }, board);
}; 