import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { initTrackingCookies } from './utils/trackingCookies'

// Initialize tracking cookies on app load
initTrackingCookies()

// ── Pages ──────────────────────────────────────────────────────────────────────

// Hindi pages
import NabhiJointPage from './pages/NabhiHindi/NabhiJoint/NabhiJointPage'
import NabhiEyePage from './pages/NabhiHindi/NabhiEye/NabhiEyePage'
import NabhiHairPage from './pages/NabhiHindi/NabhiHair/NabhiHairPage'
import NabhiSleepPage from './pages/NabhiHindi/NabhiSleep/NabhiSleepPage'
import NabhiShilajitPage from './pages/NabhiHindi/NabhiShilajit/NabhiShilajitPage'
import NabhiMenstrualPage from './pages/NabhiHindi/NabhiMensturation/NabhiMenstrualPage'
import NabhiAmritPage from './pages/NabhiHindi/NabhiAmrit/NabhiAmritPage'
import NabhiAboutHindi from './pages/NabhiHindi/NabhiAboutHindi'
import NabhiContactHindi from './pages/NabhiHindi/NabhiContactHindi'

// English pages
import NabhiJointPageEng from './pages/NabhiEnglish/NabhiJointEng/NabhiJointPageEng'
import NabhiEyePageEng from './pages/NabhiEnglish/NabhiEyeEng/NabhiEyePageEng'
import NabhiHairPageEng from './pages/NabhiEnglish/NabhiHairEng/NabhiHairPageEng'
import NabhiSleepPageEng from './pages/NabhiEnglish/NabhiSleepEng/NabhiSleepPageEng'
import NabhiShilajitPageEng from './pages/NabhiEnglish/NabhiShilajitEng/NabhiShilajitPageEng'
import NabhiMenstrualPageEng from './pages/NabhiEnglish/NabhiMenstrualEng/NabhiMenstrualPageEng'
import NabhiAmritPageEng from './pages/NabhiEnglish/NabhiAmritEng/NabhiAmritPageEng'
import NabhiAboutEng from './pages/NabhiEnglish/NabhiAboutEng'
import NabhiContactEng from './pages/NabhiEnglish/NabhiContactEng'

// Telugu pages
import NabhiJointPageTelugu from './pages/NabhiTelugu/NabhiJointTelugu/NabhiJointPageTelugu'
import NabhiEyePageTelugu from './pages/NabhiTelugu/NabhiEyeTelugu/NabhiEyePageTelugu'
import NabhiHairPageTelugu from './pages/NabhiTelugu/NabhiHairTelugu/NabhiHairPageTelugu'
import NabhiSleepPageTelugu from './pages/NabhiTelugu/NabhiSleepTelugu/NabhiSleepPageTelugu'
import NabhiShilajitPageTelugu from './pages/NabhiTelugu/NabhiShilajitTelugu/NabhiShilajitPageTelugu'
import NabhiMenstrualPageTelugu from './pages/NabhiTelugu/NabhiMenstrualTelugu/NabhiMenstrualPageTelugu'
import NabhiAmritPageTelugu from './pages/NabhiTelugu/NabhiAmritTelugu/NabhiAmritPageTelugu'
import NabhiAboutTelugu from './pages/NabhiTelugu/NabhiAboutTelugu'
import NabhiContactTelugu from './pages/NabhiTelugu/NabhiContactTelugu'

// Tamil pages
import NabhiJointPageTamil from './pages/NabhiTamil/NabhiJointTamil/NabhiJointPageTamil'
import NabhiEyePageTamil from './pages/NabhiTamil/NabhiEyeTamil/NabhiEyePageTamil'
import NabhiHairPageTamil from './pages/NabhiTamil/NabhiHairTamil/NabhiHairPageTamil'
import NabhiSleepPageTamil from './pages/NabhiTamil/NabhiSleepTamil/NabhiSleepPageTamil'
import NabhiShilajitPageTamil from './pages/NabhiTamil/NabhiShilajit/NabhiShilajitPageTamil'
import NabhiMenstrualPageTamil from './pages/NabhiTamil/NabhiMenstrualTamil/NabhiMenstrualPageTamil'
import NabhiAmritPageTamil from './pages/NabhiTamil/NabhiAmritTamil/NabhiAmritPageTamil'
import NabhiAboutTamil from './pages/NabhiTamil/NabhiAboutTamil'
import NabhiContactTamil from './pages/NabhiTamil/NabhiContactTamil'

