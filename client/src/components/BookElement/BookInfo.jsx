import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cartReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const BookInfo = ({ book }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const isInWishlist = wishlist.map((item) => item.id).includes(book[0]?.id);


  {/* Fetch reviews */ }
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/reviews?populate=*&filters[book][documentId][$eq]=${book[0].documentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
          }
        );

        const data = response.data.data;
        setReviews(data);

        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let totalRating = 0;

        data.forEach((review) => {
          const rating = review.rating;
          counts[rating] = (counts[rating] || 0) + 1;
          totalRating += rating;
        });

        setStarCounts(counts);
        setTotalReviews(data.length);
        setAverageRating(data.length > 0 ? (totalRating / data.length).toFixed(1) : 0);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [book]);


  {/* Fetch wishlist */ }
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const meResponse = await axios.get(
          "http://localhost:1337/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const userId = meResponse.data.id;

        const response = await axios.get(
          `http://localhost:1337/api/users/${userId}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
          }
        );

        setWishlist(response.data.wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleToggleWishlist = async () => {
    try {
      const jwt = localStorage.getItem("jwt");

      const meResponse = await axios.get(
        "http://localhost:1337/api/users/me?populate=*",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const userId = meResponse.data.id;

      const bookId = book[0]?.id;
      const isInWishlist = wishlist.some((item) => item.id === bookId);

      let updatedWishlist;

      if (isInWishlist) {
        updatedWishlist = wishlist.filter((item) => item.id !== bookId);
      } else {
        updatedWishlist = [...wishlist, book[0]];
      }

      await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        { wishlist: updatedWishlist },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      alert("An error occurred while updating your wishlist.");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill().map((_, i) => <FaStar key={i} className="text-warning" />)}
        {halfStar === 1 && <FaStarHalfAlt className="text-warning" />}
        {Array(emptyStars).fill().map((_, i) => <FaRegStar key={i} className="text-warning" />)}
      </>
    );
  };

  return (
    <div className="bg-none">
      {/* Product Title */}
      <h2>
        <strong>{book[0]?.title}</strong>
      </h2>

      {/* Product Details */}
      <div className="row my-3">
        {/* Author Information */}
        <div className="col-6">
          <p className="text-start m-0">
            <strong>Tác giả:</strong>{" "}
            {book[0]?.authors && book[0]?.authors.length > 0 ? (
              book[0]?.authors.map((author, index) => (
                <span key={author.id}>
                  <span
                    onClick={() => navigate(`/search?query=${encodeURIComponent(author.name)}`)} // Navigate to BookSearch with author name
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {author.name}
                  </span>
                  {index < book[0]?.authors.length - 1 && ", "}
                </span>
              ))
            ) : (
              "Unknown"
            )}
          </p>
        </div>

        {/* Publisher Information */}
        <div className="col-6">
          <p className="text-start m-0">
            <strong>Nhà xuất bản:</strong>{" "}
            {book[0]?.publisher?.name ? (
              <span
                onClick={() => navigate(`/search?query=${encodeURIComponent(book[0].publisher.name)}`)} // Navigate to BookSearch with publisher name
                style={{ cursor: "pointer", color: "blue" }}
              >
                {book[0].publisher.name}
              </span>
            ) : (
              "Unknown"
            )}
          </p>
        </div>
      </div>

      {/* Star Rating and Sales Count */}
      <div className="d-flex align-items-center my-3">
        {/* Ratings and Reviews */}
        <div className="d-flex align-items-center my-3">
          {renderStars(averageRating)}
          <span className="ms-2">{totalReviews} đánh giá</span>
        </div>
        <span className="ms-2">|</span>
        <span className="ms-2">{book[0]?.total_sold || 0} đã bán</span>
        <span className="ms-2">|</span>
        <span className="ms-2">{book[0]?.stock_quantity || 0} còn lại</span>
      </div>

      {/* Product Prices Inline */}
      <div className="d-flex align-items-center my-3">
        <span
          className="text-danger me-3 d-inline-block fw-bold"
        >
          <h3><strong>{new Intl.NumberFormat('vi-VN').format(book[0]?.price || 0)} ₫</strong></h3>
        </span>
        <div
          className="text-center text-muted"
          style={{ textDecoration: "line-through", fontSize: "14px" }}
        >
          <strong>
            <del>{new Intl.NumberFormat('vi-VN').format(book[0]?.old_price || 0)} ₫</del>
          </strong>
        </div>
        {book[0]?.old_price > book[0]?.price && (
          <span className="badge bg-danger ms-2">
            {`-${Math.round(((book[0]?.old_price - book[0]?.price) / book[0]?.old_price) * 100)}%`}
          </span>
        )}
      </div>

      {/* Quantity Selector and Add to Cart Button */}
      <div className="d-flex align-items-center justify-content-start flex-wrap my-3">
        {/* Quantity Selector */}
        <div className="input-group me-3 align-items-center" style={{ width: "100px" }}>
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
        {book[0]?.stock_quantity > 0 && (
          <button
            className="btn btn-warning me-3"
            onClick={() =>
              dispatch(
                addToCart({
                  id: book[0]?.id,
                  documentId: book[0]?.documentId,
                  title: book[0]?.title,
                  desc: book[0]?.description,
                  price: book[0]?.price,
                  img: book[0]?.img[0]?.url,
                  quantity,
                })
              )
            }
          >
            <AddShoppingCartIcon />
          </button>
        )}

        {/* Add or Remove from Wishlist Button */}
        <button
          className={`btn ${isInWishlist ? "btn-danger" : "btn-outline-danger"
            } text-decoration-none`}
          onClick={handleToggleWishlist}
          style={{ whiteSpace: "nowrap" }} // Prevent text wrapping
        >
          {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
    </div>
  );
};

export default BookInfo;