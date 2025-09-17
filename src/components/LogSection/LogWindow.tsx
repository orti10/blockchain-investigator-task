import React, { useRef, useEffect } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import constants from "../../types/constants";
import "./LogWindow.css";

interface LogWindowProps {
  logs: Array<{ timestamp: string; message: string }>;
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
}

const LogWindow = ({ logs, isOpen, onToggle, onClear }: LogWindowProps) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (logEndRef.current && isOpen) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div className={`log-container ${isOpen ? "" : "collapsed"}`}>
      <div className="log-header" onClick={onToggle}>
        <Typography variant="subtitle2">Logs ({logs.length})</Typography>
        <div>
          <Tooltip title={isOpen ? "Collapse" : "Expand"}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              {isOpen ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ExpandLessIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear logs">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              disabled={logs.length === 0}
            >
              <ClearAllIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {isOpen && (
        <div className="log-content">
          {logs.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              {constants.ErrorMessages.NoLogsAvailable}
            </Typography>
          ) : (
            logs.map((log, index) => (
              <div className="log-entry" key={index}>
                <span className="timestamp">[{formatTime(log.timestamp)}]</span>
                <span className="message">{log.message}</span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      )}
    </div>
  );
};

export default LogWindow;
