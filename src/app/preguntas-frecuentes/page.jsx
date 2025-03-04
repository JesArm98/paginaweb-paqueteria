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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { categorias } from "@/data/data";

export default function PreguntasFrecuentes() {
  const [categoria, setCategoria] = useState("general");
  const [expandedId, setExpandedId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
        py: { xs: 5, sm: 6, md: 8 },
        minHeight: { xs: "auto", md: "90vh" },
        paddingTop: { xs: "100px", sm: "120px", md: "150px" },
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
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: "1.75rem", sm: "2rem", md: "3rem" },
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
            mb: { xs: 2, sm: 3, md: 4 },
            overflow: "hidden",
          }}
        >
          <Tabs
            value={categoria}
            onChange={handleCategoriaChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            centered={!isMobile}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                minWidth: { xs: "80px", sm: "100px", md: "150px" },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: { xs: "flex-start", sm: "center" },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#007bff",
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
                    fontWeight: "medium",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
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
                  borderRadius: { xs: "10px", md: "15px" },
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => handleExpandClick(index)}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
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
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                        color: expandedId === index ? "#007bff" : "#1a1a1a",
                        pr: 2,
                      }}
                    >
                      {pregunta.pregunta}
                    </Typography>
                    <IconButton
                      size={isMobile ? "small" : "medium"}
                      sx={{ flexShrink: 0 }}
                    >
                      {expandedId === index ? (
                        <RemoveIcon sx={{ color: "#007bff" }} />
                      ) : (
                        <AddIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      maxHeight: expandedId === index ? { xs: "800px", md: "500px" } : "0",
                      overflow: "hidden",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 2,
                        color: "#6b7280",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
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