import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';

@Injectable()
export class BlockchainService implements OnModuleInit {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;

    private contractAdress = process.env.VOTING_CONTRACT_ADDRESS;

    async onModuleInit() {
        const contractfile = JSON.parse(fs.readFileSync('src/blockchain/artifacts/artifacts/src/blockchain/contracts/Voting.sol/Voting.json', 'utf8'));
        this.provider = new ethers.JsonRpcProvider(`${process.env.CONTRACT_DEPLOY_URL}`);
        this.contract = new ethers.Contract(this.contractAdress, contractfile.abi, await this.provider.getSigner());
    }

    async vote(votingId: string, candidate: string) {
        const tx = await this.contract.vote(votingId, candidate);
        await tx.wait();
    }

    async getVotes(votingId: string, candidate: string) {
        return await this.contract.getVotes(votingId, candidate);
    }

    async getCandidates(votingId: string) {
        return await this.contract.getCandidates(votingId);
    }

    async createVoting(votingName: string, candidates: string[]) {
        const tx = await this.contract.createVote(votingName, candidates);
        const votingId = await tx.wait().receipt.events[0].args.votingId;
        return votingId;
    }
}
