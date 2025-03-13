"use client";
import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";

/**
 * Campo de autocompletado estilizado reutilizable para formularios
 * @param {Object} props - Propiedades del componente
 * @param {string} props.name - Nombre del campo (requerido para react-hook-form)
 * @param {Object} props.control - Control de react-hook-form
 * @param {Object} props.errors - Objeto de errores de react-hook-form
 * @param {string} props.label - Etiqueta del campo
 * @param {Array} props.options - Array de opciones para el autocompletado
 * @param {string} props.optionLabel - Propiedad a mostrar del objeto (si options son objetos)
 * @param {boolean} props.multiple - Permite selección múltiple
 * @param {boolean} props.loading - Indica si se están cargando las opciones
 * @param {boolean} props.freeSolo - Permite valores que no están en la lista
 * @param {string} props.placeholder - Texto de placeholder
 * @param {string} props.helperTextEmpty - Texto de ayuda cuando el campo está vacío
 * @param {Object} props.rules - Reglas de validación adicionales
 * @param {Object} props.autocompleteProps - Props adicionales para pasar al Autocomplete
 * @param {Object} props.textFieldProps - Props adicionales para pasar al TextField
 * @param {Function} props.onInputChange - Función que se ejecuta cuando cambia el input
 * @param {Function} props.onChange - Función adicional que se ejecuta cuando cambia el valor seleccionado
 * @returns {JSX.Element} Componente Autocomplete estilizado
 */

const StyledAutocomplete = ({
  name,
  control,
  errors,
  label,
  options = [],
  optionLabel = "label",
  multiple = false,
  loading = false,
  freeSolo = false,
  placeholder,
  helperTextEmpty,
  rules = {},
  autocompleteProps = {},
  textFieldProps = {},
  onInputChange,
  onChange,
}) => {
  // Estilos dinámicos basados en el estado del campo
  const getFieldSx = (isEmpty, hasError) => ({
    width: "100%",
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

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const isEmpty = multiple ? !field.value?.length : !field.value;
        const hasError = !!errors[name];
        const helperText = hasError
          ? errors[name]?.message
          : !isEmpty
          ? "✔️"
          : helperTextEmpty ||
            `Selecciona ${label?.toLowerCase() || "una opción"}`;

        // Para manejar correctamente el valor en casos de objetos vs valores primitivos
        const getValue = () => {
          if (!field.value) return multiple ? [] : null;
          return field.value;
        };

        return (
          <Autocomplete
            {...field}
            value={getValue()}
            multiple={multiple}
            freeSolo={freeSolo}
            options={options}
            loading={loading}
            getOptionLabel={(option) => {
              // Maneja diferentes tipos de opciones (objeto vs string)
              if (typeof option === "string") return option;
              if (option && typeof option === "object")
                return option[optionLabel] || "";
              return "";
            }}
            onChange={(event, newValue) => {
              field.onChange(newValue);
              // Ejecuta la función onChange adicional si existe
              if (onChange) {
                onChange(event, newValue);
              }
            }}
            onInputChange={(event, newInputValue) => {
              // Ejecuta la función onInputChange adicional si existe
              if (onInputChange) {
                onInputChange(event, newInputValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...textFieldProps}
                label={label}
                placeholder={placeholder}
                error={hasError}
                helperText={helperText}
                sx={{
                  ...getFieldSx(isEmpty, hasError),
                  ...(textFieldProps.sx || {}),
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            {...autocompleteProps}
          />
        );
      }}
    />
  );
};

export default StyledAutocomplete;
