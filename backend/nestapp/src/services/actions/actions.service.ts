import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ActionsService {
  constructor(private prisma: PrismaService) {}

  async getActionsForToday(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.prisma.action.findMany({
      where: {
        userId: userId, // Filter by userId
        time: {
          gte: today.toISOString(),
          lt: tomorrow.toISOString(),
        },
      },
      orderBy: { time: 'asc' },
    });
  }
}
