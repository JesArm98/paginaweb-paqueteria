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
      sx={{ padding: 0, margin: 0, height: "100%", backgroundColor: "#1B1C3C" }}
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
            padding: 2,
          }}
        >
          <Link href="/">
            <Button
              aria-label="Logo Myllos - Volver a Inicio"
              sx={{
                display: { xs: "none", md: "flex" },
                padding: 0,
                minWidth: "auto",
              }}
            >
              <Image
                src="/images/myllos-logo.jpeg"
                alt="Logo Myllos - Volver a Inicio"
                width={150}
                height={114}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "auto",
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
            backgroundColor: "#1b1c3c",
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
            <Link href="/">
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
            <Link href="/#Servicios">
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

            <Link href="/preguntas-frecuentes" passHref>
              <Button
                aria-label="Preguntas frecuentes"
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "#FFFFFF",
                  padding: "8px 16px",
                  transition: "background-color 0.3s ease",
                  borderColor: "transparent",
                  borderRadius: "30px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    borderColor: "#FFFFFF",
                    transform: "scale(0.90)",
                  },
                }}
              >
                <Typography
                  variant="h2"
                  className="nav-text"
                  sx={{
                    fontSize: "1.1875em",
                    fontWeight: "500",
                    cursor: "pointer",
                    textTransform: "none",
                  }}
                >
                  Preguntas frecuentes
                </Typography>
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
            backgroundColor: "#1b1c3c",
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
            <Link
              href="https://www.myllos.com.mx/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Button
                aria-label="Área de clientes"
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
                Clientes
              </Button>
            </Link>
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
            {/*Botón de términos y condiciones*/}
            <Link
              href="/terminos-y-condiciones"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Button
                aria-label="Terminos y condiciones"
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
                Terminos y condiciones
              </Button>
            </Link>
            {/*Botón de aviso de privacidad*/}
            <Link
              href="/aviso-de-privacidad"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
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
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3} sx={{ height: "85%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1b1c3c",
            height: "100%",
            padding: { xs: "24px", md: "38px" },
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
                marginTop: { xs: "0px", md: "40px" },
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
                href="https://www.myllos.com.mx/"
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
                href="https://www.myllos.com.mx/"
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
                display: { xs: "none", md: "flex" },
              }}
            ></Box>
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
