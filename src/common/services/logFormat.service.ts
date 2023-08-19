import { Injectable, Logger, Request } from '@nestjs/common';
import { ExtendRequest } from '../interfaces/extendRequest.interface';
import { IncomingLog } from '../interfaces/incomingLog.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class LogFormatService {
  incoming(@Request() req: ExtendRequest): void {
    const formattedLogData: IncomingLog = {
      severity: 'INFO',
      requestId: req.requestId,
      requestInfo: {
        method: req.method,
        url: req.url,
        queryParams: req.query,
        body: req.body,
      },
      dateTime: dayjs().format(),
      message: 'Incoming Request',
      host: req.ip,
    };
    Logger.log(formattedLogData);
  }
}
