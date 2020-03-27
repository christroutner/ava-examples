/*
  Check the balance of the wallet created by the create-wallet example.
*/

const slopes = require("slopes");

const config = require("../config");
const wallet = require("../create-wallet/wallet.json");

let ava = new slopes.Slopes(
  config.fullNodeHost,
  config.fullNodePort,
  config.fullNodeProtocol,
  config.networkID
);
let avm = ava.AVM(); //returns a reference to the AVM API used by Slopes

// Generate a keychain/wallet.
// const myKeychain = avm.keyChain();

// Generate a new a key pair.
// const newAddress = myKeychain.makeKey();
// const keyPair = myKeychain.getKey(newAddress)

console.log(`wallet: ${JSON.stringify(wallet, null, 2)}`);

async function getBalance() {
  try {
    // Generate a keychain/wallet.
    const myKeychain = avm.keyChain();

    let newAddress2 = myKeychain.importKey(wallet.privateKey);

    // const id = await avm.getAVAAssetID()
    // console.log(`id: `, id.toString())

    const utxoSet = await avm.getUTXOs([wallet.chainAddr]);
    // console.log(`utxos: ${JSON.stringify(utxos,null,2)}`)
    // console.log(`utxos.utxos: ${JSON.stringify(utxos.utxos,null,2)}`)
    // console.log(`utxos.utxos: `, utxos.utxos);

    const assetIds = utxoSet.getAssetIDs()
    // console.log(`assetIds: ${JSON.stringify(assetIds, null, 2)}`)
    // console.log(`asset: ${slopes.BinTools.bufferToString(assetIds[0])}`)
    // console.log(`slopes.BinTools: `, slopes.BinTools)

    const binTools = new slopes.BinTools()
    // console.log(`binTools: `, binTools)

    const asset = binTools.b58.encode(assetIds[0])
    console.log(`asset: ${asset}`)

    // const balance = await avm.getBalance(wallet.chainAddr, asset)
    // console.log(`balance: `, balance)

    // const addressBuf = binTools.b58.decode(wallet.chainAddr)

    const balance = utxoSet.getBalance([newAddress2], assetIds[0])
    console.log(`balance: `, balance.toString(10))

  } catch (err) {
    console.error(`Error: `, err);
  }
}
getBalance();
