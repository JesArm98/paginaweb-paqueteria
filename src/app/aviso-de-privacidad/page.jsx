import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad de la empresa Myllos.",

  openGraph: {
    title: "Myllos",
    description: "Aviso de privacidad de la empresa Myllos.",
    url: "https://myllos.vercel.app//aviso-de-privacidad",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.webp?alt=media&token=d9ff1a3e-6180-4910-b24a-6f0e7d7ee694",
        width: 1000,
        height: 630,
        alt: "Myllos",
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
        <strong>[Nombre de la empresa]</strong> (en adelante, "La Empresa"), con
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
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        <ListItem>
          <ListItemText primary="Nombre completo." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dirección de envío y recolección." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Número de teléfono y correo electrónico." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Información fiscal (RFC y/o CURP)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Detalles de envíos (origen, destino, valor declarado, contenido)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Métodos de pago y datos de facturación." />
        </ListItem>
      </List>

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
      <List>
        <ListItem>
          <ListItemText primary="Proveer los servicios de paquetería, transporte y logística contratados." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Confirmar y dar seguimiento a los envíos realizados." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Emitir comprobantes fiscales." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Notificar sobre cambios en nuestros servicios o promociones." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cumplir con requerimientos legales relacionados con el transporte de carga TFL y LFL." />
        </ListItem>
      </List>
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
      <List>
        <ListItem>
          <ListItemText primary="Con autoridades competentes que lo requieran legalmente." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Con proveedores y socios logísticos que contribuyan al cumplimiento del servicio solicitado (por ejemplo, mensajería o plataformas tecnológicas)." />
        </ListItem>
      </List>
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
      <List>
        <ListItem>
          <ListItemText primary="Identificación oficial." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Descripción clara del derecho que desea ejercer." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Datos de contacto para darle seguimiento a su solicitud." />
        </ListItem>
      </List>

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
      <List>
        <ListItem>
          <ListItemText primary="Correo electrónico: [correo electrónico de contacto]." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Teléfono: [número de contacto]." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dirección: [dirección completa]." />
        </ListItem>
      </List>

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
