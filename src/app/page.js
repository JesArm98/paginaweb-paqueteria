"use client";

import React from "react";
import ShippingHero from "@/ui/sections/ShippingHero/ShippingHero";
import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import SeccionCrema from "@/ui/sections/SeccionCrema/SeccionCrema";
import Contacto from "@/ui/sections/Contacto/Contacto";

export default function Home() {
  return (
    <main>
      <ShippingHero />
      <SeccionCrema />
      <Alianzas />
      <Contacto />
    </main>
  );
}
