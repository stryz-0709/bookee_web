import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookPreview.scss";

const BookPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollInterval = 10000; // Interval in milliseconds (3 seconds)
  const thumbnailRefs = useRef([]);

  const images = [
    "/img/book/book1.png",
    "/img/book/book2.png",
    "/img/book/book3.png",
    "/img/book/book4.png",
    "/img/book/book1.png",
    "/img/book/book4.png",
    "/img/book/book4.png",
    "/img/book/book4.png",
    "/img/book/book4.png",
  ];

  // Function to change the active slide
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [images.length]);

    // Scroll the active thumbnail into view
    useEffect(() => {
        if (thumbnailRefs.current[activeIndex]) {
        const container = thumbnailRefs.current[activeIndex].parentNode;
        const selectedThumbnail = thumbnailRefs.current[activeIndex];
        const offsetLeft = selectedThumbnail.offsetLeft - container.offsetLeft;
        const scrollPosition = offsetLeft - container.clientWidth / 2 + selectedThumbnail.clientWidth / 2;
    
        container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
        });
        }
    }, [activeIndex]);

  return (
    <div className="col-12 text-center mb-3">
      {/* Main Image Carousel */}
      <div id="Carousel" className="carousel slide">
        <div className="carousel-inner">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            >
              <img className="d-block w-100" src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          onClick={() => handleSelect((activeIndex - 1 + images.length) % images.length)}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          onClick={() => handleSelect((activeIndex + 1) % images.length)}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {/* Thumbnails - Bottom Row */}
      <div
        className="d-flex justify-content-center align-items-center my-3 overflow-auto"
        style={{
            height: "140px",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            padding: "10px 0", 
        }}
      >
        {images.map((src, index) => (
          <button
            className="hover-zoom"
            key={index}
            type="button"
            ref={(el) => (thumbnailRefs.current[index] = el)}
            onClick={() => handleSelect(index)}
            aria-label={`Slide ${index + 1}`}
            style={{
              border: index === activeIndex ? "2px solid #007bff" : "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              display: "inline-block",
              flexShrink: 0,
              margin: "0 5px",
            }}
          >
            <img
              src={src}
              className="d-block shadow-1-strong rounded img-fluid"
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookPreview;