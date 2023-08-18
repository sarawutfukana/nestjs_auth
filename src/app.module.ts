import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import ormconfig from './ormconfig';
import { ThrottlerModule } from '@nestjs/throttler';
import { VendorsModule } from './vendors/vendors.module';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from './common/middleware/requestId.middleware';
import { AuthVendorMiddleware } from './common/middleware/authVendor.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(ormconfig),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    VendorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
