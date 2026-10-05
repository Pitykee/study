import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // a kosár elemei: { id, name, price, qty }
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((elozo) => {
      const meglevo = elozo.find((t) => t.id === product.id);
      if (meglevo) {
        return elozo.map((t) =>
          t.id === product.id ? { ...t, qty: t.qty + 1 } : t,
        );
      } else {
        return [...elozo, { ...product, qty: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart csak CartProvider-en belül használható!");
  return ctx;
}
