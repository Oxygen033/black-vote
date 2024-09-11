import { ethers } from "hardhat";
import * as fs from 'fs';

async function main() {
    const Voting = await ethers.getContractFactory("Voting");

    const voting = await Voting.deploy();

    const deploymentReceipt = await voting.deploymentTransaction().wait();

    const contractAddress = deploymentReceipt.contractAddress;
    console.log("Voting deployed to:", contractAddress);

    fs.writeFileSync('.env', `VOTING_CONTRACT_ADDRESS=${contractAddress}\n`, { flag: 'a' });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
