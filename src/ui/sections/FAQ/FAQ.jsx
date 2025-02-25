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
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/navigation";
import { preguntasPrincipales } from "@/data/data";
const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#ffffff" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2.25rem" },
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(45deg, #3DC2CF, #3DC2CF99)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Preguntas Frecuentes
          </Typography>
          <Typography
            sx={{
              color: "#6b7280",
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Resolvemos tus dudas más comunes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {preguntasPrincipales.map((pregunta, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "20px",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "3px 2px 15px 4px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                  "&:hover": {
                    transform:
                      expandedId === index ? "none" : "translateY(-5px)",
                    boxShadow: "6px 4px 20px 8px rgba(0, 0, 0, 0.25)",
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
                      sx={{
                        fontWeight: "500",
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        color: expandedId === index ? "#007bff" : "#1a1a1a",
                        transition: "color 0.3s ease",
                        flex: 1,
                      }}
                    >
                      {pregunta.pregunta}
                    </Typography>
                    <IconButton
                      aria-label="Expandir pregunta"
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
                      sx={{
                        color: "#6b7280",
                        lineHeight: 1.7,
                        opacity: expandedId === index ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                        fontSize: { xs: "0.8rem", md: "1rem" },
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
      </Container>{" "}
      <Button
        variant="outlined"
        onClick={() => router.push("/preguntas-frecuentes")}
        aria-label="Ver más preguntas frecuentes"
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          borderColor: "#007bff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "30px",
          color: "#007bff",
          "&:hover": {
            borderColor: "#0056b3",
            backgroundColor: "#f0f9ff",
          },
        }}
      >
        Ver más preguntas frecuentes
      </Button>
    </Box>
  );
};

export default FAQ;
