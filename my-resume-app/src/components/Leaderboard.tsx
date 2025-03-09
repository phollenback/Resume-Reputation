"use client";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  clerkUserId: string;
  totalPoints: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-primary">Leaderboard</h2>
      <div className="space-y-4">
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <div key={entry.clerkUserId} className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">#{index + 1}</span>
                <span className="text-muted-foreground">{entry.clerkUserId}</span>
              </div>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
                {entry.totalPoints} pts
              </span>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">No leaderboard data available</div>
        )}
      </div>
    </div>
  );
} 