import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getUserId = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? userInfo._id : 'guest';
  };

  const [userId, setUserId] = useState(getUserId());
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isLoaded = useRef(false);

  // Load data when user changes
  useEffect(() => {
    const currentId = getUserId();
    if (currentId !== userId) {
      setUserId(currentId);
      isLoaded.current = false;
    }

    const savedData = localStorage.getItem(`sankalp_cart_${currentId}`);
    setCart(savedData ? JSON.parse(savedData) : []);
    isLoaded.current = true;
  }, [userId]); 

  // Save data when cart changes
  useEffect(() => {
    if (isLoaded.current && userId) {
      localStorage.setItem(`sankalp_cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]);

  // --- Core Functions ---

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ADDED: Update Quantity Logic
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent 0 or negative quantities
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));

  // ADDED: Derived Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, // Exported
      totalPrice,     // Exported
      isCartOpen, 
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);