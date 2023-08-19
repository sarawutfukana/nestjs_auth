export interface IncomingLog {
  severity: 'INFO' | 'ERROR';
  requestId: string;
  requestInfo: {
    method: string;
    url: string;
    queryParams: any;
    body: any;
  };
  dateTime: string;
  message: string;
  host: string;
}
