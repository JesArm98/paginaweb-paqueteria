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


function FTLPage() {
  const beneficios = [
    "Camión completo dedicado a tu carga",
    "Control total sobre la ruta y tiempos",
    "Capacidad hasta 24 tarimas",
    "Servicio puerta a puerta",
    "Monitoreo GPS en tiempo real",
    "Máxima seguridad para tu mercancía",
  ];

  const handleCotizacionesClick = () => {
    // Guarda el estado en localStorage
    localStorage.setItem("contactType", "cotizaciones");
  
    // Verificar si estamos en la página principal
    const currentPath = window.location.pathname;
  
    if (currentPath !== "/") {
      // Guardar una señal para ejecutar la navegación al contacto después de la redirección
      localStorage.setItem("navigateToContact", "true");
  
      // Redirigir a la página principal
      window.location.href = "/";
      return;
    }
  
    // Si ya estamos en la página principal, navegar directamente a la sección "contacto"
    navigateToContactSection();
  };
  
  const navigateToContactSection = () => {
    setTimeout(() => {
      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });
  
        // Disparar el evento después de asegurar que la sección ya está en pantalla
        setTimeout(() => {
          window.dispatchEvent(new Event("contactTypeChange"));
        }, 300);
      }
    }, 600);
  };
  
  // Verifica al cargar si debe navegar automáticamente a "contacto"
  useEffect(() => {
    if (localStorage.getItem("navigateToContact") === "true") {
      localStorage.removeItem("navigateToContact"); // Elimina la bandera después de usarla
      navigateToContactSection();
    }
  }, []);

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
