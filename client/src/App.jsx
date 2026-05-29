// src/App.jsx  (updated)
// ─────────────────────────────────────────────────────────────────────────────
// Changes from original:
//  1. Import CartProvider + useCart + CartDrawer
//  2. Wrap AppContent with <CartProvider>
//  3. Mount ONE global <CartDrawer> inside AppContent
//  4. Pass openCart / cartTotalQty into every header
// ─────────────────────────────────────────────────────────────────────────────

import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { initTrackingCookies } from './utils/trackingCookies'

// ── Cart (global) ─────────────────────────────────────────────────────────────
import { CartProvider, useCart } from './components/CartContext'
const CartDrawer = lazy(() => import('./pages/NabhiEnglish/shared/CartDrawer'))

// Initialize tracking cookies on app load
initTrackingCookies()

// ── Headers per Language ──────────────────────────────────────────────────────
import NabhiHeader       from "./components/NabhiHeader";
import NabhiHeaderHindi  from "./components/NabhiHeaderHindi";
import NabhiHeaderTamil  from "./components/NabhiHeaderTamil";
import NabhiHeaderTelugu from "./components/NabhiHeaderTelugu";

// ── Footers per Language ──────────────────────────────────────────────────────
import Footer       from "./components/Footer";
import FooterHindi  from "./components/FooterHindi";
import FooterTamil  from "./components/FooterTamil";
import FooterTelugu from "./components/FooterTelugu";

// ── Home Pages per Language ───────────────────────────────────────────────────
import Home       from './pages/NabhiHome/Home'
import HomeHindi  from './pages/NabhiHome/Home.hi'
import HomeTamil  from './pages/NabhiHome/Home.ta'
import HomeTelugu from './pages/NabhiHome/Home.te'

// ── Hindi Product Pages ────────────────────────────────────────────────────────
import NabhiJointPage      from './pages/NabhiHindi/NabhiJoint/NabhiJointPage'
import NabhiEyePage        from './pages/NabhiHindi/NabhiEye/NabhiEyePage'
import NabhiHairPage       from './pages/NabhiHindi/NabhiHair/NabhiHairPage'
import NabhiSleepPage      from './pages/NabhiHindi/NabhiSleep/NabhiSleepPage'
import NabhiShilajitPage   from './pages/NabhiHindi/NabhiShilajit/NabhiShilajitPage'
import NabhiMenstrualPage  from './pages/NabhiHindi/NabhiMensturation/NabhiMenstrualPage'
import NabhiAmritPage      from './pages/NabhiHindi/NabhiAmrit/NabhiAmritPage'
import NabhiAboutHindi     from './pages/NabhiHindi/NabhiAboutHindi'
import NabhiContactHindi   from './pages/NabhiHindi/NabhiContactHindi'

import ExclusiveProductCatalog        from './pages/ExclusiveProductCatalog'
import ExclusiveProductCatalogHindi   from './pages/ExclusiveProductCatalogHindi'
import ExclusiveProductCatalogTamil   from './pages/ExclusiveProductCatalogTamil'
import ExclusiveProductCatalogTelugu  from './pages/ExclusiveProductCatalogTelugu'
import MyOrders        from './pages/Nabhi Oil/MyOrders'
import MyOrdersEnglish from './pages/Nabhi Oil/MyOrdersEnglish'

// ── English Product Pages ─────────────────────────────────────────────────────
import NabhiJointPageEng     from './pages/NabhiEnglish/NabhiJointEng/NabhiJointPageEng'
import NabhiEyePageEng       from './pages/NabhiEnglish/NabhiEyeEng/NabhiEyePageEng'
import NabhiHairPageEng      from './pages/NabhiEnglish/NabhiHairEng/NabhiHairPageEng'
import NabhiSleepPageEng     from './pages/NabhiEnglish/NabhiSleepEng/NabhiSleepPageEng'
import NabhiShilajitPageEng  from './pages/NabhiEnglish/NabhiShilajitEng/NabhiShilajitPageEng'
import NabhiMenstrualPageEng from './pages/NabhiEnglish/NabhiMenstrualEng/NabhiMenstrualPageEng'
import NabhiAmritPageEng     from './pages/NabhiEnglish/NabhiAmritEng/NabhiAmritPageEng'
import NabhiAboutEng         from './pages/NabhiEnglish/NabhiAboutEng'
import NabhiContactEng       from './pages/NabhiEnglish/NabhiContactEng'

