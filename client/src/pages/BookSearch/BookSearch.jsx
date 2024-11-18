import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookCard from "../../components/BookCard/BookCard";

const booksData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `A Relatively Lengthened Book Title Number ${index + 1}`,
  image: `/img/book${(index % 5) + 1}.jpg`, // Rotate through 5 sample images
  price: `${(Math.random() * (300 - 50) + 50).toFixed(3)}`, // Random price between 50,000 and 300,000
  oldPrice: `${(Math.random() * (350 - 300) + 300).toFixed(3)}`, // Random old price between 300,000 and 350,000
  discount: `${Math.floor(Math.random() * 30) + 10}%`, // Random discount between 10% and 30%
}));

const BookSearch = () => {
  const [books, setBooks] = useState(booksData);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  // Calculate total pages
  const totalPages = Math.ceil(booksData.length / booksPerPage);

  // Get the books for the current page
  const currentBooks = booksData.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-lg-3">
          <div className="mb-4">
            <h5><strong>Lọc Theo</strong></h5>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <h6>Danh Mục Chính</h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="category1" />
              <label className="form-check-label" htmlFor="category1">Sách Tiếng Việt (215)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="category2" />
              <label className="form-check-label" htmlFor="category2">Foreign Books (46)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="category3" />
              <label className="form-check-label" htmlFor="category3">Đồ Chơi (17)</label>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h6>Giá</h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="price1" />
              <label className="form-check-label" htmlFor="price1">0 - 150.000 (257)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="price2" />
              <label className="form-check-label" htmlFor="price2">150.000 - 300.000 (31)</label>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-4">
            <h6>Thương Hiệu</h6>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand1" />
              <label className="form-check-label" htmlFor="brand1">TAGGER (15)</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand2" />
              <label className="form-check-label" htmlFor="brand2">Campus (13)</label>
            </div>
          </div>
        </div>

        {/* Main Content Area for Books */}
        <div className="col-lg-9">
          <h5><strong>Kết Quả Tìm Kiếm</strong></h5>
          <div className="d-flex justify-content-between mb-3">
            <span>300 kết quả</span>
            <div>
              <button className="btn btn-light me-2">Sắp xếp theo</button>
              <button className="btn btn-light">Còn hàng</button>
            </div>
          </div>

          {/* Books List */}
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4 pt-4 pb-4">
        {currentBooks.map((book) => (
          <div key={book.id} className="col">
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
        </nav>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;