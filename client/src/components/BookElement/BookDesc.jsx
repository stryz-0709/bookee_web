import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const BookDesc = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  useEffect(() => {
    // Check if the content height exceeds the limit to show the "See More" button
    const contentElement = document.getElementById("productDescription");
    if (contentElement.scrollHeight > 300) {
      setShouldShowButton(true);
    }
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <h5><strong>Mô tả Sản phẩm</strong></h5>
      {/* Product Description */}
      <div className="position-relative">
        {/* Product Description with max-height */}
        <div
          id="productDescription"
          className={`overflow-hidden ${isExpanded ? "" : "collapsed"}`}
          style={{ maxHeight: isExpanded ? "none" : "300px", transition: "max-height 0.5s ease" }}
        >
          <p style={{ textAlign: "justify", whiteSpace: "pre-line" }}>{book[0]?.description}</p>
        </div>

        {/* Gradient Overlay */}
        {!isExpanded && shouldShowButton && (
          <div
            className="position-absolute w-100"
            style={{
              bottom: 0,
              height: "40px",
              background: "linear-gradient(to top, white, rgba(255, 255, 255, 0))",
            }}
          ></div>
        )}

        {/* Toggle Button */}
        {shouldShowButton && (
          <div className="text-center mt-3">
            <button
              className="btn btn-link text-primary"
              onClick={handleToggle}
            >
              {isExpanded ? (
                <>
                  Rút gọn
                </>
              ) : (
                <>
                  Xem thêm 
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDesc;