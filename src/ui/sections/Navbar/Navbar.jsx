"use client";
import { useState } from "react";
import "./Navbar.css";
import { Box, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/ui/sections/Navbar/MobileNav";

const Navbar = () => {
  const handleNavigation = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const navbar = document.querySelector(".navbar");
        const yOffset = navbar ? -navbar.offsetHeight : 10;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 600);
  };

  const handleSocioClick = (e) => {
    e.preventDefault(); // Previene que Link afecte la navegación
    
    // Guarda el estado en localStorage
    localStorage.setItem("contactType", "Socio");
  
    // Navega directamente a la sección "contacto"
    handleNavigation("contacto");
  
    // Dispara el evento después para asegurar que la sección lo detecte
    setTimeout(() => {
      window.dispatchEvent(new Event("contactTypeChange"));
    }, 200);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    console.log("Clic en Contacto");
    localStorage.setItem("contactType", "Queja");
    handleNavigation("contacto");
    setTimeout(() => {
      console.log("Evento contactTypeChange disparado");
      window.dispatchEvent(new Event("contactTypeChange"));
    }, 500);
  };
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#000",
          zIndex: 10,
          transition: "background-color 0.5s ease-in-out",
          position: "fixed",
          width: "100%",
          height: "60px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            marginLeft: { sx: "20px", md: "60px" },
            justifyContent: { sx: "center", md: "start" },
            width: "55%",
          }}
          className="logNosCoord"
        >

          <Box sx={{display:{xs:"flex", md:"none"}}}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image
              className="LogoNavbar"
              width={100}
              height={40}
              src={"/images/myllos-logo.webp"}
              alt="Myllos Logo Desktop"
              priority
              style={{
                borderRadius: "20px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
          </Box>
          <Box  sx={{display:{xs:"none", md:"flex"}}}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image
              className="LogoNavbar"
              width={50}
              height={50}
              src={"/images/myllos-logo-notext.webp"}
              alt="Logo Myllos Movil"
              priority
              style={{
                borderRadius: "20px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            />
          </Link>
          </Box>
          <Link href="/" passHref style={{ textDecoration: "none" }}>
            <Button
              onClick={() => handleNavigation("Servicios")}
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#FFFFFF",
                padding: " 8px 16px 8px 16px",

                transition: "background-color 0.3s ease",
                borderColor: "transparent",
                borderRadius: "30px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  transform: "scale(1.1)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
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
                }}
              >
                SERVICIOS{" "}
              </Typography>
            </Button>
          </Link>
          <Link href="/#contacto" style={{ textDecoration: "none" }} passHref>
            <Button
              aria-label="¿Quieres ser socio?"
              onClick={handleSocioClick}
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#FFFFFF",
                padding: " 8px 16px 8px 16px",
                transition: "background-color 0.3s ease",
                borderColor: "transparent",
                borderRadius: "30px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  transform: "scale(1.1)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              <Typography
                variant="h2"
                className="nav-text"
                sx={{
                  display: { xs: "none", md: "contents" },
                  fontSize: "1.1875em",
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                ¿QUIERES SER SOCIO?
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box
          className="NavWeb"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Box
            className="navRedes"
            sx={{
              marginRight: "60px",
              width: "auto",
              display: { xs: "none", md: "flex" },
              gap: 4,
            }}
          >
            {/*Botón Facebook*/}
            <Button
              aria-label="Facebook"
              variant="outlined"
              href="https://www.facebook.com/profile.php?id=61569802240206"
              target="_blank"
              sx={{
                color: "#FFFFFF",
                borderColor: "none",
                border: "none",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  transform: "scale(1.2)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              <Image
                src="/images/Icons/facebook.svg"
                alt="Facebook"
                width={16}
                height={16}
                style={{ width: "24px", height: "24px" }}
              />
            </Button>
            {/*Botón Instagram*/}
            <Button
              aria-label="Instagram"
              variant="outlined"
              href="https://www.instagram.com/myllos_?igsh=MXRvbWg1Z3p6N2k2dg=="
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#FFFFFF",
                borderColor: "none",
                border: "none",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  transform: "scale(1.2)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
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
              href="https://www.linkedin.com/company/myllos-soluciones-logisticas/"
              target="_blank"
              sx={{
                color: "#FFFFFF",
                borderColor: "none",
                border: "none",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  transform: "scale(1.2)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
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
            
            {/*Botón de Contacto*/}
            <Link href="/#contacto" style={{ textDecoration: "none" }} passHref>
              <Button
                aria-label="Botón para contacto"
                onClick={handleContactClick}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "none",
                  border: "none",
                  borderRadius: "30px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.31)",
                    transform: "scale(1.2)",
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <MailOutlineIcon
                  sx={{
                    fontSize: "32px",
                    alignItems: "center",
                    color: "white",
                    display: "flex",
                  }}
                />
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "contents", md: "none" },
            }}
          >
            <MobileNav />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
