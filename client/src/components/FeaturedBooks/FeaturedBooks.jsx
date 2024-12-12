import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookCard from "../../components/BookCard/BookCard";
import "./FeaturedBooks.scss";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";

const FeaturedBooks = ({ genre }) => {
  // console.log(genre);
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const carouselId = `featuredBooksCarousel-${uuidv4()}`;

  useEffect (() => {
    const fetchData = async () => {
      try {
        const res2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/books?filters[genre][$contains]=${genre}&populate=*`, // Use `$contains` to filter for arrays
          {
            headers: {
              Authorization: `bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
          }
        );

        if (res2.data.data.length > 0) {
          setData(res2.data.data);
          // console.log("Filtered Books:", res2.data.data);
        } else {
          throw new Error("No books found with the desired genre in API call");
        }
      } catch (err) {
        console.error("Error fetching books:", err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
}, [genre]);

  // Ensure data is an array before slicing
  const featuredBooks = Array.isArray(data) ? data.slice(0, 20) : [];
  const numSlides = Math.ceil(featuredBooks.length / 6);

    // console.log(featuredBooks);
  return (
    <div className="featuredBooks container">
      <h5><strong>{genre}</strong></h5>
  
      <div className="d-flex align-items-center justify-content-center">
        
        <button
          className="carousel-control-prev col-1"
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
  
        <div
          id={carouselId}
          className="carousel slide flex-grow-1 col-10"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {Array.from({ length: numSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
              >
                <div className="row row-cols-3 row-cols-sm-3 row-cols-lg-6 g-4 px-3 pt-4 pb-4">
                  {featuredBooks
                    .slice(slideIndex * 6, slideIndex * 6 + 6)
                    .map((book) => (
                      <div className="col" >
                        <BookCard book={book}/>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <button
          className="carousel-control-next col-1"
          type="button"
          data-bs-target={`#${carouselId}`}
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