import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
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
        if (!JSON.stringify(await this.contract.getCandidates(votingId)).includes(candidate)) {
            throw new ForbiddenException('This candidate doesnt exist');
        }
        const tx = await this.contract.vote(votingId, candidate);
        await tx.wait();
    }

    async getVotes(votingId: string, candidate: string) {
        return await this.contract.getVotes(votingId, candidate);
    }

    async getAllVotes(votingId: string) {
        const candidates = await this.getCandidates(votingId);

        const candidateVotes = {};

        for (const candidate of candidates) {
            let votes = await this.getVotes(votingId, candidate);
            candidateVotes[candidate] = votes.toString();
        }

        return candidateVotes;
    }

    async getCandidates(votingId: string) {
        return await this.contract.getCandidates(votingId);
    }

    async addCandidate(votingId: string, candidateName: string) {
        return await this.contract.addCandidate(votingId, candidateName);
    }

    async createVoting(_votingName: string, _candidates: string[]) {
        return new Promise(async (resolve, reject) => {
            let votingId: string;

            this.contract.once('VotingCreated', (_votingId, voteName) => {
                votingId = _votingId;
                console.log('event caught, ' + votingId);
                resolve({ votingId: votingId, votingName: _votingName });
            });

            try {
                const tx = await this.contract.createVote(_votingName, _candidates);
                await tx.wait();
            } catch (error) {
                reject(error);
            }
        });
    }

}
