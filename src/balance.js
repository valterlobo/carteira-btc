
const dotenv = require("dotenv")
const bitcoin = require('bitcoinjs-lib'); // Biblioteca principal para Bitcoin
var helloblock = require('helloblock-js')({
    network: 'testnet'
  });
// Definindo a rede
const network = bitcoin.networks.testnet;  // Utilizando a rede de teste (testnet). Para mainnet, use bitcoin.networks.bitcoin

// Caminho de derivação para carteiras HD (BIP49)
const path = `m/49'/1'/0'/0`; // Definindo o caminho de derivação para a carteira HD conforme BIP49 para testnet

dotenv.config()

const main = async () => {

    console.log(">>  BALANCE WALLET START")

    const p2pValue = bitcoin.payments.p2pkh({pubkey: 'mvy7U4jhZa3NLLpZ8uk4HEFfZt1q7GhpDB', network});
    console.log(p2pValue);
    

    console.log(">> BALANCE WALLET FINISH")
}

main()
    .then(() => {
        console.log("****************Finished********************")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })