import { TextField } from "@mui/material";
import constants from "../../types/constants";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { IconButton } from "@mui/material";

interface SearchTextFieldProps {
  address: string;
  setAddress: (address: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handlePaste: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const SearchTextField = (props: SearchTextFieldProps) => {
  return (
    <TextField
      style={{ backgroundColor: "#266798" }}
      fullWidth
      variant="outlined"
      placeholder={constants.EnterAddress}
      value={props.address}
      onChange={(e) => props.setAddress(e.target.value)}
      onKeyDown={props.handleKeyDown}
      error={!!props.error}
      helperText={props.error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={props.handlePaste}>
              <ContentPasteIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;
