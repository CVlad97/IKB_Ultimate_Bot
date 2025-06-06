import { startCopyTrading } from '@/lib/mexcBot';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const result = await startCopyTrading();
  res.status(200).json(result);
}
