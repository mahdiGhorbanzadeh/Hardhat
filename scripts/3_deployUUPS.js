const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestUUPS = await hre.ethers.getContractFactory("TestUUPS");

  console.log("Deploying TestUUPS...");

  const testUUPS = await upgrades.deployProxy(TestUUPS, {
    kind: "uups",
    initializer: "initialize",
  });

  await testUUPS.deployed();

  console.log("testUUPS deployed to:", testUUPS.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
