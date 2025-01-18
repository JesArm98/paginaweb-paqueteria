"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
} from "@mui/material";

const testimonios = [
  {
    nombre: "Ana García",
    cargo: "Gerente de Logística",
    empresa: "Comercial MX",
    comentario:
      "Excelente servicio y tiempos de entrega. Han sido un socio clave en nuestra operación.",
    rating: 5,
  },
  {
    nombre: "Carlos Ruiz",
    cargo: "Director Comercial",
    empresa: "Distribuidora Norte",
    comentario:
      "La mejor opción para envíos urgentes. Su atención al cliente es excepcional.",
    rating: 5,
  },
  {
    nombre: "Laura Méndez",
    cargo: "E-commerce Manager",
    empresa: "Fashion Store",
    comentario:
      "Gracias a su eficiencia, hemos podido expandir nuestro negocio a nivel nacional.",
    rating: 5,
  },
];

const Testimonios = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f8fafc" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(45deg, #007bff, #007bff99)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Lo que dicen nuestros clientes
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto" }}
          >
            Historias de éxito de quienes confían en nosotros
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonios.map((testimonio, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      backgroundColor: "#007bff",
                    }}
                  >
                    {testimonio.nombre.charAt(0)}
                  </Avatar>
                  <Rating value={testimonio.rating} readOnly sx={{ mb: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "#4b5563",
                      fontStyle: "italic",
                      lineHeight: 1.7,
                    }}
                  >
                    "{testimonio.comentario}"
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#1a1a1a" }}>
                    {testimonio.nombre}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {testimonio.cargo}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    {testimonio.empresa}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonios;
