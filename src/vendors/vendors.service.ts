import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async authVendors(token: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({
      where: { token: token },
    });

    if (!vendor) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Convert the expire date to a dayjs object
    const expireDate = dayjs(vendor.expire);
    if (!vendor.status || expireDate.isBefore(dayjs())) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return vendor;
  }
}
