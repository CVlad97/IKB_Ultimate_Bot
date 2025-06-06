'use client';
import { useState } from 'react';

export default function TriggerButton() {
  const [msg, setMsg] = useState('');

  const launchTrade = async () => {
    setMsg('🚀 Lancement en cours...');
    const res = await fetch('/api/trade', { method: 'POST' });
    const data = await res.json();
    setMsg(JSON.stringify(data));
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <button
        onClick={launchTrade}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Lancer le Bot MEXC (40 €)
      </button>
      <pre className="mt-4 text-sm text-gray-700">{msg}</pre>
    </div>
  );
}
