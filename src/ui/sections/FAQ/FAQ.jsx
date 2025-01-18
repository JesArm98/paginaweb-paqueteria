"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const preguntas = [
  {
    pregunta: "¿Cuál es el tiempo estimado de entrega?",
    respuesta:
      "Los tiempos de entrega varían según la ruta y el tipo de servicio seleccionado. Para envíos locales, el tiempo estimado es de 24-48 horas. Para envíos nacionales, puede tomar entre 2-5 días hábiles. Ofrecemos opciones express para entregas más rápidas.",
  },
  {
    pregunta: "¿Cómo puedo rastrear mi envío?",
    respuesta:
      "Puedes rastrear tu envío en tiempo real a través de nuestra plataforma web ingresando tu número de guía. También recibirás actualizaciones por correo electrónico sobre el estado de tu envío.",
  },
  {
    pregunta: "¿Qué tipo de mercancía puedo enviar?",
    respuesta:
      "Manejamos una amplia variedad de mercancías, incluyendo paquetería general, documentos, mercancía delicada y carga pesada. Sin embargo, hay restricciones para materiales peligrosos y artículos prohibidos por la ley.",
  },
  {
    pregunta: "¿Ofrecen seguro para los envíos?",
    respuesta:
      "Sí, todos nuestros envíos incluyen un seguro básico. Adicionalmente, ofrecemos opciones de seguro ampliado para envíos de alto valor o que requieran protección adicional.",
  },
  {
    pregunta: "¿Cuál es el proceso de reclamación?",
    respuesta:
      "En caso de cualquier incidente, nuestro proceso de reclamación es simple y eficiente. Contáctanos dentro de las primeras 24 horas del incidente y nuestro equipo de atención al cliente te guiará durante todo el proceso.",
  },
  {
    pregunta: "¿Realizan recolección a domicilio?",
    respuesta:
      "Sí, ofrecemos servicio de recolección a domicilio sin costo adicional en la mayoría de las zonas urbanas. Programa tu recolección con al menos 24 horas de anticipación.",
  },
];

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "#ffffff" }}>
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
            Preguntas Frecuentes
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto" }}
          >
            Encuentra respuestas a las dudas más comunes sobre nuestros
            servicios
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {preguntas.map((pregunta, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    transform:
                      expandedId === index ? "none" : "translateY(-5px)",
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
                      alignItems: "flex-start",
                      mb: expandedId === index ? 2 : 0,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "500",
                        color: expandedId === index ? "#007bff" : "#1a1a1a",
                        transition: "color 0.3s ease",
                        flex: 1,
                      }}
                    >
                      {pregunta.pregunta}
                    </Typography>
                    <IconButton
                      sx={{
                        color: expandedId === index ? "#007bff" : "#6b7280",
                        transform:
                          expandedId === index ? "rotate(180deg)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {expandedId === index ? <RemoveIcon /> : <AddIcon />}
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
                        color: "#6b7280",
                        lineHeight: 1.7,
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
};

export default FAQ;
