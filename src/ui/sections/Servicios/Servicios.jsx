"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useRouter } from "next/navigation";

const servicios = [
  {
    titulo: "LTL (Less Than Truckload)",
    descripcion:
      "Servicio ideal para envíos que no ocupan un camión completo. Optimiza costos compartiendo espacio con otros envíos mientras mantiene la seguridad y eficiencia en la entrega.",
    icon: <LocalShippingIcon sx={{ fontSize: 60, color: "#007bff" }} />,
    caracteristicas: [
      "Envíos desde 1 hasta 10 tarimas",
      "Precios competitivos",
      "Rastreo en tiempo real",
      "Ideal para envíos medianos",
    ],
  },
  {
    titulo: "FTL (Full Truck Load)",
    descripcion:
      "Servicio de camión dedicado para envíos que requieren el espacio completo del vehículo. Máxima seguridad y control total sobre la ruta y tiempos de entrega.",
    icon: <DeliveryDiningIcon sx={{ fontSize: 60, color: "#007bff" }} />,
    caracteristicas: [
      "Camión completo dedicado",
      "Control total de la ruta",
      "Envíos urgentes o programados",
      "Capacidad hasta 24 tarimas",
    ],
  },
  //  {
  //    titulo: "Paquetería",
  //    descripcion:
  //      "Servicio especializado para el envío de paquetes individuales o múltiples. Soluciones flexibles que se adaptan a tus necesidades de envío.",
  //    icon: <InventoryIcon sx={{ fontSize: 60, color: "#007bff" }} />,
  //    caracteristicas: [
  //      "Envíos desde 1kg",
  //      "Cobertura nacional",
  //      "Múltiples niveles de servicio",
  //      "Recolección a domicilio",
  //    ],
  //  },
];

const Servicios = () => {
  const router = useRouter();

  const handleNavigation = (servicio) => {
    if (servicio === "LTL (Less Than Truckload)") {
      router.push("/servicios/ltl");
    } else if (servicio === "FTL (Full Truck Load)") {
      router.push("/servicios/ftl");
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: "#ffffff",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(45deg, #007bff, #007bff99)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Servicios disponibles
          </Typography>
          <Typography
            sx={{
              color: "#6b7280",
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Soluciones integrales de logística adaptadas a tus necesidades
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {servicios.map((servicio, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  width: { xs: "90%", md: "70%" },
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: "50%",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    {servicio.icon}
                  </Box>
                  <Typography
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", md: "1.5rem" },
                    }}
                  >
                    {servicio.titulo}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: "0.8rem", md: "1rem" },
                      textAlign: { xs: "justify", md: "center" },
                    }}
                  >
                    {servicio.descripcion}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    {servicio.caracteristicas.map((caracteristica, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          mb: 1,
                          color: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#007bff",
                            display: "inline-block",
                          }}
                        />
                        {caracteristica}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      aria-label="Más información"
                      variant="contained"
                      onClick={() => handleNavigation(servicio.titulo)}
                      sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        backgroundColor: "#007bff",
                        "&:hover": {
                          backgroundColor: "#0056b3",
                        },
                      }}
                    >
                      Más información
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Servicios;
