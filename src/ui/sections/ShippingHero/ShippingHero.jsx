"use client";

import CustomDialog from "@/ui/components/CustomDialog";
import {
  ArrowForward,
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
import ScrollDown from "@/ui/components/ScrollDown";

const ShippingHero = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSeleccionModal, setOpenSeleccionModal] = useState(false);
  const [selectedShippingType, setSelectedShippingType] = useState("");

  const handleCotizarClick = () => {
    setOpenSeleccionModal(true);
  };

  const handleCotizarAqui = (tipo) => {
    setSelectedShippingType(tipo);
    setOpenSeleccionModal(false);
    setOpenDialog(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: { xs: "transparent", md: "#fff" },
        backgroundImage: {
          xs: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/Banners/banners_myllos_web_inicio.webp')",
          md: "none",
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width:{xs:"100%",md:"90%"},
        margin:"auto"

      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
        minHeight="100dvh"
        justifyContent="center"
        sx={{
          background:
            "linear-gradient(to bottom, rgba(229, 231, 235, 0.5), #fff)",
          "@media (min-width: 900px)": {
            background: "#fff", // O el color que prefieras para pantallas >= sm
          }
        }}
      >
        <Box
          className="container"
          position="relative"
        >
          <Grid
            container
            spacing={4}
            py={{ xs: 0, md: 3 }}
            mt={{ xs: 2, md: 0 }}
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
                </Typography>
                <Typography
                  component="h1"
                  sx={{
                    background: "linear-gradient(to right, #007bff, #007bff99)",
                    WebkitBackgroundClip: "text",
                    textAlign: "center",
                    color: "#3DC2CF",
                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                  }}
                >
                  eficiente con nosotros.
                </Typography>

                <Typography
                  textAlign={{ xs: "justify", sm: "center" }}
                  sx={{
                    color: "#6b7280",
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    maxWidth: { xs: "80%", md: "100%" },
                    margin: { xs: "auto", md: "0" },
                    mt: { xs: 2, md: 2 },
                  }}
                >
                  Simplifica tu logística con Myllos. Comparte tus necesidades y deja que nosotros encontremos la solución ideal para ti. ¡Tranquilidad y eficiencia garantizadas!
                </Typography>
              </Box>

              {/* Features */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#fff",
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
                    <CardContent sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          width: "fit-content",
                          justifyContent: "center",
                          display: "flex",
                          margin: "auto",
                        }}
                      >
                                        <Image 
                            src="/images/Icons/icon_myllos_calculadora.svg"  
                                          width={400} 
                                          height={300} 
                                          alt="Cotización Myllos"
                                          style={{
                                            width: "35px",
                                            height: "35px",
                                          }}
                                          priority
                                        />
                      </Box>
                      <Box>
                        <Typography variant="h6" textAlign={"center"}>
                          Cotizaciones
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#fff",
                      boxShadow: 1,
                      width: { xs: "50%", md: "80%" },
                      margin: "auto",
                      borderRadius: "20px",
                    }}
                  >
                    <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center"}}>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          display: "flex",
                          margin: "auto",
                          width: "fit-content",
                        }}
                      >
                                        <Image 
                            src="/images/Icons/icon_myllos_seguro.svg"  
                                          width={400} 
                                          height={300} 
                                          alt="Envio seguro"
                                          style={{
                                            width: "35px",
                                            height: "35px",
                                          }}
                                          priority
                                        />
                      </Box>
                      <Box>
                        <Typography variant="h6" textAlign={"center"}>
                          Envío Seguro
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
                    padding: "10px 20px",
                    border: "0.5px solid #3DC2CF",
                    borderRadius: "30px",
                    backgroundColor: "white",
                    color: "#3DC2CF",
                    fontWeight: "bold",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#3DC2CF",
                      color: "#FFFFFF",
                      transform: "translateY(-3px)", // Movimiento leve hacia arriba
                      boxShadow: "0 8px 20px rgba(0, 123, 255, 0.5)", // Sombra más intensa
                    },
                    "&:active": {
                      transform: "scale(0.95)", // Efecto de presión al hacer clic
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background: "rgba(255,255,255,0.3)",
                      top: 0,
                      left: 0,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover::after": {
                      opacity: 1,
                    },
                    "@keyframes pulse": {
                      "0%": { boxShadow: "0 0 0 0 rgba(0, 123, 255, 0.8)" },
                      "50%": { boxShadow: "0 0 10px 10px rgba(0, 123, 255, 0.3)" },
                      "100%": { boxShadow: "0 0 0 0 rgba(0, 123, 255, 0)" },
                    },
                    animation: "pulse 3.5s infinite", // Efecto pulsante
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
                  background:{xs:
                    "linear-gradient(to bottom right, #007bff33, #ffffff)", md:"#fff"},
                  filter:{xs:"blur(60px)", md:"none"},
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
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "24px", // Rounded corners instead of circle
                }}
              >
                <Image
                  src="/images/Banners/banners_myllos_web_inicio.webp"
                  alt="Imagen inicial Myllos"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              onClick={() => handleCotizarAqui("ftl")}
              variant="outlined"
              sx={{
                borderRadius: "15px",
                padding: { xs: "10px", md: "20px" },
                width: { xs: "70%", sm: "45%" },
                display: "flex",
                flexDirection: "column",
                borderColor: "#3DC2CF",
                color: "#3DC2CF",
                gap: 2,
                "&:hover": {
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
<Box sx={{display:"flex", flexDirection:"column"}}>

<Box sx={{display:"flex" , gap:2, justifyContent:"start", width:"80%"}}>

  <Image 
      src="/images/Icons/icon_myllos_pallet.svg" 
      width={30} 
      height={32} 
      alt="FTL icono - Fulltruck"
      style={{
        transform: "scaleX(-1)", // Intenta aplicarlo nuevamente aquí
        objectFit: "contain",
        alignItems:"center",
        display:"flex"
      }}
    />
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  textTransform: "none",
                  alignContent:"center"
                }}
              >
                FTL
              </Typography>
</Box>
<Typography
  sx={{
    fontSize: { xs: "0.75rem" },
    textTransform: "none",
  }}
>
  Camión completamente cargado
</Typography>
</Box>
            </Button>

            <Button
              onClick={() => handleCotizarAqui("ltl")}
              variant="outlined"
              sx={{
                borderRadius: "15px",
                padding: { xs: "10px", md: "20px" },
                width: { xs: "70%", sm: "45%" },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderColor: "#3DC2CF",
                color: "#3DC2CF",
                "&:hover": {
                  borderColor: "#3DC2CF",
                  backgroundColor: "#f8fafc",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", margin:"auto", alignContent:"center"}}>
<Box sx={{display:"flex" , gap:2, justifyContent:"start"}}>

  <Image 
      src="/images/Icons/icon_myllos_pallet.svg" 
      width={30} 
      height={32} 
      alt="FTL icono - Fulltruck"
      style={{
        transform: "scaleX(-1)", // Intenta aplicarlo nuevamente aquí
        objectFit: "contain",
        alignItems:"center",
        display:"flex"
      }}
    />
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  textTransform: "none",
                  alignContent:"center"
                }}
              >
                LTL
              </Typography>
</Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.75rem" },
                  textTransform: "none",
                }}
              >
                Menos de un camión completo
              </Typography>
              </Box>
            </Button>
          </Box>
        </CustomDialog>

        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title={`Cotización de envío ${selectedShippingType.toUpperCase()}`}
          width={"auto"}
          onPdfPreview={true}
          paddingContent={4}
        >
          <CotizacionEnvios initialShippingType={selectedShippingType}
          open={openDialog} onClose={()=> setOpenDialog(false)} />
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
