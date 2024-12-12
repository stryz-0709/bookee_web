import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Wishlist.scss";
import Filter from "../../components/Filter/Filter";
import BookQuery from "../../components/BookQuery/BookQuery";

const Order = ({ user }) => {
    const [orderedBooks, setOrderedBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const booksPerPage = 20;

    const [genreFilter, setGenreFilter] = useState([]);
    const [languageFilter, setLanguageFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([[0, Infinity]]);
    const [stockQuantityRange, setStockQuantityRange] = useState([0, Infinity]);
    const [publishDateRange, setPublishDateRange] = useState([null, null]);
    const [totalSoldRange, setTotalSoldRange] = useState([0, Infinity]);

    const [sortAttribute, setSortAttribute] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchOrderedBooks = async () => {
            setLoading(true);
            try {
                const orderedBookIds = [...new Set(user?.orders.map((order) => order.documentId))];

                console.log(orderedBookIds);
                const orders = [];
                for (const documentId of orderedBookIds) {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_URL}/orders?populate=book&filters[documentId][$eq]=${documentId}`,
                        {
                            headers: {
                                Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                            },
                        });
                    orders.push(...response.data.data);
                    console.log(response.data);
                }
                const books = [];
                for (const order of orders) {
                    const documentId = order.book.documentId;
                    const bookResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/books?populate=*&filters[documentId][$eq]=${documentId}`,
                        {
                            headers: {
                                Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                            },
                        }
                    );

                    const fullBook = bookResponse.data.data[0];
                    console.log(bookResponse.data.data[0]);
                    if (fullBook) {
                        books.push(fullBook);
                    }
                }
                setOrderedBooks(books);
                setFilteredBooks(books);
                console.log(books);

            } catch (err) {
                console.error("Error fetching wishlist books:", err);
                setError("Failed to load wishlist books. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (user?.orders) {
            fetchOrderedBooks();
        }
    }, [user]);

    const applyFiltersAndSorting = () => {
        let filtered = orderedBooks;

        if (genreFilter.length > 0) {
            filtered = filtered.filter((book) =>
                book.genre.some((genre) => genreFilter.includes(genre))
            );
        }

        if (languageFilter.length > 0) {
            filtered = filtered.filter((book) =>
                languageFilter.includes(book.language)
            );
        }

        filtered = filtered.filter((book) =>
            priceRange.some(([min, max]) => book.price >= min && book.price <= max)
        );

        filtered = filtered.filter(
            (book) =>
                book.stock_quantity >= stockQuantityRange[0] &&
                book.stock_quantity <= stockQuantityRange[1]
        );

        filtered = filtered.filter(
            (book) =>
                book.total_sold >= totalSoldRange[0] &&
                book.total_sold <= totalSoldRange[1]
        );

        if (publishDateRange[0] && publishDateRange[1]) {
            const [startDate, endDate] = publishDateRange.map((date) =>
                new Date(date).getTime()
            );
            filtered = filtered.filter((book) => {
                const bookDate = new Date(book.publish_date).getTime();
                return bookDate >= startDate && bookDate <= endDate;
            });
        }

        filtered.sort((a, b) => {
            const valueA = a[sortAttribute];
            const valueB = b[sortAttribute];
            if (sortOrder === "asc") {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        setFilteredBooks(filtered);
    };

    useEffect(() => {
        applyFiltersAndSorting();
    }, [
        genreFilter,
        languageFilter,
        priceRange,
        stockQuantityRange,
        publishDateRange,
        totalSoldRange,
        sortAttribute,
        sortOrder,
        orderedBooks,
    ]);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const currentBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="col-md-9">

            {/* Main Content */}
            <BookQuery
                currentBooks={currentBooks}
                filteredBooks={filteredBooks}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={setCurrentPage}
                sortAttribute={sortAttribute}
                setSortAttribute={setSortAttribute}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
        </div>
    );
};

export default Order;