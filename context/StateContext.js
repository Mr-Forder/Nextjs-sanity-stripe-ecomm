import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]); //items in cart - default is empty array, to be filled with products
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  //ADD A PRODUCT TO CART////////////////////////////////////////////////////////////////////////////////////////////////////
  const onAdd = (product, quantity) => {
    //check to see if product is already in cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    //set total price to prev total price state plus price of product, times quantity of products in cart
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    //then set total quantities to prev totalquantities state plus quantity
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    //IF ITEM IS ALEADY IN CART
    if (checkProductInCart) {
      //create updated cart items - by mapping over cartItems
      const updatedCartItems = cartItems.map((cartProduct) => {
        //if cartproduct in cartItems array matches id with id of product being added, then return...
        if (cartProduct._id === product._id)
          return {
            ...cartProduct, //...a new object that spreads the product's (inside cartItems array) quantity and adds the quantity value specified by the user to it.
            quantity: cartProduct.quantity + quantity,
          };
      });
      //finally, set cartItems to our updatedCartItems array
      setCartItems(updatedCartItems);
    } else {
      //AND IF ITEM ISN'T ALREADY IN CART
      product.quantity = quantity; //product quantity becomes equal to quantity set by user
      setCartItems([...cartItems, { ...product }]); //set cartItems to an empty array that spreads the current cart items and adds the new product to it.
    }
    //then get react hot toast to tell user what's happened
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  //HANDLER TO INCREASE ITEM QUANITIY IN CART////////////////////////////////////////////////////////////////////////////////////////////////////
  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1); //set quantity state - takes in prevState of qty (which is prevQty) and adds 1
  };
  //HANDLER TO DECREASE ITEM QUANTITY IN CART////////////////////////////////////////////////////////////////////////////////////////////////////
  const decreaseQuantity = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1; //check if prevQty is less than 1 - if so, return 1
      return prevQty - 1; //else return prevQty - 1. Note this shorthand method of writing if statements.
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
