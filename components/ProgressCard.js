'use client';

import { useEffect, useState } from 'react';

const TOTAL_STEPS = 6;

export default function ProgressCard() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('englishFreeProgress') || '[]');
    setCompleted(saved.length);
  }, []);

  const percent = Math.round((completed / TOTAL_STEPS) * 100);

  return (
    <div className="progressCard">
      <div className="progressTop">
        <div>
          <span className="eyebrow">TIẾN ĐỘ HÔM NAY</span>
          <h3>Unit 1: All Aboard!</h3>
        </div>
        <div className="streak">🔥 1 ngày</div>
      </div>

      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </div>

      <p>{completed}/{TOTAL_STEPS} phần đã hoàn thành · {percent}%</p>
    </div>
  );
}
