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
        url: "/images/Mapa/Myllos.webp",
        width: 1000,
        height: 630,
        alt: "Myllos",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function Layout({ children }) {
  return children;
} 