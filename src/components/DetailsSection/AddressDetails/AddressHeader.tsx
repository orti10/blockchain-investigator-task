import { Typography, Chip } from "@mui/material";
import constants from "../../../types/constants";
import "../../DetailsSection/DetailsSection.css";

interface AddressHeaderProps {
  label: string;
  balance?: number;
}

const AddressHeader = (props: AddressHeaderProps) => (
  <div className="address-header">
    <Typography className="address-subtitle">
      {constants.AddressDetails.Address}
    </Typography>
    <Typography className="address-label">{props.label}</Typography>
    <Chip
      label={props.balance && props.balance > 0 ? "Active" : "Empty"}
      color={props.balance && props.balance > 0 ? "success" : "default"}
      size="small"
      className="address-chip"
    />
  </div>
);

export default AddressHeader;
