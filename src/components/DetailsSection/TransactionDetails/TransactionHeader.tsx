import React from "react";
import { Typography, Chip } from "@mui/material";
import "../../DetailsSection/DetailsSection.css";

interface TransactionHeaderProps {
  hash?: string;
  confirmations?: number;
}

export const TransactionHeader = (props: TransactionHeaderProps) => (
  <div className="transaction-info-header">
    <Typography className="transaction-info-label">Transaction ID</Typography>
    <Typography className="transaction-info-hash">{props.hash}</Typography>
    <Chip
      label={
        props.confirmations && props.confirmations > 0
          ? "Confirmed"
          : "Unconfirmed"
      }
      color={
        props.confirmations && props.confirmations > 0 ? "success" : "warning"
      }
      size="small"
    />
  </div>
);

export default TransactionHeader;
