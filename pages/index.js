import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div className="products-heading">
        <h2>Best Sellers</h2>
        <p>All kinds of Audio Tech!</p>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};

//let's do our strapi api requests (server side rendering) - async function
export const getServerSideProps = async () => {
  //FIRST LETS GET ALL OUR PRODUCT DATA
  //our sanity api query - asterix = fetch all, type is equal to product, sp basically, let's grab all products from our sanity dashboard content.
  const query = '*[_type == "product"]';
  //now lets create a products array from our query using sanity's client.fetch method, taking in our query as an argument - note await - as this is an async function.
  const products = await client.fetch(query);
  //NOW LETS GET OUR BANNER DATA THE SAME WAY
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
