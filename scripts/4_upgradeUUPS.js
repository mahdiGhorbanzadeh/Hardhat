const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestUUPSupgrade = await hre.ethers.getContractFactory(
    "TestUUPSupgrade",
  );

  console.log("upgrade TestUUPSupgrade...");

  await upgrades.upgradeProxy(
    "0x7F9445028cf11F8A49aF6a1838d199727bf17262",
    TestUUPSupgrade,
  );

  console.log("testUUPSupgrade upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
