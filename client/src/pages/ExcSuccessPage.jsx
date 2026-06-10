import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaLeaf, FaBoxOpen, FaPhone, FaMapMarkerAlt, FaCheckCircle,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { backendurl } from "../App";

// ─── Config ───────────────────────────────────────────────────────────────────
const SR_COMPANY_ID = 543644;

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

async function fireShiprocketOrder(order) {
  if (!order?.orderId) return;
  const fired = getSRFiredOrders();
  if (fired.has(`sr_${order.orderId}`)) return;

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
    markSRFired(`sr_${order.orderId}`);
  } catch (err) {
    console.error("❌ Shiprocket order webhook failed:", err?.response?.data || err.message);
  }
}

function Skel({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gradient-to-r from-[#f2eafa] via-[#fafafa] to-[#f2eafa] ${className}`} />
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        setFetchError("Could not load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [oid]);

  useEffect(() => {
    if (!order?.orderId || srFiredRef.current) return;
    srFiredRef.current = true;
    fireShiprocketOrder(order);
  }, [order]);

  // Derived Values
  const orderId     = order?.orderId ?? "—";
  const name        = order?.name || "Valued Customer";
  const phone       = order?.phone || "—";
  const email       = order?.email || "—";
  const address     = order?.address || "—";
  const city        = order?.city || "";
  const state       = order?.state || "";
  const pincode     = order?.pincode || "";
  const product     = order?.label || "Nabhi Amrit";
  const price       = order?.price || "—";
  const payment     = order?.payment || "Prepaid";
  const edd         = order?.edd || "5–7 business days";
  const isCOD       = /cod|cash/i.test(payment);
  const fullAddress = [address, city, state, pincode].filter(Boolean).join(", ");
  const formattedDate = order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--new-bg-white-color)] flex items-center justify-center p-6">
        <div className="max-w-[580px] w-full flex flex-col items-center gap-6">
          <Skel className="w-12 h-12 rounded-full" />
          <Skel className="w-48 h-6" />
          <Skel className="w-full h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[var(--new-bg-white-color)] flex items-center justify-center p-6">
        <div className="max-w-[400px] text-center flex flex-col items-center gap-4">
          <span className="text-4xl">⚠️</span>
          <p className="text-[#a81313] font-semibold text-sm">{fetchError}</p>
          <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-[var(--color-black)] text-white rounded-lg text-sm font-bold">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--new-bg-white-color)] text-[#21124c] py-20 px-4 sm:px-6 selection:bg-[#f2eafa]" style={{ fontFamily: "var(--font-new-1)" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-layout { animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Main Structural Wrapper Container */}
      <div className="max-w-[1240px] mx-auto animate-layout">
        
        {/* ── Top Header Section ── */}
        <div className="flex flex-col items-center text-center pb-8">
          <div className="w-12 h-12 rounded-full bg-[#5d27aa]/10 flex items-center justify-center text-[#5d27aa] mb-4">
            <FaCheckCircle size={26} />
          </div>
          <h1 className="text-2xl font-normal tracking-tight text-[#21124c] mb-1">Thank you</h1>
          <p className="text-xl font-medium text-[var(--color-black)] mb-2">Your order has been received</p>
          <p className="text-xs text-[#aaa4b8] max-w-sm">You will receive an email/SMS notification with updates regarding your delivery details.</p>
        </div>

        {/* ── Order Details Panel ── */}
        <div className="bg-white border border-[#aaa4b8]/30 rounded-xl shadow-[0_3px_14px_rgba(0,0,0,0.02)] p-6 my-6">
          <h2 className="text-sm font-bold text-[var(--color-black)] mb-4">Order details</h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-[#aaa4b8]">
              <span>Order number:</span>
              <span className="font-semibold text-[#21124c]">{orderId}</span>
            </div>
            <div className="flex justify-between items-center text-[#aaa4b8]">
              <span>Date:</span>
              <span className="font-medium text-[#21124c]">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center text-[#aaa4b8] pb-2.5 border-b border-dashed border-[#aaa4b8]/20">
              <span>Payment method:</span>
              <span className="font-medium text-[#21124c]">{payment}</span>
            </div>
            
            {/* Breakdowns */}
            <div className="pt-2 space-y-2">
              {order?.subtotal > 0 && (
                <div className="flex justify-between items-center text-[#aaa4b8]">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#21124c]">₹{Number(order.subtotal).toFixed(2)}</span>
                </div>
              )}
              {order?.couponDiscount > 0 && (
                <div className="flex justify-between items-center text-[#aaa4b8]">
                  <span className="flex items-center gap-1">
                    Discount 
                    {order.couponCodes?.length > 0 && (
                      <span className="bg-[#f2eafa] text-[#5d27aa] text-[9px] px-1 py-0.5 rounded border border-[#5d27aa]/20">
                        {order.couponCodes.join(", ")}
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-[#a81313]">-₹{Number(order.couponDiscount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[#aaa4b8]">
                <span>Shipping cost:</span>
                <span className="font-medium text-[#21124c]">{order?.shippingCharges > 0 ? `₹${order.shippingCharges}` : "FREE"}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-[#21124c]">
                <span>Total:</span>
                <span className="text-sm text-[var(--color-black)] font-bold">{price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Products List Section ── */}
        <div className="py-5 border-b border-[#aaa4b8]/30">
          <h2 className="text-sm font-bold text-[var(--color-black)] mb-3">Products</h2>
          <div className="space-y-4">
            {order?.items?.length ? (
              order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs pb-3 border-b border-[#aaa4b8]/15 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-[#21124c]">{item.name || "Nabhi Amrit Product"}</p>
                    <p className="text-[11px] text-[#aaa4b8] mt-0.5">Qty: {item.quantity || 1} {item.variant_id ? `· (${item.variant_id})` : ""}</p>
                    <p className="text-[11px] text-[#5d27aa] font-medium mt-1 flex items-center gap-1"><FaLeaf size={8}/> Authentic Ayurvedic Package</p>
                  </div>
                  <span className="font-bold text-[var(--color-black)]">₹{Number(item.price || priceNum).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-[#21124c]">Nabhi Amrit — {product}</p>
                  <p className="text-[11px] text-[#aaa4b8] mt-0.5">Qty: {order?.qty || 1}</p>
                  <p className="text-[11px] text-[#5d27aa] font-medium mt-1 flex items-center gap-1"><FaLeaf size={8}/> 100% Ayurvedic Oil Package</p>
                </div>
                <span className="font-bold text-[var(--color-black)]">{price}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Customer Details Section ── */}
        <div className="py-6">
          <h2 className="text-sm font-bold text-[var(--color-black)] mb-4">Customer details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Column 1: Contact details */}
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-[#aaa4b8] uppercase tracking-wider mb-1">Contact</p>
                <p className="text-[#21124c] font-medium break-all">{email}</p>
                <p className="text-[#aaa4b8] text-[11px] mt-0.5">{phone}</p>
              </div>
              {isCOD && (
                <div className="p-3 bg-[#df8804]/10 border border-[#df8804]/20 rounded-lg text-[#df8804] text-[11px] leading-relaxed">
                  <span className="font-bold block mb-0.5">💵 Cash on Delivery Notice:</span>
                  Please prepare <strong className="font-bold">{price}</strong> in cash to complete checkout handover upon logistics delivery.
                </div>
              )}
            </div>

            {/* Column 2: Billing / Delivery address */}
            <div>
              <p className="text-[11px] font-bold text-[#aaa4b8] uppercase tracking-wider mb-1">Billing & Delivery address</p>
              <div className="text-[#21124c] font-medium leading-relaxed">
                <p className="text-[var(--color-black)] font-bold">{name}</p>
                <p className="text-[#aaa4b8] mt-1 text-[11px]">{fullAddress || "—"}</p>
                <span className="inline-flex bg-[#5d27aa]/10 text-[#5d27aa] text-[10px] font-bold px-2 py-0.5 rounded border border-[#5d27aa]/20 mt-2.5">
                  Expected: {edd !== "5–7 business days" ? edd : "5-7 days"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Navigation Interface ── */}
        <div className="pt-6 border-t border-[#aaa4b8]/30 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/my-orders-en")}
            className="flex-1 border border-[#aaa4b8]/30 bg-white text-[#21124c] rounded-lg py-3 text-xs font-bold hover:bg-[#fafafa] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <FaBoxOpen size={12} />
            View My Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 bg-[var(--color-black)] hover:bg-[var(--color-black)]/90 text-white rounded-lg py-3 text-xs font-bold shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <FaLeaf size={11} />
            Continue Shopping
          </button>
        </div>

        {/* ── Bottom Identity Branding ── */}
        <div className="text-center mt-12 text-[11px] text-[#aaa4b8] font-medium">
          Nabhi Amrit · 100% Ayurvedic · Dreamz Hub © 2026
        </div>

      </div>
    </div>
  );
}