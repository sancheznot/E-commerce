import { set } from "mongoose";

const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? localStorage : null;
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.navigator.geolocation.getCurrentPosition((pos, err) => {
        if (!err) {
          
        }
      });
    }
    if (productsInCart?.length > 0) {
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    }
  }, [productsInCart]);

  useEffect(() => {
    if (ls && ls.getItem("productsInCart")) {
      setProductsInCart(JSON.parse(ls.getItem("productsInCart")));
    }
  }, []);
  const addProductToCart = (id) => {
    setProductsInCart([...productsInCart, id]);
  };

  const removeProductFromCart = (id) => {
    setProductsInCart((prev) => {
      const pos = prev.indexOf(id);
      if (pos !== -1) {
        console.log(prev)
        return prev.filter((value, i) => i !== pos);
      }
      return prev;
    });
  };
  const clearCart = () => {
    setProductsInCart([]);
  }
  return (
    <CartContext.Provider
      value={{ productsInCart, setProductsInCart, addProductToCart, removeProductFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
