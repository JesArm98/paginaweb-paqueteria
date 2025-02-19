"use client";
import { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const añoActual = new Date().getFullYear();

  // const handleClose = useCallback(() => {
  //   setOpen(false);
  // }, []);

  // const handleOpen = useCallback(() => {
  //   setOpen(true);
  // }, []);

  return (
    <Grid
      container
      sx={{ padding: 0, margin: 0, height: "100%", backgroundColor: "#3DC2CF" }}
    >
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          height: "85%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 0,
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              aria-label="Logo Myllos - Volver a Inicio"
              sx={{
                display: { xs: "none", md: "flex" },
                padding: 0,
                minWidth: "auto",
                justifyContent:"center",
                alignContent:"center",
                margin:"auto"
              }}
            >
              <Image
                src="/images/myllos-logo.png"
                alt="Logo Myllos - Volver a Inicio"
                width={150}
                height={150}
                style={{
                  objectFit: "contain",
                }}
              />
            </Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={3} sx={{ height: "85%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#3DC2CF",
            height: "100%",
            padding: { xs: 0, md: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              height: "100%",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                aria-label="Volver a Inicio"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                Nosotros
              </Button>
            </Link>
            <Link href="/#Servicios" style={{ textDecoration: "none" }}>
              <Button
                aria-label="Servicios"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                Servicios
              </Button>
            </Link>

            {/*
            <Link href="/tienda">
              <Button
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                Tienda
              </Button>
            </Link>
          */}

            {/*Botón de preguntas frecuentes*/}
            <Link
              href="/preguntas-frecuentes"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Button
                aria-label="Preguntas frecuentes"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                Preguntas frecuentes
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ height: "85%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3DC2CF",
            height: "100%",
            padding: { xs: 0, md: 3 },
            position: "relative",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: { xs: "0", md: "1px" },
              height: "60%",
              backgroundColor: "#fff",
            },
            "&::before": {
              left: 0,
            },
            "&::after": {
              right: 0,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "60%",
              height: "100%",
            }}
          >
<a
  href="https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Contrato-adhesion-Myllos.pdf?alt=media&token=3f04bcb4-7d58-4428-9a94-07400a498bb0"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: "none" }}
>
  <Button
    aria-label="Contrato de Adhesión"
    sx={{
      textTransform: "none",
      color: "#FFFFFF",
      transition: "background-color 0.3s ease",
      borderColor: "transparent",
      borderRadius: "30px",
      height: "40px",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.31)",
        borderColor: "#FFFFFF",
        borderWidth: "1px",
        borderStyle: "solid",
        transform: "scale(0.90)",
        transition: "transform 0.2s ease, filter 0.2s ease",
      },
    }}
  >
    Contrato adhesión
  </Button>
</a>
            {/*Botón de términos y condiciones*/}
            <a
  href="https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Terminos-y-condiciones-Myllos.pdf?alt=media&token=1733f60b-37be-4ccb-85a4-35ac88145ac5"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: "none" }}
>
  <Button
    aria-label="Términos y Condiciones"
    sx={{
      textTransform: "none",
      color: "#FFFFFF",
      transition: "background-color 0.3s ease",
      borderColor: "transparent",
      borderRadius: "30px",
      height: "40px",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.31)",
        borderColor: "#FFFFFF",
        borderWidth: "1px",
        borderStyle: "solid",
        transform: "scale(0.90)",
        transition: "transform 0.2s ease, filter 0.2s ease",
      },
    }}
  >
    Términos y Condiciones
  </Button>
</a>

            {/*Botón de aviso de privacidad*/}
           <a
  href="https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/aviso-de-privacidad-myllos.pdf?alt=media&token=0d3db21e-49ae-4186-abec-2a4674dccd97"
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: "none" }}
>
  <Button
    aria-label="Aviso de privacidad"
    sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
  >
    Aviso de privacidad
  </Button>
</a>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3} sx={{ height: "85%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#3DC2CF",
            height: "100%",
            padding: { xs: "24px", md: "12px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "100%" },
              height: "80%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                marginTop: { xs: "0px", md: "30px" },
                height: { xs: "auto", md: "44px" },
                display: { xs: "flex", md: "flex" },
                justifyContent: "center",
                gap: { xs: 0, lg: 1 },
              }}
            >
              <Button
                aria-label="Facebook"
                variant="outlined"
                component="a"
                href="https://www.facebook.com/profile.php?id=61569802240206"
                target="_blank"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                <Image
                  src="/images/Icons/facebook.svg"
                  width={30}
                  height={30}
                  alt="Facebook"
                  style={{ width: "25px", height: "25px" }}
                />
              </Button>
              <Button
                aria-label="Instagram"
                variant="outlined"
                component="a"
                href="https://www.instagram.com/myllos_?igsh=MXRvbWg1Z3p6N2k2dg=="
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                <InstagramIcon
                  sx={{
                    fontSize: "32px",
                    alignItems: "center",
                    color: "white",
                    display: "flex",
                  }}
                />
              </Button>
              <Button
                aria-label="LinkedIn"
                variant="outlined"
                component="a"
                href="https://www.facebook.com/profile.php?id=61569802240206"
                target="_blank"
                sx={{
                  textTransform: "none",

                  color: "#FFFFFF",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                }}
              >
                <Image
                  width={30}
                  height={30}
                  src="/images/Icons/linkedin.svg"
                  alt="LinkedIn"
                  style={{ width: "25px", height: "25px" }}
                />
              </Button>
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                width: "100%",
                paddingTop: 3,
                display: "flex",

              }}
            >
              <Typography sx={{
                color:"white"
              }}>
                
                WhatsApp: (667) 389 7772 
                </Typography>
                </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          height: "15%",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            aria-label="Derechos reservados"
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            © {añoActual} Myllos todos los derechos reservados
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
