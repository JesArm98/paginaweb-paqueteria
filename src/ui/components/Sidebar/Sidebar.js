import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

export default function Sidebar({ isOpen }) {
  return (
    <div
      style={{
        width: isOpen ? "250px" : "0px",
        overflow: "hidden",
        background: "#124",
        color: "#fff",
        padding: isOpen ? "20px" : "0px",
        height: "100vh",
        transition: "width 0.3s ease",
        whiteSpace: "nowrap",
      }}
    >
      <List>
        {/* Perfil */}
        <Link href="/dashboard/perfil-usuario" passHref legacyBehavior>
          <ListItem button component="a">
            <ListItemText primary="Perfil" />
          </ListItem>
        </Link>

        {/* Configuración */}
        <Link href="/dashboard/configuraciones" passHref legacyBehavior>
          <ListItem button component="a">
            <ListItemText primary="Configuración" />
          </ListItem>
        </Link>

                {/* Direcciones */}
                <Link href="/dashboard/direcciones" passHref legacyBehavior>
          <ListItem button component="a">
            <ListItemText primary="Direcciones" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
