# Black-vote
Simple blockchain platform for unique and secure voting

work in progress...

### Built With
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Solidity][Solidity]][Solidity-url]
* [![Hardhat][Hardhat]][Hardhat-url]
* [![Ethereum][Ethereum]][Ethereum-url]

### Prerequisites
* NodeJS
* yarn
* Docker compose

### Installation
**Only supports local network deployment, will be changed soon with configs and CI/CD changes**
1. Clone the repo

Using Docker Compose
2. Go to /black-vote-backend. Create .env file and add line CONTRACT_DEPLOY_URL=[deployment address] (127.0.0.1:8545 by default for localhost)

3. Run Docker Compose
   ```bash
   docker-compose up
   ```

Without Docker Compose

2. Go to /black-vote-backend. Install dependencies
   ```bash
   yarn install
   ```
3. Create .env file and add line CONTRACT_DEPLOY_URL=[deployment address] (127.0.0.1:8545 by default for localhost)
4. Compile contract
   ```bash
   npx hardhat compile
   ```
5. Launch hardhat node
   ```bash
   npx hardhat node
   ```
6. In separate terminal launch deploy script
   ```bash
   npx hardhat run src/blockchain/deploy.ts --network localhost
   ```
7. Launch app itself
   ```bash
   yarn run start
   ```
8. Go to /black-vote-frontend.
9. Install dependencies
   ```bash
   yarn install
   ```
10. Launch frontend
   ```bash
   yarn run dev
   ```
## Roadmap

- [ ] Backend
   - [x] Handle vote change (questionable)
   - [ ] Checks
   - [ ] Optimization 
- [ ] Frontend
   - [x] Stub
   - [ ] Fix votes counts
   - [ ] Modals fixes
   - [ ] Styles
- [x] Documentation
- [ ] Testing
- [ ] CI/СD
- [ ] Better architecture with high-load support 

<!-- MARKDOWN LINKS & IMAGES -->
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=black
[TypeScript-url]: https://typescriptlang.org
[Solidity]: https://img.shields.io/badge/solidity-363636?style=for-the-badge&logo=solidity&logoColor=white
[Solidity-url]: https://docs.soliditylang.org/
[Hardhat]: https://img.shields.io/badge/Hardhat-FFCF24?style=for-the-badge&logo=hardhat&logoColor=black
[Hardhat-url]: https://hardhat.org/
[Ethereum]: https://img.shields.io/badge/ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white
[Ethereum-url]: https://ethereum.org/
