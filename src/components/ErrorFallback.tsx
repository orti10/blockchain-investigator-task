import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import constants from "../types/constants";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = (props: ErrorFallbackProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ color: "error.main", mb: 2 }}>
          <ErrorOutlineIcon sx={{ fontSize: 60 }} />
        </Box>

        <Typography variant="h5" gutterBottom>
          {constants.ErrorMessages.SomethingWentWrong}
        </Typography>

        <Box
          sx={{
            p: 2,
            my: 3,
            bgcolor: "background.default",
            borderRadius: 1,
            textAlign: "left",
            overflow: "auto",
            maxHeight: "200px",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {constants.ErrorMessages.ErrorDetails}:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ mt: 1, whiteSpace: "pre-wrap" }}
          >
            {props.error.message}
          </Typography>

          {props.error.stack && (
            <Typography
              variant="caption"
              component="pre"
              sx={{ mt: 2, fontSize: "0.7rem", opacity: 0.7 }}
            >
              {props.error.stack}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={props.resetErrorBoundary}
          sx={{ mt: 2 }}
        >
          {constants.ErrorMessages.TryAgain}
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorFallback;
