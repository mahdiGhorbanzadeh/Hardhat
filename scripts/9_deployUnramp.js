const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Unramp = await hre.ethers.getContractFactory("Unramp");

  console.log("Deploying Unramp...");

  const unramp = await upgrades.deployProxy(Unramp, {
    kind: "uups",
    initializer: "initialize",
  });

  await unramp.deployed();

  console.log("unramp deployed to:", unramp.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
