import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import Contacto from "@/ui/sections/Contacto/Contacto";
import Servicios from "@/ui/sections/Servicios/Servicios";
import RastreoEnvios from "@/ui/sections/RastreoEnvios/RastreoEnvios";
import Testimonios from "@/ui/sections/Testimonios/Testimonios";
import Cobertura from "@/ui/sections/Cobertura/Cobertura";
import FAQ from "@/ui/sections/FAQ/FAQ";
import Estadisticas from "@/ui/sections/Estadisticas/Estadisticas";
import NavigateToContact from "@/components/NavigateToContact"; // Importamos el wrapper

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
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.jpg?alt=media&token=80a669b8-699c-49ce-8747-8b9367fcef4b",
        width: 1000,
        height: 630,
        alt: "Myllos - Soluciones Logísticas",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function PaginaPrincipal() {
  return (
    <main>
      <NavigateToContact /> {/* Componente cliente */}
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
