import { logToNotion, logToGoogleSheets } from './logging';

export async function startCopyTrading() {
  try {
    const markets = ['ETH/USDT'];
    for (const pair of markets) {
      const { strategy } = await analyzeMarket(pair);
      if (strategy === 'buy') {
        const order = await placeOrder(pair, 'buy');
        await logToNotion('Ordre exécuté', JSON.stringify(order));
        await logToGoogleSheets({ pair, action: 'buy', ts: Date.now() });
      }
    }

    const usdtBalance = await getBalance('USDT');
    if (usdtBalance > 10) {
      const tx = await sendUSDT(usdtBalance, TRC20_ADDRESS);
      await logToNotion('Retrait TRC20', JSON.stringify(tx));
      await logToGoogleSheets({ action: 'withdraw', amount: usdtBalance, ts: Date.now() });
    }

    return { status: 'success', usdtSent: usdtBalance };
  } catch (err) {
    await logToNotion('Erreur bot', err.message);
    return { status: 'error', error: err.message };
  }
}
