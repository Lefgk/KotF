require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "bscTestNet",
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    },
  },

  solidity: "0.8.17",
  settings: {
    optimizer: {
      //   enabled: withOptimizations,
      runs: 200,
    },
  },
  gasReporter: {
    currency: "CHF",
    enabled: false,
    gasPrice: 20,
  },
};
