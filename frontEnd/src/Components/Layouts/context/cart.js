import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "./auth";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    let existing = localStorage.getItem(`cart${auth?.user?.name}`);
    if (existing) setItem(JSON.parse(existing));
  }, [auth?.user?.name]);

  return (
    <CartContext.Provider value={[item, setItem]}>
      {children}
    </CartContext.Provider>
  );
};

//Custom Hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
