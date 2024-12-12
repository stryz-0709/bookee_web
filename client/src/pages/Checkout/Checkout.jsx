import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem, removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
    const navigate = useNavigate();
    const [putId, setPutId] = useState({});
    const [loading, setLoading] = useState(true);
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("User not authenticated");

    const fetchOrder = async () => {
        try {
            const res = await axios.get(
                `http://localhost:1337/api/orders?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Use your API token here
                    },
                }
            );
            console.log("Orders fetched successfully:", res.data.data);
            return res.data;
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
            throw error; // Throw the error for handling in the calling context
        }
    };


    useEffect(() => {
        fetchOrder();
        const fetchUserInfo = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                if (!jwt) throw new Error("User not authenticated");

                const meResponse = await axios.get("http://localhost:1337/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                const userId = meResponse.data.id;
                console.log("User ID:", userId);
                setPutId(userId);

                const userResponse = await axios.get(
                    `http://localhost:1337/api/users/${userId}?populate=*`,
                    {
                        headers: {
                            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                        },
                    }
                );

                setAddresses(userResponse.data.addresses
                    .filter((address) => address.publishedAt !== null)
                    .map((address, index) => ({ ...address, mapId: index + 1 })) || []);
                setPaymentMethods(userResponse.data.payments
                    .filter((payment) => payment.publishedAt !== null)
                    .map((payment, index) => ({ ...payment, mapId: index + 1 })) || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const totalPrice = () =>
        products.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

    return (
        <div className="cart container my-5">

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <h5><strong>Cart Items:</strong> <span className="text-danger"></span></h5>
            {products && products.length > 0 ? (
                products.map((item) => (
                    <div className="item d-flex align-items-center justify-content-between" key={item.mapId}>
                        <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
                        <div className="d-flex align-items-center">
                            {/* Item Details */}
                            <div className="details flex-grow-1">
                                <h1 className="mb-2">{item.title}</h1>
                                <p className="mb-3">{item.desc?.substring(0, 150)}...</p>
                            </div>

                            {/* Actions (Quantity and Total Price) */}
                            <div className="actions justify-content-end d-flex align-items-center ms-auto col-5">
                                {/* Display Quantity */}
                                <div
                                    className="quantity text-center fw-bold"
                                    style={{
                                        fontSize: "18px",
                                        width: "120px",
                                    }}
                                >
                                    {new Intl.NumberFormat("vi-VN").format(item.price)} ₫ x {item.quantity}
                                </div>
                                {/* Display Total Price */}
                                <div
                                    className="total-price text-danger fw-bold justify-content-end"
                                    style={{
                                        fontSize: "20px",
                                        width: "180px",
                                        textAlign: "right",
                                    }}
                                >
                                    {new Intl.NumberFormat("vi-VN").format(item.quantity * item.price)} ₫
                                </div>
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

                    {/* User Addresses */}
                    <div className="addresses mt-4">
                        <h5><strong>Select Address:</strong> <span className="text-danger">*</span></h5>

                        {addresses.length > 0 ? (
                            <ul className="list-group mb-3">
                                {addresses.map((address) => (
                                    <li
                                        key={address.mapId}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input me-2 mt-5"
                                                type="radio"
                                                name="selectedAddress" // Same name ensures only one can be selected
                                                id={`address-${address.mapId}`}
                                                value={address.mapId}
                                                checked={selectedAddress === address}
                                                onChange={() => setSelectedAddress(address)} // Set the selected address
                                            />
                                            <label className="form-check-label ms-3 mt-2" htmlFor={`address-${address.mapId}`}>
                                                <strong>{address.name}</strong>
                                                <p className="mb-0 text-muted">{address.address}</p>
                                                <p className="mb-0 text-muted">{address.phone}</p>
                                                <small className="text-muted">{address.type}</small>
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">Chưa có địa chỉ nào.</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <button className="btn btn-danger me-3" onClick={() => navigate("/user/address")}>
                            Thay đổi địa chỉ
                        </button>
                    </div>

                    {/* Payment Methods */}
                    <div className="payment-methods mt-4">
                        <h5><strong>Select Payment Method:</strong> <span className="text-danger">*</span></h5>

                        <div className="list-group mb-3">
                            {paymentMethods.map((method) => (
                                <div key={method.mapId} className="form-check d-flex align-items-center">
                                    <input
                                        className="form-check-input me-3"
                                        type="radio"
                                        name="selectedPaymentMethod"
                                        id={`payment-${method.mapId}`}
                                        value={method.mapId}
                                        checked={selectedPaymentMethod === method}
                                        onChange={() => setSelectedPaymentMethod(method)}
                                    />
                                    <label className="form-check-label d-flex align-items-center ms-3 mt-2" htmlFor={`payment-${method.mapId}`}>
                                        <img className="me-3"
                                            src={
                                                method.type === "Momo"
                                                    ? "http://localhost:1337/uploads/download_b1847215df.png"
                                                    : method.type === "Bank"
                                                        ? "http://localhost:1337/uploads/ico_zalopaycc_3c7d80fc87.svg"
                                                        : ""
                                            }
                                            alt={method.type}
                                            style={{ width: "24px", height: "24px", marginRight: "10px" }}
                                        />
                                        <div>
                                            <strong>{method.type}</strong>
                                            <p className=" text-muted align-items-center mb-0">{method.name}</p>
                                            <small className="text-muted align-items-center mb-0">
                                                {method.type === "Momo" ? method.phone : method.cardNumber}
                                            </small>
                                        </div>
                                    </label>
                                </div>
                            ))}

                            {/* Cash on Delivery Option */}
                            <div className="form-check d-flex align-items-center mt-2">
                                <input
                                    className="form-check-input me-3"
                                    type="radio"
                                    name="selectedPaymentMethod"
                                    mapId="payment-cash"
                                    value="cash"
                                    checked={selectedPaymentMethod === "cash"}
                                    onChange={() => setSelectedPaymentMethod("cash")}
                                />
                                <label className="form-check-label d-flex align-items-center ms-3 mt-2" htmlFor="payment-cash">
                                    <img
                                        src="http://localhost:1337/uploads/ico_cashondelivery_eca3ad1e84.svg"
                                        alt="Cash on Delivery"
                                        style={{ width: "24px", height: "24px", marginRight: "10px" }}
                                    />
                                    Thanh toán bằng tiền mặt khi nhận hàng
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                        <button className="btn btn-danger me-3" onClick={() => navigate("/user/payment")}>
                            Thay đổi phương thức thanh toán
                        </button>
                    </div>

                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <button className="btn btn-outline-secondary me-3" onClick={() => {
                            window.location.href = "/";
                        }}
                        >
                            RETURN TO STORE
                        </button>
                        <button className="btn btn-danger text-light me-3" onClick={() => navigate("/cart")}>
                            RETURN TO CART
                        </button>
                        <button
                            className="btn btn-warning me-3"
                            onClick={async () => {
                                setError("");
                                setSuccess("");
                                console.log(selectedAddress);
                                console.log(selectedPaymentMethod);

                                if (!selectedAddress) {
                                    setError("Vui lòng chọn địa chỉ");
                                    return;
                                }

                                if (!selectedPaymentMethod) {
                                    setError("Vui lòng chọn phương thức thanh toán");
                                    return;
                                }

                                try {
                                    const jwt = localStorage.getItem("jwt");
                                    if (!jwt) {
                                        setError("You are not authenticated! Please log in.");
                                        return;
                                    }

                                    // Fetch user data
                                    const meResponse = await axios.get("http://localhost:1337/api/users/me", {
                                        headers: {
                                            Authorization: `Bearer ${jwt}`,
                                        },
                                    });

                                    const userId = meResponse.data.id;
                                    console.log("User ID:", userId);
                                    setPutId(userId);

                                    // Fetch details for products, addresses, and payment methods
                                    const bookDetails = await Promise.all(
                                        products.map((item) =>
                                            axios.get(`http://localhost:1337/api/books`, {
                                                params: {
                                                    filters: {
                                                        documentId: item.documentId,
                                                    },
                                                },
                                                headers: {
                                                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                                },
                                            }).then((response) => response.data.data[0])
                                        )
                                    );

                                    const addressDetails = await axios.get(`http://localhost:1337/api/addresses?populate=*`, {
                                        params: {
                                            filters: {
                                                documentId: selectedAddress.documentId,
                                            },
                                        },
                                        headers: {
                                            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                        },
                                    }).then((response) => response.data.data);

                                    const paymentDetails = await axios.get(`http://localhost:1337/api/payments?populate=*`, {
                                        params: {
                                            filters: {
                                                documentId: selectedPaymentMethod.documentId,
                                            },
                                        },
                                        headers: {
                                            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                        },
                                    }).then((response) => response.data.data);

                                    // Create orders
                                    const orders = products.map((item) => ({
                                        address: addressDetails[0].id,
                                        payment: paymentDetails[0].id,
                                        orderedAt: new Date().toISOString(),
                                        book: bookDetails[0].id,
                                        users_permissions_user: putId,
                                        quantity: item.quantity,
                                    }));

                                    console.log(orders);

                                    const orderResponses = await Promise.all(
                                        orders.map((order) =>
                                            axios.post(
                                                `http://localhost:1337/api/orders`,
                                                {
                                                    data: order,
                                                },
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                                        "Content-Type": "application/json",
                                                    },
                                                }
                                            )
                                        )
                                    );

                                    console.log("Order placed successfully!", orderResponses);

                                    // Update stock and sales
                                    const updateStockPromises = products.map(async (item) => {
                                        const bookResponse = await axios.get(
                                            `http://localhost:1337/api/books/${item.documentId}`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                                },
                                            }
                                        );

                                        const book = bookResponse.data.data;

                                        const updatedStock = book.stock_quantity - item.quantity;
                                        const updatedSold = book.total_sold + item.quantity;

                                        if (updatedStock < 0) {
                                            throw new Error(`Not enough stock for ${item.title}`);
                                        }

                                        return axios.put(
                                            `http://localhost:1337/api/books/${item.documentId}`,
                                            {
                                                data: {
                                                    stock_quantity: updatedStock,
                                                    total_sold: updatedSold,
                                                },
                                            },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                                                    "Content-Type": "application/json",
                                                },
                                            }
                                        );
                                    });

                                    await Promise.all(updateStockPromises);

                                    setSuccess("Order placed successfully");
                                    console.log("Stock and sales updated successfully!");
                                    dispatch(resetCart());
                                } catch (error) {
                                    console.error("Error placing order", error);
                                    setError("Failed to place the order or update stock. Please try again.");
                                }
                            }}
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </>
            )
            }
        </div >
    )
}

export default Checkout;