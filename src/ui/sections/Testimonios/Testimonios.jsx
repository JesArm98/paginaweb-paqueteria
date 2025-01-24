import React from "react";
import { Box, Typography, Card, Avatar, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonios } from "@/data/data";

const Testimonios = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundColor: "white",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          color: "#07417B",
          fontWeight: 700,
          fontSize: { xs: "1.5rem", md: "2.5rem" },
        }}
      >
        Lo que dicen nuestros clientes
      </Typography>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        style={{ padding: "20px 10px 50px 10px" }}
      >
        {testimonios.map((testimonio, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                p: 3,
                borderRadius: "15px",
                height: "100%",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 2,
                  backgroundColor: "#07417B",
                }}
              >
                {testimonio.nombre.charAt(0)}
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {testimonio.nombre}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {testimonio.cargo} en {testimonio.empresa}
              </Typography>
              <Rating value={testimonio.rating} readOnly sx={{ mb: 2 }} />
              <Typography
                sx={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#666",
                }}
              >
                "{testimonio.comentario}"
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonios;
