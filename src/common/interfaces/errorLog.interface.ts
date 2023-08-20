export interface ErrorLog {
  requestId: string;
  vendorId: string;
  success: false;
  code: string;
  message: string;
  detail: any;
}
