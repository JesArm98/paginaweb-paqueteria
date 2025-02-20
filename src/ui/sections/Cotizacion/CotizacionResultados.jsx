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

const CotizacionResultados = ({ cotizacionData, onModificarCotizacion, onCerrar }) => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado del Snackbar

  console.log(emailUsuario);
  console.log(cotizacionData);

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
        Confirma tu cotización ingresando tu correo electrónico
      </Typography>
      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        value={emailUsuario}
        onChange={(e) => setEmailUsuario(e.target.value)}
        error={emailUsuario !== "" && !emailUsuario.includes("@")}
        helperText={emailUsuario !== "" && !emailUsuario.includes("@") ? "Ingresa un correo válido" : ""}
      />
      <Box sx={{ display: "flex", mt: 2, justifyContent: "end", gap: 2 }}>
        <Button onClick={onModificarCotizacion} variant="outlined" sx={{ width: "fit-content", textTransform: "none", borderRadius: "20px" }}>
          Volver al formulario
        </Button>
        <Button
          fullWidth
          variant="contained"
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
