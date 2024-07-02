
const dotenv = require("dotenv")
const bitcoin = require('bitcoinjs-lib'); // Biblioteca principal para Bitcoin
const BitRpc = require('bitcoin-json-rpc');

// Definindo a rede
const network = bitcoin.networks.mainet;  // Utilizando a rede de teste (testnet). Para mainnet, use bitcoin.networks.bitcoin

// Caminho de derivação para carteiras HD (BIP49)
const path = `m/49'/1'/0'/0`; // Definindo o caminho de derivação para a carteira HD conforme BIP49 para testnet

dotenv.config()

const main = async () => {

    console.log(">>  BALANCE WALLET START")

    const address = 'bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj'


    //const p2pValue = bitcoin.payments.p2pkh({pubkey: 'bc1p8k4v4xuz55dv49svzjg43qjxq2whur7ync9tm0xgl5t4wjl9ca9snxgmlt', network});
    // console.log(p2pValue);


    //const rpc = new BitRpc.BitcoinJsonRpc(bitcoin.networks.mainet );

    const rpc = new BitRpc.BitcoinJsonRpc('http://localhost:8332');

    const balance = await rpc.getBalance();
    console.log(balance);

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