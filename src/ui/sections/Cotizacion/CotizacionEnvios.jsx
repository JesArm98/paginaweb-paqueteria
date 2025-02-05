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
import CotizacionResultados from "./CotizacionResultados";
import { useEmail } from "@/context/EmailContext";

const CotizacionEnvios = ({ initialShippingType }) => {
  const {
    emailConfirmado,
    setEmailConfirmado,
    emailUsuario,
    setEmailUsuario,
    mostrarResultados,
    setMostrarResultados,
  } = useEmail();

  // Mover los estados al principio
  // const [mostrarResultados, setMostrarResultados] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  // Estados
  const [step, setStep] = useState(0);
  const [packageCount, setPackageCount] = useState(1);
  const [isMultiPackage, setIsMultiPackage] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);

  // Nuevo estado para tipo de envío
  const [shippingType, setShippingType] = useState("");

  // Opciones de tipo de envío
  const shippingTypes = [
    { value: "ltl", label: "LTL" },
    { value: "ftl", label: "FTL" },
  ];

  // Definición de pasos y tamaños estándar
  const steps = isMultiPackage
    ? Array.from(
        { length: packageCount },
        (_, index) =>
          `${
            shippingType === "sobre"
              ? "Sobre"
              : shippingType === "ftl"
              ? "FTL"
              : "LTL"
          } ${index + 1}`
      )
    : ["Detalles del Envío"];

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
      tipoEnvio: initialShippingType || "",
      packages: Array.from({ length: 1 }, () => ({ size: "", peso: "" })),
    },
  });

  useEffect(() => {
    if (initialShippingType) {
      setShippingType(initialShippingType);
    }
  }, [initialShippingType]);

  // Funciones de navegación para el Stepper
  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  // Función de envío del formulario
  const onSubmit = (data) => {
    // Formatear los datos del origen y destino
    const formattedData = {
      ...data,
      origen: data.origen, // Mantener el objeto completo
      destino: data.destino, // Mantener el objeto completo
      packages: Array.isArray(data.packages) ? data.packages : [data.packages],
    };

    setQuoteData(formattedData);
    setMostrarResultados(true);
  };

  const handleModificarCotizacion = () => {
    setMostrarResultados(false);
  };

  const handleSelectProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    // Aquí puedes agregar la lógica adicional que necesites
  };

  // Función para manejar los cambios en los autocompletados
  const handleAutocompleteChange = async (field, value, onChange) => {
    if (value && value.length === 5) {
      try {
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${value}`
        );
        if (field === "origen") {
          setColoniasOrigen(response.data || []);
          // Si estamos regresando de una cotización, mantener el valor completo
          if (quoteData?.origen) {
            onChange(response.data.find((col) => col.cp === value) || value);
          } else {
            onChange(value);
          }
        } else if (field === "destino") {
          setColoniasDestino(response.data || []);
          // Si estamos regresando de una cotización, mantener el valor completo
          if (quoteData?.destino) {
            onChange(response.data.find((col) => col.cp === value) || value);
          } else {
            onChange(value);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        onChange("");
      }
    } else {
      onChange(value || "");
    }
  };

  // Observar cambios en el formulario en tiempo real
  const formData = watch();

  // Renderizar el componente de resultados si mostrarResultados es true
  if (mostrarResultados && quoteData) {
    return (
      <CotizacionResultados
        cotizacionData={quoteData}
        onModificarCotizacion={() => {
          setMostrarResultados(false);
        }}
        onSelectProveedor={handleSelectProveedor}
        emailConfirmado={emailConfirmado}
        setEmailConfirmado={setEmailConfirmado}
        emailUsuario={emailUsuario}
        setEmailUsuario={setEmailUsuario}
      />
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
        width: { xs: "95%" },
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
              defaultValue={quoteData?.origen?.cp || ""}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasOrigen}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  value={value}
                  onInputChange={(e, newValue) => {
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      handleAutocompleteChange("origen", newValue, onChange);
                    }
                  }}
                  onChange={(e, newValue) => onChange(newValue)}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Origen"
                      variant="outlined"
                      defaultValue={quoteData?.origen?.cp || ""}
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
              defaultValue={quoteData?.destino?.cp || ""}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasDestino}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  value={value}
                  onInputChange={(e, newValue) => {
                    if (/^\d+$/.test(newValue) || newValue === "") {
                      handleAutocompleteChange("destino", newValue, onChange);
                    }
                  }}
                  onChange={(e, newValue) => onChange(newValue)}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destino"
                      variant="outlined"
                      defaultValue={quoteData?.destino?.cp || ""}
                      fullWidth
                      helperText="Ingrese CP destino"
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Agregar selector de tipo de envío */}
          <Grid item xs={12} md={formData.tipoEnvio === null ? 12 : 6}>
            <Controller
              name="tipoEnvio"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Tipo de Envío"
                  value={shippingType}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShippingType(e.target.value);
                    setPackageCount(1);
                    setIsMultiPackage(false);
                    setStep(0);
                  }}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  fullWidth
                  helperText="Selecciona tu tipo de envío"
                >
                  {shippingTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Mostrar campos adicionales solo si se ha seleccionado un tipo de envío */}
          {shippingType && (
            <>
              {/* Campo de cantidad (modificado según el tipo) */}
              <Grid item xs={12} md={6}>
                <TextField
                  label={`Número de ${
                    shippingType === "sobre"
                      ? "sobres"
                      : shippingType === "ftl"
                      ? "tarimas"
                      : "cajas"
                  }`}
                  type="number"
                  value={packageCount}
                  onChange={(e) => {
                    const newValue = Math.max(Number(e.target.value), 1);
                    setPackageCount(newValue);
                    setIsMultiPackage(newValue > 1);
                  }}
                  sx={{
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  }}
                  inputProps={{ step: "1", min: "1" }}
                  variant="outlined"
                  fullWidth
                  helperText={`Ingrese número de ${
                    shippingType === "sobre"
                      ? "sobres"
                      : shippingType === "ftl"
                      ? "tarimas"
                      : "cajas"
                  }`}
                />
              </Grid>

              {/* Campo de peso (con restricción para sobres) */}
              <Grid
                item
                xs={12}
                md={shippingType === "sobre" ? 12 : isMultiPackage ? 12 : 6}
              >
                <Controller
                  name={`packages[${step}].peso`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Peso (kg)"
                      type="number"
                      {...field}
                      inputProps={{
                        step: "0.01",
                        min: "0",
                        max: shippingType === "sobre" ? "1" : undefined,
                      }}
                      sx={{
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      }}
                      fullWidth
                      helperText={
                        shippingType === "sobre"
                          ? "Máximo 1 kg para sobres"
                          : "Ingrese peso"
                      }
                    />
                  )}
                />
              </Grid>

              {/* Mostrar selector de tamaño solo para cajas y tarimas */}
              {(shippingType === "ltl" || shippingType === "ftl") && (
                <Grid item xs={12} md={isMultiPackage ? 12 : 6}>
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
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                              },
                            }}
                            control={control}
                            onChange={(e) => onChange(e.target.value)}
                            fullWidth
                            helperText={
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span>
                                  Como conocer el tamaño de tu paquete
                                </span>
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
                                  <IconButton
                                    size="small"
                                    aria-label="Ayuda tamaño"
                                  >
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
                                  aria-label="Guardar tamaño"
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
                                      saveCustomSize(
                                        width,
                                        height,
                                        length,
                                        onChange
                                      );
                                    } else {
                                      alert(
                                        "Por favor, complete todas las medidas."
                                      );
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
              )}
            </>
          )}

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
              aria-label="Volver"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: "red",
                borderColor: "red",
                textTransform: "none",
              }}
            />
          )}
          {isMultiPackage && step < packageCount - 1 && (
            <Button
              aria-label="Siguiente"
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
              aria-label="Realizar cotización"
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
