const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? localStorage : null;
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.navigator.geolocation.getCurrentPosition((pos, err) => {
        if (!err) {
          console.log(pos.coords);
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

  return (
    <CartContext.Provider value={{ productsInCart, setProductsInCart }}>
      {children}
    </CartContext.Provider>
  );
}
