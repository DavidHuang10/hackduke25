import { Controller, Post } from '@nestjs/common';
import { ExtensionService } from './extension.service';

@Controller('extension')
export class ExtensionController {
    constructor(private readonly extensionService: ExtensionService){}
    @Post('tabchange')
    async tabChange(){
        return await this.extensionService.tabChange();
    }
}
