import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HeaderLogInterface } from 'src/common/interfaces/headerLog.interface';
import { User } from './entities/user.entity';
import { ErrorLog } from 'src/common/interfaces/errorLog.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  create(
    headerLog: HeaderLogInterface,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      console.log('xxx');
    } catch (error) {
      const errorLog: ErrorLog = {
        severity: 'ERROR',
        requestId: headerLog.requestId,
        code: 'USER-500-001',
        message: 'create user failed',
        detail: error,
        dateTime: dayjs().format(),
      };

      Logger.error(errorLog);
    }
  }
}
