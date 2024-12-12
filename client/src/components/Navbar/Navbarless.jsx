import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss';

const Navbarless = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirect with query
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on "Enter"
    }
  };

  const handleLogout = () => {
    // Clear user authentication details
    localStorage.removeItem("jwt");
    localStorage.removeItem("rememberedUsername"); // Optional if "Remember Me" is used

    // Redirect to the login screen
    navigate("/login");
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar bg-warning-subtle">
      <div className="container">
        {/* Left Section */}
        <div className="d-flex justify-content-center d-lg-none col-12">
          <Link to="/">
            <img src="/img/logo.png" alt="BOOKEE" style={{ width: '150px', height: 'auto' }} />
          </Link>
        </div>

        <div className="d-flex ps-3 justify-content-start col-lg-3 d-none d-lg-block">
          {/* Logo */}
          <Link to="/">
            <img src="/img/logo.png" alt="BOOKEE" style={{ width: '180px', height: 'auto' }} />
          </Link>
        </div>

        {/* Center Section */}
        <div className="d-flex justify-content-center col-lg-6 col-md-8 col-7">
          <div class="d-flex dropdown dropdown-hover align-items-center">
            <button
              className="btn p-0 me-3 text-danger icon-hover"
              style={{ background: "none", border: "none" }}
              aria-label="Profile"
            >
              <span className="icon-container">
                <span className="icon outlined">
                  <WidgetsOutlinedIcon />
                </span>
                <span className="icon filled">
                  <WidgetsIcon />
                </span>
              </span>
            </button>
            <ul class="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton">
              <h6 className="dropdown-header">Danh mục sản phẩm</h6>
              <li>
                <a class="dropdown-item" href="#"> Sách Tiếng Việt &raquo; </a>
                <ul class="dropdown-menu dropdown-submenu">
                  <li>
                    <a class="dropdown-item" href="#">Văn Học &raquo; </a>
                    <ul class="dropdown-menu dropdown-submenu">
                      <li>
                        <a class="dropdown-item" href="#">Tác Phẩm Kinh Điển</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Tiểu Thuyết</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Truyện Ngắn</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Ngôn Tình</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Trinh Thám - Tội Phạm</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Kinh Dị</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Truyện Cổ Tích - Ngụ Ngôn</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Phóng Sự - Ký Sự</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Thiếu Nhi &raquo; </a>
                    <ul class="dropdown-menu dropdown-submenu">
                      <li>
                        <a class="dropdown-item" href="#">Truyện Thiếu Nhi</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Truyện Manga - Comic</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Kiến Thức - Kỹ Năng Sống</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Tô Màu - Dán Hình</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Phát Triển Kỹ Năng - Trí Tuệ</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Kinh Tế &raquo; </a>
                    <ul class="dropdown-menu dropdown-submenu">
                      <li>
                        <a class="dropdown-item" href="#">Quản Trị - Lãnh Đạo</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Marketing</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Bài Học Kinh Doanh</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Khởi Nghiệp</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Chứng Khoán - Bất Động Sản - Đầu Tư</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Tài Chính - Kế Toán - Tiền Tệ</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Tâm Lý - Kỹ Năng Sống &raquo; </a>
                    <ul class="dropdown-menu dropdown-submenu">
                      <li>
                        <a class="dropdown-item" href="#">Tâm Lý</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Kỹ Năng Sống</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Rèn Luyện Nhân Cách</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Hướng Nghiệp - Phát Triển Bản Thân</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Nuôi Dạy Con &raquo; </a>
                    <ul class="dropdown-menu dropdown-submenu">
                      <li>
                        <a class="dropdown-item" href="#">Multi level 1</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Multi level 2</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* Menu Icon and Dropdown Arrow */}


          {/* Show the Category Menu on Hover */}

          <div className="input-group w-100">
            <input
              type="search"
              className="form-control border-0 rounded-start"
              placeholder="Nhập từ khoá"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Trigger search on "Enter"
              aria-label="Search"
            />
            <button
              className="btn btn-danger rounded-end d-flex align-items-center justify-content-center px-3"
              onClick={handleSearch} // Trigger search on button click
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex pe-3 justify-content-end col-lg-3 col-md-4 col-5">
          {/* Language and Currency Selector */}

          {/* Profile Button */}
          <div className="d-flex align-items-center">
            <div class="dropdown dropdown-hover">
              <button
                className="btn p-0 me-3 text-danger icon-hover"
                onClick={() => navigate("/user/account")}
                style={{ background: "none", border: "none" }}
                aria-label="Profile"
              >
                <span className="icon-container">
                  <span className="icon outlined">
                    <PersonOutlineOutlinedIcon />
                  </span>
                  <span className="icon filled">
                    <PersonIcon />
                  </span>
                </span>
              </button>
              <ul class="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton">
                <h6 className="dropdown-header">Tài khoản</h6>
                <li>
                  <a class="dropdown-item" href="/login">Đăng nhập</a>
                </li>
                <li>
                  <a class="dropdown-item" href="/signup">Đăng ký</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbarless;