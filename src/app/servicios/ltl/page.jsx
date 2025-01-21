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

export const metadata = {
  title: "Myllos - LTL (Less Than Truckload)",
  description: "LTL (Less Than Truckload) de la empresa Myllos.",

  openGraph: {
    title: "Myllos - LTL (Less Than Truckload)",
    description: "LTL (Less Than Truckload) de la empresa Myllos.",
    url: "https://myllos.netlify.app/servicios/ltl",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/tuvanosa-portal.appspot.com/o/Imagenes%20Landings%2FfondoInicio.webp?alt=media&token=bbd109eb-f7ed-49b9-8fdd-db94dd465e48",
        width: 1000,
        height: 630,
        alt: "Myllos",
        type: "image/svg+xml",
      },
    ],
  },
};

function LTLPage() {
  const beneficios = [
    "Optimización de costos al compartir espacio",
    "Ideal para envíos de 1 a 10 tarimas",
    "Rastreo en tiempo real",
    "Cobertura nacional",
    "Seguro de mercancía incluido",
    "Documentación y facturación simplificada",
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
              }}
            >
              LTL (Less Than Truckload)
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#6b7280",
                mb: 4,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              Solución eficiente para envíos que no requieren un camión completo
            </Typography>
          </Grid>

          {/* Contenido principal */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                ¿Qué es LTL?
              </Typography>
              <Typography variant="body1" sx={{ color: "#4b5563", mb: 3 }}>
                El servicio LTL (Less Than Truckload) es ideal para empresas que
                necesitan transportar cargas que no ocupan un camión completo.
                Permite compartir el espacio del camión con otros envíos,
                optimizando costos mientras mantiene la seguridad y eficiencia
                en la entrega.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
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

            <Link href="/#headerTVN">
              <Button
                aria-label="Solicitar cotización"
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  px: 4,
                }}
              >
                Solicitar cotización
              </Button>
            </Link>
          </Grid>

          {/* Imagen o ilustración */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
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
              }}
            >
              <LocalShippingIcon
                sx={{
                  fontSize: "300px",
                  color: "#007bff22",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default LTLPage;
