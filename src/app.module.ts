import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import dbConfig from './ormconfig';
import { ThrottlerModule } from '@nestjs/throttler';
import { VendorsModule } from './vendors/vendors.module';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from './common/middleware/requestId.middleware';
import { AuthVendorMiddleware } from './common/middleware/authVendor.middleware';
import { UsersModule } from './users/users.module';
import { LogFormatService } from './common/services/logFormat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(dbConfig),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    VendorsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogFormatService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    //make requestId for all route
    consumer.apply(RequestIdMiddleware).forRoutes('*');

    // authen vendord for all route exclude index route
    consumer
      .apply(AuthVendorMiddleware)
      .exclude({ path: '/', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
