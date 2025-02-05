import { useEffect } from "react";

const useContactType = (setValue) => {
  useEffect(() => {
    const handleContactTypeChange = () => {
      try {
        const contactType = localStorage.getItem("contactType");
        if (contactType === "socio") {
          setValue("Tipo", "socio", { shouldValidate: true });
        } else if (contactType === "cotizaciones") {
          setValue("Tipo", "cotizaciones", { shouldValidate: true });
        }
        
      } catch (error) {
        console.error("Error al manejar el tipo de contacto:", error);
      }
    };

    // Ejecutar la lógica al montar
    handleContactTypeChange();

    // Agregar el event listener
    window.addEventListener("contactTypeChange", handleContactTypeChange);

    return () => {
      window.removeEventListener("contactTypeChange", handleContactTypeChange);
      localStorage.removeItem("contactType");
    };
  }, [setValue]);
};

export default useContactType;
