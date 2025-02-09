import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}
    @Get('details')
    async getDetails(){
        return await this.profileService.getDetails();
    }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto){
        return await this.profileService.createUser(createUserDto);
    }
}
