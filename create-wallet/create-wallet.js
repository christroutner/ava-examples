/*
  Create an HDNode wallet using bitbox. The mnemonic from this wallet
  will be used in future examples.
*/

const fs = require('fs')
const slopes = require('slopes')

const config = require('../config')

// These objects used for writing wallet information out to a file.
let outStr = ''
let outObj = {}

const ava = new slopes.Slopes(config.fullNodeHost, config.fullNodePort, config.fullNodeProtocol, config.networkID)
const avm = ava.AVM() // returns a reference to the AVM API used by Slopes

// Generate a keychain/wallet.
const myKeychain = avm.keyChain()

// Generate a new a key pair.
const newAddress = myKeychain.makeKey()
const keyPair = myKeychain.getKey(newAddress)

// Get the private key for the key pair.
const privateKey = keyPair.getPrivateKeyString()
outStr = `privateKey: ${privateKey}\n`

// Get the public key for the key pair.
const publicKey = keyPair.getPublicKeyString()
outStr += `publicKey: ${publicKey}\n`

// Get the X-chain address for this key pair.
const chainAddr = keyPair.getAddressString()
outStr += `chain address: ${chainAddr}`

console.log(outStr)

outObj = { privateKey, publicKey, chainAddr }

// Write out the basic information into a json file for other example apps to use.
fs.writeFile('wallet.json', JSON.stringify(outObj, null, 2), function (err) {
  if (err) return console.error(err)
  console.log('wallet.json written successfully.')
})
