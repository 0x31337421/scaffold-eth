/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, l2ethers, network } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const {  JsonRpcProvider } = require("@ethersproject/providers");

const main = async () => {

  console.log("\n\n 📡 Deploying...\n");


  const yourContract = await deploy({contractName: "YourContract"}) // <-- add in constructor args like line 19 vvvv

};

const deploy = async ({contractName, _args = [], overrides = {}, libraries = {}}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];

  const optimisticProvider = new JsonRpcProvider("http://localhost:8545")
  const mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim()
  const newWallet = new ethers.Wallet.fromMnemonic(mnemonic)//, optimisticProvider)
  console.log(network.provider)
  const signerProvider = newWallet.connect(optimisticProvider)

  const contractArtifacts = await l2ethers.getContractFactory(contractName)//, signerProvider);

  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);
  console.log('here')

  let extraGasInfo = ""
  if(deployed&&deployed.deployTransaction){
    const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice)
    extraGasInfo = "("+utils.formatEther(gasUsed)+" ETH)"
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address),
    chalk.grey(extraGasInfo)
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};


// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0 && fileName.indexOf(".swap") < 0;

const readArgsFile = (contractName) => {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
