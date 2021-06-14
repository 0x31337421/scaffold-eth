# 🏗 scaffold-eth - Rarible Starter App

> start building an NFT application using the Rarible Protocol! 🚀 

---


#### [ 🏃‍♀️ Quick Start ](#quick-start)

#### [🖼 Minting Your Collectibles](#mint-your-collectibles)

#### [🗂 Rarible Item Indexer](#rarible-item-indexer)

#### [📒 Rarible Order Book](#rarible-order-book)

#### [🦥 Lazy Minting](#lazy-minting)

#### [💵 Selling a lazy minted item](#selling-a-lazy-minted-item)


#### [ Built with 🏗 scaffold-eth ](#built-with-scaffold-eth)
- [ 🎨 Nifty.ink ](https://nifty.ink) ([code](https://github.com/austintgriffith/scaffold-eth/tree/nifty-ink-dev))
- [ 🧑‍🎤PunkWallet.io ](https://punkwallet.io/) ([code](https://github.com/austintgriffith/scaffold-eth/tree/punk-wallet))

#### [🌉 Infrastructure ](https://github.com/austintgriffith/scaffold-eth#-infrastructure)

- [ 🛰 The Graph ](https://github.com/austintgriffith/scaffold-eth#-using-the-graph)
- [ 🔬 Tenderly ](https://github.com/austintgriffith/scaffold-eth#-using-tenderly)
- [ 🌐 Etherscan ](https://github.com/austintgriffith/scaffold-eth#-etherscan)
- [ 🔶 Infura ](https://github.com/austintgriffith/scaffold-eth#-using-infura)
-  🟪 [ Blocknative ](https://github.com/austintgriffith/scaffold-eth#-blocknative)

|-   <B> [ 📠 Legacy Content ](https://github.com/austintgriffith/scaffold-eth#-legacy-content) </B> - | - <B> [ 💬 Support Chat ](https://github.com/austintgriffith/scaffold-eth#-support-chat) </B> -|

---

TODO video

[![ethdenvervideo](https://user-images.githubusercontent.com/2653167/109873369-e2c58c00-7c2a-11eb-8adf-0ec4b8dcae1e.png)](https://youtu.be/33gnKe7ttCc?t=477)


---
---
---

# Quick Start

⚠️⚠️ **This application connects to the Rarible contracts & API on Ropsten** ⚠️⚠

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)


```bash
git clone https://github.com/ipatka/scaffold-eth.git

cd scaffold-eth

git checkout rarible-starter-app
```

```bash

yarn install

```

```bash

yarn start

```

📱 Open http://localhost:3000 to see the app

🏗 scaffold-eth is a hackthon stack for quick product prototyping on Ethereum.

👩‍🔬 This scaffolding leverages state of the art tooling from the ecosystem.

🖼 This fork of scaffold-eth implements the basic features and functionality of the Rarible protocol

🧪 It is a free standing dapp so you can learn by making small changes.


> *After installing*, your dev environment should look like this:

TODO screenshot

![image](https://user-images.githubusercontent.com/2653167/109870279-24ecce80-7c27-11eb-91f3-b2c4febac118.png)

> React dev server, Ropsten network, deploy terminal, code IDE, and frontend browser.

# Mint your collectibles

Mint some NFTs that we can use to test out the Rarible protocol.


> in a second terminal window:

```bash
cd simple-nft-example
yarn generate
yarn accounts
```

🔐 Generate a deploy account with `yarn generate` and view it with `yarn account`

💵 Fund your deployer account with some Ropsten Eth from a [faucet](https://faucet.ropsten.be/)

TODO screenshot

> Deploy your contract (optional, you can also just use the default one):

```bash
yarn deploy
```

✏️  Edit the address in `packages/react-app/src/contract/YourCollectible.address.js` to your deployed contract address


💼 Edit the mint script `mint.js` in `packages/hardhat/scripts` to mint to your browser wallet address


TODO screenshot

> *After minting*, your dev environment should look like this:

TODO screenshot

![image](https://user-images.githubusercontent.com/2653167/109870279-24ecce80-7c27-11eb-91f3-b2c4febac118.png)

You can visit your new NFTs on the Rarible site by specifying the contract address & tokenID in the URL like this

`https://ropsten.rarible.com/token/0x66f806bf40bfa98f2dac85a85d437895043f2be5:1?tab=owners`

TODO screenshot

# Rarible Item Indexer

Go to the Rarible Item indexer tab and enter the contract address for our YourCollectible contract.

This tab uses the metadata indexer which is documented here: https://api-reference.rarible.com/#operation/getItemMetaById

TODO screenshot

You can also use the Rarible indexer to get NFT data for an entire collection, all NFTs owned by an address, and more.

# Rarible Order Book

We can create a sell order for one of these NFTs right from the item indexer.

First we need to make sure the Rarible Exchange is approved to transfer NFTs on our behalf when they are sold.

Enter the Rarible Transfer Proxy address and hit 'Approve'.

Rarible Transfer Proxy on Ropsten: 0xf8e4ecac18b65fd04569ff1f0d561f74effaa206

[Example Tx](https://ropsten.etherscan.io/tx/0x288715731a6daac47757968c3dcd89e8af462b87df410cf2a4c5a14ae3c481a4)

Now select 'Sell for ETH' and enter the ETH amount and use the *️⃣ button to format it in wei.

Sign the order to submit it to Rarible.

TODO screenshot

Now go over to the Rarible Order Indexer tab and find the order you just created by entering the collection address and token ID.

Fill the order, and submit the transaction to the Rarible exchange.

Todo screenshot

[Example Tx](https://ropsten.etherscan.io/tx/0xabe5433e500a6d3db229fb7630f898c37d30d4422dde69c1ab20a2b84cce2462)

Now on the Rarible UI you can see the listing and transfer history!

TODO screenshot

# Lazy Minting

With Lazy Minting you can defer the gas costs of minting the NFT to the first buyer.

For this example we will use the standard Rarible ERC721 contract deployed here: 0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05

All you need for lazy minting is the IPFS hash of your NFT content.

Go to the IPFS upload tab

Modify the content, or just hit upload

Copy the IPFS hash

Go to the lazy minting tab and enter the hash.

Press mint

TODO screenshot

Now let's go to the item indexer and see the lazy minted NFT

Copy your contract address and token ID from the lazy minting tab

Enter them on the item indexer

We can also view the lazy minted item on the Rarible UI!

# Selling a lazy minted item

Same process as the normal minted item

# Built with scaffold-eth

This starter app was built using Austin Griffith's Scaffold-Eth framework. For more starter apps and inspiration check out this page:

TODO link

[<H3>👩‍🎨 Nifty Ink</H3>](https://nifty.ink)

Paintings come to life as you "ink" new creations and trade them on Ethereum. A deep dive into 🖼 NFTs, 🐳 OpenSea, 🖍 react-canvas-draw, 🎨 react-color, and 🛬 onboarding user experience.

🏃‍♂️ SpeedRun 📹 (TODO)

[💾 Source Code ](https://github.com/austintgriffith/scaffold-eth/tree/nifty-ink-dev)


[<H3>🧙‍♂️ Instant Wallet</H3>](https://instantwallet.io)

An instant wallet running on xDAI insired by [xdai.io](https://xdai.io).


[💾 Source Code ](https://github.com/austintgriffith/scaffold-eth/tree/instantwallet-dev-session)


[<H3>🗳 Personal Token Voting</H3>](https://medium.com/@austin_48503/personal-token-voting-73b44a598d8e)

Poll your holders! Build an example emoji voting system with 🏗 <b>scaffold-eth</b>. 🔏 Cryptographically signed votes but tracked off-chain with 📡 Zapier and 📑 Google Sheets.

[🏃‍♂️ SpeedRun 📹 ](https://youtu.be/Q5zgxcQtwWI)

[💾 Source Code ](https://github.com/austintgriffith/scaffold-eth/tree/emoji-vote-dev)


^^^ ⛏ PLEASE <b>PR</b> your 🏗 scaffold-eth project in above!!! 🙏🙏🙏 ^^^

---
===================================================== [⏫ back to the top ⏫](https://github.com/austintgriffith/scaffold-eth#-scaffold-eth)

---
---

# 📟 Infrastructure

---

## 🛰 Using The Graph

[![thegraphplayvideo](https://user-images.githubusercontent.com/2653167/101052782-4664ee00-3544-11eb-8805-887ad4d1406e.png)
](https://youtu.be/T5ylzOTkn-Q)

[ 🎥 here is another Graph speed run tutorial video ](https://youtu.be/T5ylzOTkn-Q)


---

## 🔬 Using Tenderly
[Tenderly](https://tenderly.co) is a platform for monitoring, alerting and trouble-shooting smart contracts. They also have a hardhat plugin and CLI tool that can be helpful for local development!

Hardhat Tenderly [announcement blog](https://blog.tenderly.co/level-up-your-smart-contract-productivity-using-hardhat-and-tenderly/) for reference.


### Verifying contracts on Tenderly
scaffold-eth includes the hardhat-tenderly plugin. When deploying to any of the following networks:
```
["kovan","goerli","mainnet","rinkeby","ropsten","matic","mumbai","xDai","POA"]
```
You can verify contracts as part of the `deploy.js` script. We have created a `tenderlyVerify()` helper function, which takes your contract name and its deployed address:
```
await tenderlyVerify(
  {contractName: "YourContract",
   contractAddress: yourContract.address
})
```
Make sure your target network is present in the hardhat networks config, then either update the default network in `hardhat.config.js` to your network of choice or run:
```
yarn deploy --network NETWORK_OF_CHOICE
```
Once verified, they will then be available to view on Tenderly!



[![TenderlyRun](https://user-images.githubusercontent.com/2653167/110502199-38c98200-80b8-11eb-8d79-a98bb1f39617.png)](https://www.youtube.com/watch?v=c04rrld1IiE&t=47s)


#### Exporting local Transactions
One of Tenderly's best features for builders is the ability to [upload local transactions](https://dashboard.tenderly.co/tx/main/0xb8f28a9cace2bdf6d10809b477c9c83e81ce1a1b2f75f35ddd19690bbc6612aa/local-transactions) so that you can use all of Tenderly's tools for analysis and debugging. You will need to create a [tenderly account](https://tenderly.co/) if you haven't already.

Exporting local transactions can be done using the [Tenderly CLI](https://github.com/tenderly/tenderly-cli). Installing the Tenderly CLI:
```
brew tap tenderly/tenderly
brew install tenderly
```
_See alternative installation steps [here](https://github.com/tenderly/tenderly-cli#installation)_

You need to log in and configure for your local chain (including any forking information) - this can be done from any directory, but it probably makes sense to do under `/packages/hardhat` to ensure that local contracts are also uploaded with the local transaction (see more below!)
```
cd packages/hardhat
tenderly login
tenderly export init
```
You can then take transaction hashes from your local chain and run the following from the `packages/hardhat` directory:
```
tenderly export <transactionHash>
```
Which will upload them to tenderly.co/dashboard!

Tenderly also allows users to debug smart contracts deployed to a local fork of some network (see `yarn fork`). To let Tenderly know that we are dealing with a fork, run the following command:

```
tenderly export init
```

CLI will ask you for your network's name and whether you are forking a public network. After choosing the right fork, your exporting will look something like this:

```
tenderly export <transactionHash> --export-network <networkName>
```

Note that `tenderly.yaml` file stores information about all networks that you initialized for exporting transactions. There can be multiple of them in a single file. You only need the `--export-network` if you have more than one network in your tenderly.yaml config!

**A quick note on local contracts:** if your local contracts are persisted in a place that Tenderly can find them, then they will also be uploaded as part of the local transaction `export`, which is one of the freshest features! We have added a call to `tenderly.persistArtifacts()` as part of the scaffold-eth deploy() script, which stores the contracts & meta-information in a `deployments` folder, so this should work out of the box.

Another pitfall when dealing with a local network (fork or not) is that you will not see the transaction hash if it fails. This happens because the hardhat detects an error while `eth_estimateGas` is executed. To prevent such behaviour, you can skip this estimation by passing a `gasLimit` override when making a call - an example of this is demonstrated in the `FunctionForm.jsx` file of the Contract component:
```
let overrides = {}
// Uncomment the next line if you want to skip the gas estimation for each transaction
// overrides.gasLimit = hexlify(1200000);
const returned = await tx(contractFunction(...args, overrides));
```

**One gotcha** - Tenderly does not (currently) support yarn workspaces, so any imported solidity contracts need to be local to `packages/hardhat` for your contracts to be exported. You can achieve this by using [`nohoist`](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) - this has been done for `hardhat` so that we can export `console.sol` - see the top-level `package.json` to see how!
```
"workspaces": {
  "packages": [
    "packages/*"
  ],
  "nohoist": [
    "**/hardhat",
    "**/hardhat/**"
  ]
}
```


---

## 🌐 Etherscan
Hardhat has a truly wonderful [`hardhat-etherscan` plugin](https://www.npmjs.com/package/@nomiclabs/hardhat-etherscan) that takes care of contract verification after deployment. You need to add the following to your `hardhat.config.js` imports:
```
require("@nomiclabs/hardhat-etherscan");
```
Then add your etherscan API key to the module.exports:
```
etherscan: {
  // Your API key for Etherscan
  // Obtain one at https://etherscan.io/
  apiKey: "YOUR-API-KEY-HERE"
}
```
Verifying is simple, assuming you are verifying a contract that you have just deployed from your hardhat setup - you just need to run the verify script, passing constructor arguments as an array if necessary (there is an example commented out in the `deploy.js`):
```
await run("verify:verify", {
  address: yourContract.address,
  // constructorArguments: args // If your contract has constructor arguments, you can pass them as an array
})
```
You only have to pass the contract because the plugin figures out which of the locally compiled contracts is the right one to verify. Pretty cool stuff!

---

## 🔶 Using Infura

You will need to update the `constants.js` in `packages/react-app/src` with [your own Infura ID](https://infura.io).

---

## 🟪 Blocknative

> update the `BLOCKNATIVE_DAPPID` in `packages/react-app/src/constants.js` with [your own Blocknative DappID](https://docs.blocknative.com/notify)

---
===================================================== [⏫ back to the top ⏫](https://github.com/austintgriffith/scaffold-eth#-scaffold-eth)

---
---


## 📠 Legacy Content


[<h5>🧫 Building on Ethereum in 2020 (research for this repo)</h5>  ](https://medium.com/@austin_48503/building-on-ethereum-in-2020-dca52eda5f00)


[![splash](https://user-images.githubusercontent.com/2653167/88085723-7ab2b180-cb43-11ea-832d-8db6efcbdc02.png)](https://www.youtube.com/watch?v=ShJZf5lsXiM&feature=youtu.be&t=19)

---

[<H6>Tutorial 1: 🛠 Programming Decentralized Money</H6>](https://medium.com/@austin_48503/programming-decentralized-money-300bacec3a4f)

Learn the basics of 🏗 <b>scaffold-eth</b> and building on <b>Ethereum</b>. 👷‍♂️ HardHat, 📦 create-eth-app, 🔥 hot reloading smart contracts, 🛰 providers, 🔗 hooks, 🎛 components, and building a decentralized application.
[🎥 Guided Tutorial](https://youtu.be/7rq3TPL-tgI)

---

<H6>Tutorial 2: 🏵 The Token</H6>

Learn about tokens. [coming soon] What is a token? Why is it cool? How can I deploy one? Exotic mechanisms? (todo)

---

[<H6>Tutorial 3: ⚖️ Minimum Viable Decentralized Exchange</H6>](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)

Learn the basics of Automated Market Makers like 🦄 Uniswap. Learn how 💰Reserves affect the 📉 price, ⚖️ trading, and 💦 slippage from low liquidity.

[🏃‍♀️ SpeedRun  📹](https://youtu.be/eP5w6Ger1EQ)

---

[<H6>Tutorial 4: 🚀 Connecting ETH to IPFS</H6>](https://medium.com/@austin_48503/tl-dr-scaffold-eth-ipfs-20fa35b11c35)

Build a simple IPFS application in 🏗 <b>scaffold-eth</b> to learn more about distributed file storage and content addressing.
  [🎥 Live Tutorial](https://youtu.be/vqrLr5eOjLo?t=342)

---

<H6>Tutorial 5: ⛽️GSN and Meta Transactions</H6>

Learn about to provide your users with better UX by abstracting away gas fees and blockchain mechanics.  (todo)


---


[<H6>Tutorial 6: 🛰 Decentralized Deployment</H6>](https://medium.com/@austin_48503/decentralized-deployment-7d975c9d5016)

Learn how to deploy your smart contract to a production blockchain. Then deploy your applicaton to Surge, S3, and IPFS. Finally, register an ENS and point it at the decentralized content!  [🎥 Live Tutorial](https://youtu.be/vqrLr5eOjLo?t=1350)

---


## 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA)  to ask questions and find others building with 🏗 scaffold-eth!

---

===================================================== [⏫ back to the top ⏫](https://github.com/austintgriffith/scaffold-eth#-scaffold-eth)

---
