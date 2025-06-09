import { fetchReminderStats } from "../apis/reminderdata";
import { useEffect, useState } from "react";
import "../css/ScoreWidget.css"

const ScoreWidget = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchReminderStats(userId);
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    if (userId) loadStats();
  }, [userId]);

  if (!stats) return <p>📊 Loading your stats...</p>;

  const { total, remembered, forgotten } = stats;
  const rememberedPct = total ? ((remembered / total) * 100).toFixed(0) : 0;

  return (
    <div className="score-widget">
      <h3>📈 Your Reminder Stats</h3>

      <div className="score-bar">
        <div className="remembered" style={{ width: `${rememberedPct}%` }} />
      </div>

      <p>
        ✅ <strong>{remembered}</strong> remembered out of <strong>{total}</strong> —{" "}
        <strong>{rememberedPct}%</strong>
      </p>
      <p>❌ <strong>{forgotten}</strong> forgotten</p>
    </div>
  );
};

export default ScoreWidget;