// ── Telugu Product Pages ──────────────────────────────────────────────────────
import NabhiJointPageTelugu     from './pages/NabhiTelugu/NabhiJointTelugu/NabhiJointPageTelugu'
import NabhiEyePageTelugu       from './pages/NabhiTelugu/NabhiEyeTelugu/NabhiEyePageTelugu'
import NabhiHairPageTelugu      from './pages/NabhiTelugu/NabhiHairTelugu/NabhiHairPageTelugu'
import NabhiSleepPageTelugu     from './pages/NabhiTelugu/NabhiSleepTelugu/NabhiSleepPageTelugu'
import NabhiShilajitPageTelugu  from './pages/NabhiTelugu/NabhiShilajitTelugu/NabhiShilajitPageTelugu'
import NabhiMenstrualPageTelugu from './pages/NabhiTelugu/NabhiMenstrualTelugu/NabhiMenstrualPageTelugu'
import NabhiAmritPageTelugu     from './pages/NabhiTelugu/NabhiAmritTelugu/NabhiAmritPageTelugu'
import NabhiAboutTelugu         from './pages/NabhiTelugu/NabhiAboutTelugu'
import NabhiContactTelugu       from './pages/NabhiTelugu/NabhiContactTelugu'

// ── Tamil Product Pages ───────────────────────────────────────────────────────
import NabhiJointPageTamil     from './pages/NabhiTamil/NabhiJointTamil/NabhiJointPageTamil'
import NabhiEyePageTamil       from './pages/NabhiTamil/NabhiEyeTamil/NabhiEyePageTamil'
import NabhiHairPageTamil      from './pages/NabhiTamil/NabhiHairTamil/NabhiHairPageTamil'
import NabhiSleepPageTamil     from './pages/NabhiTamil/NabhiSleepTamil/NabhiSleepPageTamil'
import NabhiShilajitPageTamil  from './pages/NabhiTamil/NabhiShilajit/NabhiShilajitPageTamil'
import NabhiMenstrualPageTamil from './pages/NabhiTamil/NabhiMenstrualTamil/NabhiMenstrualPageTamil'
import NabhiAmritPageTamil     from './pages/NabhiTamil/NabhiAmritTamil/NabhiAmritPageTamil'
import NabhiAboutTamil         from './pages/NabhiTamil/NabhiAboutTamil'
import NabhiContactTamil       from './pages/NabhiTamil/NabhiContactTamil'

import RefundPolicy         from './pages/RefundPolicy'
import PrivacyPolicy        from './pages/PrivacyPolicy'
import ExcFaliurePageHindi  from './pages/razorpayPayments/ExcFaliurePageHindi'
import ExcSuccessPageTelugu from './pages/ExcSuccessPageTelugu'
import ExcSuccessPage       from './pages/ExcSuccessPage'
import ExcSuccessPageHindi  from './pages/ExcSuccessPageHindi'
import axios from 'axios'

export const backendurl = import.meta.env.VITE_BACKEND_URL;

