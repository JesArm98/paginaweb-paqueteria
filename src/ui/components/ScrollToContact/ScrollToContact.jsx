"use client";

import { useEffect } from "react";

export default function ScrollToContact() {
  useEffect(() => {
    const navigateToContact = localStorage.getItem("navigateToContact");
    if (navigateToContact === "true") {
      localStorage.removeItem("navigateToContact");

      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        contactoSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return null; // No renderiza nada
}
