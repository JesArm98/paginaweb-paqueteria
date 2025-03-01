import { useState } from "react";
import { Tooltip, IconButton, useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import Image from "next/image";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TarimaTooltip = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detecta si es móvil
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Texto "Conocer dimensiones de tarima" (solo en desktop) */}
      {!isMobile && (
        <Typography variant="body2" sx={{ fontSize: "12px", textAlign: "center", ml: 1.5 }}>
          Conocer dimensiones de tarima
        </Typography>
      )}

      {/* Tooltip con comportamiento dinámico */}
      <Tooltip
        open={isMobile ? tooltipOpen : undefined} // En mobile, el estado controla la apertura
        onClose={() => setTooltipOpen(false)} // Cierra el tooltip en mobile
        disableHoverListener={isMobile} // Desactiva hover en mobile
        title={
          <Box sx={{ textAlign: "center", p: 1 }}>
            <Image
              src="/images/tarimas.webp"
              alt="Ejemplo de dimensiones"
              width={200}
              height={150}
              style={{ borderRadius: "8px", marginTop: "4px" }}
            />
          </Box>
        }
        arrow
        placement="top"
        sx={{
          "& .MuiTooltip-tooltip": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderRadius: "10px",
            p: 1,
          },
        }}
      >
        {/* Botón de información (Click en mobile, hover en desktop) */}
        <IconButton
          sx={{ mt: 0.5 }}
          onClick={() => isMobile && setTooltipOpen(!tooltipOpen)} // Solo activa con click en mobile
        >
          <HelpOutlineIcon sx={{ color: "blue" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TarimaTooltip;
