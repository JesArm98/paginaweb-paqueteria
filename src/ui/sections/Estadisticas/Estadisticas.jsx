"use client";

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";

const stats = [
  {
    valor: 50000,
    sufijo: "+",
    texto: "Envíos Mensuales",
  },
  {
    valor: 98,
    sufijo: "%",
    texto: "Satisfacción",
  },
  {
    valor: 32,
    sufijo: "",
    texto: "Ciudades",
  },
  {
    valor: 15,
    sufijo: "+",
    texto: "Años de Experiencia",
  },
];

const Estadisticas = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "#007bff" }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  color: "white",
                  p: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  <CountUp end={stat.valor} duration={2.5} />
                  {stat.sufijo}
                </Typography>
                <Typography variant="h6">{stat.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Estadisticas;
