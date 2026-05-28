import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// English
import NabhiHeader from "../../components/NabhiHeader";
import Home from "./Home";

// Hindi
import NabhiHeaderHindi from "../../components/NabhiHeaderHindi";
import HomeHn from "./Home";

/**
 * MainRouter
 *
 * Route map
 * ─────────────────────────────────────────────
 *  /      → English layout  (NabhiHeader   + Home)
 *  /hn    → Hindi layout    (NabhiHeaderHindi + HomeHn)
 *  *      → redirect to /
 * ─────────────────────────────────────────────
 *
 * Each layout is self-contained: the header is rendered
 * INSIDE the layout wrapper so it can receive cart props
 * that the page controls (e.g. cartCount, onCartOpen).
 */

/* ── English layout ──────────────────────────────────────── */
const EnglishLayout = () => {
  const [cartCount, setCartCount] = React.useState(0);
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <>
      <NabhiHeader
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />
      <Home
        cartCount={cartCount}
        setCartCount={setCartCount}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
    </>
  );
};

/* ── Hindi layout ────────────────────────────────────────── */
const HindiLayout = () => {
  const [cartCount, setCartCount] = React.useState(0);
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <>
      <NabhiHeaderHindi
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />
      <HomeHn
        cartCount={cartCount}
        setCartCount={setCartCount}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
    </>
  );
};

/* ── Router ──────────────────────────────────────────────── */
export default function MainRouter() {
  return (
    <Routes>
      {/* English home */}
      <Route path="/" element={<EnglishLayout />} />

      {/* Hindi home */}
      <Route path="/hn" element={<HindiLayout />} />

      {/* Catch-all → English home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}