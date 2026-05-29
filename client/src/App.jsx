import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { initTrackingCookies } from './utils/trackingCookies'

// Initialize tracking cookies on app load
initTrackingCookies()

// ── Headers per Language ──────────────────────────────────────────────────────
import NabhiHeader from "./components/NabhiHeader"; // English / Default
import NabhiHeaderHindi from "./components/NabhiHeaderHindi";
import NabhiHeaderTamil from "./components/NabhiHeaderTamil";
import NabhiHeaderTelugu from "./components/NabhiHeaderTelugu";

// ── Home Pages per Language ───────────────────────────────────────────────────
import Home from './pages/NabhiHome/Home'
import HomeHindi from './pages/NabhiHome/Home.hi'
import HomeTamil from './pages/NabhiHome/Home.ta'
import HomeTelugu from './pages/NabhiHome/Home.te'

// ── Hindi Product Pages ────────────────────────────────────────────────────────
import NabhiJointPage from './pages/NabhiHindi/NabhiJoint/NabhiJointPage'
import NabhiEyePage from './pages/NabhiHindi/NabhiEye/NabhiEyePage'
import NabhiHairPage from './pages/NabhiHindi/NabhiHair/NabhiHairPage'
import NabhiSleepPage from './pages/NabhiHindi/NabhiSleep/NabhiSleepPage'
import NabhiShilajitPage from './pages/NabhiHindi/NabhiShilajit/NabhiShilajitPage'
import NabhiMenstrualPage from './pages/NabhiHindi/NabhiMensturation/NabhiMenstrualPage'
import NabhiAmritPage from './pages/NabhiHindi/NabhiAmrit/NabhiAmritPage'
import NabhiAboutHindi from './pages/NabhiHindi/NabhiAboutHindi'
import NabhiContactHindi from './pages/NabhiHindi/NabhiContactHindi'
import ExclusiveProductCatalog from './pages/ExclusiveProductCatalog'
import ExclusiveProductCatalogHindi from './pages/ExclusiveProductCatalogHindi'
import ExclusiveProductCatalogTamil from './pages/ExclusiveProductCatalogTamil'
import ExclusiveProductCatalogTelugu from './pages/ExclusiveProductCatalogTelugu'

// ── English Product Pages ─────────────────────────────────────────────────────
import NabhiJointPageEng from './pages/NabhiEnglish/NabhiJointEng/NabhiJointPageEng'
import NabhiEyePageEng from './pages/NabhiEnglish/NabhiEyeEng/NabhiEyePageEng'
import NabhiHairPageEng from './pages/NabhiEnglish/NabhiHairEng/NabhiHairPageEng'
import NabhiSleepPageEng from './pages/NabhiEnglish/NabhiSleepEng/NabhiSleepPageEng'
import NabhiShilajitPageEng from './pages/NabhiEnglish/NabhiShilajitEng/NabhiShilajitPageEng'
import NabhiMenstrualPageEng from './pages/NabhiEnglish/NabhiMenstrualEng/NabhiMenstrualPageEng'
import NabhiAmritPageEng from './pages/NabhiEnglish/NabhiAmritEng/NabhiAmritPageEng'
import NabhiAboutEng from './pages/NabhiEnglish/NabhiAboutEng'
import NabhiContactEng from './pages/NabhiEnglish/NabhiContactEng'
import MyOrdersEnglish from './pages/Nabhi Oil/MyOrdersEnglish'
// ── Telugu Product Pages ──────────────────────────────────────────────────────
import NabhiJointPageTelugu from './pages/NabhiTelugu/NabhiJointTelugu/NabhiJointPageTelugu'
import NabhiEyePageTelugu from './pages/NabhiTelugu/NabhiEyeTelugu/NabhiEyePageTelugu'
import NabhiHairPageTelugu from './pages/NabhiTelugu/NabhiHairTelugu/NabhiHairPageTelugu'
import NabhiSleepPageTelugu from './pages/NabhiTelugu/NabhiSleepTelugu/NabhiSleepPageTelugu'
import NabhiShilajitPageTelugu from './pages/NabhiTelugu/NabhiShilajitTelugu/NabhiShilajitPageTelugu'
import NabhiMenstrualPageTelugu from './pages/NabhiTelugu/NabhiMenstrualTelugu/NabhiMenstrualPageTelugu'
import NabhiAmritPageTelugu from './pages/NabhiTelugu/NabhiAmritTelugu/NabhiAmritPageTelugu'
import NabhiAboutTelugu from './pages/NabhiTelugu/NabhiAboutTelugu'
import NabhiContactTelugu from './pages/NabhiTelugu/NabhiContactTelugu'

