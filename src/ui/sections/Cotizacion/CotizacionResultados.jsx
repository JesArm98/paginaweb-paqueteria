"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CotizacionResultados = ({ cotizacionData, onModificarCotizacion, onCerrar }) => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado del Snackbar

  console.log(emailUsuario);
  console.log(cotizacionData);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleConfirmarEmail = () => {
    if (emailUsuario && emailUsuario.includes("@")) {
      console.log(
        "Se enviará la cotización con estos datos:\n" +
          JSON.stringify(cotizacionData, null, 2) +
          "\n" +
          JSON.stringify({ email: emailUsuario }, null, 2)
      );

      // 🔹 Muestra el Snackbar de éxito primero
      setOpenSnackbar(true);

      // 🔹 Espera 2 segundos antes de cerrar el modal, asegurando que el Snackbar se muestre
      setTimeout(() => {
        onCerrar(); // Cierra el modal después de que el usuario vea el mensaje
        setEmailUsuario(""); // Resetea el email
      }, 2000); 
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ pb: 3 }}>
        Envianos tu cotización ingresando tu correo electrónico
      </Typography>
      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        value={emailUsuario}
        onChange={(e) => setEmailUsuario(e.target.value)}
        error={emailUsuario !== "" && !emailRegex.test(emailUsuario)}
        helperText={
          emailUsuario !== "" && !emailRegex.test(emailUsuario)
            ? "Ingresa un correo válido (ejemplo@dominio.com)"
            : ""
        }
      />
      <Box sx={{ display: "flex", mt: 2, justifyContent: "end", gap: 2 }}>
        <Button onClick={onModificarCotizacion} variant="outlined" color="error" sx={{ width: "fit-content", textTransform: "none", borderRadius: "20px" }} startIcon={<ArrowBackIcon/>}>
          Volver a cotización
        </Button>
        <Button
          fullWidth
          color="success"
          variant="outlined"
          onClick={handleConfirmarEmail}
          disabled={!emailUsuario || !emailUsuario.includes("@")}
          sx={{ textTransform: "none", width: "fit-content", borderRadius: "20px" }}
        >
          Confirmar
        </Button>
      </Box>

      {/* Snackbar de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Será contactado por nuestro equipo de atención en breve.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CotizacionResultados;
