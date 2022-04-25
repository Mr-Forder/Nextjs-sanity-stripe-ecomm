import { useState } from "react";
import { urlFor, client } from "../../lib/client";
const productDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
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