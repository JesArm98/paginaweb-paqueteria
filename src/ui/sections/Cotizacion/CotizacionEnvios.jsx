"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  MenuItem,
  Autocomplete,
  Alert,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CotizacionEnvios = () => {
  // Estados
  const [step, setStep] = useState(0);
  const [packageCount, setPackageCount] = useState(1);
  const [isMultiPackage, setIsMultiPackage] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);

  // Definición de pasos y tamaños estándar
  const steps = isMultiPackage
    ? Array.from({ length: packageCount }, (_, index) => `Paquete ${index + 1}`)
    : ["Detalles del Paquete"];

  // Opciones dinámicas para las medidas
  const [dynamicSizes, setDynamicSizes] = useState([
    { label: "Ingresar Manualmente", value: "manual" },
    { label: "Pequeño (30x30x30 cm)", value: "30x30x30" },
    { label: "Mediano (50x50x50 cm)", value: "50x50x50" },
    { label: "Grande (100x100x100 cm)", value: "100x100x100" },
  ]);

  // Función para guardar medidas personalizadas
  const saveCustomSize = (width, height, length, onChange) => {
    const customSize = `${width}x${height}x${length}`;
    const exists = dynamicSizes.some((option) => option.value === customSize);

    if (!exists) {
      setDynamicSizes((prevSizes) => [
        ...prevSizes,
        { label: `Medida (${customSize} cm)`, value: customSize },
      ]);
    }
    onChange(customSize); // Guardar el string formateado como tamaño
  };

  // Configuración de React Hook Form
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      origen: "",
      destino: "",
      packages: Array.from({ length: 1 }, () => ({ size: "", peso: "" })),
    },
  });

  // Funciones de navegación para el Stepper
  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  // Función de envío del formulario
  const onSubmit = (data) => {
    setQuoteData(data);
    alert(JSON.stringify(data, null, 2));
    reset();
    setStep(0);
    setIsMultiPackage(false);
    setPackageCount(1);
  };

  // Función para manejar los cambios en los autocompletados
  const handleAutocompleteChange = async (field, value, onChange) => {
    if (value && value.length === 5) {
      try {
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${value}`
        );
        if (field === "origen") {
          setColoniasOrigen(response.data || []); // Actualizamos colonias del origen
        } else if (field === "destino") {
          setColoniasDestino(response.data || []); // Actualizamos colonias del destino
        }
        onChange(value); // Actualizamos el valor del input
      } catch (error) {
        console.error("Error fetching data:", error);
        onChange(""); // En caso de error, limpiamos el valor
      }
    } else {
      onChange(value || ""); // Validamos que el valor sea válido
    }
  };

  // Observar cambios en el formulario en tiempo real
  const formData = watch();

  useEffect(() => {
    // Solo actualizamos si es necesario
    if (JSON.stringify(quoteData) !== JSON.stringify(formData)) {
      setQuoteData(formData);
    }
  }, [formData]);

  console.log(formData);

  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
        width: { xs: "90%" },
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justifyContent="center">
          {/* Origen y Destino */}
          <Grid item xs={12} md={6}>
            <Controller
              name="origen"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasOrigen}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  value={
                    typeof value === "string" && value !== ""
                      ? value
                      : coloniasOrigen.find(
                          (option) =>
                            `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}` ===
                            value
                        ) || null
                  } // Aseguramos que el valor inicial esté en el formato correcto
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option.clave}>
                      {`${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`}
                    </li>
                  )}
                  onInputChange={(e, newValue) => {
                    // Manejamos el cambio del texto manualmente
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      handleAutocompleteChange("origen", newValue, onChange);
                    }
                  }}
                  onChange={(e, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Origen"
                      variant="outlined"
                      fullWidth
                      helperText="Ingrese CP origen"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="destino"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasDestino}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  value={
                    typeof value === "string" && value !== ""
                      ? value
                      : coloniasDestino.find(
                          (option) =>
                            `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}` ===
                            value
                        ) || null
                  }
                  onInputChange={(e, newValue) => {
                    // Manejamos el cambio del texto manualmente
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      handleAutocompleteChange("destino", newValue, onChange);
                    }
                  }}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option.clave}>
                      {`${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`}
                    </li>
                  )}
                  onChange={(e, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destino"
                      variant="outlined"
                      fullWidth
                      helperText="Ingrese CP destino"
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Número de Paquetes */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Número de Paquetes"
              type="number"
              value={packageCount}
              onChange={(e) => {
                setPackageCount(Number(e.target.value));
                setIsMultiPackage(Number(e.target.value) > 1);
              }}
              sx={{
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "15px" },
              }}
              variant="outlined"
              fullWidth
              helperText="Ingrese número de paquetes"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name={`packages[${step}].peso`}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Peso (kg)"
                  type="number"
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  inputProps={{ step: "0.01", min: "0" }}
                  {...field}
                  fullWidth
                  helperText="Ingrese peso de paquete"
                />
              )}
            />
          </Grid>

          {/* Stepper */}
          {isMultiPackage && (
            <Grid item xs={12}>
              <Stepper
                activeStep={step}
                alternativeLabel
                sx={{
                  ".MuiStep-root.Mui-completed .MuiStepLabel-iconContainer": {
                    color: "green", // Cambia el color del ícono de pasos completados a verde
                  },
                  ".MuiStepLabel-label.Mui-completed": {
                    color: "green", // Cambia el color del texto de pasos completados a verde
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          )}

          {/* Tamaño y Peso */}
          <Grid item xs={12} md={12}>
            <Controller
              name={`packages[${step}].size`}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <TextField
                      select
                      label="Tamaño"
                      value={value}
                      sx={{
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      }}
                      control={control}
                      onChange={(e) => onChange(e.target.value)}
                      fullWidth
                      helperText={
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <span>Como conocer el tamaño de tu paquete</span>
                          <Tooltip
                            title={
                              <div>
                                <img
                                  src="/images/Box.jpg"
                                  alt="Ejemplo"
                                  style={{
                                    maxWidth: "600px",
                                    height: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                />
                              </div>
                            }
                          >
                            <IconButton size="small">
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </span>
                      }
                    >
                      {dynamicSizes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* Si se selecciona "manual", renderizamos inputs para ingresar dimensiones */}
                    {value === "manual" && (
                      <Grid container spacing={2} mt={2}>
                        <Grid item xs={4}>
                          <Controller
                            name={`packages[${step}].customWidth`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Ancho (cm)"
                                type="number"
                                inputProps={{ min: 0 }}
                                fullWidth
                                sx={{
                                  borderRadius: "8px",
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name={`packages[${step}].customHeight`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Altura (cm)"
                                type="number"
                                inputProps={{ min: 0 }}
                                fullWidth
                                sx={{
                                  borderRadius: "8px",
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Controller
                            name={`packages[${step}].customLength`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Largo (cm)"
                                type="number"
                                inputProps={{ min: 0 }}
                                fullWidth
                                sx={{
                                  borderRadius: "8px",
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "15px",
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        {/* Botón para guardar las medidas ingresadas manualmente */}
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                              borderRadius: "20px",
                              textTransform: "none",
                              display: "flex",
                            }}
                            onClick={() => {
                              const width = watch(
                                `packages[${step}].customWidth`
                              );
                              const height = watch(
                                `packages[${step}].customHeight`
                              );
                              const length = watch(
                                `packages[${step}].customLength`
                              );

                              if (width && height && length) {
                                saveCustomSize(width, height, length, onChange);
                              } else {
                                alert("Por favor, complete todas las medidas.");
                              }
                            }}
                          >
                            Guardar tamaño
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        </Grid>

        {/* Botones de Navegación y Envío */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            display: "flex",
            gap: 5,
            justifyContent: "center",
          }}
        >
          {isMultiPackage && step > 0 && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: "red",
                borderColor: "red",
                textTransform: "none",
              }}
            ></Button>
          )}
          {isMultiPackage && step < packageCount - 1 && (
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                display: "flex",
                alignContent: "center",
              }}
            >
              Siguiente
            </Button>
          )}
          {!isMultiPackage || step === packageCount - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!formData.destino || !formData.origen}
              sx={{ textTransform: "none", borderRadius: "20px" }}
            >
              Realizar cotización
            </Button>
          ) : null}
        </Box>
      </form>

      {/* Mostrar Datos de la Cotización */}
      {quoteData && (
        <Alert severity="info" sx={{ mt: 4 }}>
          Cotización Realizada: {JSON.stringify(quoteData)}
        </Alert>
      )}
    </Box>
  );
};

export default CotizacionEnvios;
