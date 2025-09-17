import React from "react";
import { Typography, Divider } from "@mui/material";
import constants from "../../../types/constants";
import AddressStats from "./AddressStats";
import AddressHeader from "./AddressHeader";
import RecentTransactions from "../TransactionDetails/RecentTransactions";
import "../../DetailsSection/DetailsSection.css";

interface AddressInfoProps {
  data: any;
  label: string;
  addLog: (message: string) => void;
}

const AddressInfo = (props: AddressInfoProps) => {
  return (
    <div className="address-info">
      <Typography variant="h6" className="address-info-title">
        {constants.AddressDetails.Title}
      </Typography>
      <Divider className="address-info-divider" />

      {/* Address and Status */}
      <AddressHeader label={props.label} balance={props.data?.final_balance} />

      {/* Stats */}
      <AddressStats data={props.data} />

      {/* Recent Transactions */}
      {props.data?.txs?.length > 0 && (
        <RecentTransactions txs={props.data.txs} addLog={props.addLog} />
      )}
    </div>
  );
};

export default AddressInfo;
