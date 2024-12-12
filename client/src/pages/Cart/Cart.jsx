import React, { useState } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem, removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = () =>
    products.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

  // // Stripe Configuration
  // const stripePromise = loadStripe("pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB");
  // const handlePayment = async () => {
  //   try {
  //     const stripe = await stripePromise;
  //     const res = await makeRequest.post("/orders", { products });
  //     await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
  //   } catch (err) {
  //     console.error("Payment Error:", err);
  //   }
  // };

  return (
    <div className="cart container my-5">
      <h5><strong>Cart Items:</strong> <span className="text-danger"></span></h5>
      {products && products.length > 0 ? (
        products.map((item) => (
          <div className="item d-flex align-items-center justify-content-between" key={item.id}>
            <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
            <div className="d-flex align-items-center col-11">
              {/* Item Details */}
              <div className="details flex-grow-1">
                <h1 className="mb-2">{item.title}</h1>
                <p className="mb-3">{item.desc?.substring(0, 150)}...</p>
              </div>

              {/* Actions (Quantity Selector, Price, Delete Icon) */}
              <div className="actions justify-content-end d-flex align-items-center ms-auto col-5">
                {/* Quantity Selector */}
                <div className="input-group me-3 align-items-center" style={{ width: "120px" }}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateItem({
                          id: item.id,
                          quantity: Math.max(item.quantity - 1, 1),
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={item.quantity}
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
                    onClick={() =>
                      dispatch(
                        updateItem({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>
                {/* Price */}
                <div
                  className="price text-danger fw-bold me-3"
                  style={{
                    fontSize: "20px",
                    width: "180px",
                    textAlign: "right",
                  }}
                >
                  {new Intl.NumberFormat("vi-VN").format(item.price)} ₫
                </div>
                {/* Delete Icon */}
                <DeleteOutlinedIcon
                  className="delete text-danger"
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  onClick={() => dispatch(removeItem(item.id))}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-cart text-center my-5">
          <h3 className="text-danger">Giỏ hàng của bạn còn trống</h3>
          <button
            className="btn btn-danger mt-3"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            MUA NGAY
          </button>
        </div>
      )}
      {products && products.length > 0 && (
        <>
          <hr className="border border-danger border-2" />
          <div className="total justify-items-end text-danger">
            <span><strong>SUBTOTAL</strong></span>
            <div
              className="price text-danger me-3 d-inline-block fw-bold"
              style={{ fontSize: "20px" }}
            >
              {new Intl.NumberFormat("vi-VN").format(totalPrice())} ₫
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center mt-3">
            <button className="btn btn-outline-secondary me-3" onClick={() => {
              window.location.href = "/";
            }}
            >
              RETURN TO STORE
            </button>
            <button className="btn btn-danger text-light me-3" onClick={() => dispatch(resetCart())}>
              RESET CART
            </button>
            <button
              className="btn btn-warning me-3"
              onClick={() => {
                const jwt = localStorage.getItem("jwt"); 
                if (jwt) {
                  navigate("/checkout"); 
                } else {
                  alert("Vui lòng đăng nhập");
                  navigate("/login"); 
                }
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;