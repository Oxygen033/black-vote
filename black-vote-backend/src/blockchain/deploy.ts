import { ethers } from "hardhat";
import * as fs from 'fs';

async function main() {
    const Voting = await ethers.getContractFactory("Voting");

    const voting = await Voting.deploy();

    const deploymentReceipt = await voting.deploymentTransaction().wait();

    const contractAddress = deploymentReceipt.contractAddress;
    console.log("Voting deployed to:", contractAddress);

    if (!process.env.VOTING_CONTRACT_ADDRESS) {
        fs.writeFileSync('.env', `VOTING_CONTRACT_ADDRESS=${contractAddress}\n`, { flag: 'a' });
    } else {
        fs.readFile('.env', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            const updatedContent = data.replace(`VOTING_CONTRACT_ADDRESS=${process.env.VOTING_CONTRACT_ADDRESS}`, `VOTING_CONTRACT_ADDRESS=${contractAddress}\n`);

            fs.writeFileSync('.env', updatedContent, 'utf8');
        });
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
