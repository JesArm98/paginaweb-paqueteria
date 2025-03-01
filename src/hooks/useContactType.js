import { useEffect } from "react";

const useContactType = (setValue, trigger) => {
  useEffect(() => {
    const handleContactTypeChange = () => {
      try {
        const contactType = localStorage.getItem("contactType");

        if (contactType) {
          setValue("Tipo", contactType, { shouldValidate: true });

          // Disparar validación y actualización en el próximo ciclo de render
          setTimeout(() => trigger("Tipo"), 100);
        }
      } catch (error) {
        console.error("Error al manejar el tipo de contacto:", error);
      }
    };

    // Ejecutar en el montaje
    handleContactTypeChange();

    // Escuchar eventos para cambios dinámicos
    window.addEventListener("contactTypeChange", handleContactTypeChange);

    return () => {
      window.removeEventListener("contactTypeChange", handleContactTypeChange);
    };
  }, [setValue, trigger]);

  return null;
};

export default useContactType;
