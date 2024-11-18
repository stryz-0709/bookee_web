import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorPubCard = ({ item, type }) => {
  return (
    <a 
    href={type === "author" ? `/author/${item.id}` : `/publisher/${item.name}`} 
      className="text-decoration-none"
      style={{ color: "inherit" }}
    >
      <div className="card hover-zoom text-center mt-2" style={{ border: "none", maxWidth: "250px" }}>
        {/* Author Image */}
        <div className="position-relative">
        <div className="col-12 align-items-center">
            <img
              src={item.image || "/img/placeholder.png"}
              alt={item.name}
              className="rounded-circle img-fluid"
              style={{ maxWidth: '80px', height: 'auto' }}
            />
          </div>

        </div>

        {/* Author Name */}
        <div className="card-body text-primary">
          <h6 
            className="card-title"
            style={{ 
              fontSize: "clamp(16px, 2vw, 16px)",
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </h6>
        </div>
      </div>
    </a>
  );
};

export default AuthorPubCard;