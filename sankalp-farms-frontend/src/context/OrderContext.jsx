import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    id: "SNK-2026-04",
    status: "placed", // Options: placed, processing, shipped, delivered
    items: ["Mango Pulp", "Cashews"],
    total: 1300
  });

  const updateOrderStatus = (newStatus) => {
    setOrder(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <OrderContext.Provider value={{ order, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);