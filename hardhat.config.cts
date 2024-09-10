import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    localhost: {
      url: `${process.env.CONTRACT_DEPLOY_URL}`
    }
  },
  solidity: {
    version: '0.8.24',
  },
  paths: {
    sources: './src/blockchain/contracts',
    artifacts: './src/blockchain/artifacts/artifacts'
  }
}

export default config;
