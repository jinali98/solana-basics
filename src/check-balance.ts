import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function getBalance(key: string) {
  const publicKey = new PublicKey(key);
  console.log(`🔍 Checking balance for the wallet at address ${publicKey}`);
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
  console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
  );
}

getBalance("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
