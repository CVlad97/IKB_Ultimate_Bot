'use client';
import { useState } from 'react';

export default function ChatAssistant() {
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState([]);

  const askGPT = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setHistory([...history, { user: msg, reply: data.reply }]);
    setMsg('');
  };

  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-xl font-bold mb-2">🤖 Assistant IA</h2>
      <input
        className="border p-2 w-full"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Pose ta question..."
      />
      <button onClick={askGPT} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Envoyer
      </button>
      <ul className="mt-4 space-y-2">
        {history.map((item, idx) => (
          <li key={idx} className="text-sm">
            <strong>🧍‍♂️</strong> {item.user}<br />
            <strong>🤖</strong> {item.reply}
          </li>
        ))}
      </ul>
    </div>
  );
}
