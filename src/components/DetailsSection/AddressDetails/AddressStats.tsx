import React from "react";
import { Typography } from "@mui/material";
import constants from "../../../types/constants";
import { formatBtc, formatNumber } from "../../../utils/utils";
import "../../DetailsSection/DetailsSection.css";

interface AddressStatsProps {
  data: any;
}

interface StatProps {
  label: string;
  value: string;
  bold?: boolean;
}

const AddressStats = (props: AddressStatsProps) => (
  <div className="address-stats">
    <Stat
      label={constants.AddressDetails.TotalReceived}
      value={formatBtc(props.data?.total_received || 0)}
    />
    <Stat
      label={constants.AddressDetails.TotalSent}
      value={formatBtc(props.data?.total_sent || 0)}
    />
    <Stat
      label={constants.AddressDetails.FinalBalance}
      value={formatBtc(props.data?.final_balance || 0)}
      bold
    />
    <Stat
      label={constants.AddressDetails.Transactions}
      value={formatNumber(props.data?.n_tx || 0)}
    />
  </div>
);

const Stat = (props: StatProps) => (
  <div className="stat">
    <Typography className="stat-label">{props.label}</Typography>
    <Typography className={`stat-value${props.bold ? " bold" : ""}`}>
      {props.value}
    </Typography>
  </div>
);

export default AddressStats;
