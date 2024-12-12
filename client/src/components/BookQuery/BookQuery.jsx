import React from "react";
import BookCard from "../../components/BookCard/BookCard";

const BookQuery = ({
  currentBooks,
  filteredBooks,
  currentPage,
  totalPages,
  handlePageChange,
  sortAttribute,
  setSortAttribute,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div>
      <h5>
        {filteredBooks.length
          ? `Results Found (${filteredBooks.length})`
          : "No Results Found"}
      </h5>
      <div className="d-flex justify-content-between mb-3">
        <select
          className="form-select"
          value={sortAttribute}
          onChange={(e) => setSortAttribute(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="stock_quantity">Stock Quantity</option>
          <option value="publish_date">Publish Date</option>
          <option value="total_sold">Total Sold</option>
        </select>
        <button
          className="btn btn-outline-danger"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book.id} className="col">
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="text-center w-100">No Books Available</div>
        )}
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            <button
              className="page-link text-danger"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<<"}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link text-danger"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link text-danger"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {">>"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookQuery;