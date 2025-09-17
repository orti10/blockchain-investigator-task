import React from "react";
import { Typography } from "@mui/material";
import "../../DetailsSection/DetailsSection.css";

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = (props: InfoRowProps) => (
  <div className="info-row">
    <Typography className="info-label">{props.label}</Typography>
    <Typography className="info-value">{props.value}</Typography>
  </div>
);

export default InfoRow;
