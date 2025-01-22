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
      "FTL (Full Truck Load) es cuando rentas el camión completo para tu carga. LTL (Less Than Truck Load) es cuando compartes el espacio del camión con otros clientes, ideal para cargas menores y más económico.",
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
      "FTL: 24-72 horas según destino. LTL: 2-5 días hábiles. Paquetería: 24-48 horas en envíos locales, 2-5 días en nacionales. Ofrecemos opciones express para entregas más rápidas.",
  },
];

export const contactOptions = [
  { value: "sugerencia", label: "Sugerencias o quejas" },
  {
    value: "socio",
    label: "¿Quieres ser nuestro socio?",
  },
  { value: "cotizaciones", label: "Cotizaciones" },
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
