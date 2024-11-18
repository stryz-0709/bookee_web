import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const BookInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={i} className="text-warning" />
          ))}
        {halfStar === 1 && <FaStarHalfAlt className="text-warning" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={i} className="text-warning" />
          ))}
      </>
    );
  };

  return (
    <div className="bg-none">
      {/* Product Title */}
      <h1>
        <strong>{product?.title || "Fundamentals of Database Systems"}</strong>
      </h1>

      {/* Product Details */}
      <div className="row my-3">
        {/* Author Information */}
        <div className="col-6">
          <p className="text-start m-0">
            <strong>Tác giả:</strong>{" "}
            {product?.author || "Ramez Elmasri, Shamkant Navathe"}
          </p>
        </div>
        {/* Publisher Information */}
        <div className="col-6">
          <p className="text-start m-0">
            <strong>Nhà xuất bản:</strong> {product?.publisher || "Pearson"}
          </p>
        </div>
      </div>

      {/* Star Rating and Sales Count */}
      <div className="d-flex align-items-center my-3">
        {product?.rating ? (
          <>
            {renderStars(product.rating)}
            <span className="ms-2">{product.reviewCount} đánh giá</span>
          </>
        ) : (
          <>
            {renderStars(0)}
            <span className="ms-2">0 đánh giá</span>
          </>
        )}
        <span className="ms-2">|</span>
        <span className="ms-2">{product?.salesCount || 0} đã bán</span>
      </div>

      {/* Product Prices Inline */}
      <div className="d-flex align-items-center my-3">
        <span className="text-danger me-3 d-inline-block fw-bold" style={{ fontSize: "32px" }}>{product?.price || "<Value>"} ₫</span>
        <div className="text-center text-muted" style={{ textDecoration: "line-through", fontSize: "14px" }}>
          <strong><del>{product?.oldPrice || "<Value>"} ₫</del></strong>
        </div>
        <span className="badge bg-danger ms-2">-0%</span>
      </div>

      {/* Quantity Selector and Add to Cart Button */}
      <div className="d-flex align-items-center my-3">
        {/* Quantity Selector */}
        <div className="input-group me-3 align-items-center" style={{ width: "120px" }}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            disabled
            readOnly
            style={{
              backgroundColor: "#FFF",
              border: "1px solid #6C757D",
              borderLeft: "none",
              borderRight: "none",
              borderRadius: "0",
              boxShadow: "none",
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn btn-warning text-light me-3"
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                desc: product.desc,
                price: product.price,
                img: product.img?.data?.attributes?.url,
                quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon /> <small>Add to Cart</small>
        </button>

        {/* Add to Wish List Button */}
        <button className="btn btn-outline-danger text-decoration-none">
          <FavoriteBorderIcon />
          <small> Add to Wish List</small>
        </button>
      </div>
    </div>
  );
};

export default BookInfo;