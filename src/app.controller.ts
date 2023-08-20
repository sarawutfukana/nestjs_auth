import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ExtendRequest } from './common/interfaces/extendRequest.interface';
import { LogFormatService } from './common/services/logFormat.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logService: LogFormatService,
  ) {}

  @Get()
  getHello(@Request() req: ExtendRequest): object {
    this.logService.incoming(req);
    return this.appService.getHello('index');
  }
}
