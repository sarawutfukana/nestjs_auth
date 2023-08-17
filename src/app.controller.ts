import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ExtendRequest } from './common/interfaces/extendRequest.interface';
import { LogFormatService } from './common/services/logFormat.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() req: ExtendRequest): object {
    new LogFormatService().incoming(req);
    return this.appService.getHello('index');
  }
}
