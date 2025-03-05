

"use client";
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Image from "next/image";
import { useRouter } from "next/navigation";

function FTLPage() {

  const router = useRouter(); // Inicializa el router de Next.js

  const beneficios = [
    "Camión completo dedicado a tu carga",
    "Control total sobre la ruta y tiempos",
    "Capacidad hasta 24 tarimas",
    "Servicio puerta a puerta",
    "Monitoreo GPS en tiempo real",
    "Máxima seguridad para tu mercancía",
  ];

  const handleCotizacionesClick = () => {
    localStorage.setItem("contactType", "cotizaciones");
    const currentPath = window.location.pathname;
  
    if (currentPath !== "/") {
      localStorage.setItem("navigateToContact", "true");
      router.push("/"); // Usa router.push en lugar de window.location.href
      return;
    }
  
    navigateToContactSection();
  };
  
  const navigateToContactSection = () => {
    setTimeout(() => {
      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });
  
        setTimeout(() => {
          window.dispatchEvent(new Event("contactTypeChange"));
        }, 300);
      }
    }, 600);
  };
  
  useEffect(() => {
    if (localStorage.getItem("navigateToContact") === "true") {
      localStorage.removeItem("navigateToContact");
      navigateToContactSection();
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: "80px", md: "100px" },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Sección de encabezado - Responsive en todos los tamaños */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
                fontWeight: "bold",
                mb: { xs: 1.5, md: 2 },
                background: "linear-gradient(45deg, #007bff, #007bff99)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textAlign: "center",
              }}
            >
              FTL (Full Truck Load)
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#6b7280",
                mb: { xs: 3, md: 4 },
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                textAlign: "center",
                px: { xs: 2, md: 0 },
              }}
            >
              Transporte dedicado para cargas completas con máxima seguridad
            </Typography>
          </Grid>
        </Grid>

        {/* Contenido principal - Layout responsive */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Imagen visible en todas las pantallas con tamaño adaptativo */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: 1, md: 2 }, // Cambia el orden en móvil vs desktop
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", sm: "80%", md: "100%" },
                height: { xs: "250px", sm: "300px", md: "400px" },
                borderRadius: "20px",
                overflow: "hidden",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scaleX(-1)",
                  width: { xs: "250px", sm: "300px", md: "400px" },
                  height: { xs: "200px", sm: "250px", md: "300px" },
                }}
              >
                <Image 
    src="/images/Icons/icon_myllos_fulltruck.webp"  
                  width={400} 
                  height={300} 
                  alt="FTL Icon"
                  style={{
                    width: "320px",
                    height: "300px",
                  }}
                  priority
                />
              </Box>
            </Box>
          </Grid>

          {/* Contenido de texto */}
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  textAlign: { xs: "center", md: "left" } 
                }}
              >
                ¿Qué es FTL?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#4b5563", 
                  mb: 3,
                  px: { xs: 2, md: 0 } 
                }}
              >
                El servicio FTL (Full Truck Load) proporciona un camión completo
                dedicado exclusivamente a tu carga. Es la solución ideal para
                envíos grandes que requieren máxima seguridad y control total
                sobre la ruta y tiempos de entrega.
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold", 
                  textAlign: { xs: "center", md: "left" } 
                }}
              >
                Beneficios principales
              </Typography>
              <List sx={{ px: { xs: 2, md: 0 } }}>
                {beneficios.map((beneficio, index) => (
                  <ListItem key={index} sx={{ padding: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: "40px", md: "56px" } }}>
                      <CheckCircleOutlineIcon sx={{ color: "#007bff" }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={beneficio} 
                      primaryTypographyProps={{
                        fontSize: { xs: "0.9rem", md: "1rem" }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: { xs: 3, md: 4 } }}>
              <Button
                aria-label="Solicitar cotización"
                variant="contained"
                size="large"
                onClick={handleCotizacionesClick}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  width: "fit-content",
                  display: "flex",
                  margin: { xs: "auto", md: "0 auto 0 0" }, // Centrado en móvil, alineado a la izquierda en desktop
                }}
              >
                Solicitar cotización
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FTLPage;