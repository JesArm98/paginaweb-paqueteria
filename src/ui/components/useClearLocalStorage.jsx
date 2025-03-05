"use client";
import { useEffect } from "react";

const useClearLocalStorageOnReload = () => {
  useEffect(() => {
    const referrer = document.referrer;
    const allowedReferrers = [
      '/servicios/ltl', 
      '/servicios/ftl'
    ];

    const isAllowedReferrer = allowedReferrers.some(path => 
      referrer.includes(path)
    );

    if (!isAllowedReferrer) {
      console.log("🔄 Limpiando localStorage...");
      localStorage.clear();
    } else {
      console.log("🚫 No se limpia localStorage (veniste de servicios)");
    }
  }, []); // Se ejecuta solo una vez cuando se monta el componente
};

export default useClearLocalStorageOnReload;