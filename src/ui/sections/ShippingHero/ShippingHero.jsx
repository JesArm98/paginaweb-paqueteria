'use client'

import CustomDialog from '@/ui/components/CustomDialog';
import { ArrowForward, LocalShipping, Shield, Timer } from '@mui/icons-material';
import { Button, Card, CardContent, Typography, Box, Grid } from "@mui/material";
import CotizacionEnvios from '../Cotizacion/CotizacionEnvios';
import { useState } from 'react';

function ShippingHero  () {

    const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box display="flex" flexDirection="column" position="relative" overflow="hidden" sx={{ background: "linear-gradient(to bottom, rgba(229, 231, 235, 0.5), #fff)", border:"1px solid red" }}>
      <Box className="container" position="relative" zIndex={10} mx="5%" >
        <Grid container spacing={4} py={{ xs: 6, md: 10 }}>
          {/* Left Column - Content */}
          <Grid item xs={12} md={6} display="flex" flexDirection="column" sx={{justifyContent:"start"}} gap={4}>
            <Box>
              <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: "2.5rem", sm: "3rem", md: "3.2rem" }, lineHeight: "1.2" }}>
                Cotiza tus envíos de manera {" "}
                <Typography component="span" sx={{ background: "linear-gradient(to right, #007bff, #007bff99)", WebkitBackgroundClip: "text", color: "transparent",fontSize: { xs: "2.5rem", sm: "3rem", md: "3.2rem"} }}>
                  instantánea
                </Typography>
              </Typography>
              <Typography variant="body1" textAlign={"center"} sx={{  color: "#6b7280", fontSize: { xs: "1rem", md: "1.8rem" } }}>
                Calcula el costo de tus envíos en segundos. Servicio rápido, seguro y confiable para todas tus necesidades de paquetería.
              </Typography>
            </Box>

            {/* Features */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ backgroundColor: "#f8fafc", boxShadow: 1 }}>
                  <CardContent display="flex" alignItems="center" gap={2}>
                    <Box sx={{ backgroundColor: "#007bff1a", padding: "0.5rem", borderRadius: "0.5rem", width:"fit-content", justifyContent:"center", display:"flex", margin:"auto" }}>
                      <Timer sx={{ color: "#007bff" }} />
                    </Box>
                    <Box>
                      <Typography variant="h6">Cotización</Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>En segundos</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ backgroundColor: "#f8fafc", boxShadow: 1 }}>
                  <CardContent display="flex" alignItems="center" gap={2}>
                    <Box sx={{ backgroundColor: "#007bff1a", padding: "0.5rem", borderRadius: "0.5rem", display:"flex", margin:"auto", width:"fit-content" }}>
                      <Shield sx={{ color: "#007bff" }} />
                    </Box>
                    <Box>
                      <Typography variant="h6">Envío Seguro</Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280" }}>100% garantizado</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* CTA */}
            <Box display="flex" flexDirection="column" gap={2} sx={{ flexDirection: "row", justifyContent:"space-evenly" }}>
              <Button variant="outlined" sx={{ display: "flex", alignItems: "center", gap: 1, textTransform:"none", width:"fit-content", borderRadius:"20px" }} >
                Ver servicios
              </Button>
              <Button onClick={() => setOpenDialog(true)} variant="contained" sx={{ display: "flex", alignItems: "center", gap: 1, textTransform:"none", width:"fit-content",borderRadius:"20px" }}>
                Cotizar ahora
                <ArrowForward />
              </Button>
            </Box>
          </Grid>

          {/* Right Column - Image */}
          <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }} position="relative">
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom right, #007bff33, #ffffff)", filter: "blur(60px)" }} />
            <Box position="relative" sx={{ aspectRatio: "1", borderRadius: "50%", backgroundColor: "#f8fafc", boxShadow: 3, overflow: "hidden" }}>
              <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
                <LocalShipping sx={{ fontSize: "8rem", color: "#007bff33" }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    <CustomDialog
    open={openDialog}
    onClose={()=> setOpenDialog(false)}
    title="Cotiza tu envio"
    width='md'
    onPdfPreview={true}
    >
    <CotizacionEnvios/>
    </CustomDialog>

      {/* Background decoration */}
      <Box position="absolute" left="50%" top="50%" zIndex={-10} sx={{ width: "800px", height: "800px", transform: "translate(-50%, -50%)", borderRadius: "50%", backgroundColor: "#007bff0d", filter: "blur(80px)" }} />
    </Box>

  );
};



export default ShippingHero;
