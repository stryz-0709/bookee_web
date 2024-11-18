import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.scss';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar bg-warning-subtle">
        {/* Left Section */}
        <div className="d-flex justify-content-center d-lg-none col-12">
            <Link to="/">
              <img src="/img/logo.png" alt="BOOKEE" style={{ width: '150px', height: 'auto' }} />
            </Link>
          </div>

        <div className="d-flex ps-3 justify-content-start col-lg-2 d-none d-lg-block">
          {/* Logo */}
          <Link to="/">
            <img src="/img/logo.png" alt="BOOKEE" style={{ width: '180px', height: 'auto' }} />
          </Link>
        </div>

        {/* Center Section */}
        <div className="d-flex justify-content-center col-lg-7 col-md-8 col-7">
            <div class="dropdown dropdown-hover">
              <button data-mdb-button-init data-mdb-ripple-init data-mdb-dropdown-init
                class="btn btn-warning-subtle dropdown-toggle" type="button" id="dropdownMenuButton"
                data-mdb-toggle="dropdown" aria-expanded="false">
                <WidgetsOutlinedIcon className="text-danger"/>
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
              className="form-control" 
              placeholder="Search..." 
            />
            <button className="btn btn-danger text-light d-flex align-items-center">
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex pe-3  justify-content-end col-lg-3 col-md-4 col-5">
          {/* Language and Currency Selector */}
          <div class="dropdown dropdown-hover">
            <button data-mdb-button-init data-mdb-ripple-init data-mdb-dropdown-init
              class="btn btn-warning-subtle dropdown-toggle" type="button" id="dropdownMenuButton"
              data-mdb-toggle="dropdown" aria-expanded="false">
              <img src="/img/en.png" alt="EN" style={{ width: '20px', height: '20px' }} />
            </button>
            <ul class="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton">
              <h6 className="dropdown-header">Thay đổi Ngôn ngữ</h6>
              <li>
                <a class="dropdown-item" href="#">Tiếng Việt</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Tiếng Anh</a>
              </li>
            </ul>
          </div>
          
          {/* Icons Section */}
          <div className="d-flex align-items-center">
            <NotificationsOutlinedIcon className="me-3 text-danger" />
            <PersonOutlineOutlinedIcon className="me-3 text-danger" />
            <FavoriteBorderOutlinedIcon className="me-3 text-danger" />

            {/* Cart Icon */}
            <div className="cartIcon position-relative" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon className="text-danger"/>
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {products.length}
              </span>
            </div>
          </div>
        </div>

      {/* Cart Component */}
      {open && <Cart />}
    </nav>
  );
};

export default Navbar;