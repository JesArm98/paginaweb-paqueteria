"use client";

import React, { useEffect, useState, useRef } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CotizacionResultados from "./CotizacionResultados";
import TarimaTooltip from "@/ui/components/TarimaTooltip";
import StyledTextField from "@/ui/components/StyledTextField";

const CotizacionEnvios = ({
  initialShippingType,
  open,
  onClose,
  isResultsMode,
  setIsResultsMode,
}) => {
  const [cotizacionData, setCotizacionData] = useState(null); // Estado para almacenar datos de la cotización
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [coloniasOrigen, setColoniasOrigen] = useState([]);
  const [coloniasDestino, setColoniasDestino] = useState([]);
  const [expanded, setExpanded] = useState(true); // Expandido por defecto

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  // Luego dentro del componente, añade esta línea:
  const debounceTimer = useRef(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      origen: "",
      destino: "",
      servicio: initialShippingType || "",
      packages: [
        {
          tipo: "tarima",
          ancho: "",
          alto: "",
          largo: "",
          peso: "",
          cantidad: 1,
          volumen: 0,
          contenido: "Cotización web",
        },
      ],
      tipo: "CotizacionPackage",
      mensaje: `Estoy interesado en una cotización para el servicio de ${initialShippingType.toUpperCase()}`,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  const formValues = useWatch({ control });
  console.log("Valores del formulario:", formValues);

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
    setIsResultsMode(false); // Añade esta línea
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
      origen:
        typeof data.origen === "string" ? { cp: data.origen } : data.origen,
      destino:
        typeof data.destino === "string" ? { cp: data.destino } : data.destino,
      packages: data.packages.map((pkg) => ({
        ...pkg,
        cantidad: Number(pkg.cantidad) || 0,
        ancho: Number(pkg.ancho) || 0,
        alto: Number(pkg.alto) || 0,
        largo: Number(pkg.largo) || 0,
        peso: Number(pkg.peso) || 0,
        contenido: "Cotización web",
        tipo: "tarima",
        volumen: Number(
          (
            (Number(pkg.ancho) / 100) *
            (Number(pkg.alto) / 100) *
            (Number(pkg.largo) / 100)
          ).toFixed(4)
        ),
      })),
    };

    setCotizacionData(cotizacionDataNormalizada); // Guarda los datos normalizados
    setMostrarResultados(true); // Muestra resultados
    setIsResultsMode(true);
  };

  const handleAutocompleteChange = (field, value, onChange) => {
    // Update the input value immediately for responsiveness
    onChange(value || "");

    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Only make API call if we have enough characters
    if (value && value.length >= 3) {
      // Debounce the API call to prevent too many requests
      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://web.pktuno.mx/PKT1/index.php/CatCodigosPostales/ajax_list_mexico_str/?pais=MX&query=${value}`
          );

          // Transformar la respuesta al formato deseado
          const colonias = response.data
            .map((item) => {
              try {
                const parts = item.data.split(" - ");

                if (parts.length < 2) return null;

                const cp = parts[0];
                const locationParts = parts[1].split(", ");
                const locationParts2 = parts[2].split(", ");

                return {
                  cp: cp,
                  colonia: locationParts[0] || "",
                  ciudad: locationParts2[0] || "",
                  municipio: locationParts[1] || "",
                  pais: locationParts2[1] || "",
                };
              } catch (e) {
                console.error("Error procesando item:", item);
                return null;
              }
            })
            .filter((item) => item !== null);

          if (field === "origen") {
            setColoniasOrigen(colonias);
          } else if (field === "destino") {
            setColoniasDestino(colonias);
          }
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }, 300); // Wait 300ms after user stops typing
    } else {
      // Clear the options if input is too short
      if (field === "origen") {
        setColoniasOrigen([]);
      } else if (field === "destino") {
        setColoniasDestino([]);
      }
    }
  };

  //Origen
  useEffect(() => {
    const fetchOrigenData = async () => {
      if (!formValues?.origen?.cp || !formValues?.origen?.colonia) return; // Validar que CP y colonia existan

      try {
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${formValues.origen.cp}`
        );

        const data = response.data; // Suponiendo que devuelve un array de objetos con cp, colonia y ciudad

        if (Array.isArray(data) && data.length > 0) {
          // Buscar coincidencia exacta de CP y colonia
          const match = data.find(
            (item) =>
              item.cp === formValues.origen.cp &&
              item.colonia.toLowerCase() ===
                formValues.origen.colonia.toLowerCase()
          );

          // Si encontramos una coincidencia, actualizamos el formulario
          if (match) {
            setValue("origen", match, { shouldValidate: true });
          } else {
            console.warn(
              "No se encontró coincidencia exacta para CP y colonia."
            );
          }
        }
      } catch (error) {
        console.error("Error al obtener la información del origen:", error);
      }
    };

    fetchOrigenData();
  }, [formValues.origen?.cp, formValues.origen?.colonia]);

  //Destino
  useEffect(() => {
    console.log("Ejecutando useEffect - Dependencias:", {
      cp: formValues?.destino?.cp,
      colonia: formValues?.destino?.colonia,
    });

    if (!formValues?.destino?.cp || !formValues?.destino?.colonia) {
      console.warn("⛔ No hay CP o colonia definidos, se cancela la petición.");
      return;
    }

    const fetchDestinoData = async () => {
      try {
        console.log("🔄 Haciendo petición a la API...");
        const response = await axios.get(
          `https://api.pktuno.mx/Api/Cobertura/${formValues.destino.cp}`
        );

        console.log("✅ Respuesta de la API:", response.data);

        const data = response.data;
        if (!Array.isArray(data) || data.length === 0) {
          console.warn("⛔ No se encontraron datos en la API.");
          return;
        }

        // Función para comparar colonias con tolerancia de similitud
        const getSimilarity = (a = "", b = "") => {
          a = a.toLowerCase().trim();
          b = b.toLowerCase().trim();
          return a.includes(b) || b.includes(a);
        };

        // Buscar coincidencia basada en CP y colonia con tolerancia
        const match = data.find(
          (item) =>
            item.cp === formValues.destino.cp &&
            getSimilarity(item.colonia, formValues.destino.colonia)
        );

        if (match) {
          console.log("🎯 Coincidencia encontrada:", match);
          setValue("destino", match, { shouldValidate: true });
        } else {
          console.warn("⚠️ No se encontró coincidencia exacta.");
        }
      } catch (error) {
        console.error("❌ Error al obtener la información del destino:", error);
      }
    };

    fetchDestinoData();
  }, [formValues.destino?.cp, formValues.destino?.colonia]);

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

  // Calcula el total de tarimas sumando la propiedad "cantidad" de cada paquete
  const totalTarimas =
    formValues.packages?.reduce(
      (total, pkg) => total + (Number(pkg.cantidad) || 0),
      0
    ) || 0;

  // Función para validar el formulario
  const isFormValid = () => {
    // Verifica que origen y destino sean objetos con "cp" (opción seleccionada)
    if (
      !formValues.origen ||
      typeof formValues.origen !== "object" ||
      !formValues.origen.cp ||
      !formValues.destino ||
      typeof formValues.destino !== "object" ||
      !formValues.destino.cp
    ) {
      return false;
    }

    // Verifica que al menos un paquete tenga todas sus propiedades llenas
    return formValues.packages.every(
      (pkg) => pkg.ancho && pkg.alto && pkg.largo && pkg.peso
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
        append({
          ancho: "",
          alto: "",
          largo: "",
          peso: "",
          cantidad: 1,
          volumen: 0,
          contenido: "Cotización web",
          tipo: "tarima",
        });
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
                render={({ field: { onChange, value } }) => {
                  // Solo es válido si es un objeto con "cp" (seleccionado de la lista)
                  const isValid =
                    typeof value === "object" && value && value.cp;
                  const isEmpty = !value;
                  const hasError = errors?.origen;

                  return (
                    <Autocomplete
                      freeSolo
                      options={coloniasOrigen}
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                      }
                      value={value}
                      onInputChange={(e, newValue) => {
                        if (
                          /^[a-zA-Z0-9]+$/.test(newValue) ||
                          newValue === ""
                        ) {
                          handleAutocompleteChange(
                            "origen",
                            newValue,
                            onChange
                          );
                        }
                      }}
                      onChange={(e, newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Origen"
                          fullWidth
                          error={!!hasError}
                          helperText={
                            hasError
                              ? errors.origen.message
                              : isValid
                              ? "✔️" // Solo aparece si se ha seleccionado una opción
                              : "Ingrese CP origen o colonia"
                          }
                          sx={{
                            ...inputStyles,
                            "& .MuiOutlinedInput-root": {
                              ...inputStyles["& .MuiOutlinedInput-root"],
                              "& fieldset": {
                                borderColor: isValid
                                  ? "green"
                                  : isEmpty
                                  ? "#07417B"
                                  : "#BDBDBD",
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
                                borderColor: isValid
                                  ? "green"
                                  : hasError
                                  ? "red"
                                  : "gray",
                                boxShadow:
                                  "0px 0px 6px rgba(25, 118, 210, 0.3)",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
            </Grid>

            {/* Destino */}
            <Grid item xs={12} md={6}>
              <Controller
                name="destino"
                control={control}
                render={({ field: { onChange, value } }) => {
                  // Solo es válido si es un objeto con "cp" (seleccionado de la lista)
                  const isValid =
                    typeof value === "object" && value && value.cp;
                  const isEmpty = !value;
                  const hasError = errors?.destino;

                  return (
                    <Autocomplete
                      freeSolo
                      options={coloniasDestino}
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : `${option.cp}, ${option.colonia}, ${option.ciudad}, ${option.estado}`
                      }
                      value={value}
                      onInputChange={(e, newValue) => {
                        if (
                          /^[a-zA-Z0-9]+$/.test(newValue) ||
                          newValue === ""
                        ) {
                          handleAutocompleteChange(
                            "destino",
                            newValue,
                            onChange
                          );
                        }
                      }}
                      onChange={(e, newValue) => onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Destino"
                          fullWidth
                          error={!!hasError}
                          helperText={
                            hasError
                              ? errors.destino.message
                              : isValid
                              ? "✔️" // Solo aparece si se ha seleccionado una opción
                              : "Ingrese CP destino o colonia"
                          }
                          sx={{
                            ...inputStyles,
                            "& .MuiOutlinedInput-root": {
                              ...inputStyles["& .MuiOutlinedInput-root"],
                              "& fieldset": {
                                borderColor: isValid
                                  ? "green"
                                  : isEmpty
                                  ? "#07417B"
                                  : "#BDBDBD",
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
                                borderColor: isValid
                                  ? "green"
                                  : hasError
                                  ? "red"
                                  : "gray",
                                boxShadow:
                                  "0px 0px 6px rgba(25, 118, 210, 0.3)",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
            </Grid>

            {/* Contador de Tarimas y Botón Agregar */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  Número de elementos: {totalTarimas}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                  }}
                >
                  Tipos de mercancia: Tarima, Pallet, Jaula, etc.
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box>
                {/* Botón Agregar Tarima */}
                <Button
                  variant="outlined"
                  onClick={() =>
                    append({
                      ancho: "",
                      alto: "",
                      largo: "",
                      peso: "",
                      cantidad: 1,
                      volumen: 0,
                      contenido: "Cotización web",
                      tipo: "tarima",
                    })
                  }
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
                  {isMdUp ? "Agregar" : <AddIcon />}{" "}
                  {/* Usa el icono solo en sm- */}
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid gray",
                  borderRadius: "20px",
                  gap: 1,
                }}
              >
                <TarimaTooltip />
              </Box>
            </Grid>
          </Grid>

          {/* Desglose de Tarimas con Accordion */}
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
              mt: 3,
              borderRadius: "12px",
              boxShadow: "none",
              border: "1px solid #ddd",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "12px", md: "18px" },
                }}
              >
                Detalle de tarimas
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                sx={{ width: "100%", maxHeight: 250, overflowY: "auto", pt: 1 }}
              >
                {fields.map((pkg, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={pkg.id}
                    sx={{ alignItems: "center", mb: 3 }}
                  >
                    {/* Cantidad */}
                    <Grid item xs={6} sm={2}>
                      <StyledTextField
                        name={`packages.${index}.cantidad`}
                        control={control}
                        errors={errors}
                        label="Cantidad"
                        type="number"
                        helperTextEmpty="Ingrese cantidad requerida"
                        placeholder="Ingrese cantidad"
                      />
                    </Grid>

                    {/* Ancho */}
                    <Grid item xs={6} sm={2}>
                      <StyledTextField
                        name={`packages.${index}.ancho`}
                        control={control}
                        errors={errors}
                        label="Ancho (cm)"
                        type="number"
                        helperTextEmpty=""
                        placeholder="Ingrese ancho"
                      />
                    </Grid>

                    {/* Alto */}
                    <Grid item xs={6} sm={2}>
                      <StyledTextField
                        name={`packages.${index}.alto`}
                        control={control}
                        errors={errors}
                        label="Alto (cm)"
                        type="number"
                        helperTextEmpty=""
                        placeholder="Ingrese alto"
                      />
                    </Grid>

                    {/* Largo */}
                    <Grid item xs={6} sm={2}>
                      <StyledTextField
                        name={`packages.${index}.largo`}
                        control={control}
                        errors={errors}
                        label="Largo (cm)"
                        type="number"
                        helperTextEmpty=""
                        placeholder="Ingrese largo"
                      />
                    </Grid>

                    {/* Peso */}
                    <Grid item xs={6} sm={2}>
                      <StyledTextField
                        name={`packages.${index}.peso`}
                        control={control}
                        errors={errors}
                        label="Peso (kg)"
                        type="number"
                        helperTextEmpty=""
                        placeholder="Ingrese peso"
                      />
                    </Grid>

                    {/* Botón de eliminar */}
                    <Grid item xs={6} sm={2}>
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

          <Typography
            sx={{
              fontSize: "11px",
              textAlign: "left",
              width: { xs: "100%", md: "45%" },
            }}
          >
            Servicios adicionales: Acuse de Recibo, Seguro, EAD o RAD con cita y
            Ocurre (Entrega a domicilio o recolección en sucursal)
          </Typography>

          <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: "none", borderRadius: "20px" }}
              disabled={!isFormValid()}
            >
              {isMdUp ? "Continuar cotización" : ""}
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
