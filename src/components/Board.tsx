import React from 'react';
import { Cell, Tetromino } from '../types';
import styles from './Board.module.css';

interface BoardProps {
  board: Cell[][];
  currentPiece: Tetromino;
}

export const Board: React.FC<BoardProps> = ({ board, currentPiece }) => {
  // Create a merged board that includes both locked pieces and current piece
  const getMergedBoard = () => {
    const mergedBoard = board.map(row => [...row]);
    
    // Add current piece to the board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
            mergedBoard[boardY][boardX] = {
              filled: true,
              color: currentPiece.color
            };
          }
        }
      }
    }
    
    return mergedBoard;
  };

  const mergedBoard = getMergedBoard();

  return (
    <div className={styles.board}>
      {mergedBoard.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div 
              key={`${x}-${y}`} 
              className={`${styles.cell} ${cell.filled ? styles[`color-${cell.color}`] : ''}`} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}; 