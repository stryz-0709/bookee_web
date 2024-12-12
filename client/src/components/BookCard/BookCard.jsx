import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const BookCard = ({ book }) => {
  // console.log(book);
  // console.log(process.env.REACT_APP_UPLOAD_URL + book[0]?.img[0]?.url);

  const images = book?.img?.map((image) => process.env.REACT_APP_UPLOAD_URL + image.url) || ["/img/placeholder.png"];
  // console.log(images);

  return (
    <a
      href={`/book/${book.id}`} // Regular anchor tag with href
      className="text-decoration-none" // Optionally remove default anchor styles
      target="_self" // Optional: Open in the same tab (default behavior)
    >
      <div className="card hover-zoom" style={{ border: "none", maxWidth: "240px" }}>
        {/* Book Image */}
        <div
          className="position-relative"
          style={{
            width: "100%", // Responsive width
            paddingTop: "120%", // 4:3 aspect ratio flipped (3/4 = 0.75, so 4/3 = 1.3333)
            position: "relative", // Required for inner image positioning
          }}
        >
          <img
            src={images[0] || "/img/placeholder.png"}
            alt="Book Preview"
            className="card-img-top img-fluid"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              border: "5px solid #b6222e",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "#f7f7f7",
              objectFit: "fill", // Ensures image fills container properly
            }}
          />
        </div>

        {/* Product Details */}
        <div className="card-body p-0">
          <h6
            className="card-title mt-1 mb-0 text-left"
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
            {book?.title}
          </h6>


          {/* Pricing Section */}
          <div className="text-left">
            <span
              className="text-danger fw-bold"
              style={{
                whiteSpace: "nowrap",
                fontSize: "clamp(0.5rem, 1vw + 0.5rem, 1rem)"
              }}
            >
              {new Intl.NumberFormat('vi-VN').format(book?.price || 0)} đ
            </span>
            {book?.old_price > book?.price && (
              <span className="badge bg-danger mb-1">
                {`-${Math.round(((book?.old_price - book?.price) / book?.old_price) * 100)}%`}
              </span>
            )}
            
          </div>
          <div
            className="text-left text-muted"
            style={{
              textDecoration: "line-through",
              whiteSpace: "nowrap",
              fontSize: "clamp(0.5rem, 1vw + 0.4rem, 1rem)"
            }}
          >
            {new Intl.NumberFormat('vi-VN').format(book?.old_price || 0)} đ
          </div>

          {/* Sales Info */}
          <span
            className="text-left mt-2"
            style={{
              whiteSpace: "nowrap",
              fontSize: "clamp(0.5rem, 1vw + 0.4rem, 1rem)"
            }}
          >
            Đã bán {book?.total_sold}
          </span>
        </div>
      </div>
    </a>
  );
};

export default BookCard;