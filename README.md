# ava-examples
This directory contains a series of small example apps that illustrate how to code up common use cases for working with an [Ava full node](https://github.com/ava-labs/gecko). Think of these examples like lego blocks that can be used to build a bigger app.

## Installation
Prior to running these examples, ensure you have a running Ava full node. Options:
- [Run this Docker container](https://github.com/ava-labs/gecko#docker-install)
- [Install from source](https://medium.com/avalabs/how-to-install-and-run-ava-borealis-971286add0c0)

Also ensure you have Node.js LTS version 12.13.1 or higher installed.

### Steps:
- Clone this respository:
`git clone https://github.com/christroutner/ava-examples && cd ava-examples`
- Install dependencies: `npm install`
- Enter into the example directories and run `npm start`


## Basic Wallet Functions
1. Create a key pair on the X-chain.
2. [Fund it with the faucet.](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)
3. Check the balance.
4. Send some $AVA.
5. Create a token.
6. Send a token.
7. Mint additional tokens.

*Note: Not all examples implimented yet*
