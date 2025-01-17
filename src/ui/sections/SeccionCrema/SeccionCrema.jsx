
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import Head from "next/head";
import CotizacionEnvios from "../Cotizacion/CotizacionEnvios";

export default function SeccionCrema() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
        {/* Hero Section */}
        <Box textAlign="center" sx={{ py: 15 }}>
          <Typography variant="h2" gutterBottom>
            Entrega segura, rápida y confiable
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Llevamos tus paquetes a donde quieras y cuando quieras.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 3 }}>
            Cotiza tu envío ahora
          </Button>
        </Box>

        {/* Beneficios */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {["Rápido", "Seguro", "Accesible"].map((beneficio) => (
            <Grid item xs={12} md={4} key={beneficio}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {beneficio}
                  </Typography>
                  <Typography>
                    Nuestro servicio de paquetería asegura {beneficio} en cada
                    entrega.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Servicios */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Nuestros Servicios
          </Typography>
          <Grid container spacing={4}>
            {["Envíos Locales", "Envíos Nacionales", "Entrega Exprés"].map(
              (servicio) => (
                <Grid item xs={12} md={4} key={servicio}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {servicio}
                      </Typography>
                      <Typography>
                        Descubre más sobre nuestro servicio de {servicio}.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>

        {/* Proceso */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Cómo Funciona
          </Typography>
          <Grid container spacing={4}>
            {["Cotiza tu envío", "Recolección", "Entrega rápida"].map(
              (paso, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Paso {index + 1}: {paso}
                      </Typography>
                      <Typography>
                        {`Explicación del paso ${index + 1}: ${paso}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>

        {/* Cotización */}
        <CotizacionEnvios />
      </Container>
    </>
  );
}
