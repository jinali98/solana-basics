require("dotenv").config({ path: "./.env" });

import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

import {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getKeypairFromENV } from "index";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiverPublicKey = process.argv[2] || null;

if (!receiverPublicKey) {
  console.log("Please provide a public key");
  process.exit(1);
}

const sendderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

const toPublicKey = new PublicKey(receiverPublicKey);
console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const LAMPORTS_TO_SEND = 5000;

// creating an intance of transaction
const transaction = new Transaction();

const createTransaction = async () => {
  // creating the instructions
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sendderKeyPair.publicKey,
    toPubkey: toPublicKey,
    lamports: LAMPORTS_TO_SEND,
  });

  // adding the instructions to the transaction
  transaction.add(sendSolInstruction);

  // sending the transaction to the blockchain and confirming it
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    sendderKeyPair,
  ]);

  console.log(`Transaction signature is ${signature}!`);
};

createTransaction();
