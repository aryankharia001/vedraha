import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaLeaf, FaBoxOpen, FaPhone, FaMapMarkerAlt,
  FaTimesCircle, FaRedo, FaHeadset,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import NabhiHeader from "../../components/NabhiHeader";
import { backendurl } from "../../App";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skel({ className = "" }) {
  return <div className={`rounded-lg animate-pulse bg-red-100 ${className}`} />;
}

// ─── Detail row ───────────────────────────────────────────────────────────────
function DetailRow({ icon, label, value, small = false }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex gap-3 items-start py-1">
      <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`font-semibold text-gray-800 leading-snug ${small ? "text-sm" : "text-[15px]"}`}>{value}</p>
      </div>
    </div>
  );
}

// ─── Summary row ──────────────────────────────────────────────────────────────
function SummaryRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-50 last:border-b-0 gap-4">
      <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">{label}</span>
      <span className={`text-[13px] font-semibold text-right ${valueClass || "text-gray-800"}`}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ExcFailurePageHindi() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const oid    = searchParams.get("oid");
  const reason = searchParams.get("reason") || "";

  const [order,      setOrder]      = useState(null);
  const [loading,    setLoading]    = useState(!!oid);
  const [fetchError, setFetchError] = useState("");

  // ── Fetch order if oid is present ────────────────────────────────────────
  useEffect(() => {
    if (!oid) {
      // Fallback: read last attempted order from localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("exc_last_order"));
        if (saved) setOrder(saved);
      } catch (_) {}
      return;
    }

    (async () => {
      setLoading(true);
      setFetchError("");
      try {
        const currentParams = new URLSearchParams(window.location.search);
        const { data } = await axios.get(`${backendurl}/api/ad/order/${oid}`, {
          params: Object.fromEntries(currentParams.entries()),
        });
        const r = data?.result || data;

        const mapped = {
          orderId:        r.order_id || r.fastrr_order_id || oid,
          status:         r.status || "FAILED",
          name:           r.shipping_address
                            ? `${r.shipping_address.first_name || ""} ${r.shipping_address.last_name || ""}`.trim()
                            : "",
          phone:          r.phone || r.shipping_address?.phone || "",
          email:          r.email || "",
          address:        r.shipping_address?.line1
                            ? [r.shipping_address.line1, r.shipping_address.line2].filter(Boolean).join(", ")
                            : "",
          city:           r.shipping_address?.city    || "",
          state:          r.shipping_address?.state   || "",
          pincode:        r.shipping_address?.pincode || "",
          price:          r.total_amount_payable != null
                            ? `₹${Number(r.total_amount_payable).toFixed(2)}` : "",
          priceNum:       r.total_amount_payable || 0,
          subtotal:       r.subtotal_price   || 0,
          couponDiscount: r.coupon_discount  || 0,
          couponCodes:    r.coupon_codes     || [],
          shippingCharges:r.shipping_charges || 0,
          payment:        r.payment_type || (r.cod_charges ? "COD" : "Prepaid"),
          items:          r.cart_data?.items || [],
          label:          r.cart_data?.items?.[0]?.variant_id || "",
          createdAt:      r.order_created_date || new Date().toISOString(),
          _raw:           r,
        };

        setOrder(mapped);
      } catch (err) {
        console.error("fetchOrder:", err);
        setFetchError("ऑर्डर विवरण लोड नहीं हो सका।");
        // Still show whatever we have in localStorage
        try {
          const saved = JSON.parse(localStorage.getItem("exc_last_order"));
          if (saved) setOrder(saved);
        } catch (_) {}
      } finally {
        setLoading(false);
      }
    })();
  }, [oid]);

  // ── Derived values ───────────────────────────────────────────────────────
  const orderId    = order?.orderId ?? oid ?? "—";
  const name       = order?.name || "प्रिय ग्राहक";
  const phone      = order?.phone || "";
  const address    = order?.address || "";
  const city       = order?.city || "";
  const state      = order?.state || "";
  const pincode    = order?.pincode || "";
  const product    = order?.label || "नाभि अमृत";
  const price      = order?.price || "—";
  const payment    = order?.payment || "Prepaid";
  const fullAddress = [address, city, state, pincode].filter(Boolean).join(", ");

  const isCOD     = /cod|cash|कैश|डिलीवरी/i.test(String(payment));
  const isPrepaid = !isCOD && !!order;

  const failReason =
    reason === "timeout"   ? "भुगतान का समय समाप्त हो गया।"  :
    reason === "declined"  ? "बैंक द्वारा भुगतान अस्वीकृत।"  :
    reason === "cancelled" ? "आपने भुगतान रद्द किया।"          :
                             "भुगतान प्रक्रिया में एक त्रुटि हुई।";

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 font-sans antialiased">
        <NabhiHeader />
        <div className="max-w-lg mx-auto px-4 pb-20">
          <div className="flex flex-col items-center gap-4 pt-12">
            <Skel className="w-24 h-24 !rounded-full" />
            <Skel className="w-48 h-5" />
            <Skel className="w-64 h-4" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-4 p-5 flex flex-col gap-3">
              <Skel className="w-2/5 h-4" />
              <Skel className="w-3/5 h-4" />
              <Skel className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 font-sans antialiased">
      <NabhiHeader />

      <div className="max-w-lg mx-auto px-4 sm:px-6 pb-20">

        {/* ── Hero ── */}
        <div className="text-center pt-12 pb-8" style={{ animation: "fadeUp 0.6s ease 0.05s both" }}>

          {/* Ripple + icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="absolute w-20 h-20 rounded-full border-2 border-red-300/40 animate-ping"
                style={{ animationDelay: `${i * 0.6}s`, animationDuration: "2.4s" }}
              />
            ))}
            <div
              className="relative z-10 flex items-center justify-center rounded-full shadow-2xl shadow-red-400/40"
              style={{
                width: 88, height: 88,
                background: "linear-gradient(135deg,#b91c1c,#dc2626)",
                animation: "popIn 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.15s both",
              }}
            >
              <FaTimesCircle size={38} color="#fff" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            भुगतान विफल हो गया
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs mx-auto mb-3">
            {name !== "प्रिय ग्राहक"
              ? <><strong className="text-red-700">{name.split(" ")[0]}</strong>, खेद है! </>
              : "खेद है! "}
            {failReason}&nbsp;आपके खाते से कोई राशि नहीं काटी गई।
          </p>

          <span className="inline-flex items-center gap-1.5 bg-red-100 border border-red-200 rounded-full px-4 py-1.5 text-[13px] font-bold text-red-700 tracking-wide">
            <FaTimesCircle size={11} />
            {orderId !== "—" ? `ऑर्डर #${orderId}` : "भुगतान अस्वीकृत"}
          </span>
        </div>

        {/* ── Fetch error notice ── */}
        {fetchError && (
          <div className="mb-3 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-[13px] text-amber-800 font-medium">
            ⚠️ {fetchError} नीचे की जानकारी पुरानी हो सकती है।
          </div>
        )}

        {/* ── What happened ── */}
        <div
          className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-5 mb-4 flex gap-3 items-start"
          style={{ animation: "fadeUp 0.55s ease 0.10s both" }}
        >
          <FaTimesCircle size={22} color="#b91c1c" className="shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              क्या हुआ?
            </p>
            <p className="text-[13px] text-gray-600 leading-loose">
              • {failReason}<br />
              • आपका ऑर्डर <strong>पूरा नहीं</strong> हुआ है<br />
              {isPrepaid && <>• <strong>कोई राशि नहीं काटी गई</strong> — अगर कटी है तो 5–7 दिनों में वापस होगी</>}
            </p>
          </div>
        </div>

        {/* ── Order summary ── */}
        {order && (
          <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 shadow-sm"
            style={{ animation: "fadeUp 0.55s ease 0.18s both" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-5 py-4"
              style={{ background: "linear-gradient(135deg,#b91c1c,#c43030)" }}
            >
              <FaBoxOpen size={15} color="rgba(255,255,255,0.9)" />
              <h2
                className="text-[17px] font-bold text-white m-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ऑर्डर सारांश (अधूरा)
              </h2>
            </div>

            {/* Product */}
            <div className="flex justify-between items-start px-5 py-4 border-b border-gray-50 gap-4">
              <div>
                <p className="text-[15px] font-bold text-gray-900 mb-1">नाभि अमृत — {product}</p>
                <span className="inline-flex items-center gap-1 text-[12px] text-gray-400 font-semibold">
                  <FaLeaf size={10} /> 100% आयुर्वेदिक तेल
                </span>
              </div>
              <span className="text-lg font-extrabold text-red-600 line-through opacity-60 whitespace-nowrap">{price}</span>
            </div>

            {/* Subtotal */}
            {order._raw && order.subtotal > 0 && (
              <SummaryRow label="सबटोटल" value={`₹${Number(order.subtotal).toFixed(2)}`} />
            )}

            {/* Coupon */}
            {order._raw && order.couponDiscount > 0 && (
              <SummaryRow
                label={
                  <span className="flex items-center gap-1.5 flex-wrap">
                    कूपन छूट
                    {order.couponCodes?.length > 0 && (
                      <span className="text-[11px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold">
                        {order.couponCodes.join(", ")}
                      </span>
                    )}
                  </span>
                }
                value={`-₹${Number(order.couponDiscount).toFixed(2)}`}
                valueClass="text-red-600"
              />
            )}

            <SummaryRow label="भुगतान विधि" value={payment} valueClass="text-red-700 font-bold" />
            <SummaryRow label="स्थिति"       value="❌ विफल" valueClass="text-red-700 font-bold" />
            <SummaryRow
              label="शिपिंग"
              value={order.shippingCharges > 0 ? `₹${order.shippingCharges}` : "—"}
            />

            {/* Items list */}
            {order.items?.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">आइटम</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 text-[13px]">
                    <span className="text-gray-700 font-medium">
                      {item.productName || item.title || "Item"}
                      {item.quantity > 1 && (
                        <span className="ml-1 text-gray-400">×{item.quantity}</span>
                      )}
                    </span>
                    {item.variantPriceNum > 0 && (
                      <span className="text-gray-500 font-semibold">₹{item.variantPriceNum}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Delivery details ── */}
        {order && (fullAddress || phone || order.email) && (
          <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 shadow-sm"
            style={{ animation: "fadeUp 0.55s ease 0.26s both" }}
          >
            <div className="flex items-center gap-2.5 px-5 py-4 bg-gray-50 border-b border-gray-100">
              <FaMapMarkerAlt size={13} color="#b91c1c" />
              <h2
                className="text-[17px] font-bold text-gray-900 m-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                पता (दर्ज किया था)
              </h2>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              <DetailRow icon={<MdVerified size={14} color="#b91c1c" />} label="नाम"           value={name !== "प्रिय ग्राहक" ? name : ""} />
              <DetailRow icon={<FaPhone size={12} color="#b91c1c" />}    label="फ़ोन"           value={phone} />
              <DetailRow icon={<FaMapMarkerAlt size={12} color="#b91c1c" />} label="डिलीवरी पता" value={fullAddress} small />
              <DetailRow icon={<MdVerified size={12} color="#b91c1c" />}  label="ईमेल"          value={order.email} small />
            </div>
          </div>
        )}

        {/* ── Refund notice (prepaid only) ── */}
        {isPrepaid && (
          <div
            className="mb-4 rounded-2xl bg-green-50 border border-green-200 px-4 py-3.5 text-[13px] text-green-800 font-semibold leading-relaxed"
            style={{ animation: "fadeUp 0.55s ease 0.32s both" }}
          >
            ✅ यदि आपके खाते से राशि कटी है, तो वह <strong>5–7 कार्य दिवसों</strong> में स्वतः वापस हो जाएगी।
          </div>
        )}

        {/* ── Retry button ── */}
        <div style={{ animation: "fadeUp 0.55s ease 0.38s both" }} className="mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl text-white font-extrabold text-base tracking-tight cursor-pointer active:scale-[0.98] transition-transform"
            style={{
              background: "linear-gradient(90deg,#b91c1c 0%,#dc2626 40%,#b91c1c 60%,#7f1d1d 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 2.4s linear infinite",
              boxShadow: "0 8px 28px rgba(185,28,28,0.35)",
            }}
          >
            <FaRedo size={13} color="#fff" />
            पुनः भुगतान करें
          </button>
        </div>

        {/* ── Support ── */}
        <div style={{ animation: "fadeUp 0.55s ease 0.44s both" }} className="mb-3">
          <button
            onClick={() => window.open("tel:+919999999999")}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl border-[1.5px] border-red-600 bg-white text-red-700 font-bold text-[15px] cursor-pointer hover:bg-red-50 active:scale-[0.98] transition-all"
          >
            <FaHeadset size={14} /> सहायता से संपर्क करें
          </button>
        </div>

        {/* ── Browse products ── */}
        <div style={{ animation: "fadeUp 0.55s ease 0.50s both" }} className="mb-3">
          <button
            onClick={() => navigate("/exclusive-products")}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl border-[1.5px] border-green-700 bg-white text-green-800 font-bold text-[15px] cursor-pointer hover:bg-green-50 active:scale-[0.98] transition-all"
          >
            <FaLeaf size={13} /> खरीदारी जारी रखें
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="text-center mt-8 text-[12px] text-gray-300 leading-relaxed pb-4">
          <MdVerified size={11} color="#b91c1c" style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
          नाभि अमृत · 100% आयुर्वेदिक · Dreamz Hub © 2026
        </div>

      </div>

      {/* Keyframe definitions */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </div>
  );
}