"use client";

import CustomDialog from "@/ui/components/CustomDialog";
import {
  ArrowForward,
  Shield,
  Timer,
  Person as PersonIcon,
  Calculate as CalculateIcon,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CotizacionEnvios from "../Cotizacion/CotizacionEnvios";
import { useState } from "react";
import Image from "next/image";
import { useEmail } from "@/context/EmailContext";
import { useRouter } from "next/navigation";
import ScrollDown from "@/ui/components/ScrollDown";

const ShippingHero = () => {
  const router = useRouter();
  const { emailConfirmado, emailUsuario, mostrarResultados } = useEmail();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSeleccionModal, setOpenSeleccionModal] = useState(false);

  const handleCotizarClick = () => {
    setOpenSeleccionModal(true);
  };

  const handleCotizarAqui = () => {
    setOpenSeleccionModal(false);
    setOpenDialog(true);
  };

  const handleCotizarAsesor = () => {
    setOpenSeleccionModal(false);
    localStorage.setItem("contactType", "cotizaciones");
    router.push("/#contacto");
    setTimeout(() => {
      window.dispatchEvent(new Event("contactTypeChange"));
    }, 100);
  };

  return (
    <Box
      sx={{
        backgroundColor: { xs: "transparent", md: "#fff" },
        backgroundImage: {
          xs: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/entrega.jpeg')",
          md: "none",
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
        height={"100vh"}
        justifyContent="center"
        sx={{
          background:
            "linear-gradient(to bottom, rgba(229, 231, 235, 0.5), #fff)",
        }}
      >
        <Box
          className="container"
          position="relative"
          mx={{ xs: "0", md: "5%" }}
        >
          <Grid
            container
            spacing={4}
            py={{ xs: 0, md: 3 }}
            mt={{ xs: 2, md: 0 }}
            pr={{ xs: 0, md: 0 }}
          >
            {/* Left Column - Content */}
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              sx={{ justifyContent: "center" }}
              gap={4}
            >
              <Box>
                <Typography
                  variant="h1"
                  fontWeight="bold"
                  textAlign={"center"}
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                    lineHeight: "1.2",
                  }}
                >
                  Cotiza tus envíos de manera{" "}
                  <Typography
                    component="span"
                    sx={{
                      background:
                        "linear-gradient(to right, #007bff, #007bff99)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontSize: { xs: "1.5rem", md: "2.5rem" },
                    }}
                  >
                    instantánea
                  </Typography>
                </Typography>
                <Typography
                  textAlign={{ xs: "justify", sm: "center" }}
                  sx={{
                    color: "#6b7280",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    maxWidth: { xs: "80%", md: "100%" },
                    margin: { xs: "auto", md: "0" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  Calcula el costo de tus envíos en segundos. Servicio rápido,
                  seguro y confiable para todas tus necesidades de paquetería.
                </Typography>
              </Box>

              {/* Features */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#f8fafc",
                      boxShadow: 1,
                      width: { xs: "50%", md: "80%" },
                      margin: "auto",
                      display: "flex",
                      flexDirection: { xs: "row", md: "column" },
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          backgroundColor: "#007bff1a",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          width: "fit-content",
                          justifyContent: "center",
                          display: "flex",
                          margin: "auto",
                        }}
                      >
                        <Timer sx={{ color: "#007bff" }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" textAlign={"center"}>
                          Cotizaciones
                        </Typography>
                        <Typography
                          variant="h7"
                          textAlign={"center"}
                          sx={{ color: "#6b7280" }}
                        >
                          En segundos
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#f8fafc",
                      boxShadow: 1,
                      width: { xs: "50%", md: "80%" },
                      margin: "auto",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          backgroundColor: "#007bff1a",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          display: "flex",
                          margin: "auto",
                          width: "fit-content",
                        }}
                      >
                        <Shield sx={{ color: "#007bff" }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" textAlign={"center"}>
                          Envío Seguro
                        </Typography>
                        <Typography
                          variant="body2"
                          textAlign={"center"}
                          sx={{ color: "#6b7280" }}
                        >
                          100% garantizado
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* CTA */}
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Button
                  aria-label="Cotizar envío"
                  onClick={handleCotizarClick}
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontSize: { xs: "0.8rem", md: "1.125rem" },
                    transition: "background-color 0.3s ease",
                    border: "0.5px solid #007bff",
                    borderRadius: "30px",
                    zIndex: 1,
                    "&:hover": {
                      backgroundColor: "#007bff",
                      color: "#FFFFFF",
                      "& .text": {
                        transform: "scale(0.90)",
                        transition: "transform 0.2s ease, filter 0.2s ease",
                      },
                    },
                  }}
                >
                  Cotizar ahora
                  <ArrowForward />
                </Button>
              </Box>
            </Grid>

            {/* Right Column - Image */}
            <Grid
              item
              xs={12}
              md={6}
              position="relative"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Efecto de resplandor */}
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom right, #007bff33, #ffffff)",
                  filter: "blur(60px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Full-width image container */}
              <Box
                display={{ xs: "none", md: "block" }}
                position="relative"
                sx={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#f8fafc",
                  boxShadow: 3,
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "24px", // Rounded corners instead of circle
                }}
              >
                <Image
                  src="/images/entrega.jpeg"
                  alt="Myllos"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    display: "flex",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CustomDialog
          open={openSeleccionModal}
          onClose={() => setOpenSeleccionModal(false)}
          title="¿Cómo prefieres cotizar?"
          width="sm"
          onPdfPreview={true}
          paddingContent={{ xs: 1, md: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
              py: 3,
            }}
          >
            <Button
              onClick={handleCotizarAqui}
              variant="contained"
              sx={{
                borderRadius: "15px",
                padding: { xs: "10px", md: "20px" },
                width: { xs: "100%", sm: "45%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "#007bff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CalculateIcon sx={{ fontSize: { xs: "2rem", md: "40px" } }} />
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  textTransform: "none",
                }}
              >
                Cotizar aquí
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  textTransform: "none",
                }}
              >
                Obtén una cotización instantánea
              </Typography>
            </Button>

            <Button
              onClick={handleCotizarAsesor}
              variant="outlined"
              sx={{
                borderRadius: "15px",
                padding: { xs: "10px", md: "20px" },
                width: { xs: "100%", sm: "45%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderColor: "#007bff",
                color: "#007bff",
                "&:hover": {
                  borderColor: "#0056b3",
                  backgroundColor: "#f8fafc",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <PersonIcon sx={{ fontSize: { xs: "2rem", md: "40px" } }} />
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  textTransform: "none",
                }}
              >
                Cotizar con asesor
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  textTransform: "none",
                }}
              >
                Contacta a nuestro equipo
              </Typography>
            </Button>
          </Box>
        </CustomDialog>

        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title="Cotización de envío"
          width={emailConfirmado || !mostrarResultados ? "lg" : "sm"}
          onPdfPreview={true}
          paddingContent={4}
        >
          <CotizacionEnvios />
        </CustomDialog>

        {/* Background decoration */}
        <Box
          position="absolute"
          left="50%"
          top="50%"
          zIndex={-10}
          sx={{
            width: "800px",
            height: "800px",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            backgroundColor: "#007bff0d",
            filter: "blur(80px)",
          }}
        />
      </Box>

      <ScrollDown />
    </Box>
  );
};

export default ShippingHero;
