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

export default function SeccionCrema() {
  return (
    <>
      <Head>
        <title>Servicio de Paquetería</title>
        <meta
          name="description"
          content="Entrega segura, rápida y confiable."
        />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Paquetería Rápida
          </Typography>
          <Button color="inherit">Cotizar</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Hero Section */}
        <Box textAlign="center" sx={{ py: 6 }}>
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
                    Nuestro servicio de paquetería asegura{" "}
                    {beneficio.toLowerCase()} en cada entrega.
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
                        Descubre más sobre nuestro servicio de{" "}
                        {servicio.toLowerCase()}.
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Cotiza tu Envío
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label="Origen"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 400 }}
            />
            <TextField
              label="Destino"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 400 }}
            />
            <TextField
              label="Peso (kg)"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 400 }}
            />
            <Button variant="contained" size="large">
              Calcular Precio
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
