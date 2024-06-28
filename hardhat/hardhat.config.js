require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const { ETHERSCAN_API_KEY, INFURA_SEPOLIA_URL, METAMASK_PRIVATE_KEY } =
  process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: INFURA_SEPOLIA_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
