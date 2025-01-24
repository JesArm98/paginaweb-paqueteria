import React from "react";
import { Typography, Container } from "@mui/material";

export const metadata = {
  title: "Terminos y condiciones de servicio",
  description: "Terminos y condiciones de servicio de la empresa Myllos.",

  openGraph: {
    title: "Terminos y condiciones de servicio",
    description: "Terminos y condiciones de servicio de la empresa Myllos.",
    url: "https://myllos.netlify.app//terminos-y-condiciones-servicio",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.webp?alt=media&token=286f024b-6144-4152-a657-29966c67be2f",
        width: 1000,
        height: 630,
        alt: "Myllos",
      },
    ],
  },
};

function TerminosUsoPage() {
  return (
    <Container
      sx={{
        py: 15,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mb: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
        textAlign: "justify",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Términos y Condiciones de Uso
      </Typography>
      <Typography variant="body1" component="p">
        Estos términos regulan el uso de nuestros servicios y recursos
        disponibles en <strong>[Nombre de la Empresa]</strong>. Al acceder o
        utilizar nuestros servicios, usted acepta los términos descritos aquí.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        1. Uso permitido
      </Typography>
      <Typography variant="body1" component="p">
        Usted se compromete a utilizar nuestros servicios de manera legal y
        ética, sin infringir leyes locales, nacionales o internacionales. Esto
        incluye abstenerse de intentar acceder a sistemas restringidos o
        realizar actividades que puedan dañar nuestra infraestructura.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        2. Suspensión de cuentas
      </Typography>
      <Typography variant="body1" component="p">
        Nos reservamos el derecho de suspender o cancelar cuentas que violen
        estos términos o realicen actividades fraudulentas. En caso de
        suspensión, el usuario será notificado a través de los medios de
        contacto registrados.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        3. Disponibilidad del servicio
      </Typography>
      <Typography variant="body1" component="p">
        Hacemos nuestro mejor esfuerzo para garantizar la disponibilidad
        ininterrumpida de nuestros servicios, pero no garantizamos que el sitio
        o los servicios estén disponibles en todo momento.
      </Typography>
    </Container>
  );
}

export default TerminosUsoPage;
