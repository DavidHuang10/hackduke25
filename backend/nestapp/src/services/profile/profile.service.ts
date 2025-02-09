import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService){}
    async getDetails(){

    }

    async createUser(createUserDto: CreateUserDto){
        return this.prisma.user.create({data: {name: createUserDto.name, username: createUserDto.username}})
    }
}
