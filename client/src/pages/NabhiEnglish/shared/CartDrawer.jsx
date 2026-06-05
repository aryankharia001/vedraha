import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X, ChevronDown } from "lucide-react";
import React from "react";
import { useCart } from "../../../components/CartContext";
import { backendurl } from "../../../App";

// ─── Swipeable Recommended Section ───────────────────────────────────────────
function RecommendedSection({ recommended, loadingRec }) {
  const trackRef = useRef(null);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const CARD_W = 160; // narrower cards

  const onPointerDown = (e) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) dragMoved.current = true;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    setActiveIdx(Math.min(Math.round(trackRef.current.scrollLeft / CARD_W), recommended.length - 1));
  };

  const scrollTo = (idx) => {
    trackRef.current?.scrollTo({ left: idx * CARD_W, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const handleCardClick = (path) => {
    if (!dragMoved.current && path) {
      window.location.href = path;
    }
  };

  return (
    <div style={{ borderTop: "1px solid #ebebeb", background: "#fafafa", paddingTop: 10, paddingBottom: 4 }}>
      {/* Section header */}
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 800, color: "#111", letterSpacing: 0.5, textTransform: "uppercase" }}>
          Complete your routine
        </span>
        {!loadingRec && recommended.length > 0 && (
          <span style={{ fontSize: 10, color: "#bbb", fontWeight: 500 }}>Swipe →</span>
        )}
      </div>

      {/* Loading shimmer */}
      {loadingRec ? (
        <div style={{ display: "flex", gap: 10, padding: "0 20px", overflow: "hidden" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                minWidth: 148,
                height: 80,
                borderRadius: 10,
                background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
                flexShrink: 0,
              }}
            />
          ))}
          <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
      ) : recommended.length === 0 ? null : (
        <>
          {/* Swipeable track */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onScroll={onScroll}
            style={{
              display: "flex",
              gap: 10,
              overflowX: "scroll",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "0 20px 6px",
              cursor: "grab",
              userSelect: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {recommended.map((product, idx) => (
              <div
                key={product.id ?? idx}
                onClick={() => handleCardClick(product.path)}
                style={{
                  minWidth: 148,
                  maxWidth: 148,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  border: "1px solid #e8e8e8",
                  borderRadius: 10,
                  background: "#fff",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "row", // horizontal layout for compact look
                  cursor: product.path ? "pointer" : "default",
                  transition: "box-shadow 0.2s ease",
                  alignItems: "center",
                  gap: 0,
                }}
                onMouseEnter={(e) => {
                  if (product.path) e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Product image — small square */}
                <div style={{ width: 60, height: 70, background: "#f5f5f5", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      draggable={false}
                      style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                    />
                  )}
                  {product.discountPercent && (
                    <div
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        background: "#111",
                        color: "#fff",
                        fontSize: 8,
                        fontWeight: 800,
                        padding: "1px 4px",
                        borderRadius: 3,
                        letterSpacing: 0.2,
                      }}
                    >
                      -{product.discountPercent}%
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div style={{ padding: "8px 10px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#111", lineHeight: 1.25, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {product.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#111" }}>
                      ₹{Number(product.discountedPrice ?? product.price).toLocaleString("en-IN")}
                    </span>
                    {product.discountedPrice && product.price && product.discountedPrice < product.price && (
                      <span style={{ fontSize: 9, color: "#bbb", textDecoration: "line-through" }}>
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#111", letterSpacing: 0.4, marginTop: 2 }}>
                    VIEW →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          {/* <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
            {recommended.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: i === activeIdx ? 14 : 5,
                  height: 5,
                  borderRadius: 3,
                  background: i === activeIdx ? "#111" : "#ddd",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}

// ─── Main CartDrawer ─────────────────────────────────────────────────────────
export default function CartDrawer({ onBuyNow }) {
  const { cartItems, cartOpen: isOpen, closeCart: onClose, updateQty, removeItem } = useCart();
  const [recommended, setRecommended] = useState([]);
  const [loadingRec, setLoadingRec] = useState(false);

  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cartItems.reduce((s, i) => s + i.variantPriceNum * i.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingRec(true);
    fetch(`${backendurl}/api/exclusiveproducts/`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : data.results ?? [];
        const cartProductIds = new Set(cartItems.map((i) => i.productId));
        const normalized = list.map((p) => ({ ...p, id: p._id ?? p.id }));
        setRecommended(normalized.filter((p) => !cartProductIds.has(p.id)));
      })
      .catch(() => setRecommended([]))
      .finally(() => setLoadingRec(false));
  }, [isOpen, cartItems]);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 8000 }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          width: 420,
          maxWidth: "95vw",
          height: "96%",
          background: "#fff",
          zIndex: 8001,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.14)",
          transform: isOpen ? "translateX(0)" : "translateX(500px)",
          transition: "transform 1.0s cubic-bezier(0.2,1,1,1)",
          fontFamily: "var(--font-new-1)",
          overflow: "hidden",
          borderRadius: "15px"
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "18px 20px 14px",
            borderBottom: "1px solid #ebebeb",
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#111", letterSpacing: -0.3 }}>Cart</span>
          {totalQty > 0 && (
            <sup
              style={{
                fontSize: 11, fontWeight: 700, color: "#fff", backgroundColor: "#000",
                borderRadius: "50%", minWidth: 18, height: 18, padding: "0 4px",
                display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: -8,
              }}
            >
              {totalQty}
            </sup>
          )}
          <button
            onClick={onClose}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#111" }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* ── Empty state ── */}
        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <ShoppingBag size={40} color="#ccc" strokeWidth={1.4} />
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginTop: 16 }}>Your cart is empty</div>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 6, marginBottom: 24 }}>Add a product to get started</div>
            <button
              onClick={onClose}
              style={{ padding: "10px 28px", background: "#111", color: "#fff", border: "none", borderRadius: 24, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ── SCROLLABLE CART ITEMS ── */}
            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {/* Secure payment badge */}
              <div
                style={{
                  margin: "12px 20px 0",
                  padding: "9px 14px",
                  background: "#f7f7f7",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#111", letterSpacing: 0.6, marginBottom: 2 }}>SECURE PAYMENT</div>
                  <div style={{ fontSize: 10, color: "#999", lineHeight: 1.5 }}>
                    Visa, Mastercard, PayPal, Apple Pay,<br />3X or 4X free of charge
                  </div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#111", flexShrink: 0, marginTop: 3 }} />
              </div>

              {/* Cart items list */}
              <div style={{ padding: "0 20px" }}>
                {cartItems.map((item) => (
                  <div key={item.cartId} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid #f2f2f2" }}>
                    <div style={{ width: 80, height: 96, borderRadius: 10, overflow: "hidden", background: "#f2f2f2", flexShrink: 0, border: "1px solid #ebebeb" }}>
                      <img src={item.productImage} alt={item.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 1 }}>{item.productName}</div>
                          <div style={{ fontSize: 11, color: "#999", marginBottom: 6 }}>{item.productTagline || "Subscription"}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", flexShrink: 0, marginLeft: 8 }}>
                          ₹{(item.variantPriceNum * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                      <button
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 3,
                          padding: "3px 9px", border: "1.5px solid #111", borderRadius: 5,
                          background: "#fff", fontSize: 10, fontWeight: 700, color: "#111",
                          cursor: "pointer", marginBottom: 6, letterSpacing: 0.3, textTransform: "uppercase",
                        }}
                      >
                        {item.variantLabel}
                        <ChevronDown size={10} strokeWidth={2.5} />
                      </button>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #ddd", borderRadius: 7, overflow: "hidden" }}>
                          <button
                            onClick={() => updateQty(item.cartId, item.quantity - 1)}
                            style={{ width: 28, height: 28, background: "#fff", border: "none", cursor: "pointer", color: item.quantity === 1 ? "#ccc" : "#111", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Minus size={11} strokeWidth={2.5} />
                          </button>
                          <span style={{ minWidth: 24, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#111" }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.cartId, item.quantity + 1)}
                            style={{ width: 28, height: 28, background: "#fff", border: "none", cursor: "pointer", color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Plus size={11} strokeWidth={2.5} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: "#bbb", padding: 0, letterSpacing: 0.3 }}
                        >
                          <Trash2 size={11} strokeWidth={2} />
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── STATIC RECOMMENDED SECTION (never scrolls away) ── */}
            <RecommendedSection recommended={recommended} loadingRec={loadingRec} />

            {/* ── Sticky footer ── */}
            <div style={{ borderTop: "1px solid #ebebeb", padding: "2px 20px 20px", flexShrink: 0, background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 400, color: "#111" }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 400, color: "#111" }}>₹{totalAmt.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ fontSize: 11, color: "#bbb", marginBottom: 12 }}>Discount codes applied at checkout</div>
              <button
                onClick={onBuyNow}
                style={{
                  width: "100%", padding: "15px 0", background: "#111", color: "#fff",
                  border: "none", borderRadius: 0, fontSize: 13, fontWeight: 400,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 10, letterSpacing: 0.5,
                  fontFamily: "var(--font-new-1)",
                }}
              >
                CHECKOUT SECURELY
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}