import { Controller, Get, Query } from '@nestjs/common';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  // Endpoint to fetch today's actions for a specific user
  @Get('today')
  async getActionsForToday(@Query('userId') userId: string) {
    if (!userId) {
      return { error: "Missing userId" };
    }
    return this.actionsService.getActionsForToday(parseInt(userId, 10));
  }
}

// curl -X GET "http://localhost:3000/actions/today?userId=1"