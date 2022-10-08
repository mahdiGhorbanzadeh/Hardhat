const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");

  let token = await Token.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");

  await token.setMint(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    ethers.utils.parseUnits("100", "ether"),
  );

  console.log(
    "balanceOf",
    await token.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
