import { Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
    constructor(
        private readonly blockchainService: BlockchainService
    ) { }

    @Post('vote/:candidate')
    async vote(@Param('candidate') candidate: string) {
        try {
            await this.blockchainService.vote(candidate);
        } catch (ex) {
            throw new InternalServerErrorException(ex.reason);
        }
        return 'Voted successfully';
    }

    @Get('get-votes/:candidate')
    async getVotes(@Param('candidate') candidate: string) {
        return await this.blockchainService.getVotes(candidate);
    }
}
