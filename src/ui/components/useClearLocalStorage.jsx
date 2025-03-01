"use client";

import { useEffect } from "react";

const useClearLocalStorageOnReload = () => {
  useEffect(() => {
    console.log("🔄 Limpiando localStorage en cada recarga...");
    localStorage.clear(); // Limpia el localStorage en cada carga de la página
  }, []); // Se ejecuta solo una vez cuando se monta el componente
};

export default useClearLocalStorageOnReload;
