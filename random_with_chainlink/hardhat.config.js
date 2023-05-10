require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { BSC_RPC_URL, PRIVATE_KEY, BSCSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    bsctestnet: {
      url: BSC_RPC_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 20000000000, // 20 Gwei
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
};
