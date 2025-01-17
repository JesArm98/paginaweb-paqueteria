"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from "@mui/material";
import { proveedores } from "../../../data/data";

const CotizacionResultados = ({
  cotizacionData,
  onModificarCotizacion,
  onSelectProveedor,
  emailConfirmado,
  setEmailConfirmado,
  emailUsuario,
  setEmailUsuario,
}) => {
  const [ordenarPor, setOrdenarPor] = useState("rapidez");

  if (!cotizacionData) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>No hay datos de cotización disponibles</Typography>
        <Button onClick={onModificarCotizacion} sx={{ mt: 2 }}>
          Volver al formulario
        </Button>
      </Box>
    );
  }

  const handleConfirmarEmail = () => {
    if (emailUsuario && emailUsuario.includes("@")) {
      setEmailConfirmado(true);
    }
  };

  const handleOrdenarChange = (event, newValue) => {
    if (newValue !== null) {
      setOrdenarPor(newValue);
    }
  };

  const proveedoresOrdenados = [...proveedores].sort((a, b) => {
    if (ordenarPor === "rapidez") {
      return a.tiempoEntrega - b.tiempoEntrega;
    }
    return a.precio - b.precio;
  });

  const renderPackageDetails = (packageData, index) => {
    const isFirstPackage = index === 0;
    const dimensions =
      packageData.size === "manual"
        ? {
            ancho: packageData.customWidth,
            alto: packageData.customHeight,
            largo: packageData.customLength,
          }
        : packageData.size.split("x").reduce((acc, val, idx) => {
            const keys = ["ancho", "alto", "largo"];
            acc[keys[idx]] = val;
            return acc;
          }, {});

    return (
      <Card
        sx={{
          mb: 2,
          borderRadius: "20px",
          border: "1px solid red",
          height: "fit-content",
        }}
        key={index}
      >
        {console.log(cotizacionData)}
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Desde:</strong>{" "}
                    {typeof cotizacionData.origen === "object"
                      ? `${cotizacionData.origen.cp}`
                      : cotizacionData.origen}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Hasta:</strong>{" "}
                    {typeof cotizacionData.destino === "object"
                      ? `${cotizacionData.destino.cp}`
                      : cotizacionData.destino}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Alto:</strong> {dimensions.alto} cm
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Ancho:</strong> {dimensions.ancho} cm
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Largo:</strong> {dimensions.largo} cm
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body2">
                    <strong>Peso:</strong> {packageData.peso} kg
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {isFirstPackage && (
              <Grid item xs={12} sm={2}>
                <Button
                  variant="outlined"
                  onClick={onModificarCotizacion}
                  fullWidth
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                >
                  Modificar cotización
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      {!emailConfirmado ? (
        <Box sx={{ mx: "auto" }}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Ingresa tu correo electrónico para ver la cotización
          </Typography>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={emailUsuario}
            onChange={(e) => setEmailUsuario(e.target.value)}
            sx={{ mb: 2 }}
            error={emailUsuario !== "" && !emailUsuario.includes("@")}
            helperText={
              emailUsuario !== "" && !emailUsuario.includes("@")
                ? "Ingresa un correo válido"
                : ""
            }
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmarEmail}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              width: "fit-content",
              margin: "auto",
              display: "flex",
            }}
            disabled={!emailUsuario || !emailUsuario.includes("@")}
          >
            Confirmar
          </Button>
        </Box>
      ) : (
        <>
          {/* Resumen de la cotización */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: "blue" }}>
              Detalles del envío
            </Typography>
            {cotizacionData.packages.map((pkg, index) =>
              renderPackageDetails(pkg, index)
            )}
          </Box>

          {/* Selector de ordenamiento */}
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: "blue" }}>
              Seleccionar alianza
            </Typography>
            <ToggleButtonGroup
              value={ordenarPor}
              exclusive
              onChange={handleOrdenarChange}
              aria-label="ordenar por"
              sx={{ display: "flex", gap: 2 }}
            >
              <ToggleButton
                sx={{ borderRadius: "20px", textTransform: "none" }}
                value="rapidez"
              >
                Por rapidez
              </ToggleButton>
              <ToggleButton
                sx={{ borderRadius: "20px", textTransform: "none" }}
                value="precio"
              >
                Por precio
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Lista de proveedores */}
          <Grid container spacing={2}>
            {proveedoresOrdenados.map((proveedor) => (
              <Grid item xs={12} key={proveedor.id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => onSelectProveedor(proveedor)}
                >
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} sm={2}>
                        <img
                          src={proveedor.logo}
                          alt={proveedor.nombre}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Typography variant="subtitle1">
                          Entrega para el {proveedor.fechaEntrega}
                        </Typography>
                        <Typography variant="body2">
                          Duración de entrega: {proveedor.tiempoEntrega} días
                        </Typography>
                        <Typography variant="body2">
                          {proveedor.tipoServicio}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="primary">
                          ${proveedor.precio.toFixed(2)} MXN
                        </Typography>
                        <Typography variant="caption">
                          Precio Especial* (Solo Por Web)
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CotizacionResultados;
