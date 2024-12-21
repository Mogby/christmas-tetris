import React, { useEffect, useState } from 'react';
import { getLeaderboard, addScore } from '../services/database.ts';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {
  currentScore: number;
  gameOver: boolean;
  onScoreSubmitted: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore, gameOver, onScoreSubmitted }) => {
  const [scores, setScores] = useState<Array<{ name: string; score: number }>>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const isHighScore = (score: number): boolean => {
    if (scores.length < 10) return true;
    const lowestScore = scores[scores.length - 1]?.score ?? 0;
    return score > lowestScore;
  };

  useEffect(() => {
    if (gameOver && isHighScore(currentScore)) {
      setShowNameInput(true);
    } else {
      setShowNameInput(false);
    }
  }, [gameOver, currentScore, scores]);

  const loadLeaderboard = async () => {
    const leaderboardData = await getLeaderboard();
    setScores(leaderboardData);
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        setShowNameInput(false);
        await addScore(playerName.trim(), currentScore);
        setPlayerName('');
        await loadLeaderboard();
        onScoreSubmitted();
      } catch (error) {
        console.error('Failed to submit score:', error);
        setShowNameInput(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.leaderboard}>
      <h2>Leaderboard</h2>
      {showNameInput ? (
        <form onSubmit={handleSubmitScore} className={styles.form}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            className={styles.input}
            disabled={isSubmitting}
            autoFocus
          />
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!playerName.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Score'}
          </button>
        </form>
      ) : (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              <span>{score.name}</span>
              <span>{score.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 