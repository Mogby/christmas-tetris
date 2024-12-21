import React from 'react';
import { Cell } from '../types';
import styles from './Board.module.css';

interface BoardProps {
  board: Cell[][];
}

export const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className={styles.board}>
      {board.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div 
              key={`${x}-${y}`} 
              className={`${styles.cell} ${cell ? styles[`color-${cell.color}`] : ''}`} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}; 