import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import useFetch from "../../hooks/useFetch";
import AuthorPubInfo from "../../components/BookElement/AuthorPubInfo";
import BookDesc from "../../components/BookElement/BookDesc";
import BookInfo from "../../components/BookElement/BookInfo";
import BookPreview from "../../components/BookElement/BookPreview/BookPreview";
import TableInfo from "../../components/BookElement/TableInfo";
import "./Book.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import BookReview from "../../components/BookElement/BookReview";
import FeaturedBooks from "../../components/FeaturedBooks/FeaturedBooks";

const Book = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(`/book/${id}?populate=*`);

  const relatedBooks = [
    { title: 'Hương bay ngược gió', price: '226,800', oldPrice: '252,000' },
    { title: 'Bước Qua Nước Mắt, Tự Khắc Trưởng Thành', price: '161,100', oldPrice: '179,000' },
    { title: 'Sếp Tôi - Làm Gì Khi Bạn Có Một Người Sếp Tồi', price: '169,200', oldPrice: '188,000' },
    { title: 'Chiến Thắng Con Quỷ Bên Trong', price: '99,000', oldPrice: '110,000' },
    { title: 'Phá Vỡ Khuôn Mẫu', price: '178,200', oldPrice: '198,000' },
    { title: "Ghi Chép Pháp Y - Những Cái Chết Bí Ẩn", image: "/img/book1.jpg", price: "115.500"},
    {
      title: "Ma Quỷ Dân Gian Kỳ",
      image: "/img/book2.jpg",
      price: "214.400"
    },
    {
      title: "Combo Sách Ghi Chép Pháp Y",
      image: "/img/book3.jpg",
      price: "286.405"
    },
    {
      title: "Bước Vào Bóng Tối",
      image: "/img/book4.jpg",
      price: "238.400"
    },
    { title: 'Hương bay ngược gió', price: '226,800₫', oldPrice: '252,000₫' },
    { title: 'Bước Qua Nước Mắt, Tự Khắc Trưởng Thành', price: '161,100₫', oldPrice: '179,000₫' },
    { title: 'Sếp Tôi - Làm Gì Khi Bạn Có Một Người Sếp Tồi', price: '169,200₫', oldPrice: '188,000₫' },
    { title: 'Chiến Thắng Con Quỷ Bên Trong', price: '99,000₫', oldPrice: '110,000₫' },
    { title: 'Phá Vỡ Khuôn Mẫu', price: '178,200₫', oldPrice: '198,000₫' },
    { title: "Ghi Chép Pháp Y - Những Cái Chết Bí Ẩn", image: "/img/book1.jpg", price: "115.500"},
    {
      title: "Ma Quỷ Dân Gian Kỳ",
      image: "/img/book2.jpg",
      price: "214.400"
    },
    {
      title: "Combo Sách Ghi Chép Pháp Y",
      image: "/img/book3.jpg",
      price: "286.405"
    },
    {
      title: "Bước Vào Bóng Tối",
      image: "/img/book4.jpg",
      price: "238.400"
    },
  ];

  // Function to render star rating
  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-center">
  //       <div className="alert alert-danger" role="alert">
  //         Error loading product details.
  //       </div>
  //       <button className="btn btn-warning my-3" onClick={() => window.location.href = '/'}>
  //         Return to Home Page
  //       </button>
  //     </div>
  //   );
  // }

  const book = data?.attributes;
  const imageUrl = (img) => `${process.env.REACT_APP_UPLOAD_URL}${img?.data?.attributes?.url}`;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section: Vertical Thumbnails and Main Image */}
        <div className="col-lg-6">
          <BookPreview/>

          <AuthorPubInfo/>
        </div>

        {/* Right Section: Book Details */}
        <div className="bg-light col-lg-6 p-4 rounded">
          <BookInfo/>

          <TableInfo/>

          <small>Giá sản phẩm trên Bookee.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...</small>

          <div className="bg-none mt-5">
            <BookDesc/>
          </div>
        </div>

      </div>

      <div className="row">
        <BookReview/>
      </div>

      <div className="row">
        {/* Right Column: Related Books */}
        <div className="col-12">
          <FeaturedBooks books={relatedBooks} />
        </div>
      </div>

    </div>
  );
};

export default Book;