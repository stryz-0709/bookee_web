import React from "react";

const Filter = ({
    genreFilter,
    setGenreFilter,
    languageFilter,
    setLanguageFilter,
    priceRange,
    setPriceRange,
}) => {
    const handleGenreChange = (genre) => {
        setGenreFilter((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const handlePriceChange = (range) => (e) => {
        if (e.target.checked) {
            setPriceRange((prev) => [...prev.filter(r => !(r[0] === 0 && r[1] === Infinity)), range]);
        } else {
            setPriceRange((prev) => prev.filter(r => r[0] !== range[0] || r[1] !== range[1]));
        }
    };

    return (
        <div>
            <h5><strong>Filters</strong></h5>

            {/* Genre Filter */}
            <div className="mb-4">
                <h6><strong>Genre</strong></h6>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="biology"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Biology") ? prev.filter((g) => g !== "Biology") : [...prev, "Biology"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="biology">
                        Biology
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="comic"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Comic") ? prev.filter((g) => g !== "Comic") : [...prev, "Comic"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="comic">
                        Comic
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="computer"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Computer") ? prev.filter((g) => g !== "Computer") : [...prev, "Computer"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="computer">
                        Computer
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="economics"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Economics") ? prev.filter((g) => g !== "Economics") : [...prev, "Economics"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="economics">
                        Economics
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="geography"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Geography") ? prev.filter((g) => g !== "Geography") : [...prev, "Geography"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="geography">
                        Geography
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="history"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("History") ? prev.filter((g) => g !== "History") : [...prev, "History"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="history">
                        History
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="horror"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Horror") ? prev.filter((g) => g !== "Horror") : [...prev, "Horror"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="horror">
                        Horror
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="mathematics"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Mathematics") ? prev.filter((g) => g !== "Mathematics") : [...prev, "Mathematics"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="mathematics">
                        Mathematics
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="novel"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Novel") ? prev.filter((g) => g !== "Novel") : [...prev, "Novel"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="novel">
                        Novel
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="politics"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Politics") ? prev.filter((g) => g !== "Politics") : [...prev, "Politics"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="politics">
                        Politics
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="science"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Science") ? prev.filter((g) => g !== "Science") : [...prev, "Science"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="science">
                        Science
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="textbook"
                        onChange={() =>
                            setGenreFilter((prev) =>
                                prev.includes("Textbook") ? prev.filter((g) => g !== "Textbook") : [...prev, "Textbook"]
                            )
                        }
                    />
                    <label className="form-check-label" htmlFor="textbook">
                        Textbook
                    </label>
                </div>
            </div>

            {/* Language Filter */}
            <div className="mb-4">
                <h6><strong>Language</strong></h6>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="language"
                        id="vietnamese"
                        onChange={() => setLanguageFilter("Vietnamese")}
                        checked={languageFilter === "Vietnamese"}
                    />
                    <label className="form-check-label" htmlFor="vietnamese">
                        Vietnamese
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="language"
                        id="english"
                        onChange={() => setLanguageFilter("English")}
                        checked={languageFilter === "English"}
                    />
                    <label className="form-check-label" htmlFor="english">
                        English
                    </label>
                </div>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
                <h6>Price</h6>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="all"
                        checked={priceRange.length === 1 && priceRange[0][0] === 0 && priceRange[0][1] === Infinity}
                        onChange={() => setPriceRange([[0, Infinity]])}
                    />
                    <label className="form-check-label" htmlFor="all">
                        Tất cả
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price1"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [0, 100000]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 0 || range[1] !== 100000));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 0 && range[1] === 100000)}
                    />
                    <label className="form-check-label" htmlFor="price1">
                        0 - 100,000
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price2"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [100000, 500000]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 100000 || range[1] !== 500000));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 100000 && range[1] === 500000)}
                    />
                    <label className="form-check-label" htmlFor="price2">
                        100,000 - 500,000
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price3"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [500000, 1000000]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 500000 || range[1] !== 1000000));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 500000 && range[1] === 1000000)}
                    />
                    <label className="form-check-label" htmlFor="price3">
                        500,000 - 1,000,000
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price4"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [1000000, 2000000]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 1000000 || range[1] !== 2000000));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 1000000 && range[1] === 2000000)}
                    />
                    <label className="form-check-label" htmlFor="price4">
                        1,000,000 - 2,000,000
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price5"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [2000000, 5000000]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 2000000 || range[1] !== 5000000));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 2000000 && range[1] === 5000000)}
                    />
                    <label className="form-check-label" htmlFor="price5">
                        2,000,000 - 5,000,000
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="price6"
                        onChange={(e) => {
                            if (e.target.checked) {
                                setPriceRange((prev) => [...prev.filter(range => !(range[0] === 0 && range[1] === Infinity)), [5000000, Infinity]]);
                            } else {
                                setPriceRange((prev) => prev.filter(range => range[0] !== 5000000 || range[1] !== Infinity));
                            }
                        }}
                        checked={priceRange.some(range => range[0] === 5000000 && range[1] === Infinity)}
                    />
                    <label className="form-check-label" htmlFor="price6">
                        {">"} 5,000,000
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Filter;