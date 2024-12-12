import React from "react";
import "./Sidebar.scss";
import { useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
    const location = useLocation();
    const menuItems = [
        { href: "/user/account", label: "Hồ Sơ" },
        { href: "/user/payment", label: "Phương thức thanh toán" },
        { href: "/user/address", label: "Địa Chỉ" },
        { href: "/user/change-password", label: "Đổi Mật Khẩu" },
        { href: "/user/notifications", label: "Cài Đặt Thông Báo" },
        { href: "/user/settings", label: "Cài đặt khác" },
    ];

    const orderItems = [
        { href: "/order/history", label: "Đã mua" },
        { href: "/order/cancel", label: "Huỷ đơn hàng" },
        { href: "/order/refund", label: "Trả hàng/Hoàn tiền" },
    ];

    const historyItems = [
        { href: "/user/reviews", label: "Đánh giá" },
        { href: "/user/wishlist", label: "Đã theo dõi" },
        { href: "/user/history", label: "Đã xem gần đây" },
    ];

    // Check if any menu item is active
    const isMenuActive = menuItems.some(item => item.href === location.pathname);

    const isOrderActive = orderItems.some(item => item.href === location.pathname);

    const isHistoryActive = historyItems.some(item => item.href === location.pathname);

    return (
        <div className="col-md-3">
            {/* Profile Section */}
            <div className="text-center mb-4">
                <img
                    src={user.avatar || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="rounded-circle img-fluid"
                />
                <p className="mt-2 fw-bold">{user.username}</p>
            </div>

            {/* Hồ Sơ Cá Nhân Section */}
            <div className="collapse-container">
                <button
                    className={`btn btn-danger w-100 no-rounded ${isMenuActive ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle={isMenuActive ? "" : "collapse"}
                    data-bs-target="#collapseProfile"
                    aria-expanded={isMenuActive ? "true" : "false"}
                    aria-controls="collapseProfile"
                >
                    <strong>Hồ Sơ Cá Nhân</strong>
                </button>
                <div id="collapseProfile" className={`collapse ${isMenuActive ? "show" : ""}`}>
                    <ul className="list-group list-group-flush list-group-custom">
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                className={`list-group-item list-group-item-action ${location.pathname === item.href ? "active" : ""
                                    }`}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Đơn Hàng Section */}
            <div className="collapse-container">
                <button
                    className={`btn btn-danger w-100 no-rounded ${isOrderActive ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle={isOrderActive ? "" : "collapse"}
                    data-bs-target="#collapseOrder"
                    aria-expanded={isOrderActive ? "true" : "false"}
                    aria-controls="collapseOrder"
                >
                    <strong>Đơn hàng</strong>
                </button>
                <div id="collapseOrder" className={`collapse ${isOrderActive ? "show" : ""}`}>
                    <ul className="list-group list-group-flush list-group-custom">
                        {orderItems.map((item) => (
                            <a
                                key={item.href}
                                className={`list-group-item list-group-item-action ${location.pathname === item.href ? "active" : ""
                                    }`}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Đánh giá Section */}
            <div className="collapse-container">
                <button
                    className={`btn btn-danger w-100 no-rounded ${isHistoryActive ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle={isHistoryActive ? "" : "collapse"}
                    data-bs-target="#collapseHistory"
                    aria-expanded={isHistoryActive ? "true" : "false"}
                    aria-controls="collapseHistory"
                >
                    <strong>Lịch sử</strong>
                </button>
                <div id="collapseHistory" className={`collapse ${isHistoryActive ? "show" : ""}`}>
                    <ul className="list-group list-group-flush list-group-custom">
                        {historyItems.map((item) => (
                            <a
                                key={item.href}
                                className={`list-group-item list-group-item-action ${location.pathname === item.href ? "active" : ""
                                    }`}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;