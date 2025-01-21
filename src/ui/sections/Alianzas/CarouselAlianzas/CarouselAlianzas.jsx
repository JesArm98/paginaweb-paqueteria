"use client";
import { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselAlianzas.css";

// Imports de logos con rutas relativas
const logo1 = "/images/Carrousel/ups.jpeg";
const logo2 = "/images/Carrousel/pmm-paqueteria-mensajeria.jpeg";
const logo3 = "/images/Carrousel/fedex.jpeg";
const logo4 = "/images/Carrousel/estafeta.jpeg";
const logo5 = "/images/Carrousel/dhl.jpeg";
const logo6 = "/images/Carrousel/paquetexpress.jpeg";
const logo7 = "/images/Carrousel/j&t-express.jpeg";
const logo8 = "/images/Carrousel/99-minutor.jpeg";
import Image from "next/image";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

const names = [
  "UPS",
  "PMM Paqueteria + Mensajeria",
  "FedEx",
  "Estafeta",
  "DHL",
  "Paquetexpress",
  "J&T Express",
  "99 Minutos",
];

const ImageCarousel = () => {
  const settings = {
    infinite: true,
    speed: 6000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    adaptiveHeight: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div
      aria-label="Galería de logotipos de empresas"
      className="carousel-container"
    >
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="carousel-item">
            <Image
              width={60}
              height={30}
              src={logo}
              alt={`Logotipo de ${names[index]}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(ImageCarousel);
