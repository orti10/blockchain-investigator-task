import React from "react";
import constants from "../../../types/constants";
import IOList from "./IOList";
import InfoRow from "./InfoRow";
import SectionTitle from "./SectionTitle";
import TransactionHeader from "./TransactionHeader";
import { formatDate, formatBtc } from "../../../utils/utils";
import "../../DetailsSection/DetailsSection.css";

interface TransactionInfoProps {
  data: any;
}

const TransactionInfo = (props: TransactionInfoProps) => {
  const infoRows = [
    {
      label: constants.AddressDetails.Time,
      value: props.data?.time ? formatDate(props.data.time) : "Unknown",
    },
    {
      label: constants.AddressDetails.Size,
      value: `${props.data?.size || 0} bytes`,
    },
    {
      label: constants.AddressDetails.Fee,
      value: props.data?.fee ? formatBtc(props.data.fee) : "N/A",
    },
  ];

  const ioLists = [
    {
      title: constants.AddressDetails.Inputs,
      items: props.data?.inputs || [],
      type: "input" as const,
    },
    {
      title: constants.AddressDetails.Outputs,
      items: props.data?.out || [],
      type: "output" as const,
    },
  ];

  return (
    <div className="transaction-info">
      <SectionTitle title={constants.AddressDetails.TransactionDetails} />

      <TransactionHeader
        hash={props.data?.hash}
        confirmations={props.data?.confirmations}
      />

      {infoRows.map((row) => (
        <InfoRow key={row.label} label={row.label} value={row.value} />
      ))}

      <div className="transaction-io-list">
        {ioLists.map((io) => (
          <IOList
            key={io.type}
            title={io.title}
            items={io.items}
            type={io.type}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionInfo;
