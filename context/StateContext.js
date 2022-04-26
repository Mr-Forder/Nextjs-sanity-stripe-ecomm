import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1); //set quantity state - takes in prevState of qty (which is prevQty) and adds 1
  };

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
