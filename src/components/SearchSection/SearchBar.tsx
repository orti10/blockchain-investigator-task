import React, { useRef, useState } from "react";
import { Button, Box } from "@mui/material";
import constants from "../../types/constants";
import { isValidBitcoinAddress } from "../../utils/utils";
import SearchTextField from "./SearchTextField";

interface SearchBarProps {
  onSearch: (address: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const prevSearchRef = useRef<string | null>(null);

  const handleSearch = () => {
    const trimmed = address.trim();
    if (!trimmed) return setError(constants.EnterAddress);
    if (!isValidBitcoinAddress(trimmed))
      return setError(constants.ErrorMessages.InvalidAddress);
    setError(null);
    props.onSearch(trimmed);
    prevSearchRef.current = trimmed;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddress(text);
    } catch {}
  };
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.key === "Enter" && handleSearch();

  return (
    <Box sx={{ display: "flex", gap: 1, width: "100%", maxWidth: 800 }}>
      <SearchTextField
        address={address}
        setAddress={setAddress}
        error={error}
        setError={setError}
        handlePaste={handlePaste}
        handleKeyDown={handleKeyDown}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={!address.trim()}
      >
        {constants.Search}
      </Button>
    </Box>
  );
};

export default SearchBar;
