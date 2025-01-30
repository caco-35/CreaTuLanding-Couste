// CartContext.js
import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cambiar cartItems de un array a un objeto
  const [cartItems, setCartItems] = useState({});

  const addToCart = (product, quantity) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart[product.id]; // Usar el id para verificar si el producto ya está en el carrito
      if (existingProduct) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        return {
          ...prevCart,
          [product.id]: { 
            ...existingProduct, 
            quantity: existingProduct.quantity + quantity 
          },
        };
      } else {
        // Si no está, lo agregamos al carrito con la cantidad especificada
        return {
          ...prevCart,
          [product.id]: { ...product, quantity },
        };
      }
    });
  };


  const removeFromCart = (id) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id]; // Eliminar el producto del carrito usando su id
      return newCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevCart) => {
      const product = prevCart[id];
      return {
        ...prevCart,
        [id]: { 
          ...product, 
          quantity: Math.max(1, quantity), // Asegurar que la cantidad nunca sea menor a 1
        },
      };
    });
  };

  const clearCart = () => setCartItems({});

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  
  console.log(cartItems);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