// ── Tamil Product Pages ───────────────────────────────────────────────────────
import NabhiJointPageTamil from './pages/NabhiTamil/NabhiJointTamil/NabhiJointPageTamil'
import NabhiEyePageTamil from './pages/NabhiTamil/NabhiEyeTamil/NabhiEyePageTamil'
import NabhiHairPageTamil from './pages/NabhiTamil/NabhiHairTamil/NabhiHairPageTamil'
import NabhiSleepPageTamil from './pages/NabhiTamil/NabhiSleepTamil/NabhiSleepPageTamil'
import NabhiShilajitPageTamil from './pages/NabhiTamil/NabhiShilajit/NabhiShilajitPageTamil'
import NabhiMenstrualPageTamil from './pages/NabhiTamil/NabhiMenstrualTamil/NabhiMenstrualPageTamil'
import NabhiAmritPageTamil from './pages/NabhiTamil/NabhiAmritTamil/NabhiAmritPageTamil'
import NabhiAboutTamil from './pages/NabhiTamil/NabhiAboutTamil'
import NabhiContactTamil from './pages/NabhiTamil/NabhiContactTamil'

import RefundPolicy from './pages/RefundPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ExcFaliurePageHindi from './pages/razorpayPayments/ExcFaliurePageHindi'
import ExcSuccessPageTelugu from './pages/ExcSuccessPageTelugu'
import ExcSuccessPage from './pages/ExcSuccessPage'
import ExcSuccessPageHindi from './pages/ExcSuccessPageHindi'
export const backendurl = import.meta.env.VITE_BACKEND_URL;

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  // Render header ONLY on home layouts to prevent duplicates on sub-product pages
  const renderGlobalHeader = () => {
    if (path === "/hn" || path === "/hn/") {
      return <NabhiHeaderHindi />;
    }
    if (path === "/te" || path === "/te/") {
      return <NabhiHeaderTelugu />;
    }
    if (path === "/ta" || path === "/ta/") {
      return <NabhiHeaderTamil />;
    }
    else {
      return <NabhiHeader />;
    }
    
    // Returns nothing for all product routes, let the pages use their internal headers
    return null; 
  };

  return (
    <>
      {/* Dynamic top header element injection */}
      {renderGlobalHeader()}

      <Routes>
        {/* ── Core Landing / Fallback ────────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* ── Hindi Language Tree ────────────────────────────────────────── */}
        <Route path="/hn" element={<HomeHindi />} />
        <Route path="/products/nabhi-joint-hn" element={<NabhiJointPage />} />
        <Route path="/products/nabhi-eye-hn" element={<NabhiEyePage />} />
        <Route path="/products/nabhi-hair-hn" element={<NabhiHairPage />} />
        <Route path="/products/nabhi-sleep-hn" element={<NabhiSleepPage />} />
        <Route path="/products/nabhi-shilajit-hn" element={<NabhiShilajitPage />} />
        <Route path="/products/nabhi-menstrual-hn" element={<NabhiMenstrualPage />} />
        <Route path="/products/nabhi-amrit-hn" element={<NabhiAmritPage />} />
        <Route path="/products/about-hn" element={<NabhiAboutHindi />} />
        <Route path="/products/contact-hn" element={<NabhiContactHindi />} />
        <Route path="/products-hn" element={<ExclusiveProductCatalogHindi />} />
        <Route path="/success-hn" element={<ExcSuccessPageHindi />} />

        {/* ── English Language Tree ──────────────────────────────────────── */}
        <Route path="/products" element={<ExclusiveProductCatalog />} />
        <Route path="/products/nabhi-joint-en" element={<NabhiJointPageEng />} />
        <Route path="/products/nabhi-eye-en" element={<NabhiEyePageEng />} />
        <Route path="/products/nabhi-hair-en" element={<NabhiHairPageEng />} />
        <Route path="/products/nabhi-sleep-en" element={<NabhiSleepPageEng />} />
        <Route path="/products/nabhi-shilajit-en" element={<NabhiShilajitPageEng />} />
        <Route path="/products/nabhi-menstrual-en" element={<NabhiMenstrualPageEng />} />
        <Route path="/products/nabhi-amrit-en" element={<NabhiAmritPageEng />} />
        <Route path="/products/nabhi-about-en" element={<NabhiAboutEng />} />
        <Route path="/products/nabhi-contact-en" element={<NabhiContactEng />} />
        <Route path="/success-en" element={<ExcSuccessPage />} />
        <Route path="/my-orders-en" element={<MyOrdersEnglish />} />

        {/* ── Telugu Language Tree ───────────────────────────────────────── */}
        <Route path="/te" element={<HomeTelugu />} />
        <Route path="/products-tlg" element={<ExclusiveProductCatalogTelugu />} />
        <Route path="/products/nabhi-joint-telugu" element={<NabhiJointPageTelugu />} />
        <Route path="/products/nabhi-eye-telugu" element={<NabhiEyePageTelugu />} />
        <Route path="/products/nabhi-hair-telugu" element={<NabhiHairPageTelugu />} />
        <Route path="/products/nabhi-sleep-telugu" element={<NabhiSleepPageTelugu />} />
        <Route path="/products/nabhi-shilajit-telugu" element={<NabhiShilajitPageTelugu />} />
        <Route path="/products/nabhi-menstrual-telugu" element={<NabhiMenstrualPageTelugu />} />
        <Route path="/products/nabhi-amrit-telugu" element={<NabhiAmritPageTelugu />} />
        <Route path="/products/about-telugu" element={<NabhiAboutTelugu />} />
        <Route path="/products/contact-telugu" element={<NabhiContactTelugu />} />
        <Route path="/success-telugu" element={<ExcSuccessPageTelugu />} />

        {/* ── Tamil Language Tree ────────────────────────────────────────── */}
        <Route path="/ta" element={<HomeTamil />} />
        <Route path="/products-tml" element={<ExclusiveProductCatalogTamil />} />
        <Route path="/products/nabhi-joint-tamil" element={<NabhiJointPageTamil />} />
        <Route path="/products/nabhi-eye-tamil" element={<NabhiEyePageTamil />} />
        <Route path="/products/nabhi-hair-tamil" element={<NabhiHairPageTamil />} />
        <Route path="/products/nabhi-sleep-tamil" element={<NabhiSleepPageTamil />} />
        <Route path="/products/nabhi-shilajit-tamil" element={<NabhiShilajitPageTamil />} />
        <Route path="/products/nabhi-menstrual-tamil" element={<NabhiMenstrualPageTamil />} />
        <Route path="/products/nabhi-amrit-tamil" element={<NabhiAmritPageTamil />} />
        <Route path="/products/about-tamil" element={<NabhiAboutTamil />} />
        <Route path="/products/contact-tamil" element={<NabhiContactTamil />} />

        {/* ── Payment / Gateway Fallbacks ────────────────────────────────── */}
        <Route path="/payment-faliure" element={<ExcFaliurePageHindi />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;