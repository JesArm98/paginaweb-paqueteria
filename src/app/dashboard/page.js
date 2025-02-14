import { Typography, Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Bienvenido a tu Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Usa el menú de la izquierda para navegar por tu cuenta.
      </Typography>
    </Box>
  );
}
