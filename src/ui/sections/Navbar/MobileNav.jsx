"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Instagram from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const ANIMATION_DURATION = 500;

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState("");
  const [targetSection, setTargetSection] = useState(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setAnimation(isOpen ? "slideOut 0.5s forwards" : "slideIn 0.5s forwards");
    setIsOpen(!isOpen);

    if (!isOpen) {
      setShowSocialLinks(false);
      setTimeout(() => {
        setShowSocialLinks(true);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const animationTimer = setTimeout(() => {
        setAnimation("");
      }, ANIMATION_DURATION);
      return () => clearTimeout(animationTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (pathname === "/" && targetSection) {
      const scrollToSection = () => {
        const section = document.querySelector(targetSection);
        if (section) {
          const offsetTop = section.offsetTop;
          const offset = 82;
          window.scrollTo({
            top: offsetTop - offset,
            behavior: "smooth",
          });
        }
      };
      scrollToSection();
      setTargetSection(null);
    }
  }, [pathname, targetSection]);

  const handleMenuItemClick = useCallback(
    (e, href) => {
      e.preventDefault();

      const scrollToSection = () => {
        const section = document.querySelector(href);
        if (section) {
          const offsetTop = section.offsetTop;
          const offset = 82;
          window.scrollTo({
            top: offsetTop - offset,
            behavior: "smooth",
          });
        }
      };

      if (href.startsWith("http")) {
        window.location.href = href;
      } else if (href.startsWith("/")) {
        router.push(href);
      } else {
        if (pathname !== "/") {
          setTargetSection(href);
          router.push("/");
        } else {
          scrollToSection();
        }
      }
      handleCloseMenu();
    },
    [router, pathname]
  );

  const handleCloseMenu = useCallback(() => {
    setAnimation("slideOut 0.5s forwards");
    setTimeout(() => {
      setIsOpen(false);
    }, ANIMATION_DURATION);
  }, []);

  const menuItems = [
    { name: "Nosotros", href: "#headerTVN" },
    { name: "Servicios", href: "#Servicios" },
    { name: "Sucursales", href: "#sucursal" },
    // { name: "Tienda", href: "/tienda" },
  ];

  const menuItems2 = [
    {
      icon: <Instagram sx={{ fontSize: 20 }} />,
      href: "https://www.instagram.com/tuvanosa.mx?igsh=bTVjYTBpdmNmbm9h",
    },
    // {
    //   button: (
    //     <Button
    //       variant="outlined"
    //       href="https://www.facebook.com/tuvanosaMX"
    //       target="_blank"
    //     >
    //       <Image
    //         src="/images/Footer/facebook.svg"
    //         alt="Facebook"
    //         width={20}
    //         height={20}
    //       />
    //     </Button>
    //   ),
    //   href: "https://www.facebook.com/tuvanosaMX",
    // },
    {
      icon: <Instagram sx={{ fontSize: 20 }} />,
      href: "https://www.instagram.com/tuvanosa.mx?igsh=bTVjYTBpdmNmbm9h",
    },
    {
      icon: <Instagram sx={{ fontSize: 20 }} />,
      href: "https://www.instagram.com/tuvanosa.mx?igsh=bTVjYTBpdmNmbm9h",
    },
    // {
    //   button: (
    //     <Button
    //       variant="outlined"
    //       href="https://www.linkedin.com/company/tuvanosa"
    //       target="_blank"
    //     >
    //       <Image
    //         src="/images/Footer/linkedin.svg"
    //         alt="LinkedIn"
    //         width={20}
    //         height={20}
    //       />
    //     </Button>
    //   ),
    //   href: "https://www.linkedin.com/company/tuvanosa",
    // },
    { icon: <EmailOutlinedIcon sx={{ fontSize: 20 }} />, href: "#contacto" },
  ];

  return (
    <>
      {/* Botón para abrir el menú */}
      <IconButton
        aria-label="Abrir menú"
        onClick={toggleMenu}
        size="large"
        sx={{ color: "white", position: "absolute", right: 12 }}
      >
        <MenuIcon sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Contenedor del menú móvil */}
      {(isOpen || animation) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.95)",
            animation: animation,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Botón de cerrar en esquina superior derecha */}
          <IconButton
            aria-label="Cerrar menú"
            onClick={toggleMenu}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
            }}
          >
            <HighlightOffIcon sx={{ width: 40 }} />
          </IconButton>

          {/* Elementos del menú principal */}
          <List sx={{ textAlign: "center" }}>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={(e) => handleMenuItemClick(e, item.href)}
              >
                <ListItemText
                  primary={item.name}
                  sx={{ color: "white", textAlign: "center" }}
                />
              </ListItem>
            ))}
          </List>

          {/* Sección de Redes Sociales con retraso */}
          {showSocialLinks && (
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "white", mb: 2, fontSize: "21px" }}>
                Redes
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                {menuItems2.map((item, index) => (
                  <IconButton
                    aria-label="Red social"
                    key={index}
                    href={item.href}
                    sx={{ color: "white" }}
                  >
                    {item.button || item.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default MobileNav;
