import React, { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

import GraphView from "./components/Graph/GraphView";
import SearchBar from "./components/SearchSection/SearchBar";
import AddressDetails from "./components/DetailsSection/AddressDetails/AddressDetails";
import LogWindow from "./components/LogSection/LogWindow";
import ErrorFallback from "./components/ErrorFallback";
import { GraphNode } from "./types/types";
import constants from "./types/constants";
// React Query client
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

// MUI Theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
});

const App = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [logs, setLogs] = useState<{ timestamp: string; message: string }[]>(
    []
  );
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  // <-- NEW: store selected address
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const addLog = useCallback((message: string) => {
    setLogs((prev) => [
      ...prev,
      { timestamp: new Date().toISOString(), message },
    ]);
  }, []);

  const handleNodeSelect = useCallback(
    (node: GraphNode) => {
      setSelectedNode(node);
      addLog(`${constants.Selected}: ${node.type}: ${node.label}`);
    },
    [addLog]
  );

  const handleSearch = useCallback(
    (address: string) => {
      // Force a new search by updating the key
      setSearchKey((prev) => prev + 1);
      setSelectedAddress(address);
      addLog(`${constants.SearchingAddress}: ${address}`);
    },
    [addLog]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                bgcolor: "primary.main",
                p: 2,
                color: "primary.contrastText",
              }}
            >
              <Container maxWidth="xl">
                <h1>Blockchain Investigator</h1>
                {/* pass handleSearch instead of addLog */}
                <SearchBar onSearch={handleSearch} />
              </Container>
            </Box>

            {/* Main */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                minHeight: "calc(120vh - 64px)",
              }}
            >
              {/* Left side: Graph + Search */}
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid",
                  borderColor: "divider",
                }}
              >
                <GraphView
                  key={searchKey}
                  selectedAddress={selectedAddress}
                  onNodeSelect={handleNodeSelect}
                  addLog={addLog}
                />
              </Box>
              {/* Right side: Details */}
              <Box sx={{ width: "40%", zIndex: 1 }}>
                <AddressDetails node={selectedNode} addLog={addLog} />
              </Box>
            </Box>

            {/* Logs */}
            <LogWindow
              logs={logs}
              isOpen={isLogOpen}
              onToggle={() => setIsLogOpen(!isLogOpen)}
              onClear={() => setLogs([])}
            />
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
