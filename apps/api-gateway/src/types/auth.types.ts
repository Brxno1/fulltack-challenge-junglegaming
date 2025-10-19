export interface ServiceHealthInfo {
  status: string;
  database: string;
  timestamp: string;
}

export interface GatewayHealthResponse {
  services: {
    auth: ServiceHealthInfo;
    tasks: ServiceHealthInfo;
  };
}
