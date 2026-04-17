import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(()=>{
    const SavedCart=localStorage.getItem(('sankalp_cart'));
    return SavedCart?JSON.parse(SavedCart):[]

  });
 useEffect(()=>{
   localStorage.setItem('sankalp_cart',JSON.stringify(cart))
 },[cart]) 
  // Add to Cart Logic
  const addToCart = (product) => {
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
     
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate Total Items for Navbar Badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate Total Price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for easy use
export const useCart = () => useContext(CartContext);