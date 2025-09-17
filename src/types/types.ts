export interface Transaction {
  hash: string;
  time: number;
  size: number;
  weight: number;
  fee: number;
  inputs: TransactionInput[];
  out: TransactionOutput[];
}

export interface TransactionInput {
  prev_out: {
    addr: string;
    value: number;
    n: number;
    tx_index: number;
    spent: boolean;
  };
  script: string;
}

export interface TransactionOutput {
  value: number;
  addr: string;
  n: number;
  script: string;
  spent: boolean;
  tx_index: number;
}

export interface AddressData {
  hash160: string;
  address: string;
  n_tx: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: Transaction[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: "address" | "transaction";
  data?: AddressData | Transaction;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
  txHash: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface BlockchainApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ProcessTransactionsParams {
  data: AddressData;
  processedTxs: Set<string>;
  addLog: (msg: string) => void;
}
