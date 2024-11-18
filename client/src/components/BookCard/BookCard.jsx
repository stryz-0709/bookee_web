import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BookCard = ({ book }) => {
  return (
    <a 
      href={`/book/${book.id}`} 
      className="text-decoration-none"
      style={{ color: "inherit" }}
    >
      <div className="card hover-zoom" style={{ border: "none", maxWidth: "240px" }}>
        {/* Book Image */}
        <div className="position-relative">
          <img
            src="/img/book/book1.png"
            alt="Book Preview"
            className="card-img-top img-fluid"
            style={{
              border: "5px solid #b6222e",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "#f7f7f7",
            }}
          />
        </div>

        {/* Product Details */}
        <div className="card-body p-0">
        <h6 
          className="card-title mt-3 mb-2 text-left"
          style={{
            fontSize: "clamp(0.5rem, 1vw + 0.5rem, 1rem)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit to 2 lines
            lineHeight: "1.5em", // Adjust line height as needed
            height: "3em", // Fixed height (2 lines * lineHeight)
          }}
        >
          {book.title}
        </h6>
      

          {/* Pricing Section */}
          <div className="text-left">
          <span 
            className="text-danger fw-bold me-3"
            style={{ 
              whiteSpace: "nowrap", 
              fontSize: "clamp(0.8rem, 1vw + 0.5rem, 1.2rem)" 
            }}
          >
            {book.price} đ
          </span>
            <span 
              class="badge bg-danger mb-2"
            >
              -18%
            </span>
          </div>
          <div 
            className="text-left text-muted" 
            style={{ 
              textDecoration: "line-through", 
              whiteSpace: "nowrap", 
              fontSize: "clamp(12px, 2vw, 14px)" 
            }}
          >
            182.000 đ
          </div>

          {/* Sales Info */}
          <span 
            className="text-left mt-2"
            style={{ 
              whiteSpace: "nowrap", 
              fontSize: "clamp(0.6rem, 1vw + 0.5rem, 1rem)" 
            }}
          >
            Đã bán {book.sold}
          </span>
        </div>
      </div>
    </a>
  );
};

export default BookCard;