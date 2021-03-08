/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers, tenderly, run } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");

const main = async () => {

  console.log("\n\n 📡 Deploying...\n");

  if(true){


  const WETH = await deploy("WETH9")
  //deployer is 0x02f6e9f21a4aac2eae9865a90ea8f5ee741d9b58 <-- hit with faucet funds

  const allocator = await deploy(
    "Allocator",
    [
      //"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", //WETH9 address on main
      WETH.address,
      //"0x4F2b9D0e9FCA80e967CEDBB95a7356D388605ED1",
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", //gnosis safe with auryn, austin, and owocki as owners
      [
        "0xFcC41c4614bD464bA28ad96f93aAdaA7bA6c8680",//clr fund
        "0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6",// gitcoin
        "0x97843608a00e2bbc75ab0C1911387E002565DEDE"// buidl guidl safe
      ],
      [
        33,
        33,
        33
      ]
    ])

  console.log("Overriding current allocation with new one ")
  await allocator.setAllocation(
    [
      "0xFcC41c4614bD464bA28ad96f93aAdaA7bA6c8680",//clr fund
      "0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6",// gitcoin
      "0x97843608a00e2bbc75ab0C1911387E002565DEDE",// buidl guidl safe
      "0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1"
    ],
    [
      100,
      200,
      255,
      1
    ]
  )


  console.log("ADDRESS IS",allocator.address)
  console.log("GAS LIMIT",allocator.deployTransaction.gasLimit.toNumber())
  console.log("GAS PRICE",allocator.deployTransaction.gasPrice.toNumber())

}else{

  //run this to just do the setAllocation on a predeployed contract ... change the address:

  //const allocator = await ethers.getContractFactory("Allocator")
  const allocator = await ethers.getContractAt('Allocator', "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F")

    console.log("Overriding current allocation with new one ")
    await allocator.setAllocation(
      [
        "0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1",//clr fund
        "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",// gitcoin
      ],
      [
        1,
        1,
      ]
    )

}


  //await allocator.setWETHAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")//WETH ADDRESS https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#writeContract

/*
  await allocator.setAllocation(
    [
      "0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1",
      "0x34aA3F359A9D614239015126635CE7732c18fDF3",
      "0xfc837221b69ebe426Cc2C520290bD4d4f8Be0DE8"
    ],
    [
      20,
      80,
      20
    ])
*/
  //const exampleToken = await deploy("ExampleToken",[allocator.address])

  //const deployerWallet = ethers.provider.getSigner()

  /*
  await deployerWallet.sendTransaction({
    to: allocator.address,
    value: ethers.utils.parseEther("10")
  })*/

/*
  await allocator.setAllocation(
    [
      "0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1",
      "0x34aA3F359A9D614239015126635CE7732c18fDF3",
      "0xfc837221b69ebe426Cc2C520290bD4d4f8Be0DE8"
    ],
    [
      1,
      1,
      1
    ])
*/
  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */


  //If you want to verify your contract on tenderly.co (see setup details in the scaffold-eth README!)
  /*
  await tenderlyVerify(
    {contractName: "YourContract",
     contractAddress: yourContract.address
  })
  */

  // If you want to verify your contract on etherscan
  /*
  console.log(chalk.blue('verifying on etherscan'))
  await run("verify:verify", {
    address: yourContract.address,
    // constructorArguments: args // If your contract has constructor arguments, you can pass them as an array
  })
  */

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (contractName, _args = [], overrides = {}, libraries = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName,{libraries: libraries});
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  let extraGasInfo = ""
  if(deployed&&deployed.deployTransaction){
    const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice)
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${deployed.deployTransaction.hash}`
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(
    " ⛽",
    chalk.grey(extraGasInfo)
  );

  await tenderly.persistArtifacts({
    name: contractName,
    address: deployed.address
  });

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


// If you want to verify on https://tenderly.co/
const tenderlyVerify = async ({contractName, contractAddress}) => {

  let tenderlyNetworks = ["kovan","goerli","mainnet","rinkeby","ropsten","matic","mumbai","xDai","POA"]
  let targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork

  if(tenderlyNetworks.includes(targetNetwork)) {
    console.log(chalk.blue(` 📁 Attempting tenderly verification of ${contractName} on ${targetNetwork}`))

    await tenderly.persistArtifacts({
      name: contractName,
      address: contractAddress
    });

    let verification = await tenderly.verify({
        name: contractName,
        address: contractAddress,
        network: targetNetwork
      })

    return verification
  } else {
      console.log(chalk.grey(` 🧐 Contract verification not supported on ${targetNetwork}`))
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
