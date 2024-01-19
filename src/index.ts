require("dotenv").config({ path: "./.env" });

import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

import {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import base58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
console.log(`✅ Connected!`);

const generateKeyPair = () => {
  const keypair = Keypair.generate();
  console.log(`The public key is: `, keypair.publicKey.toBase58());
  //   console.log(`The secret key is: format 1`, keypair.secretKey);
  console.log(`The secret key is: format 2 `, base58.encode(keypair.secretKey));
};

const getKeypairFromENV = () => {
  const keypair = getKeypairFromEnvironment("SECRET_KEY");
  //   console.log(`The public key is: `, keypair);

  return keypair;
};

const getBalaceByAddress = async (key) => {
  try {
    const address = new PublicKey(key);
    const balance = await connection.getBalance(address);

    console.log(
      `📌 The balance of the account at ${address} is ${balance} lamports`
    );
    //   converting lamports to SOL using LAMPORTS_PER_SOL which comes from web3.js. thats a constant value
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(
      `📌 The balance of the account at ${address} is ${balanceInSol} SOL`
    );
  } catch (err) {
    console.log(err.message);
  }
};

const keypair = getKeypairFromENV();

console.log(`The public key is: `, keypair.publicKey.toBase58());

getBalaceByAddress("Gg3V9VuCvf4cNjP4qEZKELGCkxLEX9ajYyyYr3dw3QGr");
getBalaceByAddress(keypair.publicKey.toBase58());
