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
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import CotizacionResultados from "./CotizacionResultados";
import { useEmail } from "@/context/EmailContext";
import DeleteIcon from "@mui/icons-material/Delete";

const CotizacionEnvios = ({ initialShippingType }) => {
  const {
    emailConfirmado,
    setEmailConfirmado,
    emailUsuario,
    setEmailUsuario,
    mostrarResultados,
    setMostrarResultados,
  } = useEmail();

  // const [mostrarResultados, setMostrarResultados] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [packageCount, setPackageCount] = useState(1);
  const [packages, setPackages] = useState([
    { width: "", height: "", length: "", weight: "" },
  ]);

  const [isMultiPackage, setIsMultiPackage] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);

  // Nuevo estado para tipo de envío
  const [shippingType, setShippingType] = useState("");

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

  // Función de envío del formulario
  const onSubmit = (data) => {
    // Formatear los datos del origen y destino
    const formattedData = {
      ...data,
      packages,
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

  const handlePackageCountChange = (event) => {
    const count = Math.max(Number(event.target.value), 1);
    setPackageCount(count);
    setPackages((prevPackages) => {
      if (count > prevPackages.length) {
        return [
          ...prevPackages,
          ...Array(count - prevPackages.length).fill({
            width: "",
            height: "",
            length: "",
            weight: "",
          }),
        ];
      }
      return prevPackages.slice(0, count);
    });
  };

  const handlePackageChange = (index, field, value) => {
    setPackages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemovePackage = (index) => {
    if (packages.length > 1) {
      setPackages((prev) => prev.filter((_, i) => i !== index));
      setPackageCount((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleAddPackage = () => {
    setPackageCount((prev) => prev + 1);
    setPackages((prev) => [
      ...prev,
      { width: "", height: "", length: "", weight: "" },
    ]);
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

          <Grid item xs={12} md={6}>
            <TextField
              label="Número de tarimas"
              type="number"
              value={packageCount}
              onChange={handlePackageCountChange}
              disabled={packages.length >= 1}
              fullWidth
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Box sx={{ width: "100%", maxHeight: 400, overflow: "auto" }}>
            {packages.map((pkg, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{ mt: 2, alignItems: "center" }}
              >
                <Grid item xs={3}>
                  <TextField
                    label="Ancho (cm)"
                    type="number"
                    value={pkg.width}
                    onChange={(e) =>
                      handlePackageChange(index, "width", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Alto (cm)"
                    type="number"
                    value={pkg.height}
                    onChange={(e) =>
                      handlePackageChange(index, "height", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Largo (cm)"
                    type="number"
                    value={pkg.length}
                    onChange={(e) =>
                      handlePackageChange(index, "length", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Peso (kg)"
                    type="number"
                    value={pkg.weight}
                    onChange={(e) =>
                      handlePackageChange(index, "weight", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  {index > 0 && (
                    <IconButton onClick={() => handleRemovePackage(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>
          <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleAddPackage}
              disabled={packages.length > packageCount}
            >
              Agregar Tarima
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
          <Button type="submit" variant="contained" color="success">
            Realizar Cotización
          </Button>
        </Grid>
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
