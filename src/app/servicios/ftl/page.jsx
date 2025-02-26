"use client";
import React from "react";
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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import Image from "next/image";

const handleCotizacionesClick = () => {
  // Establecer el tipo en localStorage
  localStorage.setItem("contactType", "cotizaciones");

  // Redirigir a la página principal y luego realizar el scroll
  const currentPath = window.location.pathname;

  if (currentPath !== "/") {
    // Redirigir a la página principal
    const navigateToContact = () => {
      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });

        // Disparar el evento personalizado
        setTimeout(() => {
          const event = new Event("contactTypeChange");
          window.dispatchEvent(event);
        }, 700);
      }
    };

    window.localStorage.setItem("navigateToContact", "true");
    window.location.href = "/";
    return;
  }

  // Si ya estás en la página principal
  const contactoSection = document.getElementById("contacto");
  if (contactoSection) {
    contactoSection.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      const event = new Event("contactTypeChange");
      window.dispatchEvent(event);
    }, 700);
  }
};

function FTLPage() {
  const beneficios = [
    "Camión completo dedicado a tu carga",
    "Control total sobre la ruta y tiempos",
    "Capacidad hasta 24 tarimas",
    "Servicio puerta a puerta",
    "Monitoreo GPS en tiempo real",
    "Máxima seguridad para tu mercancía",
  ];

  return (
    <Box sx={{ minHeight: "100vh", pt: "100px", pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Sección de encabezado */}
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: "bold",
                mb: 2,
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
                mb: 4,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                textAlign: "center",
              }}
            >
              Transporte dedicado para cargas completas con máxima seguridad
            </Typography>
          </Grid>

          {/* Contenido principal */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
              >
                ¿Qué es FTL?
              </Typography>
              <Typography variant="body1" sx={{ color: "#4b5563", mb: 3 }}>
                El servicio FTL (Full Truck Load) proporciona un camión completo
                dedicado exclusivamente a tu carga. Es la solución ideal para
                envíos grandes que requieren máxima seguridad y control total
                sobre la ruta y tiempos de entrega.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
              >
                Beneficios principales
              </Typography>
              <List>
                {beneficios.map((beneficio, index) => (
                  <ListItem key={index} sx={{ padding: 1 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon sx={{ color: "#007bff" }} />
                    </ListItemIcon>
                    <ListItemText primary={beneficio} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                aria-label="Solicitar cotización"
                variant="contained"
                size="large"
                onClick={handleCotizacionesClick}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  px: 4,
                  width: "fit-content",
                  display: "flex",
                  margin: "auto",
                }}
              >
                Solicitar cotización
              </Button>
            </Box>
          </Grid>

          {/* Imagen o ilustración */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "400px",
                borderRadius: "20px",
                overflow: "hidden",
                margin:"auto",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
<Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scaleX(-1)", // Aplica el efecto espejo
    width: "400px", // Mantén el tamaño de la imagen
    height: "300px",
  }}
>
  <Image 
    src="/images/Icons/ftl-icon.svg" 
    width={400} 
    height={300} 
    alt="FTL Icon"
    style={{
      width: "100%", // Asegura que la imagen ocupe todo el `Box`
      height: "100%",
    }}
  />
</Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default FTLPage;
