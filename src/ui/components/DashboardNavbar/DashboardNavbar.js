"use client";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Icono de menú
import { useRouter } from "next/navigation";

export default function DashboardNavbar({ toggleSidebar }) {
  // Simulación de usuario
  const user = true; 
  const logout = () => console.log("Cerrar sesión");
  
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        {/* Botón de menú para mostrar/ocultar Sidebar */}
        <IconButton color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Cuenta
        </Typography>
        {user && (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hola
            </Typography>
            <Button color="inherit" onClick={() => { logout(); router.push("/"); }}>
              Cerrar sesión
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
