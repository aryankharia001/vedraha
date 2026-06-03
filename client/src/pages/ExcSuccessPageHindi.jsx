import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaLeaf, FaBoxOpen, FaPhone, FaMapMarkerAlt, FaCheckCircle,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import NabhiHeaderHindi from "../components/NabhiHeaderHindi"
import { backendurl } from "../App";

// ─── Config ───────────────────────────────────────────────────────────────────
const SR_COMPANY_ID = 543644; // 👈 replace with your integer company ID

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getFiredPixelOrders() {
  try { return new Set(JSON.parse(localStorage.getItem("exc_pixel_fired") || "[]")); }
  catch { return new Set(); }
}
function markPixelFired(id) {
  const s = getFiredPixelOrders(); s.add(id);
  localStorage.setItem("exc_pixel_fired", JSON.stringify([...s]));
}
function getSRFiredOrders() {
  try { return new Set(JSON.parse(localStorage.getItem("exc_sr_fired") || "[]")); }
  catch { return new Set(); }
}
function markSRFired(id) {
  const s = getSRFiredOrders(); s.add(id);
  localStorage.setItem("exc_sr_fired", JSON.stringify([...s]));
}

function saveOrderToMyOrders(orderData) {
  if (!orderData?.orderId) return;
  try {
    const existing = JSON.parse(localStorage.getItem("exc_my_orders") || "[]");
    const filtered = existing.filter((o) => o.orderId !== orderData.orderId);
    const isCOD = /cod|cash/i.test(String(orderData.payment || ""));
    const normalized = {
      orderId:       orderData.orderId,
      status:        orderData.status || (isCOD ? "pending" : "confirmed"),
      createdAt:     orderData.createdAt || new Date().toISOString(),
      paymentMethod: isCOD ? "COD" : "Razorpay",
      isPaid:        !isCOD,
      totalPrice:    orderData.priceNum || (orderData.price
        ? Number(String(orderData.price).replace(/[^\d.]/g, "")) : 0),
      customer: {
        fullName: orderData.name,   phone:   orderData.phone,
        email:    orderData.email || "",
        address:  orderData.address, city:   orderData.city,
        state:    orderData.state,   pincode: orderData.pincode,
      },
      product: {
        name:     orderData.items?.[0]?.productName || orderData.productName || "",
        label:    orderData.label || orderData.items?.[0]?.variantLabel || "",
        price:    orderData.price,
        priceNum: orderData.priceNum || orderData.totalPrice,
        qty:      orderData.qty || (orderData.items
          ? orderData.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1),
      },
    };
    localStorage.setItem("exc_my_orders", JSON.stringify([normalized, ...filtered]));
  } catch (e) { console.error("saveOrderToMyOrders:", e); }
}

