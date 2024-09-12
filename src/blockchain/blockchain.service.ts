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

    async createVoting(_votingName: string, _candidates: string[]) {
        let votingId: any;
        this.contract.on('VotingCreated', (_votingId, voteName) => {
            //console.log(`Voting Created: ${_votingId}, Name: ${voteName}`);
            votingId = _votingId;
        });
        const tx = await this.contract.createVote(_votingName, _candidates);
        await tx.wait();
        return { votingId: votingId, votingName: _votingName };
    }
}
