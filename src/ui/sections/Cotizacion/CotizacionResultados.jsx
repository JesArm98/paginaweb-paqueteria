"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import StyledTextField from "@/ui/components/StyledTextField";

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = yup.object({
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: yup
    .string()
    .matches(emailRegExp, "Debe ser un correo válido.")
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo válido (ejemplo@dominio.com)"),
  telefono: yup
    .string()
    .required("El número de teléfono es requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(8, "El número debe tener al menos 8 dígitos")
    .max(15, "El número no debe exceder los 15 dígitos"),
});

const CotizacionResultados = ({
  cotizacionData,
  onModificarCotizacion,
  onCerrar,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
    },
  });

  const onSubmit = (data) => {
    setIsSubmit(true);

    // Crear un nuevo objeto que incluya toda la data original más los datos del formulario
    const cotizacionCompleta = {
      ...cotizacionData,
      ...data,
    };

    // Hacer la petición POST con axios
    axios
      .post(
        "https://mailer-750758869790.us-central1.run.app/api/enviar-correo",
        cotizacionCompleta
      )
      .then((response) => {
        // Muestra el Snackbar de éxito
        setOpenSnackbar(true);
        setIsSubmit(false);
        // Espera 2 segundos antes de cerrar el modal

          onCerrar(); // Cierra el modal después de que el usuario vea el mensaje

      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        setIsSubmit(false);
        // Opcional: Manejar el error (por ejemplo, mostrar un mensaje de error)
        // setOpenErrorSnackbar(true);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" sx={{ pb: 3 }}>
        Ingresa tus datos para recibir la cotización
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StyledTextField
            name="nombre"
            control={control}
            errors={errors}
            label="Nombre completo"
            helperTextEmpty="Ingresa tu nombre completo"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledTextField
            name="correo"
            control={control}
            errors={errors}
            label="Correo electrónico"
            type="email"
            helperTextEmpty="Ingresa tu correo electrónico"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StyledTextField
            name="telefono"
            control={control}
            errors={errors}
            label="Número de teléfono"
            helperTextEmpty="Ingresa tu número de teléfono"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", mt: 3, justifyContent: "end", gap: 2 }}>
        <Button
          onClick={onModificarCotizacion}
          variant="outlined"
          color="error"
          sx={{
            width: "fit-content",
            textTransform: "none",
            borderRadius: "20px",
          }}
          startIcon={<ArrowBackIcon />}
        >
          Volver a cotización
        </Button>

        <Button
          type="submit"
          color="success"
          variant="outlined"
          disabled={!isValid || isSubmit}
          startIcon={
            isSubmit ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            textTransform: "none",
            width: "fit-content",
            borderRadius: "20px",
          }}
        >
          {isSubmit ? "Confirmando..." : "Confirmar"}
        </Button>
      </Box>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Será contactado por nuestro equipo de atención en breve.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CotizacionResultados;
