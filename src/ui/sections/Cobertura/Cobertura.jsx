"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import Image from "next/image";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Mapa from "@/ui/components/Mapa/Mapa";

const beneficios = [
  {
    icon: <LocalShippingIcon sx={{ color: "#07417B" }} />,
    titulo: "Cobertura Nacional",
    descripcion: "Servicio en toda la República Mexicana",
  },
  {
    icon: <AccessTimeIcon sx={{ color: "#07417B" }} />,
    titulo: "Entregas Express",
    descripcion: "Tiempos de entrega garantizados",
  },
  {
    icon: <TrackChangesIcon sx={{ color: "#07417B" }} />,
    titulo: "Rastreo en Tiempo Real",
    descripcion: "Monitoreo constante de tus envíos",
  },
  {
    icon: <SecurityIcon sx={{ color: "#07417B" }} />,
    titulo: "Envíos Seguros",
    descripcion: "Garantía en todos tus paquetes",
  },
];

const ciudadesPrincipales = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "Mérida",
  "Querétaro",
  "Cancún",
];

const Cobertura = () => {
  const [openMap, setOpenMap] = useState(false);

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          background: "linear-gradient(45deg, #007bff, #007bff99)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 700,
          fontSize: { xs: "1.5rem", md: "2.5rem" },
        }}
      >
        Nuestra Cobertura
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: "15px",
              height: "100%",

              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              position="relative"
              height={{ xs: "150px", md: "400px" }}
              sx={{
                "& img": {
                  transition: "transform 0.3s ease-in-out",
                },
                "&:hover img": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Image
                src="/images/mapa-mexico.jpg"
                alt="Mapa de cobertura"
                fill
                style={{
                  objectFit: "contain",
                  border: "1px solid red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenMap(true);
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ height: "100%" }}>
            <Typography
              gutterBottom
              sx={{
                mt: { xs: 2, md: 0 },
                background: "linear-gradient(45deg, #007bff, #007bff99)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
                mb: { xs: 2, md: 3 },
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                textAlign: "center",
              }}
            >
              Presencia Nacional
            </Typography>

            <Typography
              sx={{
                mb: { xs: 3, md: 4 },
                color: "#6b7280",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                width: { xs: "90%" },
                margin: "auto",
                textAlign: { xs: "justify" },
              }}
            >
              Contamos con una sólida red logística que nos permite ofrecer
              servicios de entrega eficientes y confiables en todo México.
              Nuestra infraestructura garantiza que tus envíos lleguen a su
              destino de manera segura y puntual.
            </Typography>

            <List sx={{ mb: 4 }}>
              {beneficios.map((beneficio, index) => (
                <React.Fragment key={beneficio.titulo}>
                  <ListItem
                    sx={{
                      display: "flex",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      py: 2,
                      transition: "all 0.3s ease-in-out",
                      borderRadius: "10px",
                      "&:hover": {
                        transform: "translateX(10px)",
                        backgroundColor: "#f0f9ff",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          backgroundColor: "#007bff0f",
                          borderRadius: "50%",
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {React.cloneElement(beneficio.icon, {
                          sx: { color: "#007bff" },
                        })}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1a1a1a",
                            fontWeight: 500,
                            fontSize: "1.1rem",
                          }}
                        >
                          {beneficio.titulo}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            color: "#6b7280",
                            mt: 0.5,
                          }}
                        >
                          {beneficio.descripcion}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < beneficios.length - 1 && (
                    <ListItem disablePadding>
                      <Divider sx={{ width: "100%", borderColor: "#e5e7eb" }} />
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  background: "linear-gradient(45deg, #007bff, #007bff99)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: { xs: 2, md: 3 },
                  fontWeight: 600,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  textAlign: "center",
                }}
              >
                Ciudades Principales
              </Typography>
              <Grid container spacing={2}>
                {ciudadesPrincipales.map((ciudad) => (
                  <Grid item xs={6} sm={4} key={ciudad}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        borderRadius: "8px",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "#f0f9ff",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: "#007bff",
                          fontSize: "1.2rem",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4b5563",
                          fontWeight: 500,
                        }}
                      >
                        {ciudad}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Mapa de cobertura */}
      <Dialog
        open={openMap}
        onClose={() => setOpenMap(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ width: "100%", padding: 0 }}>
          <Mapa />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Cobertura;
