const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const TestUUPSupgrade = await hre.ethers.getContractFactory("TestDis");

  let testUUPS = await TestUUPSupgrade.attach(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  );

  console.log(await testUUPS.var2());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
