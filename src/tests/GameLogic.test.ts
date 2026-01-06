import { describe, it, expect } from 'vitest';

// Simulating the sorting logic from Leaderboard.tsx
interface LeaderboardEntry {
    name: string;
    score: number;
}

const sortLeaderboard = (entries: LeaderboardEntry[]) => {
    return [...entries]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
};

describe('Game Leaderboard Logic', () => {
    it('should sort entries in descending order of score', () => {
        const data: LeaderboardEntry[] = [
            { name: 'Will', score: 100 },
            { name: 'Eleven', score: 500 },
            { name: 'Mike', score: 200 }
        ];

        const sorted = sortLeaderboard(data);
        expect(sorted[0].name).toBe('Eleven');
        expect(sorted[1].name).toBe('Mike');
        expect(sorted[2].name).toBe('Will');
    });

    it('should limit the leaderboard to top 10 entries', () => {
        const data: LeaderboardEntry[] = Array.from({ length: 15 }, (_, i) => ({
            name: `Player ${i}`,
            score: i * 10
        }));

        const sorted = sortLeaderboard(data);
        expect(sorted.length).toBe(10);
        expect(sorted[0].score).toBe(140); // Max score from i=14
    });
});
