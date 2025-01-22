import { Box, Typography } from "@mui/material";
import CarouselAlianzas from "./CarouselAlianzas/CarouselAlianzas";

const Alianzas = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        mb: { xs: 4, md: 8 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginTop: "48px",
          color: "#07417B",
          fontSize: { xs: "1.5rem", md: "2.25em" },
          fontWeight: 700,
        }}
      >
        Nuestras alianzas
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginTop: "72px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "10%",
            background:
              "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
            zIndex: 1,
          }}
        />
        <CarouselAlianzas />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "10%",
            background:
              "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default Alianzas;
