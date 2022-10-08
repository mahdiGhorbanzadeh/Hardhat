const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");

  console.log("Deploying Token...");

  const token = await Token.deploy("DAI TEST","dai test");

  await token.deployed();

  console.log("token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
