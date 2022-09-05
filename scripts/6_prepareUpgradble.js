const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestUUPSupgrade2 = await hre.ethers.getContractFactory(
    "TestUUPSupgrade2",
  );

  console.log("prepareUpgrade2 TestUUPSupgrade...");

  let contractAddress = await upgrades.prepareUpgrade(
    "0x7F9445028cf11F8A49aF6a1838d199727bf17262",
    TestUUPSupgrade2,
  );

  const TestUUPS = await hre.ethers.getContractFactory("TestUUPS");

  let testUUPS = await TestUUPS.attach(
    "0x7F9445028cf11F8A49aF6a1838d199727bf17262",
  );

  console.log("prepareUpgrade upgraded", contractAddress);

  let accounts = await ethers.getSigners();

  console.log("sss", accounts[1].address);

  await testUUPS.connect(accounts[1]).upgradeTo(contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
