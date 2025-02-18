"use client";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { keyframes } from "@mui/material/styles";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const FloatButton = () => {
  const phoneNumber = "526673897772";
  const message =
    "Hola, quisiera más información sobre sus servicios de envios en FTL y LTL. Gracias.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip
      sx={{
        backgroundColor: "#00bb2d",
        color: "#FFFFFF",
        fontSize: "1rem",
        border: "1px solid #FFFFFF",
        padding: "10px",
        borderRadius: "8px",
      }}
      title="Contactanos por WhatsApp, estaremos encantados de ayudarte"
      arrow
    >
      <Fab
        aria-label="Contactar por WhatsApp"
        onClick={handleClick}
        sx={{
          width: { xs: "40px", md: "60px" },
          height: { xs: "40px", md: "60px" },
          position: "fixed",
          bottom: { xs: "44px", md: "22px" },
          right: { xs: "8px", md: "22px" },
          zIndex: 2000,
          background: "linear-gradient(45deg, #25D366 30%, #128C7E 90%)",
          color: "white",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 3px 5px 2px rgba(37, 211, 102, .3)",
          animation: `${bounce} 3s ease-in-out infinite`,
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 6px 10px 4px rgba(37, 211, 102, .3)",
            animation: "none", // Detiene la animación durante el hover
          },
        }}
      >
        <WhatsAppIcon
          sx={{
            width: { xs: "70%", md: "70%" },
            height: { xs: "70%", md: "70%" },
          }}
        />
      </Fab>
    </Tooltip>
  );
};

export default FloatButton;
