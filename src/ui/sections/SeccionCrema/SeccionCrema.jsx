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
//import Head from "next/head";
import ShippingHero from "../ShippingHero/ShippingHero";

const SeccionCrema = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        py: 8,
      }}
    >
      {/* Aquí va el contenido específico de SeccionCrema, 
          diferente al de ShippingHero */}
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Nuestros Servicios
            </Typography>
            <Typography variant="body1" paragraph>
              Ofrecemos soluciones integrales de logística y envíos
            </Typography>
            {/* Más contenido específico de esta sección */}
          </Grid>
          {/* ... */}
        </Grid>
      </Container>
    </Box>
  );
};

export default SeccionCrema;
