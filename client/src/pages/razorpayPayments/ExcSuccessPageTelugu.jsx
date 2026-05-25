import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaLeaf, FaBoxOpen, FaPhone, FaMapMarkerAlt,
  FaCheckCircle, FaEnvelope,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import NabhiHeader from "../../components/NabhiHeader";
import { backendurl } from "../../App";
import NabhiHeaderTelugu from "../../components/NabhiHeaderTelugu";


const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Only custom keyframes that Tailwind can't express
const ANIM_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.5); }
    70%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ripple {
    0%   { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .anim-fadeup        { opacity: 0; animation: fadeUp 0.55s ease forwards; }
  .anim-fadeup-hero   { opacity: 0; animation: fadeUp 0.6s ease 0.05s forwards; }
  .anim-popin         { animation: popIn 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
  .anim-ripple        { animation: ripple 2.4s ease-out infinite; }
  .anim-ripple-2      { animation: ripple 2.4s ease-out 0.6s infinite; }
  .anim-ripple-3      { animation: ripple 2.4s ease-out 1.2s infinite; }
  .anim-shimmer-btn {
    background: linear-gradient(90deg, #2d5a27 0%, #4a8c40 40%, #2d5a27 60%, #1a3d16 100%);
    background-size: 200% auto;
    animation: shimmer 2.4s linear infinite;
  }
  .anim-skel {
    background: linear-gradient(90deg, #e4ebe4 25%, #f2f7f2 50%, #e4ebe4 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
  }
  .anim-spinner { animation: spin 0.7s linear infinite; }
  .delay-1 { animation-delay: 0.16s; }
  .delay-2 { animation-delay: 0.26s; }
  .delay-3 { animation-delay: 0.34s; }
  .delay-4 { animation-delay: 0.40s; }
  .delay-5 { animation-delay: 0.46s; }
`;

function injectStyles(id, css) {
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(window.emailjs); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); resolve(window.emailjs); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function getFiredPixelOrders() {
  try { return new Set(JSON.parse(localStorage.getItem("exc_pixel_fired") || "[]")); }
  catch { return new Set(); }
}
function markPixelFired(id) {
  const s = getFiredPixelOrders(); s.add(id);
  localStorage.setItem("exc_pixel_fired", JSON.stringify([...s]));
}
function saveOrderToMyOrders(orderData) {
  if (!orderData?.orderId) return;
  try {
    const existing = JSON.parse(localStorage.getItem("exc_my_orders") || "[]");
    const filtered = existing.filter((o) => o.orderId !== orderData.orderId);
    const isCOD = /cod|cash/i.test(String(orderData.payment || ""));
    const normalized = {
      orderId: orderData.orderId,
      status: orderData.status || (isCOD ? "pending" : "confirmed"),
      createdAt: orderData.createdAt || new Date().toISOString(),
      paymentMethod: isCOD ? "COD" : "Razorpay",
      isPaid: !isCOD,
      totalPrice: orderData.priceNum || (orderData.price
        ? Number(String(orderData.price).replace(/[^\d.]/g, "")) : 0),
      customer: {
        fullName: orderData.name, phone: orderData.phone,
        email: orderData.email || "",
        address: orderData.address, city: orderData.city,
        state: orderData.state, pincode: orderData.pincode,
      },
      product: {
        name: orderData.items?.[0]?.productName || orderData.productName || "",
        label: orderData.label || orderData.items?.[0]?.variantLabel || "",
        price: orderData.price,
        priceNum: orderData.priceNum || orderData.totalPrice,
        qty: orderData.qty || (orderData.items
          ? orderData.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1),
      },
    };
    localStorage.setItem("exc_my_orders", JSON.stringify([normalized, ...filtered]));
  } catch (e) { console.error("saveOrderToMyOrders:", e); }
}

function Skel({ className = "" }) {
  return <div className={`anim-skel rounded-md ${className}`} />;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ExcSuccessPageTelugu() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailSentRef = useRef(false);

  const oid = searchParams.get("oid");
  const ost = searchParams.get("ost");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!oid);
  const [fetchError, setFetchError] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  injectStyles("exc-success-telugu", ANIM_STYLES);

  // ── Fetch order ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!oid) {
      try {
        const saved = JSON.parse(localStorage.getItem("exc_last_order"));
        if (saved) {
          setOrder(saved);
          saveOrderToMyOrders(saved);
          const e = saved.email || "";
          setEmailInput(e);
          if (e && !emailSentRef.current) {
            emailSentRef.current = true;
            sendConfirmationEmail(e, saved);
          }
        }
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
          orderId: r.order_id || r.fastrr_order_id || oid,
          status: r.status || ost || "SUCCESS",
          name: r.shipping_address
            ? `${r.shipping_address.first_name || ""} ${r.shipping_address.last_name || ""}`.trim()
            : (r.phone ? "" : "—"),
          phone: r.phone || r.shipping_address?.phone || "—",
          email: r.email || "",
          address: r.shipping_address?.line1
            ? [r.shipping_address.line1, r.shipping_address.line2].filter(Boolean).join(", ")
            : "—",
          city: r.shipping_address?.city || "",
          state: r.shipping_address?.state || "",
          pincode: r.shipping_address?.pincode || "",
          price: r.total_amount_payable != null
            ? `₹${Number(r.total_amount_payable).toFixed(2)}` : "—",
          priceNum: r.total_amount_payable || 0,
          subtotal: r.subtotal_price || 0,
          couponDiscount: r.coupon_discount || 0,
          couponCodes: r.coupon_codes || [],
          shippingCharges: r.shipping_charges || 0,
          payment: r.payment_type || (r.cod_charges ? "COD" : "Prepaid"),
          paymentStatus: r.payment_status || "",
          edd: r.edd || null,
          rto: r.rto_prediction || null,
          shippingPlan: r.shipping_plan || "",
          items: r.cart_data?.items || [],
          label: r.cart_data?.items?.[0]?.variant_id || "",
          createdAt: r.order_created_date || new Date().toISOString(),
          _raw: r,
        };

        setOrder(mapped);
        saveOrderToMyOrders(mapped);
        localStorage.setItem("exc_last_order", JSON.stringify(mapped));
      } catch (err) {
        console.error("fetchOrder:", err);
        setFetchError("ఆర్డర్ వివరాలు లోడ్ కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oid]);


  // ── EmailJS ──────────────────────────────────────────────────────────────
  const sendConfirmationEmail = async (toEmail, orderData) => {
    if (!toEmail || !orderData) return;
    setEmailSending(true); setEmailError("");
    try {
      const lib = await loadEmailJS();
      const isCOD = /cod|cash/i.test(String(orderData.payment || ""));
      const addr = [orderData.address, orderData.city, orderData.state, orderData.pincode]
        .filter(Boolean).join(", ");
      await lib.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: toEmail,
        to_name: orderData.name || "ప్రియమైన కస్టమర్",
        order_id: orderData.orderId,
        product_name: `నాభి అమృత్ — ${orderData.label || ""}`,
        order_price: orderData.price || "",
        payment_method: isCOD ? "క్యాష్ ఆన్ డెలివరీ (COD)" : "ఆన్‌లైన్ చెల్లింపు",
        delivery_address: addr || "—",
        phone: orderData.phone || "—",
        delivery_eta: orderData.edd || "5–7 పని దినాలు",
      });
      setEmailSent(true);
      const raw = localStorage.getItem("exc_last_order");
      if (raw) {
        const updated = { ...JSON.parse(raw), email: toEmail };
        localStorage.setItem("exc_last_order", JSON.stringify(updated));
        saveOrderToMyOrders(updated);
      }
    } catch (err) {
      console.error("EmailJS:", err);
      setEmailError("ఇమెయిల్ పంపడం విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.");
    } finally { setEmailSending(false); }
  };

  const handleManualSend = () => {
    const t = emailInput.trim();
    if (!t || !/^\S+@\S+\.\S+$/.test(t)) {
      setEmailError("దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ చిరునామా నమోదు చేయండి.");
      return;
    }
    sendConfirmationEmail(t, order);
  };

  // ── Derived values ───────────────────────────────────────────────────────
  const orderId     = order?.orderId ?? "—";
  const name        = order?.name ?? "ప్రియమైన కస్టమర్";
  const phone       = order?.phone ?? "—";
  const address     = order?.address ?? "—";
  const city        = order?.city ?? "";
  const state       = order?.state ?? "";
  const pincode     = order?.pincode ?? "";
  const product     = order?.label ?? "నాభి అమృత్";
  const price       = order?.price ?? "—";
  const payment     = order?.payment ?? "Prepaid";
  const edd         = order?.edd ?? "5–7 పని దినాలు";
  const fullAddress = [address, city, state, pincode].filter(Boolean).join(", ");

 // ── Facebook Pixel: Purchase event (client-side) ──────────────────────────
useEffect(() => {
  if (!order?.orderId) return;

  const fired = getFiredPixelOrders();
  if (fired.has(`pixel_${order.orderId}`)) return;

  const numericValue =
    order?.priceNum ??
    (order?.price ? Number(String(order.price).replace(/[^\d.]/g, "")) : 0);

  const contents = order.items?.length
    ? order.items.map((item) => ({
        id:         String(item.variant_id || item.id || ""),
        quantity:   item.quantity || 1,
        item_price: item.price ?? item.item_price ?? 0,
        title:      item.name || item.title || "",
      }))
    : [
        {
          id:         String(order.label || order.orderId),
          quantity:   1,
          item_price: numericValue,
          title:      "Nabhi Amrit",
        },
      ];

  markPixelFired(`pixel_${order.orderId}`);
}, [order]);

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1]">
        <NabhiHeaderTelugu />
        <div className="max-w-[560px] mx-auto px-4 pb-20">
          <div className="flex flex-col items-center gap-4 pt-12">
            <Skel className="w-[88px] h-[88px] !rounded-full" />
            <Skel className="w-48 h-5" />
            <Skel className="w-64 h-3.5" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e5e0d4] mt-4 p-5 flex flex-col gap-3 shadow-sm">
              <Skel className="w-2/5 h-3.5" />
              <Skel className="w-3/4 h-3.5" />
              <Skel className="w-1/2 h-3.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1]">
        <NabhiHeaderTelugu />
        <div className="max-w-[560px] mx-auto px-4 flex flex-col items-center pt-20 gap-4 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-red-600 font-semibold text-sm">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-[#2d5a27] to-[#3d7534] text-white font-bold text-sm cursor-pointer border-none"
          >
            మళ్ళీ ప్రయత్నించండి
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1] antialiased">
      <NabhiHeaderTelugu />

      <div className="max-w-[560px] mx-auto px-4 pb-20">

        {/* ── Hero ── */}
        <div className="anim-fadeup-hero text-center pt-12 pb-8">
          {/* Ripple badge */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="anim-ripple   absolute w-20 h-20 rounded-full border-2 border-[rgba(45,90,39,0.2)]" />
            <div className="anim-ripple-2 absolute w-20 h-20 rounded-full border-2 border-[rgba(45,90,39,0.2)]" />
            <div className="anim-ripple-3 absolute w-20 h-20 rounded-full border-2 border-[rgba(45,90,39,0.2)]" />
            <div className="anim-popin relative z-10 w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c40] flex items-center justify-center shadow-[0_16px_48px_rgba(45,90,39,0.32),0_4px_12px_rgba(45,90,39,0.2)]">
              <FaCheckCircle size={38} color="#fff" />
            </div>
          </div>

          <h1 className="font-serif text-[clamp(1.75rem,5vw,2.1rem)] font-bold text-[#1a1a1a] mb-2 leading-tight">
            ఆర్డర్ నిర్ధారించబడింది!
          </h1>
          <p className="text-[clamp(0.875rem,2.5vw,0.9375rem)] text-[#555] leading-7 max-w-xs mx-auto mb-4">
            ధన్యవాదాలు,{" "}
            <strong className="text-[#2d5a27]">{name.split(" ")[0]}</strong>!
            మీ నాభి అమృత్ దారిలో ఉంది.{" "}
            <strong>
              {edd !== "5–7 పని దినాలు"
                ? `${edd} లోపు డెలివరీ`
                : "5–7 పని దినాల్లో డెలివరీ"}
            </strong>
          </p>

          <div className="inline-flex items-center gap-1.5 bg-[rgba(45,90,39,0.1)] border border-[rgba(45,90,39,0.18)] rounded-full px-4 py-1.5 text-[0.8125rem] font-bold text-[#2d5a27] tracking-wide">
            <HiSparkles size={12} />
            ఆర్డర్ #{orderId}
          </div>
        </div>

        {/* ── Order summary card ── */}
        <div className="anim-fadeup delay-1 bg-white rounded-2xl border border-[#e5e0d4] overflow-hidden mb-4 shadow-[0_2px_16px_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Dark header */}
          <div className="flex items-center gap-2.5 px-5 py-4 bg-gradient-to-br from-[#2d5a27] to-[#3d7534]">
            <FaBoxOpen size={15} color="rgba(255,255,255,0.9)" />
            <h2 className="font-serif text-[1.0625rem] font-bold m-0 text-white">ఆర్డర్ సారాంశం</h2>
          </div>

          {/* Product row */}
          <div className="flex justify-between items-start px-5 py-4 border-b border-[#f0ece2] gap-4">
            <div>
              <p className="text-[0.9375rem] font-bold text-[#1a1a1a] mb-1">నాభి అమృత్ — {product}</p>
              <div className="inline-flex items-center gap-1 text-xs text-[#2d5a27] font-semibold">
                <FaLeaf size={10} />
                100% ఆయుర్వేదిక్ నూనె
              </div>
            </div>
            <span className="text-lg font-extrabold text-[#2d5a27] whitespace-nowrap">{price}</span>
          </div>

          {/* Subtotal */}
          {order?._raw && order.subtotal > 0 && (
            <div className="flex justify-between items-center px-5 py-3 border-b border-[#f0ece2] gap-4">
              <span className="text-[0.8125rem] text-[#888] font-medium">సబ్‌టోటల్</span>
              <span className="text-[0.8125rem] text-[#1a1a1a] font-semibold">₹{Number(order.subtotal).toFixed(2)}</span>
            </div>
          )}

          {/* Coupon */}
          {order?._raw && order.couponDiscount > 0 && (
            <div className="flex justify-between items-center px-5 py-3 border-b border-[#f0ece2] gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-[0.8125rem] text-[#888] font-medium flex-wrap">
                కూపన్ తగ్గింపు
                {order.couponCodes?.length > 0 && (
                  <span className="text-[0.6875rem] bg-[rgba(45,90,39,0.1)] text-[#2d5a27] px-2 py-0.5 rounded-full font-bold">
                    {order.couponCodes.join(", ")}
                  </span>
                )}
              </span>
              <span className="text-[0.8125rem] font-semibold text-red-600">
                -₹{Number(order.couponDiscount).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center px-5 py-3 border-b border-[#f0ece2] gap-4">
            <span className="text-[0.8125rem] text-[#888] font-medium">చెల్లింపు</span>
            <span className="text-[0.8125rem] text-[#1a1a1a] font-semibold">{payment}</span>
          </div>

          <div className="flex justify-between items-center px-5 py-3 gap-4">
            <span className="text-[0.8125rem] text-[#888] font-medium">షిప్పింగ్</span>
            <span className="text-[0.8125rem] text-[#1a1a1a] font-semibold">
              {order?.shippingCharges > 0
                ? `₹${order.shippingCharges}`
                : "ఉచితం · 5–7 పని దినాలు"}
            </span>
          </div>
        </div>

        {/* ── Delivery details card ── */}
        <div className="anim-fadeup delay-2 bg-white rounded-2xl border border-[#e5e0d4] overflow-hidden mb-4 shadow-[0_2px_16px_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 px-5 py-4 bg-[#fafaf7] border-b border-[#f0ece2]">
            <TbTruckDelivery size={16} color="#2d5a27" />
            <h2 className="font-serif text-[1.0625rem] font-bold m-0 text-[#1a1a1a]">డెలివరీ వివరాలు</h2>
          </div>

          <div className="p-5 flex flex-col gap-3">
            {[
              { icon: <MdVerified size={14} color="#2d5a27" />, label: "పేరు",            value: name },
              { icon: <FaPhone    size={12} color="#2d5a27" />, label: "ఫోన్",            value: phone },
              { icon: <FaMapMarkerAlt size={12} color="#2d5a27" />, label: "డెలివరీ చిరునామా", value: fullAddress || "—", small: true },
              ...(edd && edd !== "5–7 పని దినాలు"
                ? [{ icon: <TbTruckDelivery size={14} color="#2d5a27" />, label: "అంచనా డెలివరీ", value: edd }]
                : []),
            ].map(({ icon, label, value, small }) => (
              <div className="flex gap-3.5 items-start py-1" key={label}>
                <div className="w-[34px] h-[34px] rounded-full bg-[rgba(45,90,39,0.1)] flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[0.6875rem] font-bold text-[#aaa] uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  <p className={`font-semibold text-[#1a1a1a] leading-snug ${small ? "text-[0.875rem]" : "text-[0.9375rem]"}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What's next ── */}
        <div className="anim-fadeup delay-3 rounded-2xl border border-[rgba(45,90,39,0.18)] p-5 mb-4 flex gap-3.5 items-start bg-gradient-to-br from-[#f0f7ee] to-[#e8f3e5]">
          <TbTruckDelivery size={24} color="#2d5a27" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-serif text-[1.0625rem] font-bold text-[#1a1a1a] mb-1.5">తర్వాత ఏమి జరుగుతుంది?</p>
            <p className="text-[0.8125rem] text-[#555] leading-7 m-0">
              • ట్రాకింగ్ వివరాలతో SMS వస్తుంది<br />
              • ఆర్డర్ చేసిన <strong>24 గంటల్లో</strong> ప్యాక్ చేయబడుతుంది<br />
              • <strong>{edd !== "5–7 పని దినాలు" ? edd : "5–7 పని దినాల్లో"}</strong> డెలివరీ అవుతుంది
            </p>
          </div>
        </div>

        {/* ── My orders button ── */}
        <div className="anim-fadeup delay-4 mb-3">
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full border-[1.5px] border-[#2d5a27] rounded-2xl px-5 py-3.5 bg-white flex items-center justify-center gap-2.5 font-bold text-[0.9375rem] text-[#2d5a27] cursor-pointer transition-colors hover:bg-[#f0f7ee] active:scale-[0.98]"
          >
            <FaBoxOpen size={14} color="#2d5a27" />
            నా ఆర్డర్‌లు చూడండి
          </button>
        </div>

        {/* ── CTA shimmer button ── */}
        <div className="anim-fadeup delay-5">
          <button
            onClick={() => navigate("/exclusive-products-tlg")}
            className="anim-shimmer-btn w-full border-none rounded-2xl px-5 py-4 text-white font-extrabold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_8px_28px_rgba(45,90,39,0.32)] active:scale-[0.98] transition-transform tracking-tight"
          >
            <FaLeaf size={13} color="#fff" />
            షాపింగ్ కొనసాగించండి
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="text-center mt-8 text-xs text-[#bbb] leading-7 pb-4">
          <MdVerified size={11} color="#2d5a27" style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
          నాభి అమృత్ · 100% ఆయుర్వేదిక్ · Dreamz Hub © 2026
        </div>

      </div>
    </div>
  );
}