//Dame el codigo para hacer una lista de proveedores de envios de paqueteria de prueba, donde se tenga el nombre, id, y el logo
export const proveedores = [
  {
    id: 1,
    nombre: "Estafeta Standard",
    logo: "/images/logos/estafeta.png",
    fechaEntrega: "Lunes 20/01/2025",
    tiempoEntrega: 3,
    tipoServicio: "Standard",
    precio: 926.60
  },
  {
    id: 2,
    nombre: "Estafeta Express",
    logo: "/images/logos/estafeta.png",
    fechaEntrega: "Lunes 20/01/2025",
    tiempoEntrega: 2,
    tipoServicio: "Express OneDay",
    precio: 3970.38
  },
  {
    id: 3,
    nombre: "FedEx Día Siguiente",
    logo: "/images/logos/fedex.png",
    fechaEntrega: "Lunes 20/01/2025",
    tiempoEntrega: 1,
    tipoServicio: "Express OneDay",
    precio: 4162.89
  },
  // ... más proveedores
];

export const testimonios = [
  {
    nombre: "Juan Pérez",
    cargo: "Gerente de Logística",
    empresa: "Industrias Manufactureras XYZ",
    comentario:
      "Su servicio FTL ha sido fundamental para nuestra cadena de suministro. La puntualidad y el cuidado de la carga son excepcionales.",
    rating: 5,
  },
  {
    nombre: "María González",
    cargo: "Directora de Operaciones",
    empresa: "Distribuidora Nacional",
    comentario:
      "El servicio LTL nos permite optimizar costos manteniendo la calidad del servicio. Su sistema de rastreo es excelente.",
    rating: 5,
  },
  {
    nombre: "Carlos Rodríguez",
    cargo: "Gerente de E-commerce",
    empresa: "Tiendas Online MX",
    comentario:
      "Su servicio de paquetería ha sido clave para el crecimiento de nuestro e-commerce. Las entregas siempre a tiempo.",
    rating: 5,
  },
  {
    nombre: "Juan Pérez",
    cargo: "Gerente de Logística",
    empresa: "Industrias Manufactureras XYZ",
    comentario:
      "Su servicio FTL ha sido fundamental para nuestra cadena de suministro. La puntualidad y el cuidado de la carga son excepcionales.",
    rating: 5,
  },
];

export const preguntasPrincipales = [
  {
    pregunta: "¿Cuál es la diferencia entre FTL y LTL?",
    respuesta:
      "FTL (Full Truck Load) es cuando rentas el camión completo para tu carga. LTL (Less Than Truck Load) es cuando compartes el espacio del camión con otros clientes, ideal para cargas menores y más económicas.",
  },
  {
    pregunta: "¿Qué documentación necesito para envíos?",
    respuesta:
      "Para envíos básicos: carta porte y factura comercial. Para FTL/LTL adicional: lista de empaque y seguro de carga. Para materiales especiales pueden requerirse permisos adicionales.",
  },
  {
    pregunta: "¿Cómo puedo rastrear mi envío?",
    respuesta:
      "Puedes rastrear tu envío en tiempo real a través de nuestra plataforma web ingresando tu número de guía. También recibirás actualizaciones por correo electrónico sobre el estado de tu envío.",
  },
  {
    pregunta: "¿Cuáles son los tiempos estimados de entrega?",
    respuesta:
      "FTL: 24-72 horas según destino. LTL: 2-5 días hábiles. Paquetería: 24-48 horas en envíos locales, 2-5 días en nacionales. Ofrecemos opciones exprés para entregas más rápidas.",
  },
];

export const contactOptions = [
  { value: "Queja", label: "Sugerencias o quejas" },
  {
    value: "Socio",
    label: "¿Quieres ser nuestro socio?",
  },
  { value: "Cotizacion", label: "Cotizaciones" },
];

//Estadisticas
export const stats = [
  {
    valor: 500000,
    sufijo: "+",
    texto: "Toneladas Transportadas",
  },
  {
    valor: 98,
    sufijo: "%",
    texto: "Entregas a Tiempo",
  },
  {
    valor: 150,
    sufijo: "+",
    texto: "Unidades de Transporte",
  },
  {
    valor: 15,
    sufijo: "+",
    texto: "Años de Experiencia",
  },
];

//Preguntas frecuentes Categorias
 export const categorias = {
  general: {
    label: "General",
    preguntas: [
      {
        pregunta: "¿Cuáles son sus horarios de servicio?",
        respuesta:
          "Operamos 24/7 para servicios de transporte. Nuestro centro de atención al cliente está disponible de lunes a viernes de 8:00 AM a 6:00 PM.",
      },
      {
        pregunta: "¿Cómo puedo solicitar una cotización?",
        respuesta:
          "Puedes solicitar una cotización a través de nuestro formulario en línea, contactando a nuestro equipo de ventas o mediante el botón 'Cotizar' en nuestra página principal.",
      },
    ],
  },
  ftl: {
    label: "FTL",
    preguntas: [
      {
        pregunta: "¿Qué capacidad tienen sus unidades FTL?",
        respuesta:
          "Nuestras unidades FTL tienen capacidad para 24 tarimas estándar. Contamos con cajas secas de 48 y 53 pies, y opciones refrigeradas según necesidad.",
      },
      {
        pregunta:
          "¿Cuál es el tiempo mínimo de anticipación para un servicio FTL?",
        respuesta:
          "Recomendamos programar servicios FTL con 24-48 horas de anticipación para garantizar disponibilidad de unidades.",
      },
    ],
  },
  ltl: {
    label: "LTL",
    preguntas: [
      {
        pregunta: "¿Cuál es el mínimo de carga para LTL?",
        respuesta:
          "El servicio LTL está disponible desde 1 tarima hasta 10 tarimas. Ideal para optimizar costos cuando no se requiere un camión completo.",
      },
      {
        pregunta: "¿Cómo se calcula el costo del servicio LTL?",
        respuesta:
          "El costo se calcula basado en el peso, dimensiones, distancia y espacio ocupado en el camión. Ofrecemos tarifas competitivas por volumen.",
      },
    ],
  },
  // {paqueteria: {
  //   label: "Paquetería",
  //   preguntas: [
  //     {
  //       pregunta: "¿Cuál es el peso máximo por paquete?",
  //       respuesta:
  //         "Para servicio de paquetería, aceptamos envíos de hasta 70 kg por pieza. Para envíos más pesados, recomendamos nuestros servicios LTL.",
  //     },
  //     {
  //       pregunta: "¿Ofrecen servicio de recolección?",
  //       respuesta:
  //         "Sí, ofrecemos recolección a domicilio sin costo adicional en las principales ciudades, programando con 24 horas de anticipación.",
  //     },
  //   ],
  // },
};

export const tipoServicio = [
  { value: "FTL", label: "Servicio FTL" },
  {
    value: "LTL",
    label: "Servicio LTL",
  },
];
