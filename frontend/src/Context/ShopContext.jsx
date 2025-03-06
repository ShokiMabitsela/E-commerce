import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const currency = "R";
  const delivery_fee = 100;

  const value = {
    products,
    cart, // Provide cart state
    setCart, // Provide function to update cart
    currency,
    delivery_fee,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

// Prop validation
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
