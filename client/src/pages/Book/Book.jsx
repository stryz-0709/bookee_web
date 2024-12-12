import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import BookDesc from "../../components/BookElement/BookDesc";
import BookInfo from "../../components/BookElement/BookInfo";
import BookPreview from "../../components/BookElement/BookPreview/BookPreview";
import TableInfo from "../../components/BookElement/TableInfo";
import "./Book.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookReview from "../../components/BookElement/BookReview";
import FeaturedBooks from "../../components/FeaturedBooks/FeaturedBooks";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Book = () => {
  const id = useParams().id;

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/books?pagination[pageSize]=100000`,
          {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        const book = res.data.data.find((item) => item.id === parseInt(id));
        const documentId = book.documentId;
        
        const res2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/books?filters[documentId][$eq]=${documentId}&populate=*`,
          {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
  
        if (res2.data.data.length > 0) {
          setData(res2.data.data);
          // console.log(res2.data.data);
          updateBrowsingHistory(res2.data.data);
        } else {
          throw new Error("Book not found with the provided documentId");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateBrowsingHistory = async (book) => {
    // console.log(book[0]);
    try {
      const jwt = localStorage.getItem("jwt");
      
      const meResponse = await axios.get(
        "http://localhost:1337/api/users/me?populate=*",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const userId = meResponse.data.id;

      const historyResponse = await axios.get(
        `http://localhost:1337/api/users/${userId}?populate=browsingHistory`,
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );
      const browsingHistory = historyResponse.data.browsingHistory;

      // console.log(browsingHistory);
  
      const isAlreadyInHistory = browsingHistory.some(
        (historyItem) => historyItem.id === book[0]?.id
      );
  
      let updatedBrowsingHistory;
  
      if (isAlreadyInHistory) {
        updatedBrowsingHistory = [
          book[0],
          ...browsingHistory.filter((historyItem) => historyItem.id !== book[0]?.id),
        ];
      } else {
        updatedBrowsingHistory = [book[0], ...browsingHistory];
  
        if (updatedBrowsingHistory.length > 20) {
          updatedBrowsingHistory.pop();
        }
      }
  
      await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        { browsingHistory: updatedBrowsingHistory },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update browsing history:", error);
    }
  };


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="alert alert-danger" role="alert">
          Error loading product details.
        </div>
        <button className="btn btn-warning my-3" onClick={() => window.location.href = '/'}>
          Return to Home Page
        </button>
      </div>
    );
  }

  // console.log(data);
  
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Vertical Thumbnails and Main Image */}
        <div className="col-lg-6">
          <BookPreview book={data}/>
        </div>

        {/* Right Section: Book Details */}
        <div className="bg-light col-lg-6 p-4 rounded">
          <BookInfo book={data}/>

          <TableInfo book={data}/>

          <small>Giá sản phẩm trên Bookee.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...</small>

          <div className="bg-none mt-5">
            <BookDesc book={data}/>
          </div>
        </div>

      </div>

      <div className="row">
        <BookReview book={data}/>
      </div>

      <div className="row">
        {/* Right Column: Related Books */}
        {data[0]?.genre?.map((book, index) => {
          return (
            <div key={index} className="col-12">
              <FeaturedBooks genre={book} />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Book;