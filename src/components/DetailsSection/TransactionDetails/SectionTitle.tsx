import React from "react";
import { Typography, Divider } from "@mui/material";
import "../../DetailsSection/DetailsSection.css";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = (props: SectionTitleProps) => (
  <>
    <Typography variant="h6" className="transaction-info-title">
      {props.title}
    </Typography>
    <Divider className="transaction-info-divider" />
  </>
);

export default SectionTitle;
