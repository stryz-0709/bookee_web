import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookCard from "../../components/BookCard/BookCard";
import "./FeaturedBooks.scss"

const FeaturedBooks = ({ books }) => {
  // Limit the number of books to a maximum of 4
  const featuredBooks = books.slice(0, 20);

  // Calculate the number of slides needed (8 books per slide)
  const numSlides = Math.ceil(featuredBooks.length / 6);

  return (
    <div className="featuredBooks container my-5">
      <h5><strong>Sản Phẩm Liên Quan</strong></h5>
  
      {/* Flex Container for Carousel and Buttons */}
      <div className="d-flex align-items-center justify-content-center">
        
        {/* Previous Button */}
        <button
          className="carousel-control-prev col-1"
          type="button"
          data-bs-target="#featuredBooksCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
  
        {/* Carousel */}
        <div id="featuredBooksCarousel" className="carousel slide flex-grow-1 col-10" data-bs-ride="carousel">
          <div className="carousel-inner">
            {Array.from({ length: numSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
              >
                <div className="row row-cols-3 row-cols-sm-3 row-cols-lg-6 g-4 px-3 pt-4 pb-4">
                  {featuredBooks
                    .slice(slideIndex * 6, slideIndex * 6 + 6)
                    .map((book, idx) => (
                      <div className="col" key={idx}>
                        <BookCard book={book} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Next Button */}
        <button
          className="carousel-control-next  col-1"
          type="button"
          data-bs-target="#featuredBooksCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedBooks;