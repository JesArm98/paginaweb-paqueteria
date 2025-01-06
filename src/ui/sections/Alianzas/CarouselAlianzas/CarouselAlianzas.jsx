"use client";
import { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselAlianzas.css";

// Imports de logos con rutas relativas
const logo1 = "/images/Carrousel/logoDanfos.svg";
const logo2 = "/images/Carrousel/logo-alfalaval.svg";
const logo3 = "/images/Carrousel/aquestria.svg";
const logo4 = "/images/Carrousel/emerson.svg";
const logo5 = "/images/Carrousel/genebre.svg";
const logo6 = "/images/Carrousel/jw.svg";
const logo7 = "/images/Carrousel/logo_walworth.svg";
const logo8 = "/images/Carrousel/miura.svg";
const logo9 = "/images/Carrousel/pexgol.svg";
const logo10 = "/images/Carrousel/rizzotto.svg";
const logo11 = "/images/Carrousel/rotoplas_logo.svg";
const logo12 = "/images/Carrousel/sulzer.svg";
const logo13 = "/images/Carrousel/teadit.svg";
const logo14 = "/images/Carrousel/tenaris.svg";
const logo15 = "/images/Carrousel/wago-1.svg";
import Image from "next/image";

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
];

const names = [
  "Danfos",
  "Alfalaval",
  "Aquestia",
  "Emerson",
  "Genebre",
  "notiene",
  "Walworth",
  "Miuraboiler",
  "Pexgol",
  "Rizzotto",
  "Rotoplas",
  "Sulzer",
  "Teadit",
  "Tenaris",
  "Wago",
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
