const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  let accounts = await ethers.getSigners();

  const TestUUPSupgrade3 = await hre.ethers.getContractFactory(
    "TestUUPSupgrade3",
    accounts[1],
  );

  console.log("TestUUPSupgrade3 TestUUPSupgrade...");

  await upgrades.upgradeProxy(
    "0x7F9445028cf11F8A49aF6a1838d199727bf17262",
    TestUUPSupgrade3,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
