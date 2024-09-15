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
* Docker

### Installation
(will be changed soon)
1. Clone the repo
2. Install dependencies
   ```bash
   yarn install
   ```
3. Compile contract
   ```bash
   npx hardhat compile
   ```
4. Launch hardhat node
   ```bash
   npx hardhat node
   ```
5. In separate terminal launch deploy script
   ```bash
   npx hardhat run src/blockchain/deploy.ts --network localhost
   ```
6. Launch app itself
   ```bash
   yarn run start
   ```
## Roadmap

- [ ] Frontend
- [ ] Documentation
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