import { Body, Controller, Post } from '@nestjs/common';
import { CreateLimitDto } from '../dtos/general.dto';
import { LimitsService } from './limits.service';

@Controller('limits')
export class LimitsController {
    constructor(private limitsService: LimitsService){}
    @Post('create')
    async createLimit(@Body() createLimitDto: CreateLimitDto){
        return await this.limitsService.createLimit(createLimitDto);
    }
}
