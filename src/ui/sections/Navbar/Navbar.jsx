"use client";
import { useEffect, useState, useCallback } from "react";
import "./Navbar.css";
import { Box, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "@/ui/sections/Navbar/MobileNav";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [backGroundPoint, setBackGroundPoint] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const stickyPoint = window.innerHeight * 0.08;
    setSticky(window.scrollY >= stickyPoint);

    const backGroundPointThreshold = window.innerHeight * 0.08;
    setBackGroundPoint(window.scrollY >= backGroundPointThreshold);
  }, []);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor:
          pathname !== "/"
            ? "black"
            : backGroundPoint
            ? "black"
            : "transparent",
        transition: "background-color 0.5s ease-in-out",
      }}
      className={`navbar ${isSticky ? "sticky" : ""}`}
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
        <Link href="/">
          <Image
            className="LogoNavbar"
            width={74.25}
            height={74.25}
            src="/images/Navbar/Group.svg"
            alt="TuvanosaLogo"
          />
        </Link>
        <Link href="/" passHref>
          <Button
            onClick={() => handleNavigation("Coordinaciones")}
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
                borderColor: "#FFFFFF",
                transform: "scale(0.90)",
                transition: "transform 0.2s ease, filter 0.2s ease",
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
              ESPECIALIDADES
            </Typography>
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button
            onClick={() => handleNavigation("sucursal")}
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
                borderColor: "#FFFFFF",
                transform: "scale(0.90)",
                transition: "transform 0.2s ease, filter 0.2s ease",
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
              }}
            >
              SUCURSALES
            </Typography>
          </Button>
        </Link>

        <Link href="/tienda" passHref>
          <Button
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#FFFFFF",
              padding: " 8px 16px 8px 16px",

              borderColor: "transparent",
              borderRadius: "30px",
              height: "40px",
              animation: "pulse 3s infinite",
              transition: "transform 0.3s ease",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: "0 0 0 3px rgba(0, 159, 227, 0.8)",
                },
                "50%": {
                  boxShadow: "0 0 10px 2px rgba(0,159,227, 0.8)",
                },
                "100%": {
                  boxShadow: "0 0 0 3px rgba(0,159,227, 0.8)",
                },
              },
              "&:hover": {
                transform: "scale(0.90)",
                borderColor: "#009FE3",
                borderWidth: "2px",
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
              }}
            >
              TIENDA
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
          <Button
            variant="outlined"
            href="https://www.facebook.com/tuvanosaMX"
            target="_blank"
            sx={{
              color: "#FFFFFF",
              borderColor: "none",
              border: "none",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                borderColor: "#FFFFFF",
                "& .text": {
                  transform: "scale(0.90)",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                },
              },
            }}
          >
            <Image
              src="/images/Footer/facebook.svg"
              alt="Facebook"
              width={16}
              height={16}
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
          <Button
            variant="outlined"
            href="https://www.instagram.com/tuvanosa.mx?igsh=bTVjYTBpdmNmbm9h"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#FFFFFF",
              borderColor: "none",
              border: "none",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                borderColor: "#FFFFFF",
                "& .text": {
                  transform: "scale(0.90)",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                },
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
            href="https://www.linkedin.com/company/tuberias-y-valvulas-del-noroeste-sa-de-cv/mycompany/"
            target="_blank"
            sx={{
              color: "#FFFFFF",
              borderColor: "none",
              border: "none",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.31)",
                borderColor: "#FFFFFF",
                "& .text": {
                  transform: "scale(0.90)",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                },
              },
            }}
          >
            <Image
              src="/images/Footer/linkedin.svg"
              alt="LinkedIn"
              width={25}
              height={25}
            />
          </Button>
          <Link href="/#contacto" passHref>
            <Button
              sx={{
                color: "#FFFFFF",
                borderColor: "none",
                border: "none",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.31)",
                  borderColor: "#FFFFFF",
                  "& .text": {
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
                },
              }}
              aria-label="Botón para contacto"
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
  );
};

export default Navbar;
