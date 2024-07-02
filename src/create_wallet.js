
const dotenv = require("dotenv")
// Importando as dependências
const bip32 = require('bip32'); // Biblioteca para manipulação de carteiras HD
const bip39 = require('bip39'); // Biblioteca para gerar e manipular frases mnemônicas (seeds)
const bitcoin = require('bitcoinjs-lib'); // Biblioteca principal para Bitcoin

// Definindo a rede
const network = bitcoin.networks.testnet;  // Utilizando a rede de teste (testnet). Para mainnet, use bitcoin.networks.bitcoin

// Caminho de derivação para carteiras HD (BIP49)
const path = `m/49'/1'/0'/0`; // Definindo o caminho de derivação para a carteira HD conforme BIP49 para testnet

dotenv.config()

const main = async () => {

    console.log(">> CREATE WALLET START")

    // Gerando o mnemonic para a seed (palavras de senha)
    let mnemonic = bip39.generateMnemonic(); // Gerando uma frase mnemônica aleatória
    const seed = bip39.mnemonicToSeedSync(mnemonic); // Convertendo a frase mnemônica em uma seed binária

    // Criando a raiz da carteira HD a partir da seed
    let root = bip32.fromSeed(seed, network); // Criando a raiz da carteira HD usando a seed e a rede especificada

    // Derivando a conta (par de chaves privada e pública)
    let account = root.derivePath(path); // Derivando a conta principal do caminho especificado
    let node = account.derive(0).derive(0); // Derivando a primeira chave da conta (índice 0/0)

    // Gerando o endereço Bitcoin
    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey, // Utilizando a chave pública derivada
        network: network, // Especificando a rede (testnet)
    }).address; // Gerando o endereço P2PKH


    // Exibindo os detalhes da carteira
    console.log("Carteira");
    console.log("Endereço: ", btcAddress); // Exibindo o endereço Bitcoin gerado
    console.log("Chave privada:", node.toWIF()); // Exibindo a chave privada em formato WIF (Wallet Import Format)
    console.log("Seed:", mnemonic); // Exibindo a frase mnemônica usada para gerar a seed

    console.log(">> CREATE WALLET FINISH")
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