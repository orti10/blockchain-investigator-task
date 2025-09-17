import React, { useState, useRef, useCallback, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useQuery } from "react-query";
import { fetchAddressData } from "../../api/blockchain";
import { GraphNode, GraphData } from "../../types/types";
import constants from "../../types/constants";
import { processTransactions } from "utils/utils";

interface GraphViewProps {
  selectedAddress: string | null;
  onNodeSelect: (node: GraphNode) => void;
  addLog: (msg: string) => void;
}

const GraphView = (props: GraphViewProps) => {
  const graphRef = useRef<any>();
  const [graphData, setGraphData] = useState<GraphData>({
    // nodes: [],
    // links: [],
    nodes: [
      {
        id: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        label: "Root",
        type: "address",
        data: {
          address:
            "bc1pqz6kq8r6l9kmcleuzgzqrrfhmzfx2k0mvkgn8gvd3r74q0rq9fxs8460hk",
          final_balance: 49706,
          total_received: 49706,
          total_sent: 49706,
          n_tx: 1,
          txs: [],
          hash160: "",
        },
      },
      { id: "A", label: "Node A", type: "transaction" },
      { id: "B", label: "Node B", type: "transaction" },
      { id: "C", label: "Node C", type: "transaction" },
      { id: "D", label: "Node D", type: "transaction" },
    ],
    links: [
      {
        source: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        target: "A",
        value: 1,
        txHash: "tx1",
      },
      {
        source: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        target: "B",
        value: 1,
        txHash: "tx2",
      },
      {
        source: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        target: "C",
        value: 1,
        txHash: "tx3",
      },
      {
        source: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        target: "D",
        value: 1,
        txHash: "tx4",
      },
    ],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const processedTxs = useRef<Set<string>>(new Set());

  const { data, isLoading, error } = useQuery(
    ["addressData", props.selectedAddress, currentPage],
    () =>
      props.selectedAddress
        ? fetchAddressData(props.selectedAddress, 10, (currentPage - 1) * 10)
        : Promise.resolve(null),
    {
      enabled: !!props.selectedAddress,
      onSuccess: (data) => {
        if (data) {
          const graph = processTransactions({
            data,
            processedTxs: processedTxs.current,
            addLog: props.addLog,
          });
          setGraphData((prev) => ({
            nodes: [
              ...prev.nodes,
              ...graph.nodes.filter(
                (n) => !prev.nodes.some((existing) => existing.id === n.id)
              ),
            ],
            links: [
              ...prev.links,
              ...graph.links.filter(
                (l) =>
                  !prev.links.some(
                    (existing) =>
                      existing.source === l.source &&
                      existing.target === l.target
                  )
              ),
            ],
          }));
        }
      },
    }
  );

  const handleNodeDragEnd = (node: any) => {
    node.fx = node.x;
    node.fy = node.y;
  };

  const handleNodeClick = useCallback(
    (node: GraphNode) => props.onNodeSelect(node),
    [props.onNodeSelect]
  );
  const handleLoadMore = () => setCurrentPage((p) => p + 1);

  const typedError = error as Error | null;
  const errorMessage =
    typedError?.message === "RATE_LIMIT_EXCEEDED"
      ? constants.ErrorMessages.TooManyRequests
      : typedError?.message === "NETWORK_ERROR"
        ? constants.ErrorMessages.UnableToConnect
        : typedError
          ? constants.ErrorMessages.FailedToLoadData
          : null;

  useEffect(() => {
    if (props.selectedAddress) {
      processedTxs.current.clear();
      // setGraphData({ nodes: [], links: [] });
    }
  }, [props.selectedAddress]);

  useEffect(() => {
    if (graphRef.current) {
      const fg = graphRef.current;
      // Customize forces
      fg.d3Force("charge").strength(-200); // repel nodes more
      fg.d3Force("link").distance(170); // increase link length
    }
  }, [graphData]);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            top: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(0 0 0 / 70%)",
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>{constants.Loading}</Typography>
        </Box>
      )}

      {graphData.nodes.length > 0 ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            left: 10,
            right: 10,
          }}
        >
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel={(node) => (node as GraphNode).label}
            linkDirectionalParticles={0}
            linkColor={() => "#ffffff"}
            onNodeClick={handleNodeClick}
            onNodeDragEnd={handleNodeDragEnd}
            d3VelocityDecay={0.3}
            nodeCanvasObject={(node, ctx, scale) => {
              const n = node as GraphNode;
              const isRoot = n.id === props.selectedAddress;
              const radius = isRoot ? 15 : 7;
              ctx.fillStyle = isRoot ? "red" : "blue";
              ctx.beginPath();
              ctx.arc(n.x ?? 0, n.y ?? 0, radius, 0, 2 * Math.PI);
              ctx.fill();

              const label = n.label ? String(n.label) : "N/A";
              const displayLabel =
                label.length > 5 ? label.slice(0, 5) + "..." : label;
              ctx.fillStyle = "#fff";
              ctx.font = `${10 / scale}px Sans-Serif`;
              ctx.fillText(
                displayLabel,
                (n.x ?? 0) + radius + 2,
                (n.y ?? 0) + 3
              );
            }}
          />
        </Box>
      ) : (
        <Typography
          sx={{ textAlign: "center", mt: 5, color: errorMessage ? "red" : "" }}
        >
          {errorMessage ? errorMessage : constants.VisualizeTransactionsSection}
        </Typography>
      )}

      {hasMore && !isLoading && !errorMessage && props.selectedAddress && (
        <Button
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            transform: "translateX(-50%)",
          }}
        >
          {constants.LoadMore}
        </Button>
      )}
    </Box>
  );
};

export default GraphView;
