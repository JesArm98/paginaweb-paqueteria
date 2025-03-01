"use client"; // 🔥 Solo se ejecuta en el cliente

import useClearLocalStorageOnFirstLoad from "../components/useClearLocalStorage";

export default function ClientInitializer() {
  useClearLocalStorageOnFirstLoad();
  return null; // No renderiza nada
}
