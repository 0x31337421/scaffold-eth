# 🏗 scaffold-eth - signature recover example

> an example of how to sign with the frontend and recover/verify signer in YourContract

---

## quickstart

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git signature-recover

cd signature-recover

git checkout signature-recover
```

```bash

yarn install

```

> you might get node-gyp errors, ignore them and run:

```bash

yarn start

```

> in a second terminal window:

```bash

yarn chain

```

> in a third terminal window:

```bash

yarn deploy

```

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

📱 Open http://localhost:3000 to see the app


On deploy, trasfer the ownership to your frontend address in `packages/hardhat/scripts/deploy.js`:

![image](https://user-images.githubusercontent.com/2653167/98977842-5013ac80-24d6-11eb-8ded-8780d54701dd.png)

> redeploy your contract so you will be the owner:

```bash

yarn deploy

```

(You can verify the `owner` in the `debug` tab)

YourContract should start with 0.1 ETH in it.

Let's sign a message with the owner to send an address some of that ETH in YourContract.

Enter an address and amount to send, then click `HASH`:

![image](https://user-images.githubusercontent.com/2653167/98979165-40956300-24d8-11eb-9eff-6b441704d9d1.png)

Then, sign the hash using the `owner` account:

![image](https://user-images.githubusercontent.com/2653167/98979245-5f93f500-24d8-11eb-87a5-9e85d8d32cbb.png)

In a different browser (or incognito), navigate to `http://localhost:3000/` and you should have a different address (in the top right).

Give this new address some gas at the faucet.

In the new browser, put in the same to address and value and you should get the same hash:

Instead of signing it with this second account, copy/paste the signature from the owner:

![image](https://user-images.githubusercontent.com/2653167/98979564-bbf71480-24d8-11eb-8707-da2bea7da118.png)

You should see that the transaction is sent from the non-owner address and is able to send money out of YourContract!

🎉 🍾 🎊 🥳 🎉 🍾 🎊 🥳 🎉 🍾 🎊 🥳
