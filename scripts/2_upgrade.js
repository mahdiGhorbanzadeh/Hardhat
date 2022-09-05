const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Test = await hre.ethers.getContractFactory("Test");

  console.log("upgrade Test...");

  await upgrades.upgradeProxy(
    "0xAA8D28088d0070a6C5cEe46F34f27B48F2eE5d72",
    Test,
  );

  console.log("test upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