// ─── Shiprocket Order Webhook ─────────────────────────────────────────────────
async function fireShiprocketOrder(order) {
  if (!order?.orderId) return;

  const fired = getSRFiredOrders();
  if (fired.has(`sr_${order.orderId}`)) {
    console.log("Shiprocket order already fired for:", order.orderId);
    return;
  }

  const isCOD    = /cod|cash/i.test(String(order.payment || ""));
  const priceNum = order.priceNum ?? Number(String(order.price || "0").replace(/[^\d.]/g, ""));
  const now      = order.createdAt || new Date().toISOString();

  const lineItems = order.items?.length
    ? order.items.map((item, idx) => ({
        sku:                item.sku || item.variant_id || String(idx + 1),
        name:               item.name || item.title || "Nabhi Amrit",
        line_item_id:       String(item.id || item.line_item_id || idx + 1),
        variant_id:         String(item.variant_id || item.id || ""),
        product_id:         String(item.product_id || ""),
        price:              item.price ?? priceNum,
        quantity:           String(item.quantity || 1),
        product_discount:   item.discount || 0,
        tax_amount:         item.tax_amount || 0,
        tax_rate:           item.tax_rate || 0,
        fulfillment_status: "",
        categories:         "",
        type:               "",
      }))
    : [{
        sku:                order.label || "nabhi-amrit",
        name:               `Nabhi Amrit${order.label ? " — " + order.label : ""}`,
        line_item_id:       String(order.orderId),
        variant_id:         String(order.label || ""),
        product_id:         "",
        price:              priceNum,
        quantity:           String(order.qty || 1),
        product_discount:   order.couponDiscount || 0,
        tax_amount:         0,
        tax_rate:           0,
        fulfillment_status: "",
        categories:         "",
        type:               "",
      }];

  const payload = {
    sr_company_id:           SR_COMPANY_ID,
    orderId:                 String(order.orderId),
    order_number:            String(order.orderId),
    customer_id:             order.phone || String(order.orderId),
    phone:                   String(order.phone || "").replace(/^\+91/, "").replace(/^91/, ""),
    fullName:                order.name || "",
    email:                   order.email || "",
    total_price:             priceNum,
    total_line_items_price:  order.subtotal || priceNum,
    cart_token:              "",
    checkout_token:          "",
    ga_transaction_id:       "",
    created_at:              now,
    updated_at:              now,
    shipping_cost:           order.shippingCharges || 0,
    total_discounts:         order.couponDiscount || 0,
    city:                    order.city || "",
    state:                   order.state || "",
    country:                 "India",
    zip:                     order.pincode || "",
    payment_mode:            isCOD ? "COD" : "Prepaid",
    taxes_included:          true,
    total_tax:               0,
    order_mode:              "Online",
    coupons:                 order.couponCodes?.length ? order.couponCodes : [],
    line_items:              lineItems,
    userId:                  order.phone || String(order.orderId),
    source:                  "web",
    payment_method:          isCOD ? "cod" : "prepaid",
    address_line1:           order.address || "",
    address_line2:           "",
    financial_status:        isCOD ? "Pending" : "Paid",
    fulfillment_status:      "",
    categories:              "",
    type:                    "",
    eventCategory:           "",
    is_active:               true,
    brand_name:              "Nabhi Amrit",
  };

  try {
    const { data } = await axios.post(
      `${backendurl}/api/ad/shiprocket/create-order`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("✅ Shiprocket order created:", data);
    markSRFired(`sr_${order.orderId}`);
  } catch (err) {
    console.error("❌ Shiprocket order webhook failed:", err?.response?.data || err.message);
  }
}

// ─── Skeleton block ───────────────────────────────────────────────────────────
function Skel({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gradient-to-r from-green-100 via-green-50 to-green-100 ${className}`} />
  );
}

// ─── Reusable summary row ─────────────────────────────────────────────────────
function Row({ label, value, last = false }) {
  return (
    <div className={`flex justify-between items-center px-5 py-3 gap-4 ${!last ? "border-b border-[#f0ece2]" : ""}`}>
      <span className="text-[13px] text-[#888] font-medium whitespace-nowrap">{label}</span>
      <span className="text-[13px] text-[#1a1a1a] font-semibold text-right">{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExcSuccessPage() {
  const navigate      = useNavigate();
  const [searchParams] = useSearchParams();
  const srFiredRef    = useRef(false);

  const oid = searchParams.get("oid");
  const ost = searchParams.get("ost");

  const [order,      setOrder]      = useState(null);
  const [loading,    setLoading]    = useState(!!oid);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // optional
        });
      }, []);

  // ── Fetch order ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!oid) {
      try {
        const saved = JSON.parse(localStorage.getItem("exc_last_order"));
        if (saved) {
          setOrder(saved);
          saveOrderToMyOrders(saved);
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
          orderId:         r.order_id || r.fastrr_order_id || oid,
          status:          r.status || ost || "SUCCESS",
          name:            r.shipping_address
            ? `${r.shipping_address.first_name || ""} ${r.shipping_address.last_name || ""}`.trim()
            : "",
          phone:           r.phone || r.shipping_address?.phone || "",
          email:           r.email || "",
          address:         r.shipping_address?.line1
            ? [r.shipping_address.line1, r.shipping_address.line2].filter(Boolean).join(", ")
            : "",
          city:            r.shipping_address?.city    || "",
          state:           r.shipping_address?.state   || "",
          pincode:         r.shipping_address?.pincode || "",
          price:           r.total_amount_payable != null
            ? `₹${Number(r.total_amount_payable).toFixed(2)}` : "—",
          priceNum:        r.total_amount_payable || 0,
          subtotal:        r.subtotal_price   || 0,
          couponDiscount:  r.coupon_discount  || 0,
          couponCodes:     r.coupon_codes     || [],
          shippingCharges: r.shipping_charges || 0,
          payment:         r.payment_type || (r.cod_charges ? "COD" : "Prepaid"),
          paymentStatus:   r.payment_status || "",
          edd:             r.edd || null,
          items:           r.cart_data?.items || [],
          label:           r.cart_data?.items?.[0]?.variant_id || "",
          qty:             r.cart_data?.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1,
          createdAt:       r.order_created_date || new Date().toISOString(),
          _raw:            r,
        };

        setOrder(mapped);
        saveOrderToMyOrders(mapped);
        localStorage.setItem("exc_last_order", JSON.stringify(mapped));
      } catch (err) {
        console.error("fetchOrder:", err);
        setFetchError("ऑर्डर विवरण लोड नहीं हो सका। कृपया पुनः प्रयास करें।");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oid]);

  // ── Fire Shiprocket order webhook — once, after order loads ───────────────
  useEffect(() => {
    if (!order?.orderId || srFiredRef.current) return;
    srFiredRef.current = true;
    fireShiprocketOrder(order);
  }, [order]);

  // ── Fire Facebook CAPI Purchase event ─────────────────────────────────────
  // useEffect(() => {
  //   if (!order?.orderId) return;
  //   const fired = getFiredPixelOrders();
  //   if (fired.has(`pixel_${order.orderId}`)) return;

  //   const numericValue =
  //     order?.priceNum ??
  //     (order?.price ? Number(String(order.price).replace(/[^\d.]/g, "")) : 0);

  //   const contents = order.items?.length
  //     ? order.items.map((item) => ({
  //         id:         String(item.variant_id || item.id || ""),
  //         quantity:   item.quantity || 1,
  //         item_price: item.price ?? item.item_price ?? 0,
  //         title:      item.name || item.title || "",
  //       }))
  //     : [{ id: String(order.label || order.orderId), quantity: 1, item_price: numericValue, title: "Nabhi Amrit" }];

  //   sendEvent({
  //     eventName:  "Purchase",
  //     phone:      order.phone !== "—" ? order.phone : undefined,
  //     name:       order.name  !== "—" ? order.name  : undefined,
  //     customData: {
  //       currency:  "INR",
  //       value:     numericValue,
  //       num_items: contents.reduce((s, c) => s + c.quantity, 0),
  //       contents,
  //     },
  //   });

  //   markPixelFired(`pixel_${order.orderId}`);
  // }, [order]);

  // ── Derived display values ─────────────────────────────────────────────────
  const orderId     = order?.orderId ?? "—";
  const name        = order?.name || "प्रिय ग्राहक";
  const firstName   = name.split(" ")[0];
  const phone       = order?.phone || "—";
  const address     = order?.address || "—";
  const city        = order?.city || "";
  const state       = order?.state || "";
  const pincode     = order?.pincode || "";
  const product     = order?.label || "Nabhi Amrit";
  const price       = order?.price || "—";
  const payment     = order?.payment || "Prepaid";
  const edd         = order?.edd || "5–7 कार्य दिवस";
  const isCOD       = /cod|cash/i.test(payment);
  const fullAddress = [address, city, state, pincode].filter(Boolean).join(", ");
  const eddLabel    = edd !== "5–7 कार्य दिवस" ? `${edd} तक डिलीवरी` : "5–7 कार्य दिवसों में डिलीवरी";

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <NabhiHeaderHindi />
        <div className="max-w-[560px] mx-auto px-4 pt-12 pb-20 flex flex-col items-center gap-6">
          <Skel className="w-20 h-20 rounded-full" />
          <Skel className="w-48 h-5" />
          <Skel className="w-64 h-4" />
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full bg-white rounded-2xl border border-[#e5e0d4] p-5 flex flex-col gap-3 shadow-sm">
              <Skel className="w-2/5 h-4" />
              <Skel className="w-3/4 h-4" />
              <Skel className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <NabhiHeader />
        <div className="max-w-[560px] mx-auto px-4 flex flex-col items-center pt-24 gap-4 text-center">
          <span className="text-5xl">⚠️</span>
          <p className="text-red-600 font-semibold text-sm">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-br from-[#2d5a27] to-[#3d7534] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#edf4ea] to-[#f1ede1]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Inject Google Fonts + keyframe animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn   { 0%{opacity:0;transform:scale(.5)} 70%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
        @keyframes ripple  { 0%{transform:scale(.8);opacity:.6} 100%{transform:scale(2.6);opacity:0} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .anim-hero    { opacity:0; animation: fadeUp .6s ease .05s forwards; }
        .anim-card-1  { opacity:0; animation: fadeUp .55s ease .16s forwards; }
        .anim-card-2  { opacity:0; animation: fadeUp .55s ease .26s forwards; }
        .anim-card-3  { opacity:0; animation: fadeUp .55s ease .30s forwards; }
        .anim-card-4  { opacity:0; animation: fadeUp .55s ease .34s forwards; }
        .anim-btn-1   { opacity:0; animation: fadeUp .55s ease .40s forwards; }
        .anim-btn-2   { opacity:0; animation: fadeUp .55s ease .46s forwards; }
        .anim-popin   { animation: popIn .65s cubic-bezier(.34,1.56,.64,1) .15s both; }
        .ripple-ring  { animation: ripple 2.4s ease-out infinite; }
        .ripple-ring:nth-child(2){ animation-delay:.6s; }
        .ripple-ring:nth-child(3){ animation-delay:1.2s; }
        .shimmer-btn  { background-size:200% auto; animation: shimmer 2.4s linear infinite; }
      `}</style>

      <NabhiHeader />

      <div className="max-w-[560px] mx-auto px-4 sm:px-6 pb-20">

        {/* ── Hero ── */}
        <div className="anim-hero text-center pt-10 pb-6">
          {/* Ripple + check */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="ripple-ring absolute w-20 h-20 rounded-full border-2 border-green-800/20" />
            <div className="ripple-ring absolute w-20 h-20 rounded-full border-2 border-green-800/20" />
            <div className="ripple-ring absolute w-20 h-20 rounded-full border-2 border-green-800/20" />
            <div className="anim-popin relative z-10 w-[88px] h-[88px] rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c40] flex items-center justify-center shadow-[0_16px_48px_rgba(45,90,39,0.32),0_4px_12px_rgba(45,90,39,0.2)]">
              <FaCheckCircle size={38} color="#fff" />
            </div>
          </div>

          <h1
            className="text-[clamp(1.75rem,5vw,2.1rem)] font-bold text-[#1a1a1a] leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ऑर्डर की पुष्टि हो गई!
          </h1>
          <p className="text-[clamp(0.875rem,2.5vw,0.9375rem)] text-[#555] leading-[1.75] max-w-[320px] mx-auto mb-3">
            धन्यवाद, <strong className="text-[#2d5a27]">{firstName}</strong>!{" "}
            आपका नाभि अमृत रास्ते में है।{" "}
            <strong>{eddLabel}</strong>
          </p>

          <span className="inline-flex items-center gap-1.5 bg-green-800/10 border border-green-800/[0.18] rounded-full px-4 py-1.5 text-[0.8125rem] font-bold text-[#2d5a27] tracking-[0.03em]">
            <HiSparkles size={12} />
            ऑर्डर #{orderId}
          </span>
        </div>

        {/* ── Order Summary ── */}
        <div className="anim-card-1 bg-white rounded-[20px] border border-[#e5e0d4] overflow-hidden mb-3 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#2d5a27] to-[#3d7534]">
            <FaBoxOpen size={15} color="rgba(255,255,255,0.9)" />
            <h2
              className="text-[1.0625rem] font-bold text-white m-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ऑर्डर सारांश
            </h2>
          </div>

          {/* Product */}
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[#f0ece2]">
            <div>
              <p className="text-[15px] font-bold text-[#1a1a1a] mb-1">नाभि अमृत — {product}</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2d5a27]">
                <FaLeaf size={10} /> 100% आयुर्वेदिक तेल
              </span>
            </div>
            <span className="text-[1.125rem] font-extrabold text-[#2d5a27] whitespace-nowrap">{price}</span>
          </div>

          {/* Subtotal */}
          {order?._raw && order.subtotal > 0 && (
            <Row label="उप-कुल" value={`₹${Number(order.subtotal).toFixed(2)}`} />
          )}

          {/* Coupon */}
          {order?._raw && order.couponDiscount > 0 && (
            <div className="flex justify-between items-center px-5 py-3 border-b border-[#f0ece2] gap-4">
              <span className="text-[13px] text-[#888] font-medium flex items-center gap-2 flex-wrap">
                कूपन छूट
                {order.couponCodes?.length > 0 && (
                  <span className="text-[11px] bg-green-800/10 text-[#2d5a27] px-2 py-0.5 rounded-full font-bold">
                    {order.couponCodes.join(", ")}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-semibold text-red-600">
                -₹{Number(order.couponDiscount).toFixed(2)}
              </span>
            </div>
          )}

          <Row label="भुगतान" value={payment} />
          <Row
            label="शिपिंग"
            value={order?.shippingCharges > 0 ? `₹${order.shippingCharges}` : "मुफ़्त · 5–7 कार्य दिवस"}
            last
          />
        </div>

        {/* ── Delivery Details ── */}
        <div className="anim-card-2 bg-white rounded-[20px] border border-[#e5e0d4] overflow-hidden mb-3 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2.5 px-5 py-3.5 bg-[#fafaf7] border-b border-[#f0ece2]">
            <TbTruckDelivery size={16} color="#2d5a27" />
            <h2
              className="text-[1.0625rem] font-bold text-[#1a1a1a] m-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              डिलीवरी विवरण
            </h2>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            {[
              { icon: <MdVerified size={14} color="#2d5a27" />,      label: "नाम",              value: name },
              { icon: <FaPhone size={12} color="#2d5a27" />,          label: "फोन",              value: phone },
              { icon: <FaMapMarkerAlt size={12} color="#2d5a27" />,   label: "डिलीवरी पता",     value: fullAddress || "—", small: true },
              ...(edd && edd !== "5–7 कार्य दिवस"
                ? [{ icon: <TbTruckDelivery size={14} color="#2d5a27" />, label: "अपेक्षित डिलीवरी", value: edd }]
                : []),
            ].map(({ icon, label, value, small }) => (
              <div key={label} className="flex items-start gap-3.5">
                <div className="w-[34px] h-[34px] rounded-full bg-green-800/10 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.08em] mb-0.5">{label}</p>
                  <p className={`font-semibold text-[#1a1a1a] leading-snug ${small ? "text-sm" : "text-[15px]"}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COD notice ── */}
        {isCOD && (
          <div className="anim-card-3 mb-3 rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
            <span className="text-xl mt-0.5">💵</span>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-0.5">कैश ऑन डिलीवरी</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                डिलीवरी के समय कृपया <strong>{price}</strong> तैयार रखें।
              </p>
            </div>
          </div>
        )}

        {/* ── What's next ── */}
        <div className="anim-card-4 rounded-[20px] border border-green-800/[0.18] bg-gradient-to-br from-[#f0f7ee] to-[#e8f3e5] px-5 py-4 mb-3 flex items-start gap-3.5">
          <TbTruckDelivery size={24} color="#2d5a27" className="shrink-0 mt-0.5" />
          <div>
            <p
              className="text-[1.0625rem] font-bold text-[#1a1a1a] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              आगे क्या होगा?
            </p>
            <p className="text-[13px] text-[#555] leading-[1.85]">
              • आपको SMS पर ट्रैकिंग विवरण मिलेगा<br />
              • ऑर्डर मिलने के <strong>24 घंटे</strong> के भीतर पैकिंग होगी<br />
              • <strong>{edd !== "5–7 कार्य दिवस" ? edd : "5–7 कार्य दिवसों"}</strong> में डिलीवरी होगी
            </p>
          </div>
        </div>

        {/* ── View My Orders ── */}
        <div className="anim-btn-1">
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full border-[1.5px] border-[#2d5a27] rounded-[16px] px-5 py-3.5 bg-white flex items-center justify-center gap-2.5 text-[15px] font-bold text-[#2d5a27] hover:bg-green-50 active:scale-[.98] transition-all mb-3"
          >
            <FaBoxOpen size={14} color="#2d5a27" />
            मेरे ऑर्डर देखें
          </button>
        </div>

        {/* ── Continue Shopping ── */}
        <div className="anim-btn-2">
          <button
            onClick={() => navigate("/exclusive-products-hn")}
            className="shimmer-btn w-full rounded-[16px] px-5 py-4 bg-gradient-to-r from-[#2d5a27] via-[#4a8c40] to-[#1a3d16] text-white text-base font-extrabold flex items-center justify-center gap-2.5 shadow-[0_8px_28px_rgba(45,90,39,0.32)] active:scale-[.98] transition-transform"
          >
            <FaLeaf size={13} color="#fff" />
            खरीदारी जारी रखें
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="text-center mt-8 text-[11px] text-[#bbb] leading-[1.7] pb-4">
          <MdVerified
            size={11} color="#2d5a27"
            style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }}
          />
          नाभि अमृत · 100% आयुर्वेदिक · Dreamz Hub © 2026
        </div>

      </div>
    </div>
  );
}