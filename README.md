# 🏗 scaffold-eth - 🧑‍🎤 [eth.dev](https://eth.dev)

---

## 🏃‍♀️ Quick Start

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

```bash
# clone repository
git clone -b eth-dev https://github.com/austintgriffith/scaffold-eth.git eth-dev

cd eth-dev

# install dependencies
yarn install

# start app
yarn start

# > in a second terminal window:
# start local eth chain
yarn chain

# deploy contracts
yarn deploy
```

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

📱 Open http://localhost:3000 to see the app

## Deploy to surge

```bash
yarn build

yarn surge
```

## TODO's

* [store redux state in browser](https://github.com/grofers/redux-cookies-middleware)
* [add nice scrollbar for all browser](https://www.npmjs.com/package/perfect-scrollbar)
* [maybe use this](https://github.com/nextapps-de/winbox)
