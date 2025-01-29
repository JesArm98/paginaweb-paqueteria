"use client";

import React, { createContext, useState, useContext } from "react";

const EmailContext = createContext({
  emailConfirmado: false,
  setEmailConfirmado: () => {},
  emailUsuario: "",
  setEmailUsuario: () => {},
  mostrarResultados: false,
  setMostrarResultados: () => {},
});

export function EmailProvider({ children }) {
  const [emailConfirmado, setEmailConfirmado] = useState(false);
  const [emailUsuario, setEmailUsuario] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  return (
    <EmailContext.Provider
      value={{
        emailConfirmado,
        setEmailConfirmado,
        emailUsuario,
        setEmailUsuario,
        mostrarResultados,
        setMostrarResultados,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  return useContext(EmailContext);
} 