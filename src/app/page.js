import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import Contacto from "@/ui/sections/Contacto/Contacto";
import Servicios from "@/ui/sections/Servicios/Servicios";
import Testimonios from "@/ui/sections/Testimonios/Testimonios";
import Cobertura from "@/ui/sections/Cobertura/Cobertura";
import FAQ from "@/ui/sections/FAQ/FAQ";
import Estadisticas from "@/ui/sections/Estadisticas/Estadisticas";
import ScrollToContact from "@/ui/components/ScrollToContact/ScrollToContact";

export default function Home() {
  return (
    <main>
      <ScrollToContact /> {/* Componente cliente para manejar useEffect */}
      <ShippingHero />
      <Servicios />
      <Cobertura />
      <FAQ />
      <Contacto />
    </main>
  );
}
