import { Request } from 'express';

export interface ExtendRequest extends Request {
  requestId: string;
  vendorId: string;
  lang: string;
}
