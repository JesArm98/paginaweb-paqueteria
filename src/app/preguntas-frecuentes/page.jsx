import React from "react";
import { Box, Typography, Container } from "@mui/material";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Preguntas frecuentes de la empresa Myllos.",

  openGraph: {
    title: "Preguntas frecuentes",
    description: "Preguntas frecuentes de la empresa Myllos.",
    url: "https://myllos.netlify.app/preguntas-frecuentes",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/tuvanosa-portal.appspot.com/o/Imagenes%20Landings%2FfondoInicio.webp?alt=media&token=bbd109eb-f7ed-49b9-8fdd-db94dd465e48",
        width: 1000,
        height: 630,
        alt: "Myllos",
        type: "image/svg+xml",
      },
    ],
  },
};

function FAQsPage() {
  return (
    <Container
      sx={{
        py: 10,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
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
        pt={10}
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Preguntas Frecuentes (FAQ)
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        1. ¿Cómo puedo rastrear mi pedido?
      </Typography>
      <Typography variant="body1" component="p">
        Puede rastrear su pedido ingresando el número de guía en nuestra sección
        de seguimiento disponible en el sitio web. Asegúrese de que el número de
        guía ingresado sea correcto para obtener información precisa.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        2. ¿Qué hacer si mi paquete no llega?
      </Typography>
      <Typography variant="body1" component="p">
        Si su paquete no llega dentro del tiempo estimado, le recomendamos
        revisar el estado en la sección de seguimiento. En caso de problemas,
        contáctenos a través de nuestro correo de soporte o por teléfono con su
        número de guía a la mano.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        3. ¿Puedo cambiar la dirección de entrega?
      </Typography>
      <Typography variant="body1" component="p">
        Sí, puede cambiar la dirección antes de que el paquete sea enviado.
        Comuníquese con nuestro equipo de soporte para realizar este cambio. Es
        posible que se apliquen restricciones o costos adicionales dependiendo
        de la nueva ubicación.
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        4. ¿Cuáles son los métodos de pago aceptados?
      </Typography>
      <Typography variant="body1" component="p">
        Aceptamos pagos a través de tarjetas de crédito, débito, transferencias
        bancarias y otros métodos específicos según su ubicación. Consulte los
        detalles en nuestra sección de pagos.
      </Typography>
    </Container>
  );
}

export default FAQsPage;
