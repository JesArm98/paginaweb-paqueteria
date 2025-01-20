"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const RastreoEnvios = () => {
  const [guia, setGuia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de rastreo
    console.log("Rastreando guía:", guia);
  };

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(45deg, #007bff22, #007bff11)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <LocalShippingIcon sx={{ fontSize: 60, color: "#007bff", mb: 2 }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                background: "linear-gradient(45deg, #007bff, #007bff99)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Rastrea tu Envío
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Rastrea tus envíos FTL, LTL o paquetería en tiempo real
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, mb: 4, color: "#6b7280" }}>
              Monitorea el estado de tu carga las 24 horas del día
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              placeholder="Ingresa tu número de guía"
              value={guia}
              onChange={(e) => setGuia(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "15px",
                px: 4,
                backgroundColor: "#007bff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Rastrear
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RastreoEnvios;
