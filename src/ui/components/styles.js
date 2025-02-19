export const buttonStyle = {
    display: { xs: "none", md: "flex" },
    color: "#FFFFFF",
    padding: " 8px 16px 8px 16px",
    transition: "background-color 0.3s ease",
    borderColor: "transparent",
    borderRadius: "30px",
    height: "40px",
    textTransform:"none",
    textDecoration:"none",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.31)",
      transform: "scale(1.1)",
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
    },
  }