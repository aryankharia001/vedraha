// src/context/CartContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Drop this file in: src/context/CartContext.jsx
// Then wrap <App /> (or <AppContent />) with <CartProvider> in App.jsx
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CART_KEY = "exclusiveCart"; // must match product.cartStorageKey

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
};

const saveCart = (items) => {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { }
};

// ─── Context ─────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems]   = useState(loadCart);
  const [cartOpen,  setCartOpen]    = useState(false);

  // Persist every time cartItems changes
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // ── Mutations ──────────────────────────────────────────────────────────────
  const addToCart = useCallback((product, variant, quantity = 1) => {
    const cartId = `${product.id}-${variant.id}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      return existing
        ? prev.map((i) =>
            i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [
            ...prev,
            {
              cartId,
              productId:       product.id,
              productName:     product.name,
              productTagline:  product.tagline,
              productImage:    product.image,
              variantId:       String(variant.externalVariantId),
              variantLabel:    variant.label,
              variantPrice:    variant.price,
              variantPriceNum: variant.priceNum,
              quantity,
            },
          ];
    });
  }, []);

  const updateQty = useCallback((cartId, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const removeItem = useCallback((cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const cartTotalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotalAmt = cartItems.reduce((s, i) => s + i.variantPriceNum * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        cartTotalQty,
        cartTotalAmt,
        openCart:   () => setCartOpen(true),
        closeCart:  () => setCartOpen(false),
        addToCart,
        updateQty,
        removeItem,
        setCartItems, // escape hatch for legacy code
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}