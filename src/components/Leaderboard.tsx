import React, { useEffect, useState } from 'react';
import { getLeaderboard, addScore } from '../services/database.ts';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {
  currentScore: number;
  gameOver: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore, gameOver }) => {
  const [scores, setScores] = useState<Array<{ name: string; score: number }>>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (gameOver && isHighScore(currentScore)) {
      setShowNameInput(true);
    }
  }, [gameOver, currentScore]);

  const loadLeaderboard = async () => {
    const leaderboardData = await getLeaderboard();
    setScores(leaderboardData);
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      await addScore(playerName, currentScore);
      setShowNameInput(false);
      loadLeaderboard();
    }
  };

  return (
    <div className={styles.leaderboard}>
      <h2>Leaderboard</h2>
      {showNameInput ? (
        <form onSubmit={handleSubmitScore}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
          />
          <button type="submit">Submit Score</button>
        </form>
      ) : (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              {score.name}: {score.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 