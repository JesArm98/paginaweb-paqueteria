"use client";
import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
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
      <Grid item xs={12} md={2} sx={{ height: "85%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 2,
            height: "100%",
          }}
        >
          <Link href="/#headerTVN">
            <Button sx={{ display: { xs: "none", md: "flex" } }}>
              <Image
                src="/images/Footer/logo_tuvanosa.svg"
                alt="Logo Myllos - Volver a Inicio"
                width={1000}
                height={760}
                style={{ maxHeight: "138px", width: "auto" }}
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
            <Link href="/#headerTVN">
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
                Nosotros
              </Button>
            </Link>
            <Link href="/#Coordinaciones">
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
                Servicios
              </Button>
            </Link>
            <Button
              id="contacto"
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
              Sucursales
            </Button>

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
              href="https://portal.tuvanosa.net/clientes/inicio"
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
            <Link
              href="https://portal.tuvanosa.net/proveedores/inicio"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Button
                aria-label="Proveedores"
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
                Proveedores
              </Button>
            </Link>
            <Link
              href="https://tuvanosa.pandape.computrabajo.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
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
                Bolsa de trabajo
              </Button>
            </Link>
            <Link
              href="/aviso-de-privacidad"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
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
                variant="outlined"
                component="a"
                href="https://www.facebook.com/tuvanosaMX"
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
                  src="/images/Footer/facebook.svg"
                  width={30}
                  height={30}
                  alt="Facebook"
                  style={{ width: "25px", height: "25px" }}
                />
              </Button>
              <Button
                variant="outlined"
                component="a"
                href="https://www.instagram.com/tuvanosa.mx?igsh=bTVjYTBpdmNmbm9h"
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
                aria-label="Boton para redirigir a la red social Instagram"
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
                variant="outlined"
                component="a"
                href="https://www.linkedin.com/company/tuvanosamx/"
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
                  src="/images/Footer/linkedin.svg"
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
