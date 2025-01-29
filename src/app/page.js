import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import Contacto from "@/ui/sections/Contacto/Contacto";
import Servicios from "@/ui/sections/Servicios/Servicios";
import Testimonios from "@/ui/sections/Testimonios/Testimonios";
import Cobertura from "@/ui/sections/Cobertura/Cobertura";
import FAQ from "@/ui/sections/FAQ/FAQ";
import Estadisticas from "@/ui/sections/Estadisticas/Estadisticas";
import ScrollToContact from "@/ui/components/ScrollToContact/ScrollToContact";

export const metadata = {
  title: "Myllos - Soluciones Logísticas",
  description:
    "Empresa dedicada y especializada en aportar la mejor solución para sus problemáticas de envíos de mercancía por distintos tipos de transporte.",
  openGraph: {
    title: "Myllos - Soluciones Logísticas",
    description:
      "Empresa dedicada y especializada en aportar la mejor solución para sus problemáticas de envíos de mercancía por distintos tipos de transporte.",
    url: "https://myllos.netlify.app/",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/tuvanosa-portal.appspot.com/o/Imagenes%20Landings%2FfondoInicio.webp?alt=media&token=bbd109eb-f7ed-49b9-8fdd-db94dd465e48",
        width: 1000,
        height: 630,
        alt: "Myllos - Soluciones Logísticas",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <ScrollToContact /> {/* Componente cliente para manejar useEffect */}
      <ShippingHero />
      <Servicios />
      <Cobertura />
      <Testimonios />
      <FAQ />
      <Alianzas />
      <Estadisticas />
      <Contacto />
    </main>
  );
}
