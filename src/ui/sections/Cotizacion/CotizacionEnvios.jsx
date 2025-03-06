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
  Tooltip,
  useMediaQuery, useTheme
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CotizacionResultados from "./CotizacionResultados";
import TarimaTooltip from "@/ui/components/TarimaTooltip";

const CotizacionEnvios = ({ initialShippingType, open, onClose }) => {
  const [cotizacionData, setCotizacionData] = useState(null); // Estado para almacenar datos de la cotización
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);
  const [expanded, setExpanded] = useState(true); // Expandido por defecto

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      origen: "",
      destino: "",
      servicio: initialShippingType || "",
      packages: [{ ancho: "", alto: "", largo: "", peso: "", cantidad: 1 }],
    },
  });
  

  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  useEffect(() => {
    if (initialShippingType) {
      setValue("servicio", initialShippingType);
    }
  }, [initialShippingType, setValue]);

    // Resetea todos los valores cuando el usuario cierra el modal
    useEffect(() => {
      if (!open) {
        handleReset();
      }
    }, [open]);
  
    // Función para restablecer el formulario y el estado
    const handleReset = () => {
      setCotizacionData(null);
      setMostrarResultados(false);
    };

    const handleCerrar = () => {
      onClose(); // 🔹 Cierra el modal primero
    
      // 🔹 Espera un breve momento y luego resetea el estado
      setTimeout(() => {
        handleReset();
      }, 300); // ⏳ Pequeña espera para evitar flashback visual
    };

  const onSubmit = (data) => {
    const cotizacionDataNormalizada = {
      ...data,
      origen: typeof data.origen === "string" ? { cp: data.origen } : data.origen,
      destino: typeof data.destino === "string" ? { cp: data.destino } : data.destino,
      packages: data.packages.map((pkg) => ({
        ...pkg,
        cantidad:Number(pkg.cantidad) ||0,
        ancho: Number(pkg.ancho) || 0,
        alto: Number(pkg.alto) || 0,
        largo: Number(pkg.largo) || 0,
        peso: Number(pkg.peso) || 0,
      })),
    };
  
    setCotizacionData(cotizacionDataNormalizada); // Guarda los datos normalizados
    setMostrarResultados(true); // Muestra resultados
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

// Calcula el total de tarimas sumando la propiedad "cantidad" de cada paquete
const totalTarimas = formValues.packages?.reduce(
  (total, pkg) => total + (Number(pkg.cantidad) || 0),
  0
) || 0;

// Función para validar el formulario
const isFormValid = () => {
  // Verifica que origen y destino no estén vacíos
  if (!formValues.origen || !formValues.destino) return false;

  // Verifica que al menos un paquete tenga todas sus propiedades llenas
  return formValues.packages.every(pkg => 
    pkg.ancho && pkg.alto && pkg.largo && pkg.peso
  );
};

    // Se abre cuando se agrega una nueva tarima
useEffect(() => {
  setExpanded(true);
}, [fields.length]);

const handleTarimaChange = (event) => {
  let newCount = Number(event.target.value) || 1;
  newCount = Math.max(1, newCount); // Evita números negativos o cero

  const currentCount = fields.length;

  if (newCount > currentCount) {
    for (let i = currentCount; i < newCount; i++) {
      append({ ancho: "", alto: "", largo: "", peso: "", cantidad: 1 });
    }
  } else if (newCount < currentCount) {
    for (let i = currentCount; i > newCount; i--) {
      remove(i - 1);
    }
  }
};

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
      {!mostrarResultados ? (

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
            <Box>
            <Typography sx={{
              fontSize:"16px",
            }}>
              Número de elementos: {totalTarimas}
            </Typography>
              <Typography sx={{
                fontSize:"11px"
              }}>
                Tipos de mercancia: Tarima, Pallet, Jaula, etc.
              </Typography>
            </Box>
            


          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-evenly" }}>


            <Box>

  {/* Botón Agregar Tarima */}
  <Button
      variant="outlined"
      onClick={() => append({ ancho: "", alto: "", largo: "", peso: "", cantidad: 1 })}
      startIcon={isMdUp ? <AddIcon /> : null} // Solo usa startIcon en md+
      fullWidth
      sx={{
        width: "fit-content",
        minWidth: isMdUp ? "auto" : "40px", // Ancho mínimo cuando no hay texto
        height: "40px", // Mantiene un tamaño adecuado para el botón
        textTransform: "none",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMdUp ? "8px" : "0px", // Espacio entre icono y texto solo en md+
        padding: isMdUp ? "6px 16px" : "6px", // Reduce padding en tamaños pequeños
      }}
    >
      {isMdUp ? "Agregar" : <AddIcon />} {/* Usa el icono solo en sm- */}
    </Button>
            </Box>
          
<Box sx={{display:"flex", justifyContent:"center", alignItems:"center", border:"1px solid gray", borderRadius:"20px", gap:1}}>
<TarimaTooltip/>
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
      fontSize:{xs:"12px",md:"18px"}
    }} >
      Detalle de tarimas
    </Typography>
  </AccordionSummary>

  <AccordionDetails>
    <Box sx={{ width: "100%", maxHeight: 250, overflowY: "auto", pt: 1 }}>
      {fields.map((pkg, index) => (
        <Grid container spacing={2} key={pkg.id} sx={{ alignItems: "center", mb: 3 }}>
          {/* Cantidad */}
          <Grid item xs={6}sm={2}>
            <Controller
              name={`packages.${index}.cantidad`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Cantidad" type="number" fullWidth sx={{ ...inputStyles }}   InputProps={{
                  inputMode: 'numeric',
                  
                  sx: {
                    '& input[type=number]': {
                      MozAppearance: 'textfield',
                      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                        opacity: 1, // Hace visibles las flechas siempre
                      }
                    }
                  }
                }} />
              )}
            />
          </Grid>

