import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService implements OnModuleInit {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    private contractAdress = process.env.VOTING_CONTRACT_ADDRESS || 'http://127.0.0.1:8545';
    private abi = [
        "function vote(string memory candidate) public",
        "function getVotes(string memory candidate) public view returns (uint256)"
    ];

    async onModuleInit() {
        this.provider = new ethers.JsonRpcProvider(`${process.env.CONTRACT_DEPLOY_URL}`);
        this.contract = new ethers.Contract(this.contractAdress, this.abi, await this.provider.getSigner());
    }

    async vote(candidate: string) {
        const tx = await this.contract.vote(candidate);
        await tx.wait();
    }

    async getVotes(candidate: string) {
        const data = await this.contract.getVotes(candidate);
        return data;
    }
}
