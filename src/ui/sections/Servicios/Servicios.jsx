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
  {
    titulo: "Paquetería",
    descripcion:
      "Servicio especializado para el envío de paquetes individuales o múltiples. Soluciones flexibles que se adaptan a tus necesidades de envío.",
    icon: <InventoryIcon sx={{ fontSize: 60, color: "#007bff" }} />,
    caracteristicas: [
      "Envíos desde 1kg",
      "Cobertura nacional",
      "Múltiples niveles de servicio",
      "Recolección a domicilio",
    ],
  },
];

const Servicios = () => {
  const router = useRouter();

  const handleNavigation = (servicio) => {
    // Navegar a la sección de contacto con un parámetro
    router.push("/#contacto?type=socio");
    // Dar tiempo al DOM para actualizarse
    setTimeout(() => {
      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#ffffff",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
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
            variant="h5"
            sx={{ color: "#6b7280", maxWidth: "800px", mx: "auto" }}
          >
            Soluciones integrales de logística adaptadas a tus necesidades
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {servicios.map((servicio, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
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
                    variant="h5"
                    component="h3"
                    sx={{ mb: 2, fontWeight: "bold" }}
                  >
                    {servicio.titulo}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
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
                      Solicitar información
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
