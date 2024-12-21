import React from 'react';
import { Board } from './components/Board.tsx';
import { Controls } from './components/Controls.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { useGame } from './hooks/useGame.ts';
import styles from './App.module.css';

const App: React.FC = () => {
  const {
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
  } = useGame();

  const handleScoreSubmitted = () => {
    startGame(); // This will reset the game
  };

  // Prevent spacebar from triggering button click
  const handleButtonClick = (e: React.MouseEvent) => {
    e.currentTarget.blur(); // Remove focus from button after click
    if (isPaused) {
      startGame();
    } else {
      pauseGame();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <div className={styles.leftPanel}>
          <div className={styles.info}>
            <h2>Score: {score}</h2>
            <button 
              onClick={handleButtonClick}
              onKeyDown={e => e.key === ' ' && e.preventDefault()}
            >
              {isPaused ? 'Start' : 'Pause'}
            </button>
          </div>
          <div className={styles.help}>
            <h3>Controls:</h3>
            <p>Desktop: Arrow keys or A/S/D to move, Spacebar to rotate</p>
            <p>Mobile: Swipe to move, Tap to rotate</p>
          </div>
        </div>

        <Board board={board} currentPiece={currentPiece} />
        <Controls
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
          onDrop={drop}
          onRotate={rotate}
        />

        <div className={styles.rightPanel}>
          <Leaderboard 
            currentScore={score} 
            gameOver={gameOver}
            onScoreSubmitted={handleScoreSubmitted}
          />
        </div>
      </div>
    </div>
  );
};

export default App; 