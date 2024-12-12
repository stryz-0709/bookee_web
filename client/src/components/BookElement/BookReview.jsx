import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaThumbsUp, FaFlag } from "react-icons/fa";

const ReviewItem = ({ review, setReviews }) => {
  const handleLike = async (reviewId, currentLikes) => {
    try {
      const getReviews = await axios.get(
        `http://localhost:1337/api/reviews?populate=*`,
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );

      const review = getReviews.data.data.find((review) => review.id === reviewId);
      const documentId = review.documentId;

      if (!documentId) {
        console.error("Document ID not found for the specified review.");
        return;
      }

      const updatedLikes = currentLikes + 1;

      const putResponse = await axios.put(
        `http://localhost:1337/api/reviews/${documentId}`,
        {
          data: { likes: updatedLikes },
        },
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );

      console.log("Likes updated successfully:", putResponse.data);

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, likes: updatedLikes } : review
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };


  return (
    <div className="row mx-3">
      <div className="card p-3 col-12 w-100 mb-4">
        <div className="d-flex justify-content-between">
          <h6><strong>{review.reviewed_by?.name || "Ẩn danh"}</strong></h6>
          <span>{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < review.rating ? "#ffc107" : "#e4e5e9"}
            />
          ))}
        </div>
        <p>{review.content}</p>
        <div className="d-flex">
          <button className="btn btn-link text-danger text-decoration-none me-3"
            onClick={() => handleLike(review.id, review.likes)}
          >
            <FaThumbsUp className="me-1" /> Thích ({review.likes || 0})
          </button>
        </div>
      </div>
    </div>
  );
};

const BookReview = ({ book }) => {
  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [activeTab, setActiveTab] = useState("newest");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleRating = (rating) => {
    setReview((prev) => ({ ...prev, rating }));
    setFormError("");
  };

  const handleCommentChange = (e) => {
    setReview((prev) => ({ ...prev, comment: e.target.value }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.rating <= 0) {
      setFormError("Vui lòng chọn số sao.");
      return;
    }

    if (review.comment.trim() === "") {
      setFormError("Vui lòng nhập nhận xét.");
      return;
    }

    try {
      const jwt = localStorage.getItem("jwt"); 
      const userResponse = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      const currentUserId = userResponse.data.id; 

      const bookResponse = await axios.get(
        `http://localhost:1337/api/books?populate=*&filters[documentId][$eq]=${book[0].documentId}`, 
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );
      const currentBookId = bookResponse.data.data[0].id; 
  
      const reviewPayload = {
        data: {
          book: currentBookId, 
          reviewed_by: currentUserId,
          content: review.comment,
          rating: review.rating,
          likes: 0,
          timestamp: new Date().toISOString(),
        },
      };

      console.log(reviewPayload);
  
      const response = await axios.post(
        "http://localhost:1337/api/reviews",
        reviewPayload,
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );
  
      setReview({ rating: 0, comment: "" });
      setFormError("");
      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      setFormError("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/reviews?populate=*&filters[book][documentId][$eq]=${book[0].documentId}`,
          {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        const data = response.data.data;
        console.log(response.data.data);

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
  }, []);

  return (
    <div className="bg-light my-5 rounded w-100">
      <div className="container">
        <div className="row">
          {/* Review Summary */}
          <div className="col-12 col-lg-6">
            <div className="container mb-4 p-3">
              <h5 className="my-3">
                <strong>Đánh giá sản phẩm</strong>
              </h5>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center my-3">
                    <h1 className="me-3">{averageRating}/5</h1>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color="#ffc107" />
                      ))}
                      <p className="mb-0">({totalReviews} đánh giá)</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="d-flex align-items-center">
                        <span className="me-2">{star} sao</span>
                        <div className="progress flex-grow-1" style={{ height: "10px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${totalReviews
                                ? (starCounts[star] / totalReviews) * 100
                                : 0
                                }%`,
                            }}
                          />
                        </div>
                        <span className="ms-2">{starCounts[star] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="col-12 col-lg-6">
            <div className="container mb-4 p-3">
              {isLoggedIn ? (
                <>
                  <h6 className="my-3">
                    <strong>Viết đánh giá</strong>
                  </h6>
                  <form onSubmit={handleSubmit}>
                    {/* Star Rating */}
                    <div className="mb-3">
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={24}
                            color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                            onClick={() => handleRating(i + 1)}
                            style={{ cursor: "pointer" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment Input */}
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Nhập đánh giá..."
                        value={review.comment}
                        onChange={handleCommentChange}
                      ></textarea>
                    </div>

                    {/* Error Display */}
                    {formError && (
                      <p className="text-danger mt-2">{formError}</p>
                    )}

                    <button type="submit" className="btn btn-danger">
                      Gửi đánh giá
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <p>Bạn phải đăng nhập trước khi đánh giá</p>
                  <button className="btn btn-danger" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        </div >
      </div >

      {/* Review Tabs */}
      < ul className="nav nav-tabs mb-4" >
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "newest" ? "active" : ""}`}
            onClick={() => setActiveTab("newest")}
          >
            Mới nhất
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "mostLiked" ? "active" : ""}`}
            onClick={() => setActiveTab("mostLiked")}
          >
            Yêu thích nhất
          </button>
        </li>
      </ul >

      {/* Review List */}
      < div >
        {
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} setReviews={setReviews} />
          ))
        }
      </div >
    </div >
  );
};

export default BookReview;