

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const beneficios = [
  {
    icon:               <Image
                    width={40}
                    height={40}
                    src="/images/Icons/icon_myllos_global.webp"
                    alt="Cobertura global"
                    style={{ 
                      width: "30px",   // Tamaño visual
                      height: "30px",  // Tamaño visual
                      objectFit: 'contain', // Mantiene la proporción de la imagen
                    }}
                  />,
    titulo: "Cobertura nacional e internacional",
    descripcion:
      "Te apoyamos con cualquier proyecto tanto nacional como global",
  },
  {
    icon: <Image
    width={30}
    height={30}
    src="/images/Icons/icon_myllos_entrega.webp"
    alt="Entregas"
    style={{ 
      width: "30px",   // Tamaño visual
      height: "30px",  // Tamaño visual
      objectFit: 'contain', // Mantiene la proporción de la imagen
    }}
  />,
    titulo: "Entregas y recolecciones con cita",
    descripcion: "Coordinamos el servicio para cumplir con tu compromiso",
  },
  {
    icon:               <Image
                    width={30}
                    height={30}
                    src="/images/Icons/icon_myllos_tracking.webp"
                    alt="Rastreo de envíos"
                    style={{ 
                      width: "30px",   // Tamaño visual
                      height: "30px",  // Tamaño visual
                      objectFit: 'contain', // Mantiene la proporción de la imagen
                    }}
                  />,
    titulo: "Rastreo en Tiempo Real",
    descripcion: "Monitoreo constante de tus envíos",
  },
  {
    icon:               <Image
                    width={30}
                    height={30}
                    src="/images/Icons/icon_myllos_seguro.webp"
                    alt="Envíos seguros"
                    style={{ 
                      width: "30px",   // Tamaño visual
                      height: "30px",  // Tamaño visual
                      objectFit: 'contain', // Mantiene la proporción de la imagen
                    }}
                  />,
    titulo: "Envíos Seguros",
    descripcion:
      "Aseguramos tu mercancía para darte tranquilidad de inicio a fin",
  },
  {
    icon:               <Image
                    width={30}
                    height={30}
                    src="/images/Icons/icon_myllos_check.webp"
                    alt="Acuse de recibo"
                    style={{ 
                      width: "30px",   // Tamaño visual
                      height: "30px",  // Tamaño visual
                      objectFit: 'contain', // Mantiene la proporción de la imagen
                    }}
                  />,
    titulo: "Acuse de recibo",
    descripcion: "Gestionamos la evidencia de tus entregas",
  },
];

const Cobertura = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: { xs: "#fff" },
      }}
    >
      {/* Título principal con escalado progresivo */}
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: { xs: 3, sm: 4, md: 6 },
          background: "linear-gradient(45deg, #3DC2CF, #3DC2CF99)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.25rem" },
        }}
      >
        Nuestra Cobertura
      </Typography>

      {/* Contenedor principal con max-width para mejor responsividad */}
      <Box 
        sx={{
          width: "100%",
          maxWidth: { xs: "95%", sm: "90%", md: "90%", lg: "1200px", xl: "1600px" },
          margin: "auto",
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="center" 
          alignItems="center" // Centra verticalmente los items del Grid
        >
          {/* Columna de la imagen */}
          <Grid 
            item 
            xs={12} 
            md={6} 
            sx={{
              display: "flex",
              alignItems: "center", // Centra el contenido verticalmente dentro del Grid item
              justifyContent: "center", // Centra horizontalmente
            }}
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: { xs: "10px", md: "15px" },
                width: "100%", // Asegura que ocupe el ancho completo
                height: { xs: "auto", md: "100%" }, // Altura adaptativa
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                p: 0,
              }}
            >
              {/* Imagen con proporciones armoniosas */}
              <Box
                position="relative"
                width="100%"
                sx={{
                  // Proporciones consistentes con una altura adaptativa
                  aspectRatio: "1/1", // Proporción cuadrada para mejor apariencia
                  maxHeight: { xs: "300px", sm: "500px", md: "450px", lg: "550px" },
                  // Aseguramos que no haya espacio en blanco
                  "& img": {
                    transition: "transform 0.3s ease-in-out",
                    objectFit: "cover",
                    objectPosition: "center",
                  },
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Image
                  src="/images/Banners/banners_myllos_web_cobertura.png"
                  alt="Banner cobertura"
                  fill
                  priority
                />
              </Box>
            </Paper>
          </Grid>

          {/* Columna de texto y beneficios */}
          <Grid 
            item 
            xs={12} 
            md={6} 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center", // Centra el contenido verticalmente
            }}
          >
            <Box 
              sx={{ 
                display: "flex",
                flexDirection: "column",
                // Aseguramos una distribución equilibrada en todos los tamaños
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              {/* Subtítulo con escalado progresivo */}
              <Typography
                gutterBottom
                sx={{
                  mt: { xs: 2, md: 0 },
                  background: "linear-gradient(45deg, #3DC2CF, #3DC2CF99)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: 600,
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
                  textAlign: "center",
                }}
              >
                Cobertura Global
              </Typography>

              {/* Texto descriptivo con margen proporcionado */}
              <Typography
                sx={{
                  mb: { xs: 2, sm: 3, md: 4 },
                  color: "#6b7280",
                  fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                  lineHeight: 1.7,
                  width: { xs: "95%", sm: "90%", md: "85%" },
                  margin: "auto",
                  textAlign: "justify",
                }}
              >
                Contamos con una red de aliados que nos permiten ofrecerte una
                cobertura global, tus necesidades seguro encontrarán una solución
                en Myllos.
              </Typography>

              {/* Lista de beneficios con espaciado proporcionado */}
              <List 
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4 },
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around", // Distribuye uniformemente los elementos
                  gap: { xs: 0.5, sm: 1 }, // Espacio consistente entre elementos
                }}
              >
                {beneficios.map((beneficio, index) => (
                  <React.Fragment key={beneficio.titulo}>
                    <ListItem
                      sx={{
                        display: "flex",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        py: { xs: 1, sm: 1.25, md: 1.5 },
                        mt: { xs: 1, sm: 1.5, md: 1.5 }, // Espaciado más consistente
                        transition: "all 0.3s ease-in-out",
                        borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                        backgroundColor: "#ffffff",
                        gap:2,
                        "&:hover": {
                          transform: "translateY(-5px)",
                          backgroundColor: "#f0f9ff",
                          boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            backgroundColor: "#fff11",
                            borderRadius: "50%",
                            p: { xs: 0.8, sm: 1, md: 1.2 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {React.cloneElement(beneficio.icon, {
                            sx: { 
                              color: "#007bff",
                              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" }
                            },
                          })}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1a1a1a",
                              fontWeight: 700,
                              fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
                            }}
                          >
                            {beneficio.titulo}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{
                              color: "#6b7280",
                              mt: 0.5,
                              fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                            }}
                          >
                            {beneficio.descripcion}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < beneficios.length - 1 && (
                      <Box sx={{ my: { xs: 0.25, sm: 0.5 } }}>
                        <Divider sx={{ width: "100%", borderColor: "#e5e7eb" }} />
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Cobertura;