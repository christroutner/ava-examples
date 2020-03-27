/*
  Check the balance of the wallet created by the create-wallet example.
*/

const slopes = require('slopes')

const config = require('../config')
const wallet = require('../create-wallet/wallet.json')

const binTools = new slopes.BinTools()

const ava = new slopes.Slopes(
  config.fullNodeHost,
  config.fullNodePort,
  config.fullNodeProtocol,
  config.networkID
)
const avm = ava.AVM() // returns a reference to the AVM API used by Slopes

// console.log(`wallet: ${JSON.stringify(wallet, null, 2)}`);

async function getBalance () {
  try {
    // Get all the UTXOs associated with the address.
    const utxoSet = await avm.getUTXOs([wallet.chainAddr])
    // console.log(`utxos: ${JSON.stringify(utxos,null,2)}`)

    // Collect all the asset IDs from the UTXO set.
    const assetIds = utxoSet.getAssetIDs()
    // console.log(`assetIds: ${JSON.stringify(assetIds, null, 2)}`)

    console.log('Balances dispalyed as: <asset ID>, <balance>')

    // Loop through each asset.
    for (let i = 0; i < assetIds.length; i++) {
      const thisAsset = assetIds[0]

      // Convert the asset buffer to a string.
      const assetSerialized = binTools.avaSerialize(thisAsset)

      // Query the balance for this asset.
      const balance = await avm.getBalance(wallet.chainAddr, assetSerialized)

      console.log(`${assetSerialized}, ${balance}`)
    }
  } catch (err) {
    console.error('Error: ', err)
  }
}
getBalance()
