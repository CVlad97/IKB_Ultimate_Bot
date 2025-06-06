'use client';
import { useState } from 'react';

export default function GameTapToEarn({ onEarn }) {
  const [score, setScore] = useState(0);

  const tap = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore % 10 === 0) {
      onEarn(0.01); // Simule un gain toutes les 10 pressions
    }
  };

  return (
    <div className="p-4 bg-black text-white rounded-xl shadow-md text-center">
      <h2 className="text-xl mb-2">💰 Jeu Tap-to-Earn</h2>
      <p className="text-4xl font-bold">{score}</p>
      <button
        onClick={tap}
        className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-lg"
      >
        TAP
      </button>
    </div>
  );
}
