"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Autocomplete,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tooltip
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import CotizacionResultados from "./CotizacionResultados";
import { useEmail } from "@/context/EmailContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const CotizacionEnvios = ({ initialShippingType, open, onClose }) => {
  const {
    emailConfirmado,
    setEmailConfirmado,
    emailUsuario,
    setEmailUsuario,
    mostrarResultados,
    setMostrarResultados,
  } = useEmail();

  useEffect(() => {
    console.log("Email confirmado:", emailConfirmado);
    console.log("Email usuario:", emailUsuario);
  }, [emailConfirmado, emailUsuario]);
  

  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);
  const [expanded, setExpanded] = useState(true); // Expandido por defecto

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      origen: "",
      destino: "",
      tipoEnvio: initialShippingType || "",
      packages: [{ width: "", height: "", length: "", weight: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  useEffect(() => {
    if (initialShippingType) {
      setValue("tipoEnvio", initialShippingType);
    }
  }, [initialShippingType, setValue]);

  const onSubmit = (data) => {
    const cotizacionDataNormalizada = {
      ...data,
      origen: typeof data.origen === "string" ? { cp: data.origen } : data.origen,
      destino: typeof data.destino === "string" ? { cp: data.destino } : data.destino,
      packages: data.packages.map((pkg) => ({
        ...pkg,
        width: Number(pkg.width) || 0,
        height: Number(pkg.height) || 0,
        length: Number(pkg.length) || 0,
        weight: Number(pkg.weight) || 0,
      })),
    };
  
    console.log("Datos normalizados:", cotizacionDataNormalizada);
    setMostrarResultados(true);
  };

  const handleAutocompleteChange = async (field, value, onChange) => {
    if (value && value.length === 5) {
      try {
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${value}`
        );

        if (field === "origen") {
          setColoniasOrigen(response.data || []);
        } else if (field === "destino") {
          setColoniasDestino(response.data || []);
        }

        onChange(value);
      } catch (error) {
        console.error("Error fetching data:", error);
        onChange("");
      }
    } else {
      onChange(value || "");
    }
  };

    // Resetea el estado cuando el modal se cierra
    useEffect(() => {
      if (!open) {
        setEmailConfirmado(false);
        setEmailUsuario("");
        setMostrarResultados(false);
      }
    }, [open]);

  if (mostrarResultados) {
    return (
      <CotizacionResultados
        cotizacionData={watch()}
        onModificarCotizacion={() => setMostrarResultados(false)}
        emailConfirmado={emailConfirmado}
        setEmailConfirmado={setEmailConfirmado}
        emailUsuario={emailUsuario}
        setEmailUsuario={setEmailUsuario}
      />
    );
  }

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

  // Monitorea los valores del formulario
const formValues = watch();

// Función para validar el formulario
const isFormValid = () => {
  // Verifica que origen y destino no estén vacíos
  if (!formValues.origen || !formValues.destino) return false;

  // Verifica que al menos un paquete tenga todas sus propiedades llenas
  return formValues.packages.some(pkg => 
    pkg.width && pkg.height && pkg.length && pkg.weight
  );
};

    // Se abre cuando se agrega una nueva tarima
useEffect(() => {
  setExpanded(true);
}, [fields.length]);
  

  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
        width: { xs: "95%" },
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justifyContent="center">
          {/* Origen */}
          <Grid item xs={12} md={6}>
            <Controller
              name="origen"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasOrigen}
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
                    <TextField {...params} label="Origen" fullWidth helperText="Ingrese CP origen"   sx={inputStyles} />
                  )}
                />
              )}
            />
          </Grid>

          {/* Destino */}
          <Grid item xs={12} md={6}>
            <Controller
              name="destino"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  freeSolo
                  options={coloniasDestino}
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
                    <TextField {...params} label="Destino" fullWidth helperText="Ingrese CP destino" sx={inputStyles} />
                  )}
                />
              )}
            />
          </Grid>

          {/* Contador de Tarimas y Botón Agregar */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Número de Tarimas"
              value={fields.length}
              InputProps={{
                readOnly: true,
              }}
              helperText="Pallet, Jaula, etc."
              disabled
              fullWidth
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "roww", alignItems: "center", justifyContent:"space-evenly" }}>
  {/* Botón Agregar Tarima */}
  <Button
    variant="outlined"
    onClick={() => append({ width: "", height: "", length: "", weight: "" })}
    startIcon={<AddIcon />}
    fullWidth
    sx={{ width: "fit-content", textTransform: "none", borderRadius: "20px" }}
  >
    Agregar
  </Button>
<Box sx={{display:"flex", justifyContent:"center", alignItems:"center", border:"1px solid red", borderRadius:"20px", gap:1}}>
  {/* Texto debajo del botón */}
  <Typography variant="body2" sx={{ fontSize: "12px", textAlign: "center", ml:1.5 }}>
    Cómo conocer las dimensiones
  </Typography>

  {/* Tooltip con imagen al hacer hover */}
  <Tooltip
    title={
      <Box sx={{ textAlign: "center", p: 1 }}>
        <Image
          src="/images/tarimas.webp"
          alt="Ejemplo de dimensiones"
          width={200}
          height={150}
          style={{ borderRadius: "8px", marginTop: "4px" }}
        />
      </Box>
    }
    arrow
    placement="top"
    sx={{
      "& .MuiTooltip-tooltip": {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderRadius: "10px",
        p: 1,
      },
    }}
  >
    <IconButton sx={{ mt: 0.5 }}>
      <HelpOutlineIcon color="primary" />
    </IconButton>
  </Tooltip>

</Box>
</Grid>
        </Grid>

{/* Desglose de Tarimas con Accordion */}
<Accordion   expanded={expanded}
  onChange={() => setExpanded(!expanded)} sx={{ mt: 3, borderRadius: "12px", boxShadow: "none", border: "1px solid #ddd" }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel-content"
    id="panel-header"
    sx={{
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      "&:hover": { backgroundColor: "#f1f1f1" }
    }}
  >
    <Typography sx={{
      fontSize:"18px"
    }} >
      Detalle de tarimas
    </Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Box sx={{ width: "100%", maxHeight: 250, overflowY: "auto", pt: 1 }}>
      {fields.map((pkg, index) => (
        <Grid container spacing={2} key={pkg.id} sx={{ alignItems: "center", mb: 3 }}>
          {/* Ancho */}
          <Grid item xs={3}>
            <Controller
              name={`packages.${index}.width`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Ancho (cm)" type="number" fullWidth sx={{ ...inputStyles }} />
              )}
            />
          </Grid>

          {/* Alto */}
          <Grid item xs={3}>
            <Controller
              name={`packages.${index}.height`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Alto (cm)" type="number" fullWidth sx={{ ...inputStyles }} />
              )}
            />
          </Grid>

          {/* Largo */}
          <Grid item xs={3}>
            <Controller
              name={`packages.${index}.length`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Largo (cm)" type="number" fullWidth sx={{ ...inputStyles }} />
              )}
            />
          </Grid>

          {/* Peso */}
          <Grid item xs={2}>
            <Controller
              name={`packages.${index}.weight`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Peso (kg)" type="number" fullWidth sx={{ ...inputStyles }} />
              )}
            />
          </Grid>

          {/* Botón de eliminar */}
          <Grid item xs={1}>
            {fields.length > 1 && (
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
    </Box>
  </AccordionDetails>
</Accordion>

<Typography sx={{fontSize:"11px", textAlign:"left", width:"45%"}}>
Servicios adicionales: Acuse de Recibo, Seguro, EAD o RAD con cita y Ocurre (Entrega a domicilio o recolección en sucursal)
</Typography>

        <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
          <Button type="submit" variant="outlined"  endIcon={<ArrowForwardIcon/>} sx={{textTransform:"none", borderRadius:"20px"}}   disabled={!isFormValid()}>
            Continuar cotización
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default CotizacionEnvios;
