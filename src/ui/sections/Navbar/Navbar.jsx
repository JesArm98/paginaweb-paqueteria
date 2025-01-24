"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import "./Navbar.css";
import { Box, Button, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileNav from "@/ui/sections/Navbar/MobileNav";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginDialog from "@/ui/components/LoginDialog/LoginDialog";

const Navbar = () => {
  const { isLoggedIn, userData } = useContext(UserContext);
  const [openLogin, setOpenLogin] = useState(false);
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

  const handleSocioClick = () => {
    // Primero establecer el tipo en localStorage
    localStorage.setItem("contactType", "socio");

    // Usar handleNavigation que ya tiene la lógica de scroll suave
    handleNavigation("contacto");

    // Disparar el evento después de un pequeño delay para asegurar que el scroll terminó
    setTimeout(() => {
      const event = new Event("contactTypeChange");
      window.dispatchEvent(event);
    }, 700); // Un poco más que el timeout de handleNavigation
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          zIndex: 10,
          transition: "background-color 0.5s ease-in-out",
          position: "fixed",
          width: "100%",
          height: "60px",
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
          <Link href="/">
            <Image
              style={{ borderRadius: "20px" }}
              className="LogoNavbar"
              width={50}
              height={50}
              src="/images/myllos-logo-notext.jpeg"
              alt="Myllos Logo"
              priority
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
                SERVICIOS{" "}
              </Typography>
            </Button>
          </Link>
          <Link href="/#contacto" passHref>
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
                ¿QUIERES SER SOCIO?
              </Typography>
            </Button>
          </Link>
          {/*
          <Link href="/tienda" passHref>
            <Button
              aria-label="Tienda"
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
          */}
        </Box>

        {console.log(openLogin)}
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
              aria-label="Facebook"
              variant="outlined"
              href="https://www.myllos.com.mx/"
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
                  borderColor: "#FFFFFF",
                  "& .text": {
                    transform: "scale(0.90)",
                    transition: "transform 0.2s ease, filter 0.2s ease",
                  },
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
            <Box>
              {isLoggedIn === false ? (
                <Button
                  sx={{ color: "#FFFFFF" }}
                  onClick={() => setOpenLogin(true)}
                >
                  <PersonOutlinedIcon
                    sx={{
                      fontSize: "36px",
                      cursor: "pointer",
                      transition: "font-size 0.2s",
                      "&:hover": {
                        fontSize: "30px",
                      },
                    }}
                  />
                </Button>
              ) : (
                <>
                  <Avatar
                    sx={{
                      bgcolor: "#3f51b5",
                      cursor: "pointer",
                      height: "54px",
                      width: "54px",
                    }}
                    onClick={handleMenuOpen}
                    src={userData.photoURL || undefined}
                  >
                    {!userData.photoURL && userData.nombre[0].toUpperCase()}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {/* MIS PEDIDOS */}
                    <MenuItem
                      sx={{
                        height: "44px",
                        width: "240px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleMenuClose("/tienda/mis-pedidos")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShoppingBagOutlinedIcon
                          sx={{
                            color: "#009FE3",
                            pr: "8px",
                          }}
                        />{" "}
                        <p style={{ color: "#002C72", fontWeight: "500" }}>
                          Mis pedidos
                        </p>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", color: "#009FE3" }}
                      />
                    </MenuItem>
                    {/* MI PERFIL */}
                    <MenuItem
                      sx={{
                        borderTop: "1px solid grey",
                        height: "44px",
                        width: "240px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() =>
                        handleMenuClose("/tienda/configuracion-de-la-cuenta")
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SettingsOutlinedIcon
                          sx={{ color: "#009FE3", pr: "8px" }}
                        />{" "}
                        <p style={{ color: "#002C72", fontWeight: "500" }}>
                          Mi perfil
                        </p>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", color: "#009FE3" }}
                      />
                    </MenuItem>
                    {/* MIS DIRECCIONES */}
                    <MenuItem
                      sx={{
                        borderTop: "1px solid grey",
                        height: "44px",
                        width: "240px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleMenuClose("/tienda/direcciones")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LocationOnOutlinedIcon
                          sx={{ color: "#009FE3", pr: "8px" }}
                        />{" "}
                        <p style={{ color: "#002C72", fontWeight: "500" }}>
                          Mis direcciones
                        </p>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", color: "#009FE3" }}
                      />
                    </MenuItem>
                    {/* FACTURACION */}
                    <MenuItem
                      sx={{
                        borderTop: "1px solid grey",
                        height: "44px",
                        width: "240px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleMenuClose("/tienda/facturacion")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <RequestQuoteOutlinedIcon
                          sx={{ color: "#009FE3", pr: "8px" }}
                        />
                        <p style={{ color: "#002C72", fontWeight: "500" }}>
                          Facturación
                        </p>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", color: "#009FE3" }}
                      />
                    </MenuItem>
                    {/* CARRITO */}
                    <MenuItem
                      disabled={cart.length <= 0}
                      sx={{
                        borderTop: "1px solid grey",
                        height: "44px",
                        width: "240px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleMenuClose("/tienda/carrito")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShoppingCartOutlinedIcon
                          sx={{ color: "#009FE3", pr: "8px" }}
                        />{" "}
                        <p style={{ color: "#002C72", fontWeight: "500" }}>
                          Carrito
                        </p>
                      </Box>
                      <ArrowForwardIosIcon
                        sx={{ fontSize: "16px", color: "#009FE3" }}
                      />
                    </MenuItem>
                    {/* CERRAR SESION */}
                    <MenuItem
                      sx={{ borderTop: "1px solid grey", height: "44px" }}
                      onClick={() => handleLogOut("/tienda")}
                    >
                      <CloseOutlinedIcon sx={{ color: "#009FE3", pr: "8px" }} />{" "}
                      <p style={{ color: "#002C72", fontWeight: "500" }}>
                        Cerrar sesión
                      </p>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
            <Link href="/#contacto" passHref>
              <Button
                aria-label="Botón para contacto"
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

      <LoginDialog
        open={openLogin}
        setOpen={setOpenLogin}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
};

export default Navbar;
