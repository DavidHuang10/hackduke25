import { Module } from '@nestjs/common';
import { LimitsController } from './limits.controller';
import { LimitsService } from './limits.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [LimitsController],
  providers: [LimitsService]
})
export class LimitsModule {}
