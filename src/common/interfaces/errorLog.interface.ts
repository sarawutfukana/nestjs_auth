export interface ErrorLog {
  severity: 'ERROR';
  requestId: string;
  code: string;
  message: string;
  detail: any;
  dateTime: string;
}
