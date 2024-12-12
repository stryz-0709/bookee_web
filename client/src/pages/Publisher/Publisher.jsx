import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/BookCard/BookCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "../../components/Filter/Filter";
import BookQuery from "../../components/BookQuery/BookQuery";

const Publisher = () => {
    const [publisherName, setPublisherName] = useState([]);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const booksPerPage = 20;

    // Filters
    const [genreFilter, setGenreFilter] = useState([]);
    const [languageFilter, setLanguageFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([[0, Infinity]]);
    const [stockQuantityRange, setStockQuantityRange] = useState([0, Infinity]);
    const [publishDateRange, setPublishDateRange] = useState([null, null]);
    const [totalSoldRange, setTotalSoldRange] = useState([0, Infinity]);

    // Sorting
    const [sortAttribute, setSortAttribute] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchPublisherData = async () => {
            setLoading(true);
            try {
                // Fetch publisher data
                const publisherRes = await axios.get(
                    "http://localhost:1337/api/users/me?populate=*",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                        },
                    }
                );

                console.log(publisherRes);

                const name = publisherRes.data.data.name;
                if (!name) throw new Error("Publisher name not found");

                setPublisherName(name);

                const url = query
                    ? `${process.env.REACT_APP_API_URL}/books?pagination[pageSize]=100000&populate=*&filters[$or][0][title][$containsi]=${publisherName}&filters[$or][1][authors][name][$containsi]=${publisherName}&filters[$or][2][publisher][name][$containsi]=${publisherName}&filters[$or][3][genre][$containsi]=${publisherName}`
                    : `${process.env.REACT_APP_API_URL}/books?pagination[pageSize]=100000&populate=*`;

                const res = await axios.get(url, {
                    headers: {
                        Authorization: `bearer ${process.env.REACT_APP_API_TOKEN}`,
                    },
                });


                setBooks(res.data.data);
                setFilteredBooks(res.data.data);
            } catch (err) {
                console.error(err.message);
                setError("Failed to fetch publisher or books. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchPublisherData();
    }, []);


    // Apply filters and sorting
    const applyFiltersAndSorting = () => {
        let filtered = books;

        // Filter by genre
        if (genreFilter.length > 0) {
            filtered = filtered.filter((book) =>
                book.genre.some((genre) => genreFilter.includes(genre))
            );
        }

        // Filter by language
        if (languageFilter.length > 0) {
            filtered = filtered.filter((book) =>
                languageFilter.includes(book.language)
            );
        }

        // Filter by price ranges
        filtered = filtered.filter((book) =>
            priceRange.some(([min, max]) => book.price >= min && book.price <= max)
        );

        // Filter by stock quantity range
        filtered = filtered.filter(
            (book) =>
                book.stock_quantity >= stockQuantityRange[0] &&
                book.stock_quantity <= stockQuantityRange[1]
        );

        // Filter by total sold range
        filtered = filtered.filter(
            (book) =>
                book.total_sold >= totalSoldRange[0] &&
                book.total_sold <= totalSoldRange[1]
        );

        // Filter by publish date range
        if (publishDateRange[0] && publishDateRange[1]) {
            const [startDate, endDate] = publishDateRange.map((date) =>
                new Date(date).getTime()
            );
            filtered = filtered.filter((book) => {
                const bookDate = new Date(book.publish_date).getTime();
                return bookDate >= startDate && bookDate <= endDate;
            });
        }

        // Apply sorting
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

    // Trigger filtering and sorting whenever filters, sorting, or books change
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
        books,
    ]);

    // Pagination logic
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const currentBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            {/* Greeting */}
            <h2 className="mb-4">Hello, {publisherName || "Publisher"}!</h2>

            {/* Add New Book Button */}
            <div className="mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => alert("Redirect to Add New Book Form")}
                >
                    Add New Book
                </button>
            </div>

            <div className="row">
                {/* Sidebar Filters */}
                <div className="col-lg-3">
                </div>

                {/* Main Content */}
                <div className="col-lg-9">
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
            </div>
        </div>
    );
};

export default Publisher;