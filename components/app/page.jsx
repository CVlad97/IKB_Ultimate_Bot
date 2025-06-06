import TronWeb from 'tronweb';

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  privateKey: process.env.TRON_PRIVATE_KEY
});

export async function getBalance(symbol) {
  if (symbol === 'USDT') return 50; // Simulation (à relier à l’API réelle ensuite)
  return 0;
}

export async function sendUSDT(amount, address) {
  try {
    const tx = await tronWeb.trx.sendToken(address, amount * 1_000_000, '1002000');
    console.log("✅ Transfert TRC20 réussi :", tx);
    return tx;
  } catch (err) {
    console.error("❌ Échec TRC20 :", err.message);
    throw err;
  }
}
