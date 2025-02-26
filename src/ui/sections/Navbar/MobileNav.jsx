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

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setAnimation((prev) =>
      prev === "slideIn 0.5s forwards"
        ? "slideOut 0.5s forwards"
        : "slideIn 0.5s forwards"
    );
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    let animationTimer;
    if (!isOpen) {
      animationTimer = setTimeout(() => {
        setAnimation("");
      }, ANIMATION_DURATION);
    }
    return () => clearTimeout(animationTimer);
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
  
      if (href.includes("firebase")) {
        window.open(href, "_blank");
        return;
      }
  
      if (href.startsWith("#")) {
        const section = document.querySelector(href);
        if (section) {
          const offsetTop = section.offsetTop;
          const offset = 82;
          window.scrollTo({
            top: offsetTop - offset,
            behavior: "smooth",
          });
          handleCloseMenu();
        } else if (pathname !== "/") {
          setTargetSection(href);
          router.push("/");
        }
        return;
      }
  
      if (href.startsWith("http")) {
        window.location.href = href;
      } else if (href.startsWith("/")) {
        router.push(href);
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
    { name: "Nosotros", href: "/" },
    { name: "Servicios", href: "#Servicios" },
     { name: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
     { name: "Contrato adhesión", href: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Contrato-adhesion-Myllos.pdf?alt=media&token=3f04bcb4-7d58-4428-9a94-07400a498bb0" },
     { name: "Terminos y condiciones", href: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Terminos-y-condiciones-Myllos.pdf?alt=media&token=1733f60b-37be-4ccb-85a4-35ac88145ac5" },
     { name: "Aviso de privacidad", href: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/aviso-de-privacidad-myllos.pdf?alt=media&token=0d3db21e-49ae-4186-abec-2a4674dccd97" },
  ];

  const menuItems2 = [
    {
      button: (
        <Button
          
          href="https://www.facebook.com/profile.php?id=61569802240206"
          target="_blank"
        >
          <Image
            src="/images/Icons/facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
          />
        </Button>
      ),
      href: "https://www.facebook.com/profile.php?id=61569802240206",
      name: "Facebook",
    },{
      button: (
        <Button
        
        href="https://www.instagram.com/myllos_?igsh=MXRvbWg1Z3p6N2k2dg=="
        target="_blank"
      >
<Instagram sx={{ fontSize: 20, color:"white" }} />
        </Button>
      ),
      href:"https://www.instagram.com/myllos_?igsh=MXRvbWg1Z3p6N2k2dg==",
      name:"Instagram"
    },
    {
      button: (
        <Button
          
          href="https://www.linkedin.com/company/myllos-soluciones-logisticas/"
          target="_blank"
        >
          <Image
            src="/images/Icons/linkedin.svg"
            alt="LinkedIn"
            width={20}
            height={20}
          />
        </Button>
      ),
      href: "https://www.linkedin.com/company/myllos-soluciones-logisticas/",
      name: "LinkedIn",
    },

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
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100%",
            zIndex: 30,
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
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "white", mb: 2, fontSize: "21px" }}>
              Redes
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {menuItems2.map((item, index) => (
                <IconButton
                  aria-label={`Red social ${item.name}`}
                  key={index}
                  href={item.href}
                  sx={{ color: "white" }}
                >
                  {item.button || item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MobileNav;
