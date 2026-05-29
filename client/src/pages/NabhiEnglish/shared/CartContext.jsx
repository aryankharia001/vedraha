import { createContext, useContext, useState, useEffect, Suspense, lazy } from "react";
import NabhiHeader from "../../../components/NabhiHeader";

const CartContext = createContext(null);

const CART_KEY = "nabhiEnglishCart";

const loadCartItems = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
};

const saveCartItems = (key, items) => {
  try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadCartItems(CART_KEY));
  const [cartOpen, setCartOpen] = useState(false);

  const cartTotalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    saveCartItems(CART_KEY, cartItems);
  }, [cartItems]);

  const handleUpdateQty = (cartId, newQty) =>
    setCartItems((prev) =>
      newQty < 1 ? prev.filter((i) => i.cartId !== cartId) : prev.map((i) => i.cartId === cartId ? { ...i, quantity: newQty } : i)
    );

  const handleRemoveItem = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === item.cartId);
      if (existing) {
        return prev.map((i) => i.cartId === item.cartId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const clearCart = () => setCartItems([]);

  return (
    <>
      <NabhiHeader onCartOpen={() => setCartOpen(true)} cartCount={cartTotalQty} />
      <CartContext.Provider value={{ cartItems, cartOpen, setCartOpen, cartTotalQty, handleUpdateQty, handleRemoveItem, addToCart, clearCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
