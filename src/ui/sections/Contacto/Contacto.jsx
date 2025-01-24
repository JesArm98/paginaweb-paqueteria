"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { contactOptions } from "@/data/data";

/*
const sucursalOptions = [
  { value: "Matriz", label: "Matriz" },
  { value: "Culiacán", label: "Culiacán" },
  { value: "Hermosillo", label: "Hermosillo" },
  { value: "Mexicali", label: "Mexicali" },
  { value: "Tijuana", label: "Tijuana" },
  { value: "Monterrey", label: "Monterrey" },
  { value: "Pesquería", label: "Pesquería" },
  { value: "Cd. Obregón", label: "Cd. Obregón" },
  { value: "Querétaro", label: "Querétaro" },
  { value: "Guadalajara", label: "Guadalajara" },
  { value: "Chihuahua", label: "Chihuahua" },
  { value: "Torreón", label: "Torreón" },
  { value: "Ensenada", label: "Ensenada" },
  { value: "Mazatlán", label: "Mazatlán" },
]; */

const phoneRegExp = /^\d{10}$/;

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

// Esquema de validación
const schema = yup
  .object({
    Tipo: yup
      .string()
      .oneOf(
        contactOptions.map((option) => option.value),
        "El tipo de contacto no es válido."
      )
      .required("El tipo de contacto es obligatorio."),
    Nombre: yup
      .string()
      .matches(
        nameRegExp,
        "Solo puede contener letras, espacios, guiones y apóstrofes."
      )
      .required("Es obligatorio.")
      .min(3, "Debe tener al menos 3 caracteres.")
      .max(50, "No debe exceder los 50 caracteres."),
    Correo: yup
      .string()
      .matches(emailRegExp, "Debe ser un correo válido.")
      .required("El correo es obligatorio.")
      .max(100, "El correo no debe exceder los 100 caracteres."),
    // Sucursal: yup
    //  .string()
    //    .oneOf(
    //      sucursalOptions.map((option) => option.value),
    //      "La sucursal no es válida."
    //    )
    //   .required("La sucursal es obligatoria."),
    Telefono: yup
      .string()
      .matches(phoneRegExp, "Debe ser un número de teléfono válido.")
      .required("El teléfono es obligatorio."),
    Mensaje: yup
      .string()
      .required("El mensaje es obligatorio.")
      .min(20, "El mensaje debe tener al menos 20 caracteres.")
      .max(500, "El mensaje no debe exceder los 500 caracteres."),
  })
  .required();

