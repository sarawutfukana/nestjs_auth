import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HeaderLogInterface } from 'src/common/interfaces/headerLog.interface';
import { User } from './entities/user.entity';
import { ErrorLog } from 'src/common/interfaces/errorLog.interface';
import { LogFormatService } from 'src/common/services/logFormat.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import configuration from 'src/config/configuration';
import { UserResponseInterface } from './interfaces/userResponse.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logService: LogFormatService,
  ) {}

  async create(
    headerLog: HeaderLogInterface,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const userByUsername = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });

      if (userByUsername) {
        const errorLog: ErrorLog = {
          requestId: headerLog.requestId,
          vendorId: headerLog.venDorId,
          success: false,
          code: 'USER-422-001',
          message: 'username has already been taken',
          detail: '',
        };
        this.logService.error(errorLog);
        throw new HttpException(errorLog, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      const errorLog: ErrorLog = {
        requestId: headerLog.requestId,
        vendorId: headerLog.venDorId,
        success: false,
        code: 'USER-500-001',
        message: 'create user failed',
        detail: error,
      };
      this.logService.error(errorLog);
      throw new HttpException(errorLog, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //save token to database
  //https://www.jittagornp.me/blog/best-practice-to-design-oauth-token/

  generateJwt(user: User, expire: string): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configuration().jwt.secret,
      { expiresIn: expire },
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        accessToken: this.generateJwt(user, configuration().jwt.expire),
        refreshToken: this.generateJwt(user, configuration().jwt.refreshExpire),
      },
    };
  }
}
