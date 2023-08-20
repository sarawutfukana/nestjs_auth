import { Injectable, Logger, Request } from '@nestjs/common';
import { ExtendRequest } from '../interfaces/extendRequest.interface';
import { IncomingLog } from '../interfaces/incomingLog.interface';
import * as dayjs from 'dayjs';
import { ErrorLog } from '../interfaces/errorLog.interface';

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

  error(errorLog: ErrorLog): void {
    const obj = {
      severity: 'ERROR',
      success: errorLog.success,
      requestId: errorLog.requestId,
      vendorId: errorLog.vendorId,
      code: errorLog.code,
      message: errorLog.message,
      detail: errorLog.detail,
      dateTime: dayjs().format(),
    };
    Logger.error(obj);
  }
}