{/* Ancho */}
<Grid item xs={6}sm={2}>
  <Controller
    name={`packages.${index}.ancho`}
    control={control}
    render={({ field }) => (
      <TextField {...field} label="Ancho (cm)" type="number" fullWidth sx={{ ...inputStyles }} 
        onChange={(e) => setValue(`packages.${index}.ancho`, e.target.value, { shouldValidate: true })} placeholder="Ingrese ancho"        InputLabelProps={{
          shrink: {xs:true, md:false}, // Mantiene la etiqueta siempre arriba
        }}    InputProps={{
          inputMode: 'numeric',
          sx: {
            '& input[type=number]': {
              MozAppearance: 'textfield',
              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                opacity: 1, // Hace visibles las flechas siempre
              }
            }
          }
        }}
      />
    )}
  />
</Grid>

{/* Alto */}
<Grid item xs={6}sm={2}>
  <Controller
    name={`packages.${index}.alto`}
    control={control}
    render={({ field }) => (
      <TextField {...field} label="Alto (cm)" type="number" fullWidth sx={{ ...inputStyles }} 
        onChange={(e) => setValue(`packages.${index}.alto`, e.target.value, { shouldValidate: true })} placeholder="Ingrese alto"   InputLabelProps={{
          shrink: {xs:true, md:false}, // Mantiene la etiqueta siempre arriba
        }}           InputProps={{
          inputMode: 'numeric',
          sx: {
            '& input[type=number]': {
              MozAppearance: 'textfield',
              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                opacity: 1, // Hace visibles las flechas siempre
              }
            }
          }
        }}
      />
    )}
  />
</Grid>

{/* Largo */}
<Grid item xs={6}sm={2}>
  <Controller
    name={`packages.${index}.largo`}
    control={control}
    render={({ field }) => (
      <TextField {...field} label="Largo (cm)" type="number" fullWidth sx={{ ...inputStyles }} 
        onChange={(e) => setValue(`packages.${index}.largo`, e.target.value, { shouldValidate: true })} placeholder="Ingrese largo"      InputLabelProps={{
          shrink: {xs:true, md:false}, // Mantiene la etiqueta siempre arriba
        }}        InputProps={{
          inputMode: 'numeric',
          sx: {
            '& input[type=number]': {
              MozAppearance: 'textfield',
              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                opacity: 1, // Hace visibles las flechas siempre
              }
            }
          }
        }}
      />
    )}
  />
</Grid>

{/* Peso */}
<Grid item xs={6}sm={2}>
  <Controller
    name={`packages.${index}.peso`}
    control={control}
    render={({ field }) => (
      <TextField {...field} label="Peso (kg)" type="number" fullWidth sx={{ ...inputStyles }} 
        onChange={(e) => setValue(`packages.${index}.peso`, e.target.value, { shouldValidate: true })} placeholder="Ingrese peso"    InputLabelProps={{
          shrink: {xs:true, md:false}, // Mantiene la etiqueta siempre arriba
        }}       InputProps={{
          inputMode: 'numeric',
          sx: {
            '& input[type=number]': {
              MozAppearance: 'textfield',
              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                opacity: 1, // Hace visibles las flechas siempre
              }
            }
          }
        }}
      />
    )}
  />
</Grid>

          {/* Botón de eliminar */}
          <Grid item xs={6}sm={2}>
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

<Typography sx={{fontSize:"11px", textAlign:"left", width:{xs:"100%",md:"45%"}}}>
Servicios adicionales: Acuse de Recibo, Seguro, EAD o RAD con cita y Ocurre (Entrega a domicilio o recolección en sucursal)
</Typography>

        <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
          <Button type="submit" variant="outlined" color="primary"   endIcon={<ArrowForwardIcon/>} sx={{textTransform:"none", borderRadius:"20px"}}   disabled={!isFormValid()}>
            {isMdUp ?"Continuar cotización" : ""}
          </Button>
        </Grid>
      </form>
      ) : (
        <CotizacionResultados 
          cotizacionData={cotizacionData} 
          onModificarCotizacion={handleReset} // Resetea cuando se vuelve al formulario
          onCerrar={handleCerrar} // Resetea y cierra el diálogo
        />
      )}
    </Box>
  );
};

export default CotizacionEnvios;