// Payment pages
import ExcFaliurePageHindi from './pages/razorpayPayments/ExcFaliurePageHindi'

//Pages
import Home from './pages/NabhiHome/Home'
import MainRouter from './pages/NabhiHome/Mainrouter'

// ── App ─────────────────────────────────────────────────────────────────────────
export const backendurl = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Home Pages ─────────────────────────────────────────────────── */}
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/*" element={<MainRouter/>}/>
        {/* <Router */}

        {/* ── Hindi Pages ─────────────────────────────────────────────────── */}
        <Route path="/products/nabhi-joint-hn" element={<NabhiJointPage />} />
        <Route path="/products/nabhi-eye-hn" element={<NabhiEyePage />} />
        <Route path="/products/nabhi-hair-hn" element={<NabhiHairPage />} />
        <Route path="/products/nabhi-sleep-hn" element={<NabhiSleepPage />} />
        <Route path="/products/nabhi-shilajit-hn" element={<NabhiShilajitPage />} />
        <Route path="/products/nabhi-menstrual-hn" element={<NabhiMenstrualPage />} />
        <Route path="/products/nabhi-amrit-hn" element={<NabhiAmritPage />} />
        <Route path="/products/nabhi-about-hn" element={<NabhiAboutHindi />} />
        <Route path="/products/nabhi-contact-hn" element={<NabhiContactHindi />} />

        {/* ── English Pages ────────────────────────────────────────────────── */}
        <Route path="/products/nabhi-joint-en" element={<NabhiJointPageEng />} />
        <Route path="/products/nabhi-eye-en" element={<NabhiEyePageEng />} />
        <Route path="/products/nabhi-hair-en" element={<NabhiHairPageEng />} />
        <Route path="/products/nabhi-sleep-en" element={<NabhiSleepPageEng />} />
        <Route path="/products/nabhi-shilajit-en" element={<NabhiShilajitPageEng />} />
        <Route path="/products/nabhi-menstrual-en" element={<NabhiMenstrualPageEng />} />
        <Route path="/products/nabhi-amrit-en" element={<NabhiAmritPageEng />} />
        <Route path="/products/nabhi-about-en" element={<NabhiAboutEng />} />
        <Route path="/products/nabhi-contact-en" element={<NabhiContactEng />} />

        {/* ── Telugu Pages ─────────────────────────────────────────────────── */}
        <Route path="/products/nabhi-joint-telugu" element={<NabhiJointPageTelugu />} />
        <Route path="/products/nabhi-eye-telugu" element={<NabhiEyePageTelugu />} />
        <Route path="/products/nabhi-hair-telugu" element={<NabhiHairPageTelugu />} />
        <Route path="/products/nabhi-sleep-telugu" element={<NabhiSleepPageTelugu />} />
        <Route path="/products/nabhi-shilajit-telugu" element={<NabhiShilajitPageTelugu />} />
        <Route path="/products/nabhi-menstrual-telugu" element={<NabhiMenstrualPageTelugu />} />
        <Route path="/products/nabhi-amrit-telugu" element={<NabhiAmritPageTelugu />} />
        <Route path="/products/nabhi-about-telugu" element={<NabhiAboutTelugu />} />
        <Route path="/products/nabhi-contact-telugu" element={<NabhiContactTelugu />} />

        {/* ── Tamil Pages ──────────────────────────────────────────────────── */}
        <Route path="/products/nabhi-joint-tamil" element={<NabhiJointPageTamil />} />
        <Route path="/products/nabhi-eye-tamil" element={<NabhiEyePageTamil />} />
        <Route path="/products/nabhi-hair-tamil" element={<NabhiHairPageTamil />} />
        <Route path="/products/nabhi-sleep-tamil" element={<NabhiSleepPageTamil />} />
        <Route path="/products/nabhi-shilajit-tamil" element={<NabhiShilajitPageTamil />} />
        <Route path="/products/nabhi-menstrual-tamil" element={<NabhiMenstrualPageTamil />} />
        <Route path="/products/nabhi-amrit-tamil" element={<NabhiAmritPageTamil />} />
        <Route path="/products/nabhi-about-tamil" element={<NabhiAboutTamil />} />
        <Route path="/products/nabhi-contact-tamil" element={<NabhiContactTamil />} />

        {/* ── Payment Pages ────────────────────────────────────────────────── */}
        <Route path="/exc-payment-success-hn" element={<ExcFaliurePageHindi />} />
        <Route path="/payment-faliure" element={<ExcFaliurePageHindi />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App