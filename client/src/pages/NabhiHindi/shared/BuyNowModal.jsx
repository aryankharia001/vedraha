import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { PRODUCT } from "./constants";
import React from "react";
import { backendurl } from "../../../App";

export default function BuyNowModal({ isOpen, onClose, selectedVariant, cartItems, onSuccess }) {
  const [otpStep, setOtpStep] = useState("phone");
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [initToken, setInitToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cartTotal = (cartItems || []).reduce(
    (sum, item) => sum + item.variantPriceNum * item.quantity,
    0
  );

  useEffect(() => {
    if (isOpen) {
      setOtpStep("phone");
      setPhone("");
      setOtp("");
      setInitToken("");
      setLoading(false);
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const initiateOtp = async () => {
    setError("");
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) { setError("कृपया वैध 10-अंक का फोन नंबर दर्ज करें।"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/api/ad/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country_code: countryCode || "91", phone: cleanPhone }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(typeof data?.message === "string" ? data.message : "OTP भेजने में विफल। कृपया पुनः प्रयास करें।");
        return;
      }
      setInitToken(data.token);
      setOtpStep("otp");
    } catch (e) {
      setError(e?.message || "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    const cleanOtp = otp.replace(/\D/g, "");
    if (cleanOtp.length < 4) { setError("कृपया वैध OTP दर्ज करें।"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/api/ad/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: initToken, otp: cleanOtp }),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(typeof data?.message === "string" ? data.message : "OTP सत्यापन विफल। कृपया पुनः प्रयास करें।");
        return;
      }
      const authorisedToken = data.authorised_customer_token;
      let customerData = null;
      try {
        const cRes = await fetch(`${backendurl}/api/ad/customer-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authorised_customer_token: authorisedToken }),
        });
        const cData = await cRes.json();
        if (cData?.success) customerData = cData.customer;
      } catch (_) {}
      onSuccess({ authorisedToken, customerData, phone, countryCode });
    } catch (e) {
      setError(e?.message || "OTP सत्यापन में कुछ गड़बड़ हो गई।");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9998] flex items-end justify-center backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
    >
      <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto pb-8 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-5 py-5 flex justify-between items-center border-b border-gray-200 z-10">
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              त्वरित चेकआउट
            </div>
            <div className="text-xs text-gray-400 mt-0.5">जारी रखने के लिए अपना नंबर सत्यापित करें</div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="bg-gray-100 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-gray-600 flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart summary */}
        <div className="bg-[#f0f7ee] px-5 py-3 flex justify-between items-center border-b border-[#dce9d8]">
          <div className="flex items-center gap-3">
            <img src={PRODUCT.image} alt={PRODUCT.name} className="w-12 h-12 object-cover rounded-lg border border-[#d4e8d0]" />
            <div>
              <div className="text-sm font-bold text-gray-900">{PRODUCT.name}</div>
              {(cartItems || []).map((item) => (
                <div key={item.cartId} className="text-xs text-[#2d5a27] font-semibold">
                  {item.variantLabel} × {item.quantity}
                </div>
              ))}
            </div>
          </div>
          <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            ₹{cartTotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="px-5 pt-6 flex-1">
          {otpStep === "phone" && (
            <div className="bg-gray-900 rounded-xl p-4 mb-5">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">एक-टैप चेकआउट</div>
              <div className="text-base font-bold text-white leading-snug" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                हम आपका पता <em className="text-[#c8a84b]">स्वचालित रूप से</em> भर देंगे
              </div>
              <div className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                अपना नंबर दर्ज करें — कोई फॉर्म नहीं भरना, कोई अकाउंट नहीं चाहिए।
              </div>
            </div>
          )}

          {error && (
            <div className="mb-3.5 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          {otpStep === "phone" && (
            <>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">फोन नंबर</label>
                <div className="flex gap-2">
                  <input
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="91"
                    className="w-16 flex-shrink-0 px-3.5 py-3 border border-gray-300 rounded-xl text-base text-gray-900 bg-gray-50 outline-none focus:border-green-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") initiateOtp(); }}
                    inputMode="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    className="flex-1 px-3.5 py-3 border border-gray-300 rounded-xl text-base text-gray-900 bg-gray-50 outline-none focus:border-green-700"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>
              <button
                onClick={initiateOtp}
                disabled={loading}
                className={`w-full py-3.5 text-white border-0 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-3 uppercase tracking-wider ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 cursor-pointer"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block animate-spin" />}
                {loading ? "OTP भेज रहे हैं…" : "OTP भेजें →"}
              </button>
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                जारी रखकर आप सत्यापन के लिए SMS प्राप्त करने की सहमति देते हैं।
              </p>
            </>
          )}

          {otpStep === "otp" && (
            <>
              <div className="mb-3.5 text-sm text-gray-500 leading-relaxed">
                OTP भेजा गया <strong className="text-gray-900">+{countryCode} {phone}</strong> पर
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">OTP दर्ज करें</label>
                <input
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") verifyOtp(); }}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="OTP दर्ज करें"
                  className="w-full px-3.5 py-3 border border-gray-300 rounded-xl text-xl font-bold text-gray-900 bg-gray-50 outline-none focus:border-green-700 tracking-widest text-center"
                  autoFocus
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <div className="flex gap-2.5 mb-3">
                <button
                  onClick={() => { setOtpStep("phone"); setOtp(""); setError(""); }}
                  disabled={loading}
                  className="flex-1 py-3 bg-gray-100 text-gray-900 border border-gray-200 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ← नंबर बदलें
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className={`flex-1 py-3 text-white border-0 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 cursor-pointer"}`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block animate-spin" />}
                  {loading ? "सत्यापित हो रहा है…" : "OTP सत्यापित करें ✓"}
                </button>
              </div>
              <button
                onClick={initiateOtp}
                disabled={loading}
                className="w-full py-3 bg-white text-gray-900 border border-gray-200 rounded-xl text-sm font-semibold cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                OTP दोबारा भेजें
              </button>
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-900 border-0 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            रद्द करें
          </button>
        </div>
      </div>
    </div>
  );
}
