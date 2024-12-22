import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prevCart) => [...prevCart, { ...product, quantity }]);
  };
  
  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  };

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
