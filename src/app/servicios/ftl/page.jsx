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
  title: "Myllos2 - FTL (Full Truck Load)",
  description: "FTL (Full Truck Load) de la empresa Myllos.",

  openGraph: {
    title: "Myllos2 - FTL (Full Truck Load)",
    description: "FTL (Full Truck Load) de la empresa Myllos.",
    url: "https://myllos2.netlify.app/servicios/ftl",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.webp?alt=media&token=286f024b-6144-4152-a657-29966c67be2f",
        width: 1000,
        height: 630,
        alt: "Myllos2",
        type: "image/svg+xml",
      },
    ],
  },
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
                textAlign: "justify",
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
              <Link href="/#contacto">
                <Button
                  aria-label="Solicitar cotización"
                  variant="contained"
                  size="large"
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
              </Link>
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
export default FTLPage;
