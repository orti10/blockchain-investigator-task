import { satoshisToBtc } from "api/blockchain";
import { GraphNode, GraphLink, GraphData } from "../types/types";
import { ProcessTransactionsParams } from "../types/types";

export const isValidBitcoinAddress = (addr: string) =>
  /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-zAC-HJ-NP-Z02-9]{11,71}$/.test(
    addr
  );

export const formatBtc = (satoshis: number): string =>
  `${satoshisToBtc(satoshis).toFixed(8)} BTC`;

export const formatDate = (timestamp: number): string =>
  new Date(timestamp * 1000).toLocaleString();

export const processTransactions = ({
  data,
  processedTxs,
  addLog,
}: ProcessTransactionsParams): GraphData => {
  const newNodes: GraphNode[] = [];
  const newLinks: GraphLink[] = [];
  const nodeIds = new Set<string>();

  // Add root node (search address)
  newNodes.push({
    id: data.address,
    label: data.address,
    type: "address",
    data,
  });
  nodeIds.add(data.address);

  data.txs.forEach((tx) => {
    if (processedTxs.has(tx.hash)) return;
    processedTxs.add(tx.hash);

    // Add transaction node
    newNodes.push({
      id: tx.hash,
      label: `TX:${tx.hash.slice(0, 6)}...`,
      type: "transaction",
      data: tx,
    });
    nodeIds.add(tx.hash);

    // Connect all transactions to root
    newLinks.push({
      source: data.address,
      target: tx.hash,
      value: tx.out.reduce((sum: number, o: any) => sum + o.value, 0),
      txHash: tx.hash,
    });

    // Add transaction outputs
    tx.out.forEach((out: any) => {
      if (out.addr && !nodeIds.has(out.addr)) {
        newNodes.push({
          id: out.addr,
          label: out.addr,
          type: "address",
          data: {
            address: out.addr,
            final_balance: out.value,
            total_received: out.value,
            total_sent: out.value,
            n_tx: 1,
            txs: [],
            hash160: "",
          },
        });
        nodeIds.add(out.addr);

        newLinks.push({
          source: data.address,
          target: out.addr,
          value: out.value,
          txHash: tx.hash,
        });
      }
    });
  });

  addLog(`Loaded ${processedTxs.size} transactions`);

  return { nodes: newNodes, links: newLinks };
};
