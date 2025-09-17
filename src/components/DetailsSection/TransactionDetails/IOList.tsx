import { Typography } from "@mui/material";
import { shortenAddress } from "api/blockchain";
import { formatBtc } from "utils/utils";
import "../../DetailsSection/DetailsSection.css";

const IOList = ({
  title,
  items,
  type,
}: {
  title: string;
  items: any[];
  type: "input" | "output";
}) => (
  <div className="io-list">
    <Typography className="io-list-title">
      {title} ({items.length})
    </Typography>
    <div className="io-list-items">
      {items.map((item, i) => (
        <div key={i} className="io-list-item">
          <Typography className="io-list-item-address">
            {item.prev_out?.addr
              ? shortenAddress(item.prev_out.addr, 4)
              : item.addr
                ? shortenAddress(item.addr, 4)
                : type === "input"
                  ? "Coinbase"
                  : "OP_RETURN"}
          </Typography>
          <Typography className="io-list-item-value">
            {formatBtc(item.prev_out?.value ?? item.value ?? 0)}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);

export default IOList;
