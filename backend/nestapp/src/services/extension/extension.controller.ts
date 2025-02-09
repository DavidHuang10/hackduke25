import { Controller, Post, Body } from '@nestjs/common';
import { ExtensionService } from './extension.service';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post('record')
  record(@Body() data: { user: string | null; domain: string | null; time: number }) {
    return this.extensionService.record(data);
  }
}
