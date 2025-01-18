import React from "react";
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
} from "@mui/material";
import Image from "next/image";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  return (
    <Box sx={{ py: 8, px: 4, backgroundColor: "#f8fafc" }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 6,
          background: "linear-gradient(45deg, #007bff, #007bff99)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Nuestra Cobertura
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
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
              height={400}
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
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ height: "100%" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #007bff, #007bff99)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Presencia Nacional
            </Typography>

            <Typography
              paragraph
              sx={{
                mb: 4,
                color: "#6b7280",
                fontSize: "1.1rem",
                lineHeight: 1.7,
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
                    <Divider
                      variant="inset"
                      component="li"
                      sx={{
                        borderColor: "#e5e7eb",
                      }}
                    />
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
                  mb: 2,
                  fontWeight: 600,
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
    </Box>
  );
};

export default Cobertura;
