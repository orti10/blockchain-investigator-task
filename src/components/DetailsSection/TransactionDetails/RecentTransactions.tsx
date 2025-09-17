import React from "react";
import { Typography, Paper } from "@mui/material";
import constants from "../../../types/constants";
import { shortenAddress } from "api/blockchain";
import { formatDate } from "utils/utils";
import "../../DetailsSection/DetailsSection.css";

interface RecentTransactionsProps {
  txs: any[];
  addLog: (msg: string) => void;
}

const RecentTransactions = (props: RecentTransactionsProps) => (
  <div className="recent-transactions">
    <Typography variant="subtitle1" className="recent-transactions-title">
      {constants.AddressDetails.RecentTransactions}
    </Typography>
    <div className="recent-transactions-list">
      {props.txs.slice(0, 5).map((tx) => (
        <Paper
          key={tx.hash}
          className="recent-transaction-item"
          onClick={() => props.addLog(`Selected transaction: ${tx.hash}`)}
        >
          <div className="recent-transaction-content">
            <Typography className="recent-transaction-hash">
              {shortenAddress(tx.hash, 4)}
            </Typography>
            <Typography className="recent-transaction-date">
              {formatDate(tx.time)}
            </Typography>
          </div>
        </Paper>
      ))}
    </div>
  </div>
);

export default RecentTransactions;
