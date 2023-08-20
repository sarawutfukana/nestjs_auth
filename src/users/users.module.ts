import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LogFormatService } from 'src/common/services/logFormat.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, LogFormatService],
})
export class UsersModule {}
