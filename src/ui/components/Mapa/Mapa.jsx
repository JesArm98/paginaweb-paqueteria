"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "./Mapa.css";
import "leaflet/dist/leaflet.css";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ListItemText,
  List,
  ListItem,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Image from "next/image";
import { markers } from "@/data/dataMapa";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

let sucursalesIcon, matrizIcon, puntoIcon;

if (typeof window !== "undefined") {
  const L = require("leaflet");

  sucursalesIcon = new L.Icon({
    iconUrl: "/images/Mapa/sucursales_location.svg",
    iconSize: [30, 30],
  });

  matrizIcon = new L.Icon({
    iconUrl: "/images/Mapa/matriz_location.svg",
    iconSize: [30, 30],
  });

  puntoIcon = new L.Icon({
    iconUrl: "/images/Mapa/puntosventa_location.svg",
    iconSize: [30, 30],
  });
}

function Mapa() {
  const [expanded, setExpanded] = useState(false);

  if (typeof window === "undefined") {
    return null;
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="mapa">
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          zIndex: { xs: -1, sm: 1003 },
          margin: "2%",
          display: "flex",
          overflowY: "hidden",
          overflowX: "hidden",
          flexDirection: "column",
        }}
        className="somosDesc"
      >
        <div>
          <Image
            src="/images/Mapa/sucursales_location.svg"
            alt="SucursalesIcon"
            width={30}
            height={30}
            style={{
              width: "30px",
              height: "30px",
              float: "left",
              marginRight: "10px",
              border: "red",
            }}
          />
          <span style={{ color: "black", fontWeight: "400" }}>
            14 Sucursales.
          </span>
        </div>
        <div>
          <Image
            src="/images/Mapa/puntosventa_location.svg"
            alt="PuntosDeVentaIcon"
            width={30}
            height={30}
            style={{
              width: "30px",
              height: "30px",
              float: "left",
              marginRight: "10px",
            }}
          />
          <span style={{ color: "black", fontWeight: "400" }}>
            6 Puntos de venta.
          </span>
        </div>
        <div>
          <Image
            src="/images/Mapa/matriz_location.svg"
            alt="CorporativoIcon"
            width={30}
            height={30}
            style={{
              width: "30px",
              height: "30px",
              float: "left",
              marginRight: "10px",
            }}
          />
          <span style={{ color: "black", fontWeight: "400" }}>
            1 Corporativo.
          </span>
        </div>
      </Box>
      <MapContainer
        center={[23.22623618480235, -106.3805360936194]}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.geocode}
            icon={
              marker.type === "sucursal"
                ? sucursalesIcon
                : marker.type === "matriz"
                ? matrizIcon
                : puntoIcon
            }
          >
            <Popup className="popup">
              <Image
                src={marker.imagen}
                width={1000}
                height={760}
                style={{
                  width: "100%",
                  height: "150px",
                  display: "block",
                  margin: "auto",
                }}
                alt={marker.ciudad}
              />
              <h3
                style={{
                  textAlign: "center",
                  color: "#07417B",
                  fontSize: "20px",
                }}
              >
                SUCURSAL {marker.ciudad}
              </h3>
              <Accordion
                style={{ margin: "0px" }}
                className="accordion-root-fixed"
                expanded={expanded === `panel1-${marker.id}`}
                onChange={handleAccordionChange(`panel1-${marker.id}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="accordion-summary-fixed"
                >
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Raleway",
                    }}
                  >
                    <PhoneIcon style={{ marginRight: "8px" }} /> Teléfonos
                    Corporativos
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {marker.telefonosOne.map((telefono, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <a
                              href={telefono.tel}
                              style={{
                                color: "#333333",
                                textDecoration: "none",
                                fontFamily: "Raleway",
                              }}
                            >
                              {telefono.telDesc}
                            </a>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{ margin: "0px" }}
                className="accordion-root-fixed"
                expanded={expanded === `panel2-${marker.id}`}
                onChange={handleAccordionChange(`panel2-${marker.id}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  className="accordion-summary-fixed"
                >
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Raleway",
                    }}
                  >
                    <QueryBuilderIcon style={{ marginRight: "8px" }} /> Horarios
                    de Atención
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {marker.horarios.map((horario, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${horario.dia}: ${horario.horario}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <h4
                style={{
                  textAlign: "center",
                  marginTop: "25px",
                  fontSize: "18px",
                }}
              >
                Dirección
              </h4>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {marker.direccion}
              </p>
              <a
                href={marker.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "20px",
                  paddingBottom: "20px",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                Cómo llegar
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Mapa;
