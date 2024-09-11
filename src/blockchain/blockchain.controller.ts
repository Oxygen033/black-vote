import { Controller, Get, InternalServerErrorException, Param, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
    constructor(
        private readonly blockchainService: BlockchainService
    ) { }

    @Post('vote/:voting/:candidate')
    async vote(@Param('voting') voting: string, @Param('candidate') candidate: string) {
        try {
            await this.blockchainService.vote(voting, candidate);
        } catch (ex) {
            throw new InternalServerErrorException(ex.reason);
        }
        return 'Voted successfully';
    }

    @Get('get-votes/:voting/:candidate')
    async getVotes(@Param('voting') voting: string, @Param('candidate') candidate: string) {
        return await this.blockchainService.getVotes(voting, candidate);
    }

    @Get('get-candidates/:voting/:candidate')
    async getCandidates(@Param('voting') voting: string, @Param('candidate') candidate: string) {
        return await this.blockchainService.getVotes(voting, candidate);
    }

    @Post('create-voting/:votingName')
    async createVoting(@Param('votingName') votingName: string, @Query('candidates', new ParseArrayPipe({ items: String, separator: ',' })) candidates: string[]) {
        return await this.blockchainService.createVoting(votingName, candidates);
    }
}
