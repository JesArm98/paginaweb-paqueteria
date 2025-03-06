import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Contacto from "@/ui/sections/Contacto/Contacto";
import Servicios from "@/ui/sections/Servicios/Servicios";
import Cobertura from "@/ui/sections/Cobertura/Cobertura";
import FAQ from "@/ui/sections/FAQ/FAQ";
import ScrollToContact from "@/ui/components/ScrollToContact/ScrollToContact";
import Banner from "@/ui/sections/Banner/Banner";
import ClientInitializer from "@/ui/components/ClientInitializer";

export default function Home() {
  return (
    <main>
      <ClientInitializer/>
      <ScrollToContact /> {/* Componente cliente para manejar useEffect */}
      <ShippingHero />
      <Servicios />
      <Banner/>
      <Cobertura />
      <FAQ />
      <Contacto />
    </main>
  );
}
