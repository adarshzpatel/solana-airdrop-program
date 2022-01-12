const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, Account } = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

const getWalletbalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey); // creating a wallet from the secretKey
    const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
    console.log('Wallet Address : ' + publicKey);
    console.log('Wallet Balance : ' + walletBalance);

  } catch (err) {
    console.log(err);
  }
}

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
}

const driverFunction = async () => {
  await getWalletbalance();
  await airDropSol();
  await getWalletbalance();
}

driverFunction();