// ─────────────────────────────────────────────────────────────────────────────
// AppContent – consumes CartContext
// ─────────────────────────────────────────────────────────────────────────────
function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  // Pull cart controls from context
  const {
    cartItems,
    cartOpen,
    cartTotalQty,
    openCart,
    closeCart,
    updateQty,
    removeItem,
  } = useCart();

  // ── Header selector ─────────────────────────────────────────────────────────
  const renderGlobalHeader = () => {
    const commonProps = { onCartOpen: openCart, cartCount: cartTotalQty };

    if (path === "/hn" || path === "/hn/" || path.includes("-hn") || path.includes("-hindi") || path === "/products-hn" || path === "/success-hn")
      return <NabhiHeaderHindi {...commonProps} />;

    if (path === "/tlg" || path === "/tlg/" || path.includes("-telugu") || path === "/products-tlg" || path === "/success-telugu")
      return <NabhiHeaderTelugu {...commonProps} />;

    if (path === "/tml" || path === "/tml/" || path.includes("-tamil") || path === "/products-tml")
      return <NabhiHeaderTamil {...commonProps} />;

    return <NabhiHeader {...commonProps} />;
  };

  // ── Footer selector ──────────────────────────────────────────────────────────
  const renderGlobalFooter = () => {
    if (path === "/hn" || path === "/hn/" || path.includes("-hn") || path.includes("-hindi") || path === "/products-hn" || path === "/success-hn")
      return <FooterHindi />;

    if (path === "/tlg" || path === "/tlg/" || path.includes("-telugu") || path === "/products-tlg" || path === "/success-telugu")
      return <FooterTelugu />;

    if (path === "/tml" || path === "/tml/" || path.includes("-tamil") || path === "/products-tml")
      return <FooterTamil />;

    return <Footer />;
  };

  const openShiprocketGateway = async (clickEvent, checkoutItems) => {
      if (!window.HeadlessCheckout?.addToCart) {
        alert("Checkout is loading. Please try again in a moment.");
        return;
      }
      try {
        const paramsObject = Object.fromEntries(
          new URLSearchParams(window.location.search).entries(),
        );
        const queryString = new URLSearchParams(paramsObject).toString();
        const response = await axios.post(
          `${backendurl}/api/ad/generate_shiprocket_token`,
          {
            items: checkoutItems.map((i) => ({
              variant_id: i.variantId,
              quantity: i.quantity,
            })),
            redirect_url: `${window.location.origin}/exc-payment-success${queryString ? `?${queryString}` : ""}`,
            paramsObject,
          },
          { headers: { "Content-Type": "application/json" } },
        );
        const token = response.data?.result?.token;
        if (!token) throw new Error("No token");
        window.HeadlessCheckout.addToCart(clickEvent, token, {
          fallbackUrl: `${window.location.origin}/payment-failure`,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to open checkout. Please try again.");
      } 
    };

  // ── Checkout handler for cart drawer ─────────────────────────────────────────
  // Reuse whatever checkout logic your ProductPage uses (Shiprocket, Razorpay, etc.)
  // For now we fire the same openShiprocketGateway pattern. Adjust as needed.
  const handleCartBuyNow = () => {
    // trackFacebookEvent("InitiateCheckout");
    const totalValue = cartItems.reduce(
      (s, i) => s + i.variantPriceNum * i.quantity,
      0,
    );
    const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
    const contents = cartItems.map((i) => ({
      id: i.variantId,
      quantity: i.quantity,
      item_price: i.variantPriceNum,
      title: i.productName,
    }));

    openShiprocketGateway(
      new MouseEvent("click", { bubbles: true }),
      cartItems,
    );
  };

  return (
    <>
      {/* ── Global header (receives cart open + count) ── */}
      {renderGlobalHeader()}

      {/* ── ONE global CartDrawer for the whole app ── */}
      <Suspense fallback={null}>
        <CartDrawer
          isOpen={cartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
          onBuyNow={handleCartBuyNow}
        />
      </Suspense>

      <Routes>
        {/* ── Core ─────────────────────────────────────────────────────── */}
        <Route path="/"               element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy"  element={<RefundPolicy />} />

        {/* ── Hindi ────────────────────────────────────────────────────── */}
        <Route path="/hn"                              element={<HomeHindi />} />
        <Route path="/products-hn"                     element={<ExclusiveProductCatalogHindi />} />
        <Route path="/products/nabhi-joint-hn"         element={<NabhiJointPage />} />
        <Route path="/products/nabhi-eye-hn"           element={<NabhiEyePage />} />
        <Route path="/products/nabhi-hair-hn"          element={<NabhiHairPage />} />
        <Route path="/products/nabhi-sleep-hn"         element={<NabhiSleepPage />} />
        <Route path="/products/nabhi-shilajit-hn"      element={<NabhiShilajitPage />} />
        <Route path="/products/nabhi-menstrual-hn"     element={<NabhiMenstrualPage />} />
        <Route path="/products/nabhi-amrit-hn"         element={<NabhiAmritPage />} />
        <Route path="/products/about-hn"               element={<NabhiAboutHindi />} />
        <Route path="/products/contact-hn"             element={<NabhiContactHindi />} />
        <Route path="/success-hn"                      element={<ExcSuccessPageHindi />} />
        <Route path="/my-orders-hn"                    element={<MyOrders />} />

        {/* ── English ──────────────────────────────────────────────────── */}
        <Route path="/products"                        element={<ExclusiveProductCatalog />} />
        <Route path="/products/nabhi-joint-en"         element={<NabhiJointPageEng />} />
        <Route path="/products/nabhi-eye-en"           element={<NabhiEyePageEng />} />
        <Route path="/products/nabhi-hair-en"          element={<NabhiHairPageEng />} />
        <Route path="/products/nabhi-sleep-en"         element={<NabhiSleepPageEng />} />
        <Route path="/products/nabhi-shilajit-en"      element={<NabhiShilajitPageEng />} />
        <Route path="/products/nabhi-menstrual-en"     element={<NabhiMenstrualPageEng />} />
        <Route path="/products/nabhi-amrit-en"         element={<NabhiAmritPageEng />} />
        <Route path="/products/nabhi-about-en"         element={<NabhiAboutEng />} />
        <Route path="/products/nabhi-contact-en"       element={<NabhiContactEng />} />
        <Route path="/success-en"                      element={<ExcSuccessPage />} />
        <Route path="/my-orders-en"                    element={<MyOrdersEnglish />} />

        {/* ── Telugu ───────────────────────────────────────────────────── */}
        <Route path="/tlg"                             element={<HomeTelugu />} />
        <Route path="/products-tlg"                    element={<ExclusiveProductCatalogTelugu />} />
        <Route path="/products/nabhi-joint-telugu"     element={<NabhiJointPageTelugu />} />
        <Route path="/products/nabhi-eye-telugu"       element={<NabhiEyePageTelugu />} />
        <Route path="/products/nabhi-hair-telugu"      element={<NabhiHairPageTelugu />} />
        <Route path="/products/nabhi-sleep-telugu"     element={<NabhiSleepPageTelugu />} />
        <Route path="/products/nabhi-shilajit-telugu"  element={<NabhiShilajitPageTelugu />} />
        <Route path="/products/nabhi-menstrual-telugu" element={<NabhiMenstrualPageTelugu />} />
        <Route path="/products/nabhi-amrit-telugu"     element={<NabhiAmritPageTelugu />} />
        <Route path="/products/about-telugu"           element={<NabhiAboutTelugu />} />
        <Route path="/products/contact-telugu"         element={<NabhiContactTelugu />} />
        <Route path="/success-telugu"                  element={<ExcSuccessPageTelugu />} />

        {/* ── Tamil ────────────────────────────────────────────────────── */}
        <Route path="/tml"                             element={<HomeTamil />} />
        <Route path="/products-tml"                    element={<ExclusiveProductCatalogTamil />} />
        <Route path="/products/nabhi-joint-tamil"      element={<NabhiJointPageTamil />} />
        <Route path="/products/nabhi-eye-tamil"        element={<NabhiEyePageTamil />} />
        <Route path="/products/nabhi-hair-tamil"       element={<NabhiHairPageTamil />} />
        <Route path="/products/nabhi-sleep-tamil"      element={<NabhiSleepPageTamil />} />
        <Route path="/products/nabhi-shilajit-tamil"   element={<NabhiShilajitPageTamil />} />
        <Route path="/products/nabhi-menstrual-tamil"  element={<NabhiMenstrualPageTamil />} />
        <Route path="/products/nabhi-amrit-tamil"      element={<NabhiAmritPageTamil />} />
        <Route path="/products/about-tamil"            element={<NabhiAboutTamil />} />
        <Route path="/products/contact-tamil"          element={<NabhiContactTamil />} />

        {/* ── Payment fallbacks ─────────────────────────────────────────── */}
        <Route path="/payment-faliure" element={<ExcFaliurePageHindi />} />
      </Routes>

      {renderGlobalFooter()}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      {/* CartProvider wraps everything — one shared cart for the whole app */}
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;