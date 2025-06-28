export interface Metric {
  cpu: { load: number };
  memory: { total: number; used: number; free: number };
  disk: { fs: string; size: number; used: number; use: number }[];
  network: { iface: string; rx_bytes: number; tx_bytes: number }[];
  createdAt: string;
}