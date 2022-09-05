const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Test = await hre.ethers.getContractFactory("Test");

  console.log("Deploying Test...");

  const test = await upgrades.deployProxy(Test, {
    initializer: "initialize",
  });

  await test.deployed();

  console.log("test deployed to:", test.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
