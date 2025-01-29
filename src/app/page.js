"use client";

import { useEffect } from "react";
import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import Contacto from "@/ui/sections/Contacto/Contacto";
import Servicios from "@/ui/sections/Servicios/Servicios";
import RastreoEnvios from "@/ui/sections/RastreoEnvios/RastreoEnvios";
import Testimonios from "@/ui/sections/Testimonios/Testimonios";
import Cobertura from "@/ui/sections/Cobertura/Cobertura";
import FAQ from "@/ui/sections/FAQ/FAQ";
import Estadisticas from "@/ui/sections/Estadisticas/Estadisticas";

export default function Home() {
  useEffect(() => {
    const navigateToContact = localStorage.getItem("navigateToContact");
    if (navigateToContact === "true") {
      // Limpia la bandera para evitar repeticiones
      localStorage.removeItem("navigateToContact");

      // Realiza el desplazamiento a la sección de contacto
      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main>
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
