import React from "react";
import { Box, Typography, Container } from "@mui/material";

export const metadata = {
  title: "Terminos y condiciones",
  description: "Terminos y condiciones de la empresa Myllos.",

  openGraph: {
    title: "Terminos y condiciones",
    description: "Terminos y condiciones de la empresa Myllos.",
    url: "https://myllos.netlify.app/terminos-y-condiciones",
    type: "website",
    images: [
      {
        url: "https://www.myllos.com.mx/background.webp",
        width: 1000,
        height: 630,
        alt: "Myllos",
        type: "image/webp",
      },
    ],
  },
};

function TerminosCondicionesPage() {
  return (
    <>
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
          Términos y Condiciones
        </Typography>
        <Typography variant="body1" component="p">
          Bienvenido a <strong>[Nombre de la Empresa]</strong>. Al utilizar este
          sitio web y nuestros servicios, acepta cumplir con los siguientes
          términos y condiciones. Le recomendamos leerlos detenidamente antes de
          utilizar nuestro sitio o servicios.
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          1. Uso del sitio web
        </Typography>
        <Typography variant="body1" component="p">
          El contenido de este sitio web es únicamente para su uso personal y no
          comercial. No puede copiar, distribuir, modificar o utilizar ningún
          contenido sin el permiso explícito de{" "}
          <strong>[Nombre de la Empresa]</strong>.
        </Typography>
        <Typography variant="body1" component="p">
          Queda prohibido el uso del sitio para fines ilícitos o no autorizados,
          incluyendo la recolección de datos personales de otros usuarios sin su
          consentimiento.
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          2. Limitación de responsabilidad
        </Typography>
        <Typography variant="body1" component="p">
          La Empresa no será responsable por daños directos, indirectos o
          incidentales derivados del uso de este sitio web o servicios. Esto
          incluye, pero no se limita a, fallas técnicas, pérdida de datos o
          interrupciones en el servicio.
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          3. Modificaciones a los términos
        </Typography>
        <Typography variant="body1" component="p">
          Nos reservamos el derecho de actualizar estos términos en cualquier
          momento. Las modificaciones serán publicadas en esta página, y es
          responsabilidad del usuario revisar periódicamente las
          actualizaciones.
        </Typography>
      </Container>
    </>
  );
}

export default TerminosCondicionesPage;
