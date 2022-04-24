import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Sellers</h2>
        <p>All kinds of Audio Tech!</p>
        <div className="products-container"></div>
        {["product 1", "product 2"].map((product) => product)}
      </div>
      <FooterBanner />
    </>
  );
};

export default Home;
