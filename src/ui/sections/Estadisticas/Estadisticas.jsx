"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import { stats } from "@/data/data";

const Estadisticas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Detenemos la observación para no seguir monitoreando
        }
      },
      { threshold: 0.2 } // El 50% del componente debe estar visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box ref={containerRef} sx={{ py: 6, backgroundColor: "#007bff" }}>
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
                    fontSize: { xs: "1.2rem", md: "3rem" },
                  }}
                >
                  {isVisible ? <CountUp end={stat.valor} duration={5} /> : 0}
                  {stat.sufijo}
                </Typography>
                <Typography variant="h7">{stat.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Estadisticas;
