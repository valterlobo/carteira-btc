# Geração de carteira Bitcoin


Este código gera uma nova carteira Bitcoin HD na testnet, incluindo o endereço Bitcoin, a chave privada e a frase mnemônica. 

### OBS :  importante armazenar a chave privada e a frase mnemônica em um local seguro, pois elas são necessárias para acessar e controlar os fundos da carteira.


Como gerar uma carteira Bitcoin HD (Hierarchical Deterministic) utilizando as bibliotecas `bip32`, `bip39` e `bitcoinjs-lib`.


## Dependências

Primeiro, precisamos importar as bibliotecas necessárias:

```javascript
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
```

## Configuração da Rede

Podemos configurar o script para usar a rede principal do Bitcoin (mainnet) ou a rede de teste (testnet). Neste exemplo, estamos utilizando a testnet:

```javascript
const network = bitcoin.networks.testnet;  // Para a rede principal, use bitcoin.networks.bitcoin
```

## Caminho de Derivação

Definimos o caminho de derivação conforme o padrão BIP49 para a testnet:

```javascript
const path = `m/49'/1'/0'/0`;
```

## Geração do Mnemonic e da Seed

Criamos um mnemonic (frase mnemônica) para a seed e a convertemos em uma seed binária:

```javascript
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
```

## Criação da Raiz da Carteira HD

A partir da seed, criamos a raiz da carteira HD:

```javascript
let root = bip32.fromSeed(seed, network);
```

## Derivação da Conta e do Endereço

Derivamos a conta e o endereço público e privado a partir da raiz da carteira HD:

```javascript
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;
```

## Código Completo

Para ver o código completo e experimentar você mesmo, acesse o arquivo [src/create_wallet.js](src/create_wallet.js).

## Executando o Código

Para executar o código que gera uma carteira Bitcoin HD, siga os passos abaixo:

1. **Instale as Dependências**:
   
   Primeiro, certifique-se de estar no diretório do seu projeto no terminal. Execute o comando abaixo para instalar as dependências necessárias:

   ```sh
   npm install
   ```

2. **Execute o Script**:

   Após instalar as dependências, execute o script `create_wallet.js` com o seguinte comando:

   ```sh
   node create_wallet.js
   ```

O script será executado e você verá a saída no terminal com os detalhes da carteira gerada, incluindo o endereço Bitcoin, a chave privada e a frase mnemônica.