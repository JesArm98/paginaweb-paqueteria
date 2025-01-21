"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const categorias = {
  general: {
    label: "General",
    preguntas: [
      {
        pregunta: "¿Cuáles son sus horarios de servicio?",
        respuesta:
          "Operamos 24/7 para servicios de transporte. Nuestro centro de atención al cliente está disponible de lunes a viernes de 8:00 AM a 6:00 PM.",
      },
      {
        pregunta: "¿Cómo puedo solicitar una cotización?",
        respuesta:
          "Puedes solicitar una cotización a través de nuestro formulario en línea, contactando a nuestro equipo de ventas o mediante el botón 'Cotizar' en nuestra página principal.",
      },
    ],
  },
  ftl: {
    label: "FTL",
    preguntas: [
      {
        pregunta: "¿Qué capacidad tienen sus unidades FTL?",
        respuesta:
          "Nuestras unidades FTL tienen capacidad para 24 tarimas estándar. Contamos con cajas secas de 48 y 53 pies, y opciones refrigeradas según necesidad.",
      },
      {
        pregunta:
          "¿Cuál es el tiempo mínimo de anticipación para un servicio FTL?",
        respuesta:
          "Recomendamos programar servicios FTL con 24-48 horas de anticipación para garantizar disponibilidad de unidades.",
      },
    ],
  },
  ltl: {
    label: "LTL",
    preguntas: [
      {
        pregunta: "¿Cuál es el mínimo de carga para LTL?",
        respuesta:
          "El servicio LTL está disponible desde 1 tarima hasta 10 tarimas. Ideal para optimizar costos cuando no se requiere un camión completo.",
      },
      {
        pregunta: "¿Cómo se calcula el costo del servicio LTL?",
        respuesta:
          "El costo se calcula basado en el peso, dimensiones, distancia y espacio ocupado en el camión. Ofrecemos tarifas competitivas por volumen.",
      },
    ],
  },
  paqueteria: {
    label: "Paquetería",
    preguntas: [
      {
        pregunta: "¿Cuál es el peso máximo por paquete?",
        respuesta:
          "Para servicio de paquetería, aceptamos envíos de hasta 70 kg por pieza. Para envíos más pesados, recomendamos nuestros servicios LTL.",
      },
      {
        pregunta: "¿Ofrecen servicio de recolección?",
        respuesta:
          "Sí, ofrecemos recolección a domicilio sin costo adicional en las principales ciudades, programando con 24 horas de anticipación.",
      },
    ],
  },
};

export default function PreguntasFrecuentes() {
  const [categoria, setCategoria] = useState("general");
  const [expandedId, setExpandedId] = useState(null);

  const handleCategoriaChange = (event, newValue) => {
    setCategoria(newValue);
    setExpandedId(null);
  };

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box
      sx={{
        py: 8,
        minHeight: "90vh",
        paddingTop: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            mb: 6,
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            background: "linear-gradient(45deg, #007bff, #007bff99)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Centro de Ayuda
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Tabs
            value={categoria}
            onChange={handleCategoriaChange}
            variant="scrollable"
            scrollButtons="auto"
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1.1rem",
                minWidth: { xs: "auto", md: "150px" },
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            {Object.entries(categorias).map(([key, value]) => (
              <Tab
                key={key}
                value={key}
                label={value.label}
                sx={{
                  "&.Mui-selected": {
                    color: "#007bff",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {categorias[categoria].preguntas.map((pregunta, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => handleExpandClick(index)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "500",
                        color: expandedId === index ? "#007bff" : "#1a1a1a",
                      }}
                    >
                      {pregunta.pregunta}
                    </Typography>
                    <IconButton>
                      {expandedId === index ? (
                        <RemoveIcon sx={{ color: "#007bff" }} />
                      ) : (
                        <AddIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      maxHeight: expandedId === index ? "500px" : "0",
                      overflow: "hidden",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 2,
                        color: "#6b7280",
                        opacity: expandedId === index ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      {pregunta.respuesta}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
