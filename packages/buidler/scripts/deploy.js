/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("@nomiclabs/buidler");
const { utils } = require("ethers");
const R = require("ramda");

const main = async () => {
  // ? Tip: if on VSCode, install "Better Comments" extension
  console.log("\n\n 📡 Deploying...\n");

  // auto deploy to read contract directory and deploy them all (add ".args" files for arguments)
  //await autoDeploy();
  // OR
  // custom deploy (to use deployed addresses dynamically for example:)

  const Supporters = await deploy("Supporters")//~300k gas  (40G $380 -> $4.50)
  const MVPCLR = await deploy("MVPCLR",[Supporters.address, 120])//~1300k gas  (40G $380 -> $20) //<--- we set the round duration here

  await Supporters.supporterUpdate("0x34aA3F359A9D614239015126635CE7732c18fDF3",true)//45k gas ~<$1 40G
  await Supporters.supporterUpdate("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1",true)
  await Supporters.supporterUpdate("0xB2ac59aE04d0f7310dC3519573BF70387b3b6E3a",true)

  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐶"))// 70-90k gas ~>$1 40G
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐱"))
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐭"))
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐹"))
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐰"))
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🦊"))
  await MVPCLR.addRecipient("0x34aA3F359A9D614239015126635CE7732c18fDF3",ethers.utils.formatBytes32String("🐻"))

  await MVPCLR.startRound() // 45k gas  ~<$1 40G

  //add deployer as supporter to test
  await Supporters.supporterUpdate(await Supporters.owner(),true)

  //add give support to a project
  await MVPCLR.donate(0,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(2,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(3,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(5,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(6,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(2,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(0,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(3,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(0,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(0,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(2,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(0,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(3,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?
  await MVPCLR.donate(1,{ value: ethers.utils.parseEther("0.01") })  // ooof 114k to donate :( ~2 dollars?


  //later, in the ui:
  //calculateMatching() ~280k and scales up with ^donations^ but can be run in multiple txns by anyone
                  // 5 bucks and up ?


  //recipientWithdraw() ~70k per recipient but anyone can run it
                  // 1 dollar per ?



}


  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/buidler/artifacts/"),
    "\n\n"
  );
};

const autoDeploy = async () => {
  const allDeployed = [];
  const contractList = fs
    .readdirSync(config.paths.sources)
    .filter((fileName) => isSolidity(fileName));

  // loop through each solidity file from config.path.sources and deploy it
  // abi encode any args, if found
  // ! do not use .forEach in place of this loop
  for (let i=0; i < contractList.length; i++) {
    const file = contractList[i];
    const contractName = file.replace(".sol", "");
    const contractArgs = readArgsFile(contractName);
    const deployed = await deploy(contractName, contractArgs);

    allDeployed.push(deployed);
  }

  return allDeployed;
};

const deploy = async (contractName, _args) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName);
  const deployed = await contractArtifacts.deploy(...contractArgs);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address),
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
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0;

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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
