import React from 'react'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'
import FeaturedBooks from '../../components/FeaturedBooks/FeaturedBooks'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
const Home = () => {
  const relatedBooks = [
    { title: 'Hương bay ngược gió', price: '226,800', oldPrice: '252,000' },
    { title: 'Bước Qua Nước Mắt, Tự Khắc Trưởng Thành', price: '161,100', oldPrice: '179,000' },
    { title: 'Sếp Tôi - Làm Gì Khi Bạn Có Một Người Sếp Tồi', price: '169,200', oldPrice: '188,000' },
    { title: 'Chiến Thắng Con Quỷ Bên Trong', price: '99,000', oldPrice: '110,000' },
    { title: 'Phá Vỡ Khuôn Mẫu', price: '178,200₫', oldPrice: '198,000' },
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
  ];

  return (
    <div className="home container mt-5">
      {/* <Slider/> */}
      {/* <FeaturedProducts type="featured"/> */}
      {/* <Categories/> */}
      <div className="col-12">
        <FeaturedBooks books={relatedBooks} />
      </div>
      <div className="col-12">
        <FeaturedBooks books={relatedBooks} />
      </div>
      <div className="col-12">
        <FeaturedBooks books={relatedBooks} />
      </div>
      <div className="col-12">
        <FeaturedBooks books={relatedBooks} />
      </div>
      <div className="col-12">
        <FeaturedBooks books={relatedBooks} />
      </div>
    </div>
  )
}

export default Home