"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: yup
    .string()
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

        // Espera 2 segundos antes de cerrar el modal
        setTimeout(() => {
          onCerrar(); // Cierra el modal después de que el usuario vea el mensaje
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        // Opcional: Manejar el error (por ejemplo, mostrar un mensaje de error)
        // setOpenErrorSnackbar(true);
      });
  };

  const inputStyles = {
    borderRadius: "20px", // Bordes redondeados
    backgroundColor: "#fff", // Fondo blanco para mejor visibilidad
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px", // Aplica a todo el input
      fontSize: "16px",
      fontWeight: 500,
      "& fieldset": {
        borderColor: "#BDBDBD", // Color de borde en estado normal
      },
      "&:hover fieldset": {
        borderColor: "#1976d2", // Color de borde en hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2", // Color de borde cuando está enfocado
        boxShadow: "0px 0px 6px rgba(25, 118, 210, 0.3)", // Sombra al enfocar
      },
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" sx={{ pb: 3 }}>
        Ingresa tus datos para recibir la cotización
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ ...inputStyles }}
                label="Nombre completo"
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="correo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Correo electrónico"
                type="email"
                sx={{ ...inputStyles }}
                error={!!errors.correo}
                helperText={errors.correo?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Número de teléfono"
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
                sx={{ ...inputStyles }}
              />
            )}
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
          disabled={!isValid}
          sx={{
            textTransform: "none",
            width: "fit-content",
            borderRadius: "20px",
          }}
        >
          Confirmar
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
