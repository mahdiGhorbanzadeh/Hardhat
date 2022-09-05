const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestUUPSupgrade = await hre.ethers.getContractFactory(
    "TestUUPSupgrade",
  );

  let testUUPS = await TestUUPSupgrade.attach(
    "0x7F9445028cf11F8A49aF6a1838d199727bf17262",
  );

  console.log(await testUUPS.owner());

  console.log(await testUUPS.upgradeFunc());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
