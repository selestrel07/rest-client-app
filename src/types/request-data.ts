export type RequestData = {
  latency: number;
  status: number;
  timestamp: string | number;
  method: string;
  requestSize: number;
  responseSize: number;
  errorType?: string;
  url: string;
  headers: Record<string, string>;
  body: string;
};

export type RequestHistory = {
  method: string;
  url: string;
  timestamp: number;
  latency: number;
  status: number;
  requestSize: number;
  responseSize: number;
  errorType: string | null;
};
