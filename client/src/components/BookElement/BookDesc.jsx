import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const BookDesc = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);


  const description = "This book introduces the fundamental concepts necessary for designing, using, and implementing database systems and database applications. Our presentation stresses the fundamentals of database modeling and design, the languages and models provided by the database management systems, and database system implementation techniques.\n";

  const fullDescription = "The book is meant to be used as a textbook for a one- or two-semester course in database systems at the junior, senior, or graduate level, and as a reference book. The goal is to provide an in-depth and up-to-date presentation of the most important aspects of database systems and applications, and related technologies. It is assumed that readers are familiar with elementary programming and data-structuring concepts and that they have had some exposure to the basics of computer organization.";

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
      {/* Product Information Table */}
      {/* Product Description */}
      <h4>Fundamentals of Database Systems</h4>
      <div className="position-relative">
        {/* Product Description with max-height */}
        <div
          id="productDescription"
          className={`overflow-hidden ${isExpanded ? "" : "collapsed"}`}
          style={{ maxHeight: isExpanded ? "none" : "300px", transition: "max-height 0.5s ease" }}
        >
          <p style={{ textAlign: "justify", whiteSpace: "pre-line" }}>{description}</p>
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