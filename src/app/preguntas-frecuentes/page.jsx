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
import { categorias } from "@/data/data";

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
        py: {xs:10,md:8},
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
            mb:{xs:4,md:6},
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
            mb: {xs:2,md:4},
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
