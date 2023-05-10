const { expect } = require("chai");
const hre = require("hardhat");
const { Contract } = require("ethers");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

describe("RandomNumberConsumer", function () {
  let randomNumberConsumer, owner;
  const linkAddress = "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06";
  const amount = ethers.utils.parseEther("1");

  beforeEach(async () => {
    const RandomNumberConsumer = await hre.ethers.getContractFactory(
      "VRFv2DirectFundingConsumer"
    );
    [owner] = await hre.ethers.getSigners();
    randomNumberConsumer = await RandomNumberConsumer.deploy();
    await randomNumberConsumer.deployed();
    console.log(randomNumberConsumer.address);
    // const contractABI =
    //   require("../artifacts/contracts/Lottery.sol/VRFv2DirectFundingConsumer.json").abi;
    // randomNumberConsumer = new hre.ethers.Contract(
    //   "0x83a847fF6713B5994E04A0c156e34957B2660263",
    //   contractABI,
    //   owner
    // );

    const linkContract = await hre.ethers.getContractAt("IERC20", linkAddress);
    await linkContract
      .connect(owner)
      .transfer(randomNumberConsumer.address, amount);

    // Verify the contract on BscScan Testnet
    await hre.run("verify:verify", {
      address: randomNumberConsumer.address,
      constructorArguments: [],
    });
  });
});
