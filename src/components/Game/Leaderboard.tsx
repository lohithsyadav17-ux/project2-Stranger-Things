import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

const STORAGE_KEY = 'st_leaderboard';

const Leaderboard: React.FC<{ currentScore?: number; onRestart: () => void }> = ({ currentScore, onRestart }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || currentScore === undefined) return;

    const newEntry: LeaderboardEntry = {
      name: name.trim(),
      score: currentScore,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSubmitted(true);
  };

  return (
    <div className="leaderboard-container">
      <h2 className="title-glitch" data-text="TOP SURVIVORS">TOP SURVIVORS</h2>
      
      {currentScore !== undefined && !submitted && (
        <form onSubmit={handleSubmit} className="score-submission">
          <p>Your Score: {currentScore}</p>
          <input
            type="text"
            placeholder="ENTER NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={15}
            autoFocus
          />
          <button type="submit">SAVE SCORE</button>
        </form>
      )}

      <div className="leaderboard-list">
        {leaderboard.length === 0 ? (
          <p className="empty-msg">NO DATA FOUND IN THE UPSIDE DOWN</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={entry.score === currentScore && entry.name === name ? 'current-entry' : ''}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="restart-btn" onClick={onRestart}>PLAY AGAIN</button>

      <style>{`
        .leaderboard-container {
          background: rgba(10, 0, 0, 0.9);
          padding: 2rem;
          border: 2px solid #ff0000;
          color: #fff;
          text-align: center;
          font-family: 'Space Mono', monospace;
          max-width: 400px;
          margin: auto;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }

        .title-glitch {
          color: #ff0000;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px #550000;
        }

        .score-submission {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .score-submission input {
          background: #000;
          border: 1px solid #ff0000;
          color: #fff;
          padding: 0.5rem;
          text-align: center;
        }

        .score-submission button {
          background: #ff0000;
          color: #000;
          border: none;
          padding: 0.5rem;
          font-weight: bold;
          cursor: pointer;
        }

        .leaderboard-list table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .leaderboard-list th, .leaderboard-list td {
          padding: 0.5rem;
          border-bottom: 1px solid #333;
        }

        .leaderboard-list th {
          color: #ff0000;
        }

        .current-entry {
          color: #ffee00;
          background: rgba(255, 255, 0, 0.1);
        }

        .restart-btn {
          margin-top: 2rem;
          background: transparent;
          border: 1px solid #fff;
          color: #fff;
          padding: 0.5rem 2rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .restart-btn:hover {
          background: #fff;
          color: #000;
        }

        .empty-msg {
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
