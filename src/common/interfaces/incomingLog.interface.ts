export interface IncomingLog {
  level: string;
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
