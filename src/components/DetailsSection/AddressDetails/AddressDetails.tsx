import React from "react";
import { Box, Typography } from "@mui/material";
import { GraphNode } from "../../../types/types";
import constants from "../../../types/constants";
import AddressInfo from "../AddressDetails/AddressInfo";
import TransactionInfo from "../TransactionDetails/TransactionInfo";
import "../../DetailsSection/DetailsSection.css";

interface AddressDetailsProps {
  node: GraphNode | null;
  addLog: (message: string) => void;
}

const AddressDetails = (props: AddressDetailsProps) => {
  if (!props.node) {
    return (
      <Box className="address-details">
        <Typography variant="body1">{constants.SelectNode}</Typography>
      </Box>
    );
  }

  const { type, data, label } = props.node;

  return type === "address" ? (
    <AddressInfo data={data} label={label} addLog={props.addLog} />
  ) : (
    <TransactionInfo data={data} />
  );
};

export default AddressDetails;
