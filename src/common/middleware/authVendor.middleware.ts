import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { VendorsService } from 'src/vendors/vendors.service';

@Injectable()
export class AuthVendorMiddleware implements NestMiddleware {
  constructor(private readonly vendorsServices: VendorsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key'] ?? req.headers['X-API-KEY'];
    let lang = req.headers['lang'];

    if (!token) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!lang) {
      lang = 'th';
    }

    req['lang'] = lang;

    const vendor = await this.vendorsServices.authVendors(token.toString());
    req['vendorId'] = vendor.id;
    req['vendorName'] = vendor.name;

    next();
  }
}
