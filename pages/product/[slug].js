import { useState } from "react";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { urlFor, client } from "../../lib/client";
const productDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  //grabbed from our main context
  const { increaseQuantity, decreaseQuantity, qty, onAdd } = useStateContext();
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty); // onAdd from context, taking in product selected and quantity from state.
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//export static paths, so next can generate url routes for the data we're pre-rendering via getStaticProps
//basically this request asks for all products, but only return the slug for each one
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);
  //create paths from query data - map over the array that the query returns and for each product returned, create an object with a params object
  //which contains a slug equaual to the current slug value of the product being returned
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));
  //finally return the paths generated from all of this - with a fallback that makes user wait (bad) if data doesn't exist. fix up later.
  return {
    paths,
    fallback: "blocking",
  };
};

//let's do our strapi api requests (statically pre-rendered) - async function
export const getStaticProps = async ({ params: { slug } }) => {
  //get products based on product slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  //get all products
  const productsQuery = '*[_type == "product"]';
  //actually fetch our query for single product based on slug
  const product = await client.fetch(query);
  //fetch query for all getting all products
  const products = await client.fetch(productsQuery);
  console.log(product);
  //finally actually return the data received so we can use it
  return {
    props: { products, product },
  };
};

export default productDetails;
