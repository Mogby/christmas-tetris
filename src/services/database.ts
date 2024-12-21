type Score = {
  name: string;
  score: number;
};

const STORAGE_KEY = 'tetris-scores';

export const getLeaderboard = (): Score[] => {
  const scores = localStorage.getItem(STORAGE_KEY);
  return scores ? JSON.parse(scores) : [];
};

export const addScore = (name: string, score: number): void => {
  const scores = getLeaderboard();
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
}; 