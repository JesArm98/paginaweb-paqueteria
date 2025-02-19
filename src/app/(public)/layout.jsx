import Navbar from "@/ui/sections/Navbar/Navbar";
import FloatButton from "@/ui/components/FloatButton/FloatButton";
import LoginDialog from "@/ui/components/LoginDialog/LoginDialog";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar /> {/* 👈 Se agrega solo en rutas públicas */}
      <LoginDialog />
      <FloatButton />
      {children}
    </>
  );
}
