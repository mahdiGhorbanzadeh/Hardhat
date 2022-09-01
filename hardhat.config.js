require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID1}`,
      accounts: [process.env.DEPLOYER_PRIVAE_KEY1],
      chainId: 4,
      // gas: 6700000,
      // gasPrice: 10000000000,
      timeoutBlocks: 200,
    },
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
};