function ContactForm() {
  const [loading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Detectar el parámetro type en la URL al montar el componente
  useEffect(() => {
    const handleContactTypeChange = () => {
      try {
        const contactType = localStorage.getItem("contactType");
        if (contactType === "socio") {
          setValue("Tipo", "socio", { shouldValidate: true });
          localStorage.removeItem("contactType");
        }
      } catch (error) {
        console.error("Error al manejar el tipo de contacto:", error);
      }
    };

    // Ejecutar una vez al montar
    handleContactTypeChange();

    // Agregar el event listener
    window.addEventListener("contactTypeChange", handleContactTypeChange);

    return () => {
      window.removeEventListener("contactTypeChange", handleContactTypeChange);
      // Limpiar localStorage al desmontar por si acaso
      localStorage.removeItem("contactType");
    };
  }, [setValue]);

  const selectedTipo = useWatch({
    control,
    name: "Tipo",
  });

  // const filteredSucursalOptions =
  // selectedTipo === "cotizaciones"
  ///|   ? sucursalOptions.filter((option) => option.value !== "Matriz")
  // : sucursalOptions;

  const onSubmit = async (data) => {
    const payload = {
      tipo: data.Tipo,
      // sucursal: data.Sucursal,
      nombre: data.Nombre + (data.RazonSocial ? " " + data.RazonSocial : ""),
      email: data.Correo,
      telefono: data.Telefono,
      mensaje: data.Mensaje,
    };

    // Mostrar alerta con los datos
    alert(JSON.stringify(payload, null, 2));

    try {
      {
        console.log(data.Tipo);
      }
      setIsLoading(true);
      await axios.post(
        "https://us-central1-tvn-api-store.cloudfunctions.net/app/contactUs",
        payload
      );
      reset();
      setIsLoading(false);
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
      reset();
      setIsLoading(false);
    }
  };

  return (
    <Box
      id="contacto"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        overflow: "hidden",
        marginTop: { xs: "20px", md: "40px" },
      }}
    >
      <Typography
        sx={{
          color: "#07417B",
          fontSize: { xs: "1.5rem", md: "2.25em" },
          width: { xs: "90%", md: "80%" },
          margin: "auto",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Tu satisfacción es nuestra prioridad.
      </Typography>
      <Typography
        sx={{
          fontWeight: "300",
          width: {
            xs: "90%",
            md: "60%",
          },
          fontSize: { xs: "1rem", md: "20px" },
          textAlign: { xs: "justify", md: "center" },
        }}
      >
        Estamos aquí para responder tus preguntas sobre nuestros servicios,
        atender tus quejas o proporcionarte cotizaciones. ¡Estamos listos para
        ayudarte!
      </Typography>
      <p>Los campos marcados con * son obligatorios.</p>
      <div
        style={{
          width: "85%",
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Controller
          name="Tipo"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isEmpty = field.value === "";
            const hasError = !!errors.Tipo;

            return (
              <TextField
                {...field}
                select
                label="Contacto*"
                helperText={
                  hasError
                    ? errors.Tipo.message
                    : !isEmpty
                    ? "✔️"
                    : "Ingresa tu tipo de contacto"
                }
                error={hasError}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "500px",
                    md: "367px",
                    lg: "492px",
                    xl: "592px",
                  },
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isEmpty
                        ? "#07417B"
                        : hasError
                        ? "red"
                        : "green",
                      borderRadius: "15px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                    },
                    "&:hover fieldset": {
                      borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isEmpty
                        ? "gray"
                        : hasError
                        ? "red"
                        : "green",
                    },
                  },
                }}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value === "c") {
                    setValue("Sucursal", "Matriz");
                  }
                }}
              >
                {contactOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
        <Controller
          name="Nombre"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isEmpty = field.value === "";
            const hasError = !!errors.Nombre;

            return (
              <TextField
                {...field}
                label={selectedTipo === "socio" ? "RFC*" : "Nombre*"}
                helperText={
                  hasError
                    ? errors.Nombre.message
                    : !isEmpty
                    ? "✔️"
                    : "Ingresa nombre completo"
                }
                error={hasError}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "500px",
                    md: "367px",
                    lg: "492px",
                    xl: "592px",
                  },
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isEmpty
                        ? "#07417B"
                        : hasError
                        ? "red"
                        : "green",
                      borderRadius: "15px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                    },
                    "&:hover fieldset": {
                      borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isEmpty
                        ? "gray"
                        : hasError
                        ? "red"
                        : "green",
                    },
                  },
                }}
              />
            );
          }}
        />
        <>
          {selectedTipo === "socio" && (
            <Controller
              name="RazonSocial"
              control={control}
              defaultValue=""
              render={({ field }) => {
                const isEmpty = field.value === "";
                const hasError = !!errors.RazonSocial;

                return (
                  <TextField
                    {...field}
                    label={"Razon social"}
                    helperText={
                      hasError
                        ? errors.RazonSocial.message
                        : !isEmpty
                        ? "✔️"
                        : "Ingresa tu razón social"
                    }
                    error={hasError}
                    sx={{
                      display: {},
                      width: {
                        xs: "100%",
                        sm: "500px",
                        md: "750px",
                        lg: "1000px",
                        xl: "1200px",
                      },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: isEmpty
                            ? "#07417B"
                            : hasError
                            ? "red"
                            : "green",
                          borderRadius: "15px",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                        },
                        "&:hover fieldset": {
                          borderColor: isEmpty
                            ? "blue"
                            : hasError
                            ? "red"
                            : "blue",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: isEmpty
                            ? "gray"
                            : hasError
                            ? "red"
                            : "green",
                        },
                      },
                    }}
                  />
                );
              }}
            />
          )}
        </>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          width: "85%",
        }}
      >
        <Controller
          name="Correo"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isEmpty = field.value === "";
            const hasError = !!errors.Correo;

            return (
              <TextField
                {...field}
                type="email"
                label="Correo*"
                helperText={
                  hasError
                    ? errors.Correo.message
                    : !isEmpty
                    ? "✔️"
                    : "Ingresa tu correo"
                }
                error={hasError}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "500px",
                    md: "367px",
                    lg: "492px",
                    xl: "592px",
                  },
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isEmpty
                        ? "#07417B"
                        : hasError
                        ? "red"
                        : "green",
                      borderRadius: "15px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                    },
                    "&:hover fieldset": {
                      borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isEmpty
                        ? "gray"
                        : hasError
                        ? "red"
                        : "green",
                    },
                  },
                }}
              />
            );
          }}
        />
        {/*
        <Controller
          name="Sucursal"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isEmpty = field.value === "";
            const hasError = !!errors.Sucursal;

            return (
              <TextField
                {...field}
                select
                label="Sucursal*"
                helperText={
                  hasError
                    ? errors.Sucursal.message
                    : !isEmpty
                    ? "✔️"
                    : "Ingresa tu sucursal"
                }
                error={hasError}
                disabled={selectedTipo === "proveedor"}
                sx={{
                  width: {
                    xs: "90%",
                    sm: "500px",
                    md: "239px",
                    lg: "322px",
                    xl: "390px",
                  },
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isEmpty
                        ? "#07417B"
                        : hasError
                        ? "red"
                        : "green",
                      borderRadius: "15px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                    },
                    "&:hover fieldset": {
                      borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isEmpty
                        ? "gray"
                        : hasError
                        ? "red"
                        : "green",
                    },
                  },
                }}
              >
                {filteredSucursalOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />*/}
        <Controller
          name="Telefono"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isEmpty = field.value === "";
            const hasError = !!errors.Telefono;

            return (
              <TextField
                {...field}
                label="Telefono*"
                helperText={
                  hasError
                    ? errors.Telefono.message
                    : !isEmpty
                    ? "✔️"
                    : "Ingresa tu telefono"
                }
                error={hasError}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "500px",
                    md: "367px",
                    lg: "492px",
                    xl: "592px",
                  },
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isEmpty
                        ? "#07417B"
                        : hasError
                        ? "red"
                        : "green",
                      borderRadius: "15px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                    },
                    "&:hover fieldset": {
                      borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isEmpty
                        ? "gray"
                        : hasError
                        ? "red"
                        : "green",
                    },
                  },
                }}
              />
            );
          }}
        />
      </div>
      <Controller
        name="Mensaje"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const isEmpty = field.value === "";
          const hasError = !!errors.Mensaje;
          const label =
            selectedTipo === "sugerencias o sujerencias"
              ? "Sugerencia*"
              : "Mensaje*";

          return (
            <TextField
              {...field}
              multiline
              rows={7}
              label={label}
              helperText={
                hasError
                  ? errors.Mensaje.message
                  : !isEmpty
                  ? "✔️"
                  : "Ingresa un mensaje"
              }
              error={hasError}
              sx={{
                height: "200px",
                width: {
                  xs: "85%",
                  sm: "500px",
                  md: "750px",
                  lg: "1000px",
                  xl: "1200px",
                },
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isEmpty
                      ? "#07417B"
                      : hasError
                      ? "red"
                      : "green",
                    borderRadius: "15px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 14px 0px",
                  },
                  "&:hover fieldset": {
                    borderColor: isEmpty ? "blue" : hasError ? "red" : "blue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isEmpty ? "gray" : hasError ? "red" : "green",
                  },
                },
              }}
            />
          );
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        p={2}
      >
        <Button
          aria-label="Enviar formularios"
          sx={{
            textTransform: "none",
            borderRadius: "25px",
            marginBottom: "48px",
            backgroundColor: "#002C72",

            width: "auto",
            "&:hover": { backgroundColor: "#021E4A" },
          }}
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          {loading === true ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Enviar"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default ContactForm;
