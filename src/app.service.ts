import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  getHello(name: string): object {
    return {
      status: true,
      message: `Welcome to ${configuration().app.name}`,
      time: dayjs().format(),
      service: name,
    };
  }
}
