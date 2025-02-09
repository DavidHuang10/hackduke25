import { Injectable } from '@nestjs/common';
import { CreateLimitDto } from '../dtos/general.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { create } from 'domain';
import { Days } from '@prisma/client';

@Injectable()
export class LimitsService {
    constructor(private prisma: PrismaService){}
    async createLimit(createLimitDto: CreateLimitDto){
        const transformedDays = createLimitDto.recurringDays.map(
            day => Days[day.toUpperCase() as keyof typeof Days]  // Convert to Enum
        );

        const convertedDomainGroups = await this.prisma.domainGroup.findMany({
            where: {
                id: {in: createLimitDto.domainGroupIds}
        }})
        return await this.prisma.limits.create({
            data: {
                userId: createLimitDto.userId,
                name: createLimitDto.name,
                startTime: createLimitDto.startTime,
                endTime: createLimitDto.endTime,
                allowedDistractionTime: createLimitDto.allowedDistractionTime,
                recurringDays: transformedDays,
                specificDomains: createLimitDto.specificDomains,
                domainGroups: {
                    connect: createLimitDto.domainGroupIds.map(id => ({ id })) 
                }
            }
        })
    }
}
