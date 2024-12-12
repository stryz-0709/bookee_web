import React, { useState, useEffect } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "bootstrap/dist/css/bootstrap.min.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const data = [
    {
      src: "http://localhost:1337/uploads/christmas_banner_d231d93341.png",
      query: "christmas",
    },
    {
      src: "http://localhost:1337/uploads/textbook_banner_24d4fa2c02.png",
      query: "textbook",
    },
    {
      src: "http://localhost:1337/uploads/children_banner_ac077be6fd.png",
      query: "children",
    },
    {
      src: "http://localhost:1337/uploads/membership_banner_5ce5a95c47.png",
      query: "membership",
    },
    {
      src: "http://localhost:1337/uploads/conan_banner_804c2941ed.png",
      query: "conan",
    },
  ];

  const totalSlides = data.length;
  const slides = [
    { ...data[totalSlides - 1] },
    ...data,
    { ...data[0] },
  ];

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(autoScroll);
  }, []);

  useEffect(() => {
    if (currentSlide === 0) {
      setIsResetting(true);
      const timer = setTimeout(() => {
        setCurrentSlide(totalSlides);
        setIsResetting(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (currentSlide === totalSlides + 1) {
      setIsResetting(true);
      const timer = setTimeout(() => {
        setCurrentSlide(1);
        setIsResetting(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    setIsTransitioning(false);
  }, [currentSlide, totalSlides]);

  return (
    <div className="container position-relative">
      <div
        className="d-flex"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isResetting ? "none" : "transform 0.5s ease-in-out",
        }}
      >
        {slides.map((slide, index) => (
          <a
            key={index}
            href={`search?query=${slide.query}`}
            className="w-100 flex-shrink-0"
            style={{
              height: "100%",
              display: "block",
            }}
          >
            <img
              src={slide.src}
              alt={`Slide ${index}`}
              className="w-100"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
            />
          </a>
        ))}
      </div>

      <button
        className="btn btn-outline-dark position-absolute top-50 start-0 translate-middle-y"
        onClick={prevSlide}
        style={{ zIndex: 1 }}
      >
        <WestOutlinedIcon />
      </button>
      <button
        className="btn btn-outline-dark position-absolute top-50 end-0 translate-middle-y"
        onClick={nextSlide}
        style={{ zIndex: 1 }}
      >
        <EastOutlinedIcon />
      </button>
    </div>
  );
};

export default Slider;