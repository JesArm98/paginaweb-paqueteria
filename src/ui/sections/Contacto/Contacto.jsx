"use client";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { contactOptions } from "@/data/data";
import { tipoServicio } from "@/data/data";
import useContactType from "@/hooks/useContactType";
import useSnackbar from "@/hooks/useSnackbar";

// Regex para código postal (5 dígitos), teléfono, correo y nombre
const cpRegExp = /^\d{5}$/;
const phoneRegExp = /^\d{10}$/;
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

// Función auxiliar para el estilo común de los inputs
const getFieldSx = (isEmpty, hasError) => ({
  width: "100%",
  borderRadius: "8px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: isEmpty ? "#07417B" : hasError ? "red" : "green",
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
});

// Esquema de validación condicional
const schema = yup
  .object({
    Tipo: yup
      .string()
      .oneOf(
        contactOptions.map((option) => option.value),
        "El tipo de contacto no es válido."
      )
      .required("El tipo de contacto es obligatorio."),
    Servicio: yup.string().when("Tipo", {
      is: "Cotizacion",
      then: (s) =>
        s
          .oneOf(
            tipoServicio.map((option) => option.value),
            "El tipo de servicio no es válido."
          )
          .required("El tipo de servicio es obligatorio."),
      otherwise: (s) => s.notRequired(),
    }),
    Origen: yup.mixed().when("Tipo", {
      is: (tipo) =>
        tipo === "Cotizacion" || tipo === "Queja" || tipo === "Socio",
      then: (s) =>
        s
          .test(
            "is-valid-origen",
            "Debe seleccionar una opción válida de la lista.",
            (value) => {
              // Verificar que sea un objeto completo con los datos necesarios
              return (
                typeof value === "object" &&
                value !== null &&
                value.cp &&
                value.colonia &&
                value.ciudad
              );
            }
          )
          .required("El CP de origen es obligatorio."),
      otherwise: (s) => s.notRequired(),
    }),
    Destino: yup.mixed().when("Tipo", {
      is: "Cotizacion",
      then: (s) =>
        s
          .test(
            "is-valid-destino",
            "Debe seleccionar una opción válida de la lista.",
            (value) => {
              // Verificar que sea un objeto completo con los datos necesarios
              return (
                typeof value === "object" &&
                value !== null &&
                value.cp &&
                value.colonia &&
                value.ciudad
              );
            }
          )
          .required("El CP de destino es obligatorio."),
      otherwise: (s) => s.notRequired(),
    }),
    Nombre: yup.string().when("Tipo", {
      is: (tipo) => tipo !== "Socio",
      then: (s) =>
        s
          .matches(
            nameRegExp,
            "Solo puede contener letras, espacios, guiones y apóstrofes."
          )
          .required("El nombre es obligatorio.")
          .min(3, "Debe tener al menos 3 caracteres.")
          .max(50, "No debe exceder los 50 caracteres."),
      otherwise: (s) => s.notRequired(),
    }),
    RFC: yup.string().when("Tipo", {
      is: (tipo) => tipo === "Socio",
      then: (s) => s.required("El RFC es obligatorio."),
      otherwise: (s) => s.notRequired(),
    }),
    RazonSocial: yup.string().when("Tipo", {
      is: (tipo) => tipo === "Socio",
      then: (s) => s.required("La razón social es obligatoria."),
      otherwise: (s) => s.notRequired(),
    }),
    Correo: yup
      .string()
      .matches(emailRegExp, "Debe ser un correo válido.")
      .required("El correo es obligatorio.")
      .max(100, "El correo no debe exceder los 100 caracteres."),
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
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Detecta el parámetro "type" en la URL al montar el componente
  useContactType(setValue, trigger);

  const selectedTipo = useWatch({ control, name: "Tipo" });

  useEffect(() => {
    const storedType = localStorage.getItem("contactType");

    if (storedType) {
      setValue("Tipo", storedType, { shouldValidate: true });

      // Disparar validación y actualización en el próximo ciclo de render
      setTimeout(() => trigger("Tipo"), 100);
    }
  }, [setValue, trigger]); // Se ejecuta solo cuando se monta el componente

  // Para el Autocomplete, si el usuario selecciona una opción, se guarda el objeto completo
  const handleAutocompleteChange = async (field, value, onChange) => {
    if (value && value.length === 5) {
      try {
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${value}`
        );
        if (field === "Origen") {
          setColoniasOrigen(response.data || []);
        } else if (field === "Destino") {
          setColoniasDestino(response.data || []);
        }

        onChange(value);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        onChange("");
      }
    } else {
      onChange(value || "");
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      tipo: data.Tipo,
      origen: data.Origen, // Ahora es el objeto completo
      nombre:
        data.Tipo === "Socio" ? `${data.RFC} ${data.RazonSocial}` : data.Nombre,
      correo: data.Correo,
      telefono: data.Telefono,
      mensaje: data.Mensaje,
      ...(data.Tipo === "Cotizacion" && {
        servicio: data.Servicio,
        destino: data.Destino,
        packages: null,
        fechacreacion: new Date().toISOString(), // Fecha actual en formato ISO 8601
      }),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.myllos.com.mx/api/contactos",
        payload
      );
      reset();
      setIsLoading(false);
      showSnackbar(response.data.mensaje, "success");
      // Opcional: Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
      setIsLoading(false);
      // Opcional: Mostrar mensaje de error
    }
  };

  return (
    <Box
      id="contacto"
      sx={{
        width: { xs: "95%", sm: "90%", md: "90%", lg: "1200px", xl: "1300px" },
        display: "flex",
        margin: "auto",
      }}
    >
      <Grid
        container
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{
          backgroundColor: "#FFFFFF",
          marginTop: { xs: "30px", md: "40px" },
          padding: 2,
        }}
      >
        {/* Header */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#3DC2CF",
              fontSize: { xs: "1.5rem", md: "2.25em" },
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Tu satisfacción es nuestra prioridad.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontWeight: "300",
              fontSize: { xs: "1rem", md: "20px" },
              textAlign: { xs: "justify", md: "center" },
            }}
          >
            Estamos aquí para responder tus preguntas sobre nuestros servicios,
            atender tus quejas o proporcionarte cotizaciones. ¡Estamos listos
            para ayudarte!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
            Los campos marcados con * son obligatorios.
          </Typography>
        </Grid>

        {/* Layout según el flujo */}
        {selectedTipo === "Cotizacion" ? (
          <>
            {/* Fila 1: Contacto y Tipo servicio */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        sx={getFieldSx(isEmpty, hasError)}
                        onChange={(e) => field.onChange(e)}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="Servicio"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    const isEmpty = field.value === "";
                    const hasError = !!errors.Servicio;
                    return (
                      <TextField
                        {...field}
                        select
                        label="Tipo servicio*"
                        helperText={
                          hasError
                            ? errors.Servicio.message
                            : !isEmpty
                            ? "✔️"
                            : "Selecciona tu tipo de servicio"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                        onChange={(e) => field.onChange(e)}
                      >
                        {tipoServicio.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 2: CP de Origen y Destino */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Controller
                  name="Origen"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => {
                    const isEmpty = !value;
                    const isValid =
                      typeof value === "object" && value && value.cp;
                    return (
                      <Autocomplete
                        freeSolo
                        options={coloniasOrigen}
                        value={value}
                        fullWidth
                        onInputChange={(e, newValue) => {
                          if (/^\d+$/.test(newValue) || newValue === "") {
                            handleAutocompleteChange(
                              "Origen",
                              newValue,
                              onChange
                            );
                          }
                        }}
                        onChange={(e, newValue) => {
                          onChange(newValue); // Guarda el objeto completo
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                        }
                        renderInput={(params) => {
                          const fieldIsEmpty = !value;
                          return (
                            <TextField
                              {...params}
                              label="Origen"
                              variant="outlined"
                              fullWidth
                              error={!!errors.Origen}
                              helperText={
                                errors.Origen
                                  ? errors.Origen.message
                                  : isValid
                                  ? "✔️"
                                  : "Ingrese CP de origen y seleccione una opción"
                              }
                              sx={getFieldSx(fieldIsEmpty, !!errors.Origen)}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="Destino"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => {
                    const isEmpty = !value;
                    const isValid =
                      typeof value === "object" && value && value.cp;
                    return (
                      <Autocomplete
                        freeSolo
                        options={coloniasDestino}
                        value={value}
                        fullWidth
                        onInputChange={(e, newValue) => {
                          if (/^\d+$/.test(newValue) || newValue === "") {
                            handleAutocompleteChange(
                              "Destino",
                              newValue,
                              onChange
                            );
                          }
                        }}
                        onChange={(e, newValue) => {
                          onChange(newValue); // Guarda el objeto completo
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                        }
                        renderInput={(params) => {
                          const fieldIsEmpty = !value;
                          return (
                            <TextField
                              {...params}
                              label="Destino"
                              variant="outlined"
                              fullWidth
                              error={!!errors.Destino}
                              helperText={
                                errors.Destino
                                  ? errors.Destino.message
                                  : isValid
                                  ? "✔️"
                                  : "Ingrese CP de destino"
                              }
                              sx={getFieldSx(fieldIsEmpty, !!errors.Destino)}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 3: Nombre (ocupa todo el ancho) */}
            <Grid item xs={12}>
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
                      label="Nombre*"
                      helperText={
                        hasError
                          ? errors.Nombre.message
                          : !isEmpty
                          ? "✔️"
                          : "Ingresa tu nombre completo"
                      }
                      error={hasError}
                      sx={getFieldSx(isEmpty, hasError)}
                    />
                  );
                }}
              />
            </Grid>

            {/* Fila 4: Correo y Teléfono */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        type="correo"
                        label="Correo*"
                        helperText={
                          hasError
                            ? errors.Correo.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu correo"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                        label="Teléfono*"
                        helperText={
                          hasError
                            ? errors.Telefono.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu teléfono"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 5: Mensaje */}
            <Grid item xs={12}>
              <Controller
                name="Mensaje"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  const isEmpty = field.value === "";
                  const hasError = !!errors.Mensaje;
                  const label =
                    selectedTipo === "Queja" ? "Sugerencia*" : "Mensaje*";
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
                      sx={getFieldSx(isEmpty, hasError)}
                    />
                  );
                }}
              />
            </Grid>
          </>
        ) : selectedTipo === "Socio" ? (
          <>
            {/* Para Proveedor o Socio */}
            {/* Fila 1: Contacto y RFC */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        sx={getFieldSx(isEmpty, hasError)}
                        onChange={(e) => field.onChange(e)}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="RFC"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    const isEmpty = field.value === "";
                    const hasError = !!errors.RFC;
                    return (
                      <TextField
                        {...field}
                        label="RFC*"
                        helperText={
                          hasError
                            ? errors.RFC.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu RFC"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 2: Razón Social */}
            <Grid item xs={12}>
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
                      label="Razón Social*"
                      helperText={
                        hasError
                          ? errors.RazonSocial.message
                          : !isEmpty
                          ? "✔️"
                          : "Ingresa tu razón social"
                      }
                      error={hasError}
                      sx={getFieldSx(isEmpty, hasError)}
                    />
                  );
                }}
              />
            </Grid>

            {/* Fila 3: Correo y Teléfono */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        type="correo"
                        label="Correo*"
                        helperText={
                          hasError
                            ? errors.Correo.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu correo"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
                        label="Teléfono*"
                        helperText={
                          hasError
                            ? errors.Telefono.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu teléfono"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  name="Origen"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => {
                    const isEmpty = !value;
                    const isValid =
                      typeof value === "object" && value && value.cp;
                    return (
                      <Autocomplete
                        freeSolo
                        options={coloniasOrigen}
                        value={value}
                        fullWidth
                        onInputChange={(e, newValue) => {
                          if (/^\d+$/.test(newValue) || newValue === "") {
                            handleAutocompleteChange(
                              "Origen",
                              newValue,
                              onChange
                            );
                          }
                        }}
                        onChange={(e, newValue) => {
                          onChange(newValue); // Guarda el objeto completo
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                        }
                        renderInput={(params) => {
                          const fieldIsEmpty = !value;
                          return (
                            <TextField
                              {...params}
                              label="Código Postal"
                              variant="outlined"
                              fullWidth
                              error={!!errors.Origen}
                              helperText={
                                errors.Origen
                                  ? errors.Origen.message
                                  : isValid
                                  ? "✔️"
                                  : "Ingrese su Código Postal"
                              }
                              sx={getFieldSx(fieldIsEmpty, !!errors.Origen)}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 4: Mensaje */}
            <Grid item xs={12}>
              <Controller
                name="Mensaje"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  const isEmpty = field.value === "";
                  const hasError = !!errors.Mensaje;
                  return (
                    <TextField
                      {...field}
                      multiline
                      rows={7}
                      label="Mensaje*"
                      helperText={
                        hasError
                          ? errors.Mensaje.message
                          : !isEmpty
                          ? "✔️"
                          : "Ingresa un mensaje"
                      }
                      error={hasError}
                      sx={getFieldSx(isEmpty, hasError)}
                    />
                  );
                }}
              />
            </Grid>
          </>
        ) : (
          // Para Sugerencias, Quejas u otros
          <>
            {/* Fila 1: Contacto y Nombre */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        sx={getFieldSx(isEmpty, hasError)}
                        onChange={(e) => field.onChange(e)}
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
              </Grid>
              <Grid item xs={12} md={6}>
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
                        label="Nombre*"
                        helperText={
                          hasError
                            ? errors.Nombre.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu nombre completo"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 2: Correo y Teléfono */}
            <Grid container item xs={12} spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
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
                        type="correo"
                        label="Correo*"
                        helperText={
                          hasError
                            ? errors.Correo.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu correo"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
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
                        label="Teléfono*"
                        helperText={
                          hasError
                            ? errors.Telefono.message
                            : !isEmpty
                            ? "✔️"
                            : "Ingresa tu teléfono"
                        }
                        error={hasError}
                        sx={getFieldSx(isEmpty, hasError)}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Controller
                  name="Origen"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => {
                    const isEmpty = !value;
                    const isValid =
                      typeof value === "object" && value && value.cp;
                    return (
                      <Autocomplete
                        freeSolo
                        options={coloniasOrigen}
                        value={value}
                        fullWidth
                        onInputChange={(e, newValue) => {
                          if (/^\d+$/.test(newValue) || newValue === "") {
                            handleAutocompleteChange(
                              "Origen",
                              newValue,
                              onChange
                            );
                          }
                        }}
                        onChange={(e, newValue) => {
                          onChange(newValue); // Guarda el objeto completo
                        }}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                        }
                        renderInput={(params) => {
                          const fieldIsEmpty = !value;
                          return (
                            <TextField
                              {...params}
                              label="Código Postal"
                              variant="outlined"
                              fullWidth
                              error={!!errors.Origen}
                              helperText={
                                errors.Origen
                                  ? errors.Origen.message
                                  : isValid
                                  ? "✔️"
                                  : "Ingrese su Código Postal"
                              }
                              sx={getFieldSx(fieldIsEmpty, !!errors.Origen)}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            {/* Fila 3: Mensaje */}
            <Grid item xs={12}>
              <Controller
                name="Mensaje"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  const isEmpty = field.value === "";
                  const hasError = !!errors.Mensaje;
                  const label =
                    selectedTipo === "Queja" ? "Sugerencia*" : "Mensaje*";
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
                      sx={getFieldSx(isEmpty, hasError)}
                    />
                  );
                }}
              />
            </Grid>
          </>
        )}

        {/* Botón de envío */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            aria-label="Enviar formularios"
            sx={{
              textTransform: "none",
              borderRadius: "25px",
              marginBottom: "48px",
              backgroundColor: "#002C72",
              "&:hover": { backgroundColor: "#021E4A" },
            }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isValid}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Enviar"
            )}
          </Button>
        </Grid>
      </Grid>
      <SnackbarComponent />
    </Box>
  );
}

export default ContactForm;
