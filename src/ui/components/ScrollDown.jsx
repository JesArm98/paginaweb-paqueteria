import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { keyframes } from "@emotion/react";

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ScrollDown = () => {
  const handleScroll = () => {
    const element = document.getElementById("Servicios");
    if (element) {
      const offset = -100; // Ajuste de desplazamiento (100px antes del ancla)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        textAlign: "center",
      }}
    >
      <IconButton
        onClick={handleScroll}
        sx={{
          color: "black",
          mt: 1,
          animation: `${bounceAnimation} 2.5s infinite`,
        }}
      >
        <ExpandMoreIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ScrollDown;
