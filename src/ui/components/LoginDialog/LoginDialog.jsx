"use client";

import { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./LoginDialog.css";
import axios from "axios";
import useSnackbar from "@/hooks/useSnackbar";
import { UserContext } from "@/context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { initializeApp } from "firebase/app";
import CloseIcon from "@mui/icons-material/Close";
{
  /*import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";*/
}
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

// Configuración de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDV1Qs9K94fDeGmqSZsh95OTRGM8Cci7ZQ",
//   authDomain: "tvn-api-store.firebaseapp.com",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

const LoginDialog = ({ open, onClose, setOpen }) => {
  const { setUserData, setIsLoggedIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState("flip-card");
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [olvidar, setOlvidar] = useState(false);
  const [emailPassword, setEmailPassword] = useState("");

  const handlePasswordChange = (event) => {
    setEmailPassword(event.target.value);
  };

  {
    /*useEffect(() => {
    // Recuperar datos del localStorage
    const storedUserData = localStorage.getItem("userData");
    const storedIdToken = localStorage.getItem("idToken");

    if (storedUserData && storedIdToken) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);*/
  }

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  // Nueva función para centralizar el cierre del modal
  const handleClose = () => {
    setOpen(false); // Cierra el modal
    if (onClose) onClose(); // Llama a la función onClose si existe
  };

  // Esquema de validación para login
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Esquema de validación para registro
  const registerValidationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .required("El nombre es obligatorio"),
    lastName: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "La contraseña debe contener al menos una letra y un número"
      )
      .required("La contraseña es obligatoria"),
  });

  // Formik para login
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // Tu lógica de login aquí
      } catch (error) {
        console.error(error);
        showSnackbar("Error al iniciar sesión", "error");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Formik para registro
  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // Tu lógica de registro aquí
      } catch (error) {
        console.error(error);
        showSnackbar("Error al registrarse", "error");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleLoginSuccess = async (userCredential) => {
    const idToken = await userCredential.user.getIdToken();
    localStorage.setItem("idToken", idToken);

    const response = await axios.get(
      "https://store.tuvanosa.com/WS/TuvanosaMiddleware/Middleware/getClient",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );

    const userData = response.data;
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoading(false);
    handleClose(); // Llama a handleClose para cerrar el modal
    showSnackbar(
      `Hola, ${userData.nombre}. Te damos la bienvenida!`,
      "success"
    );

    setUserData(userData);
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();
      localStorage.setItem("idToken", idToken);

      // Lanzar la petición /createClientByProvider
      await axios.post(
        "https://store.tuvanosa.com/WS/TuvanosaMiddleware/MiddlewarePost/createClientByProvider",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      // Ahora lanzar la petición getClient
      const response = await axios.get(
        "https://store.tuvanosa.com/WS/TuvanosaMiddleware/Middleware/getClient",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const userData = response.data;

      localStorage.setItem("userData", JSON.stringify(userData));

      showSnackbar(
        `Hola, ${user.displayName}. Te damos la bienvenida!`,
        "success"
      );

      setUserData(userData);
      setIsLoggedIn(true);
      handleClose(); // Usa la función centralizada
    } catch (error) {
      showSnackbar(`${error.message}`, "error");
    }
  };

  // LOGIN CON EL CREATE USUARIO
  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    phone: Yup.string()
      .length(10, "El teléfono debe tener exactamente 10 caracteres")
      .required("Requerido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Requerido"),
  });

  const formikRegister = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      setIsLoading(true);

      const requestData = {
        nombre: `${values.firstName} ${values.lastName}`,
        contrasena: values.password,
        email: values.email,
        telefono: values.phone,
      };

      axios
        .post(
          "https://store.tuvanosa.com/WS/TuvanosaMiddleware/MiddlewarePost/createClient",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        )
        .then(() => {
          setIsLoading(false);
          handleClose(); // Llama a handleClose para cerrar el modal
          setIsFlipped("flip-card");
          showSnackbar(
            `¡Hola, ${values.firstName}! Tu cuenta ha sido creada exitosamente. Se ha enviado un correo de verificación a ${values.email}.`,
            "success"
          );
        })
        .catch((error) => {
          setIsLoading(false);
          handleClose(); // Llama a handleClose para cerrar el modal
          showSnackbar(`${error.response.data.error.message}`, "error");
        });
    },
  });

  const handleFormSubmit = () => {
    setIsLoading(true);

    axios
      .post(
        "https://store.tuvanosa.com/WS/TuvanosaMiddleware/MiddlewarePost/forgotPassword",
        { email: emailPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        showSnackbar(`${response.data.message}`, "success");
        handleClose(); // Usa la función centralizada
        setOlvidar(false);
      })
      .catch((error) => {
        showSnackbar(`${error.response.data.error.message}`, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose} // Usa la función centralizada aquí también
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            overflow: "hidden",
            position: "relative",
            margin: 0,
            padding: 12,
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            minWidth: { xs: "90%", md: "auto" },
          },
        }}
      >
        <div className={isFlipped}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              {olvidar === false ? (
                <Box>
                  <CloseIcon
                    onClick={handleClose} // Usa la función centralizada
                    sx={{
                      position: "absolute",
                      right: 14,
                      top: 14,
                      fontSize: "24px",
                      color: "#009FE3",
                      cursor: "pointer",
                    }}
                  />
                  <DialogTitle
                    sx={{
                      marginTop: "14px",
                      display: "flex",
                      justifyContent: "center",
                      color: "#002C72",
                      fontWeight: "Bold",
                      fontSize: { xs: "20px", md: "26px" },
                    }}
                  >
                    Iniciar sesión
                  </DialogTitle>
                  <DialogContent>
                    <form onSubmit={loginFormik.handleSubmit}>
                      <TextField
                        sx={{
                          fontSize: { xs: "1.75rem", md: "0.875rem" },
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                          "@media (max-width: 600px)": {
                            fontSize: "0.75rem",
                            "& .MuiOutlinedInput-input": { padding: "8px" },
                          },
                        }}
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label="Correo de usuario*"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...loginFormik.getFieldProps("email")}
                        error={
                          loginFormik.touched.email &&
                          Boolean(loginFormik.errors.email)
                        }
                        helperText={
                          loginFormik.touched.email && loginFormik.errors.email
                        }
                      />
                      <TextField
                        sx={{
                          fontSize: { xs: "1.75rem", md: "0.875rem" },
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                          "@media (max-width: 600px)": {
                            fontSize: "0.75rem",
                            "& .MuiOutlinedInput-input": { padding: "8px" },
                          },
                        }}
                        margin="dense"
                        label="Contraseña*"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        {...loginFormik.getFieldProps("password")}
                        error={
                          loginFormik.touched.password &&
                          Boolean(loginFormik.errors.password)
                        }
                        helperText={
                          loginFormik.touched.password &&
                          loginFormik.errors.password
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Visibilidad de contraseña"
                                onClick={() => handleTogglePasswordVisibility()}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#002C72",
                            fontSize: { xs: "12px", md: "14px" },
                            marginTop: "36px",
                            textAlign: "center",
                            width: { xs: "100%", md: "80%" },
                            paddingBottom: "24px",
                          }}
                        >
                          Al continuar, aceptas las{" "}
                          <a
                            href="/tienda/terminos-condiciones"
                            style={{ color: "#009FE3", textDecoration: "none" }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            condiciones de uso
                          </a>{" "}
                          y el{" "}
                          <a
                            href="/tienda/aviso-de-privacidad"
                            target="_blank"
                            style={{ color: "#009FE3", textDecoration: "none" }}
                          >
                            {" "}
                            aviso de privacidad
                          </a>{" "}
                          de Tuvanosa
                        </Typography>
                      </Box>

                      <Button
                        aria-label="Iniciar sesión"
                        fullWidth
                        disabled={isLoading || !loginFormik.isValid}
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          mb: 1,
                          color: "#FFFFFF",
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                          width: { xs: "50%" },
                          borderRadius: "25px",
                          mt: 1,
                          margin: "auto",
                          textTransform: "none",
                          fontSize: { xs: "14px", md: "20px" },
                          zIndex: 1001,
                          fontWeight: "400",
                          padding: { xs: 0.8, md: 1.4 },

                          backgroundColor: "#009FE3",
                          "&:hover": { backgroundColor: "#002C72" },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Iniciar sesión"
                        )}
                      </Button>
                    </form>

                    {isFlipped !== "flip-card" ? null : (
                      <Button
                        aria-label="Continuar con Google"
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        sx={{
                          color: "#FFFFFF",
                          position: "relative",
                          display: "none",
                          justifyContent: "center",
                          borderRadius: "25px",
                          mt: 1,
                          textTransform: "none",
                          fontSize: "20px",
                          backgroundColor: "black",
                          zIndex: 1001,
                          fontWeight: "Bold",
                          padding: { xs: 0.8, md: 1.4 },
                          "&:hover": { backgroundColor: "#002C72" },
                        }}
                      >
                        <img
                          src={"/images/google.svg"}
                          alt="Icono inicio Google"
                          style={{
                            top: 7,
                            left: 6,
                            position: "absolute",
                            borderRadius: "50%",
                            width: "34px",
                          }}
                        />
                        <Typography
                          fontWeight={"400"}
                          fontFamily={"Montserrat"}
                        >
                          Continuar con Google
                        </Typography>
                      </Button>
                    )}

                    <Box
                      sx={{
                        marginTop: "32px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        aria-label="Olvidaste tu contraseña"
                        onClick={() => setOlvidar(true)}
                        sx={{
                          color: "#009FE3",
                          textTransform: "none",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        ¿Olvidaste tu contraseña?
                      </Button>
                      <Button
                        aria-label="¿No tienes cuenta? Crea una aquí"
                        onClick={() => setIsFlipped("flip-card2")}
                        sx={{
                          color: "#009FE3",
                          textTransform: "none",
                          fontSize: { xs: "12px", md: "14px" },
                        }}
                      >
                        ¿No tienes cuenta? Crea una aquí
                      </Button>
                    </Box>
                  </DialogContent>
                </Box>
              ) : (
                <Box sx={{ padding: "32px" }}>
                  {" "}
                  <CloseIcon
                    onClick={handleClose} // Usa la función centralizada
                    sx={{
                      position: "absolute",
                      right: 14,
                      top: 14,
                      fontSize: "24px",
                      color: "#009FE3",
                      cursor: "pointer",
                    }}
                  />
                  <DialogTitle
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#002C72",
                      fontWeight: "Bold",
                      fontSize: { xs: "20px", md: "26px" },
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      marginTop: 2,
                    }}
                  >
                    Olvidaste tu contraseña?
                  </DialogTitle>
                  <Typography
                    sx={{
                      color: "#002C72",
                      fontSize: { xs: "12px", md: "14px" },
                      marginTop: "36px",
                      textAlign: "center",

                      width: "100%",
                      paddingBottom: "24px",
                    }}
                  >
                    Podemos ayudarte a recuperar tu cuenta. Por favor introduce
                    tu correo electrónico.
                  </Typography>
                  <TextField
                    id="contraseñaOlvidada"
                    label="Correo electronico"
                    sx={{
                      fontSize: { xs: "1.75rem", md: "0.875rem" },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                        "& .MuiOutlinedInput-input": { padding: "8px" },
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={emailPassword}
                    onChange={handlePasswordChange}
                    fullWidth
                  />
                  <Button
                    aria-label="Enviar correo"
                    disabled={isLoading}
                    onClick={handleFormSubmit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: "400",
                      textTransform: "none",
                      borderRadius: "25px",

                      mt: 2,
                      backgroundColor: "#009FE3",
                      "&:hover": { backgroundColor: "#002C72" },
                    }}
                  >
                    Enviar correo
                  </Button>
                  <Button
                    aria-label="Regresar"
                    onClick={() => setOlvidar(false)}
                    sx={{
                      color: "#009FE3",
                      textTransform: "none",
                      fontSize: { xs: "12px", md: "14px" },
                      marginTop: "22px",
                    }}
                  >
                    Regresar
                  </Button>
                </Box>
              )}
            </div>
            <div className="flip-card-back">
              <CloseIcon
                onClick={handleClose} // Usa la función centralizada
                sx={{
                  position: "absolute",
                  right: 14,
                  top: 14,
                  fontSize: "24px",
                  color: "#009FE3",
                  cursor: "pointer",
                }}
              />
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#002C72",
                  fontWeight: "Bold",
                  fontSize: { xs: "20px", md: "26px" },
                  paddingTop: "28px",
                }}
              >
                Crear cuenta
              </DialogTitle>
              <DialogContent sx={{ overflow: "hidden" }}>
                <form onSubmit={registerFormik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        sx={{
                          fontSize: { xs: "1.75rem", md: "0.875rem" },
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                          "@media (max-width: 600px)": {
                            fontSize: "0.75rem",
                            "& .MuiOutlinedInput-input": { padding: "8px" },
                          },
                        }}
                        margin="dense"
                        label="Nombre*"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...registerFormik.getFieldProps("firstName")}
                        error={
                          registerFormik.touched.firstName &&
                          Boolean(registerFormik.errors.firstName)
                        }
                        helperText={
                          registerFormik.touched.firstName &&
                          registerFormik.errors.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        sx={{
                          fontSize: { xs: "1.75rem", md: "0.875rem" },
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                          "@media (max-width: 600px)": {
                            fontSize: "0.75rem",
                            "& .MuiOutlinedInput-input": { padding: "8px" },
                          },
                        }}
                        margin="dense"
                        label="Apellido*"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...registerFormik.getFieldProps("lastName")}
                        error={
                          registerFormik.touched.lastName &&
                          Boolean(registerFormik.errors.lastName)
                        }
                        helperText={
                          registerFormik.touched.lastName &&
                          registerFormik.errors.lastName
                        }
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    sx={{
                      fontSize: { xs: "1.75rem", md: "0.875rem" },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                        "& .MuiOutlinedInput-input": { padding: "8px" },
                      },
                    }}
                    margin="dense"
                    label="Teléfono*"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="tel"
                    fullWidth
                    variant="outlined"
                    {...registerFormik.getFieldProps("phone")}
                    error={
                      registerFormik.touched.phone &&
                      Boolean(registerFormik.errors.phone)
                    }
                    helperText={
                      registerFormik.touched.phone &&
                      registerFormik.errors.phone
                    }
                  />
                  <TextField
                    sx={{
                      fontSize: { xs: "1.75rem", md: "0.875rem" },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                        "& .MuiOutlinedInput-input": { padding: "8px" },
                      },
                    }}
                    margin="dense"
                    label="Correo electrónico*"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="email"
                    fullWidth
                    variant="outlined"
                    {...registerFormik.getFieldProps("email")}
                    error={
                      registerFormik.touched.email &&
                      Boolean(registerFormik.errors.email)
                    }
                    helperText={
                      registerFormik.touched.email &&
                      registerFormik.errors.email
                    }
                  />
                  <TextField
                    sx={{
                      fontSize: { xs: "1.75rem", md: "0.875rem" },
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                      "@media (max-width: 600px)": {
                        fontSize: "0.75rem",
                        "& .MuiOutlinedInput-input": { padding: "8px" },
                      },
                    }}
                    margin="dense"
                    label="Contraseña*"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="password"
                    fullWidth
                    variant="outlined"
                    {...registerFormik.getFieldProps("password")}
                    error={
                      registerFormik.touched.password &&
                      Boolean(registerFormik.errors.password)
                    }
                    helperText={
                      registerFormik.touched.password &&
                      registerFormik.errors.password
                    }
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#002C72",
                        fontSize: { xs: "12px", md: "14px" },
                        marginTop: "36px",
                        textAlign: "center",
                        width: { xs: "100%", md: "80%" },
                        paddingBottom: "24px",
                      }}
                    >
                      Al registrarte, aceptas las{" "}
                      <a
                        href="/tienda/terminos-condiciones"
                        style={{ color: "#009FE3", textDecoration: "none" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        condiciones de uso
                      </a>{" "}
                      y el{" "}
                      <a
                        href="/tienda/aviso-de-privacidad"
                        target="_blank"
                        style={{ color: "#009FE3", textDecoration: "none" }}
                      >
                        {" "}
                        aviso de privacidad
                      </a>{" "}
                      de Tuvanosa
                    </Typography>
                  </Box>

                  <Button
                    aria-label="Registrarse"
                    fullWidth
                    disabled={isLoading || !registerFormik.isValid}
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      fontSize: { xs: "14px", md: "16px" },
                      padding: { xs: 0.8, md: 1.4 },
                      fontWeight: "400",
                      textTransform: "none",
                      borderRadius: "25px",
                      mt: 2,
                      backgroundColor: "#009FE3",
                      "&:hover": { backgroundColor: "#002C72" },
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Registrarse"}
                  </Button>
                </form>

                <Box
                  sx={{
                    marginTop: "32px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Button
                    aria-label="¿Tienes una cuenta? Inicia sesión"
                    onClick={() => setIsFlipped("flip-card")}
                    sx={{
                      color: "#009FE3",
                      textTransform: "none",
                      fontSize: { xs: "12px", md: "14px" },
                    }}
                  >
                    ¿Ya tienes una cuenta? Inicia sesión
                  </Button>
                </Box>
              </DialogContent>
            </div>
          </div>
        </div>
      </Dialog>
      <SnackbarComponent />
    </>
  );
};

export default LoginDialog;
