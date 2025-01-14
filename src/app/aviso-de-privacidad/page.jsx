import React from "react";
import { Box, Typography, Container } from "@mui/material";

export const metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad de la empresa Myllos.",

  openGraph: {
    title: "Myllos",
    description: "Aviso de privacidad de la empresa Myllos.",
    url: "https://myllos.netlify.app/aviso-de-privacidad",
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

function AvisoPrivacidadPage() {
  return (
    <Container
      sx={{
        py: 4,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
        Aviso de Privacidad
      </Typography>

      <Typography variant="body1" component="p" color="text.secondary">
        Última actualización: [Fecha]
      </Typography>

      <Typography variant="body1" component="p">
        <strong>[Nombre de la empresa]</strong> (en adelante, “La Empresa”), con
        domicilio en [dirección completa], en cumplimiento con la Ley Federal de
        Protección de Datos Personales en Posesión de los Particulares, pone a
        su disposición este Aviso de Privacidad para informarle sobre cómo
        recolectamos, utilizamos, protegemos y, en su caso, transferimos sus
        datos personales.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        1. Datos que recopilamos
      </Typography>
      <Typography variant="body1" component="p">
        Al utilizar nuestros servicios o interactuar con nuestro sitio web,
        podemos recopilar la siguiente información personal:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>Nombre completo.</li>
        <li>Dirección de envío y recolección.</li>
        <li>Número de teléfono y correo electrónico.</li>
        <li>Información fiscal (RFC y/o CURP).</li>
        <li>
          Detalles de envíos (origen, destino, valor declarado, contenido).
        </li>
        <li>Métodos de pago y datos de facturación.</li>
      </Box>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        2. Uso de los datos personales
      </Typography>
      <Typography variant="body1" component="p">
        Los datos que recopilamos se utilizan para las siguientes finalidades:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          Proveer los servicios de paquetería, transporte y logística
          contratados.
        </li>
        <li>Confirmar y dar seguimiento a los envíos realizados.</li>
        <li>Emitir comprobantes fiscales.</li>
        <li>Notificar sobre cambios en nuestros servicios o promociones.</li>
        <li>
          Cumplir con requerimientos legales relacionados con el transporte de
          carga TFL y LFL.
        </li>
      </Box>
      <Typography variant="body1" component="p">
        Si no desea que sus datos se utilicen para fines promocionales, puede
        solicitarlo enviando un correo electrónico a [correo electrónico de
        contacto].
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        3. Protección de sus datos
      </Typography>
      <Typography variant="body1" component="p">
        La Empresa implementa medidas de seguridad técnicas, administrativas y
        físicas para garantizar la protección de sus datos personales y prevenir
        accesos no autorizados. Sin embargo, le recordamos que el uso de
        internet no es completamente seguro y existe el riesgo inherente de
        exposición.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        4. Compartición de datos personales
      </Typography>
      <Typography variant="body1" component="p">
        La Empresa podrá compartir sus datos personales en los siguientes casos:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>Con autoridades competentes que lo requieran legalmente.</li>
        <li>
          Con proveedores y socios logísticos que contribuyan al cumplimiento
          del servicio solicitado (por ejemplo, mensajería o plataformas
          tecnológicas).
        </li>
      </Box>
      <Typography variant="body1" component="p">
        Nos comprometemos a no vender, alquilar o transferir sus datos
        personales a terceros no relacionados con el servicio.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        5. Derechos ARCO
      </Typography>
      <Typography variant="body1" component="p">
        Usted tiene derecho a acceder, rectificar, cancelar u oponerse al
        tratamiento de sus datos personales. Para ejercer estos derechos, puede
        enviar una solicitud al correo electrónico [correo electrónico de
        contacto] con los siguientes documentos:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>Identificación oficial.</li>
        <li>Descripción clara del derecho que desea ejercer.</li>
        <li>Datos de contacto para darle seguimiento a su solicitud.</li>
      </Box>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        6. Uso de cookies y tecnologías similares
      </Typography>
      <Typography variant="body1" component="p">
        En nuestro sitio web utilizamos cookies para mejorar su experiencia de
        usuario y analizar la interacción con nuestro contenido. Al navegar en
        nuestro sitio, acepta el uso de estas tecnologías. Puede desactivarlas
        desde la configuración de su navegador.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        7. Cambios al Aviso de Privacidad
      </Typography>
      <Typography variant="body1" component="p">
        La Empresa se reserva el derecho de realizar modificaciones o
        actualizaciones a este Aviso de Privacidad. Cualquier cambio será
        publicado en esta página con la fecha de actualización correspondiente.
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        8. Contacto
      </Typography>
      <Typography variant="body1" component="p">
        Si tiene dudas o comentarios sobre este Aviso de Privacidad, puede
        contactarnos a través de:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>Correo electrónico: [correo electrónico de contacto].</li>
        <li>Teléfono: [número de contacto].</li>
        <li>Dirección: [dirección completa].</li>
      </Box>

      <Typography
        variant="body2"
        component="p"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Nota: Este Aviso de Privacidad aplica exclusivamente al uso de nuestro
        sitio web y los servicios relacionados con [Nombre de la empresa].
      </Typography>
    </Container>
  );
}

export default AvisoPrivacidadPage;
