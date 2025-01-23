import { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
