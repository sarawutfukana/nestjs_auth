import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ExtendRequest } from 'src/common/interfaces/extendRequest.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LogFormatService } from 'src/common/services/logFormat.service';
import { HeaderLogInterface } from 'src/common/interfaces/headerLog.interface';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logService: LogFormatService,
  ) {}

  @Post('create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(
    @Request() req: ExtendRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    this.logService.incoming(req);
    const headerLog: HeaderLogInterface = {
      requestId: req.requestId,
      venDorId: req.vendorId,
    };
    const user = await this.usersService.create(headerLog, createUserDto);
  }
}
