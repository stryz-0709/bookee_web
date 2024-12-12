import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import Contact from '../../components/Contact/Contact'
import FeaturedBooks from '../../components/FeaturedBooks/FeaturedBooks'
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
const Home = () => {
  return (
    <div className="home container">
      <div className="col-12">
        <Slider />
      </div>
      {/* <FeaturedProducts type="featured"/> */}
      {/* <Categories/> */}
      <div className="col-12 mt-5">
        <FeaturedBooks genre={"Textbook"} />
      </div>
      <div className="col-12">
        <FeaturedBooks genre={"Novel"} />
      </div>
      <div className="col-12">
        <FeaturedBooks genre={"Politics"} />
      </div>
      <div className="col-12">
        <FeaturedBooks genre={"Comic"} />
      </div>
    </div>
  )
}

export default Home