/**
 * ExcOrdersAdmin.jsx
 * Admin order management & tracking page for Nabhi Amrit.
 * Route: /exc-orders-admin  (protect with admin auth middleware)
 *
 * Features:
 *  - Live order list with pagination
 *  - Filter by status
 *  - Search by Order ID / customer name / phone
 *  - Expandable order detail drawer
 *  - One-click status update
 */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  FaLeaf, FaSearch, FaPhone, FaMapMarkerAlt,
  FaCheckCircle, FaBoxOpen, FaTruck, FaBan, FaHourglassHalf,
} from "react-icons/fa";
import { MdVerified, MdRefresh, MdClose } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi";
import { backendurl } from "../../App";
 
// ── Constants ─────────────────────────────────────────────────────────────────
const STATUSES = ["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const STATUS_META = {
  pending:    { label: "Pending",    color: "#c8a84b", bg: "#fef9ee", icon: <FaHourglassHalf size={11} /> },
  confirmed:  { label: "Confirmed",  color: "#2d5a27", bg: "#f0f7ee", icon: <FaCheckCircle    size={11} /> },
  processing: { label: "Processing", color: "#3b7dd8", bg: "#eef4ff", icon: <FaBoxOpen         size={11} /> },
  shipped:    { label: "Shipped",    color: "#7c3aed", bg: "#f5f0ff", icon: <TbTruckDelivery   size={12} /> },
  delivered:  { label: "Delivered",  color: "#059669", bg: "#ecfdf5", icon: <MdVerified         size={12} /> },
  cancelled:  { label: "Cancelled",  color: "#dc2626", bg: "#fef2f2", icon: <FaBan              size={11} /> },
};

const PAY_META = {
  COD:       { label: "COD",     color: "#c8a84b", bg: "#fef9ee" },
  Razorpay:  { label: "Online",  color: "#3b7dd8", bg: "#eef4ff" },
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .row-hover:hover { background: #fafaf7 !important; }
  .status-pill { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:0.04em; }
  .filter-btn { border:1.5px solid #e2e8f0; border-radius:20px; padding:6px 14px; font-size:12px; font-weight:600; cursor:pointer; background:#fff; transition:all 0.15s; }
  .filter-btn.active { background:#2d5a27; color:#fff; border-color:#2d5a27; }
  .action-btn { border:none; border-radius:8px; padding:6px 12px; font-size:12px; font-weight:700; cursor:pointer; transition:all 0.15s; }
  .action-btn:hover { opacity:0.85; transform:translateY(-1px); }
`;

function injectStyles(id, css) {
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const m = STATUS_META[status] || { label: status, color: "#888", bg: "#f5f5f5", icon: null };
  return (
    <span className="status-pill" style={{ background: m.bg, color: m.color }}>
      {m.icon} {m.label}
    </span>
  );
}

// ── Order Detail Drawer ───────────────────────────────────────────────────────
function OrderDrawer({ order, onClose, onStatusChange, updating }) {
  if (!order) return null;
  const c = order.customer || {};
  const p = order.product  || {};
  const fullAddr = [c.address, c.city, c.state, c.pincode].filter(Boolean).join(", ");
  const qty = p.qty || 1;
  const payMeta = PAY_META[order.paymentMethod] || { label: order.paymentMethod, color: "#888", bg: "#f5f5f5" };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 900,
      background: "rgba(0,0,0,0.45)",
      display: "flex", justifyContent: "flex-end",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 100vw)",
          height: "100vh", overflowY: "auto",
          background: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          animation: "slideIn 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #2d5a27, #3d7534)",
          padding: "20px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
              Order Details
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 3, fontFamily: "monospace", letterSpacing: "0.08em" }}>
              #{order.orderId}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <MdClose size={18} />
          </button>
        </div>

        <div style={{ padding: "24px", flex: 1 }}>

          {/* Status + payment row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <StatusBadge status={order.status} />
            <span className="status-pill" style={{ background: payMeta.bg, color: payMeta.color }}>
              {payMeta.label} {order.isPaid ? "· Paid ✓" : "· Unpaid"}
            </span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#aaa" }}>
              {order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : "—"}
            </span>
          </div>

          {/* Customer */}
          <Section title="Customer" icon={<MdVerified size={13} color="#2d5a27" />}>
            <Row label="Name"    value={c.fullName || "—"} />
            <Row label="Phone"   value={c.phone    || "—"} />
            {c.email && <Row label="Email" value={c.email} />}
            <Row label="Address" value={fullAddr   || "—"} />
          </Section>

          {/* Product */}
          <Section title="Product" icon={<FaLeaf size={11} color="#2d5a27" />}>
            <Row label="Pack"     value={p.label || "—"} />
            <Row label="Qty"      value={qty} />
            <Row label="Price/unit" value={p.priceNum ? `₹${p.priceNum.toLocaleString()}` : "—"} />
            <Row label="Total"    value={`₹${order.totalPrice?.toLocaleString() || "—"}`} bold />
          </Section>

          {/* Payment result */}
          {order.paymentResult && (
            <Section title="Payment" icon={<HiSparkles size={12} color="#2d5a27" />}>
              <Row label="Payment ID" value={order.paymentResult.razorpay_payment_id || "—"} mono />
              <Row label="Order ID"   value={order.paymentResult.razorpay_order_id   || "—"} mono />
            </Section>
          )}

          {/* UTM */}
          {order.utm && Object.keys(order.utm).length > 0 && (
            <Section title="UTM" icon={<FaSearch size={10} color="#2d5a27" />}>
              {Object.entries(order.utm).map(([k, v]) => v ? <Row key={k} label={k} value={v} /> : null)}
            </Section>
          )}

          {/* Status update */}
          <div style={{ background: "#fafaf7", borderRadius: 14, border: "1px solid #ebe9e2", padding: "18px 20px", marginTop: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", marginBottom: 12 }}>Update Status</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUSES.filter(s => s !== "all").map((s) => {
                const m = STATUS_META[s];
                const isActive = order.status === s;
                return (
                  <button
                    key={s}
                    disabled={isActive || updating}
                    className="action-btn"
                    onClick={() => onStatusChange(order.orderId, s)}
                    style={{
                      background: isActive ? m.color : m.bg,
                      color: isActive ? "#fff" : m.color,
                      border: `1.5px solid ${m.color}`,
                      opacity: isActive ? 1 : (updating ? 0.6 : 1),
                      cursor: isActive || updating ? "default" : "pointer",
                    }}
                  >
                    {m.label} {isActive && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
        {icon}
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa" }}>{title}</span>
      </div>
      <div style={{ background: "#fafaf7", borderRadius: 12, border: "1px solid #ebe9e2", padding: "14px 16px" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, bold, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "5px 0", borderBottom: "1px solid #f0ece2", fontSize: 13 }}>
      <span style={{ color: "#888", minWidth: 90, flexShrink: 0 }}>{label}</span>
      <span style={{
        color: "#1a1a1a",
        fontWeight: bold ? 800 : 500,
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: mono ? 12 : 13,
        textAlign: "right",
        wordBreak: "break-all",
      }}>{value}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ExcOrdersAdmin() {
  const [orders,    setOrders]    = useState([]);
  const [total,     setTotal]     = useState(0);
  const [page,      setPage]      = useState(1);
  const [pages,     setPages]     = useState(1);
  const [loading,   setLoading]   = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search,    setSearch]    = useState("");
  const [selected,  setSelected]  = useState(null); // drawer
  const [updating,  setUpdating]  = useState(false);
  const LIMIT = 15;

  const fetchOrders = useCallback(async (pg = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: LIMIT };
      if (status !== "all") params.status = status;
      const { data } = await axios.get(`${backendurl}/api/exc/orders`, { params });
      setOrders(data.orders || []);
      setTotal(data.total  || 0);
      setPage(data.page    || pg);
      setPages(data.pages  || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    injectStyles("exc-admin-styles", STYLES);
    fetchOrders(1, filterStatus);
  }, [filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await axios.patch(`${backendurl}/api/exc/orders/${orderId}/status`, { status: newStatus });
      // Refresh list + update drawer
      await fetchOrders(page, filterStatus);
      setSelected((prev) => prev?.orderId === orderId ? { ...prev, status: newStatus } : prev);
    } catch (err) {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Client-side search filter
  const filtered = search.trim()
    ? orders.filter((o) => {
        const q = search.toLowerCase();
        return (
          o.orderId?.toLowerCase().includes(q) ||
          o.customer?.fullName?.toLowerCase().includes(q) ||
          o.customer?.phone?.includes(q)
        );
      })
    : orders;

  // ── Status counts (from current page — rough indicator) ──────────────────
  const counts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f7f5ef 0%, #eef4eb 60%, #f0ece0 100%)",
      fontFamily: "'DM Sans', sans-serif",
      padding: "0 0 60px",
    }}>

      {/* ── Top bar ── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "14px 24px",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <FaLeaf size={14} color="#2d5a27" />
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
          Nabhi Amrit
        </span>
        <span style={{ fontSize: 12, color: "#aaa", marginLeft: 2 }}>/ Orders</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#2d5a27", background: "#f0f7ee", padding: "4px 12px", borderRadius: 20, border: "1px solid #d4e8d0" }}>
            {total} total orders
          </span>
          <button
            onClick={() => fetchOrders(page, filterStatus)}
            style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600 }}
          >
            <MdRefresh size={14} /> Refresh
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>

        {/* ── Summary cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
          {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => {
            const m = STATUS_META[s];
            return (
              <div
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  background: filterStatus === s ? m.bg : "#fff",
                  border: `1.5px solid ${filterStatus === s ? m.color : "#e5e7eb"}`,
                  borderRadius: 14, padding: "14px 16px",
                  cursor: "pointer", transition: "all 0.15s",
                  animation: "fadeUp 0.4s ease both",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ color: m.color }}>{m.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888" }}>{m.label}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: m.color, fontFamily: "'Cormorant Garamond', serif" }}>
                  {counts[s] || 0}
                </div>
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>on this page</div>
              </div>
            );
          })}
        </div>

        {/* ── Filters & Search ── */}
        <div style={{
          background: "#fff", border: "1px solid #ebe9e2", borderRadius: 16,
          padding: "16px 20px", marginBottom: 16,
          display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <FaSearch size={12} color="#aaa" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, name, phone…"
              style={{
                width: "100%", padding: "9px 12px 9px 32px",
                border: "1.5px solid #e2e8f0", borderRadius: 10,
                fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                color: "#1a1a1a", background: "#fafafa", outline: "none",
              }}
            />
          </div>

          {/* Status filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`filter-btn ${filterStatus === s ? "active" : ""}`}
                onClick={() => { setFilterStatus(s); setPage(1); }}
              >
                {s === "all" ? "All" : STATUS_META[s]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div style={{ background: "#fff", border: "1px solid #ebe9e2", borderRadius: 20, overflow: "hidden", animation: "fadeUp 0.4s ease both" }}>

          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr 110px 90px 100px 110px 100px",
            padding: "12px 20px",
            background: "#fafaf7",
            borderBottom: "1px solid #ebe9e2",
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#aaa",
            gap: 8,
          }}>
            <span>Order ID</span>
            <span>Customer</span>
            <span>Pack × Qty</span>
            <span>Total</span>
            <span>Payment</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {/* Rows */}
          {loading ? (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <div style={{ width: 36, height: 36, border: "3px solid #d4e8d0", borderTopColor: "#2d5a27", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 12px" }} />
              <div style={{ fontSize: 13, color: "#aaa" }}>Loading orders…</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#aaa", fontSize: 14 }}>
              No orders found. {search && "Try clearing the search."}
            </div>
          ) : (
            filtered.map((order, i) => {
              const c = order.customer || {};
              const p = order.product  || {};
              const qty = p.qty || 1;
              const payMeta = PAY_META[order.paymentMethod] || { label: order.paymentMethod, color: "#888", bg: "#f5f5f5" };
              return (
                <div
                  key={order._id || order.orderId}
                  className="row-hover"
                  onClick={() => setSelected(order)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr 110px 90px 100px 110px 100px",
                    padding: "14px 20px",
                    borderBottom: "1px solid #f5f5f0",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 8,
                    animation: `fadeUp 0.35s ease ${i * 0.025}s both`,
                  }}
                >
                  {/* Order ID */}
                  <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#2d5a27", letterSpacing: "0.05em" }}>
                    {order.orderId}
                  </span>

                  {/* Customer */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{c.fullName || "—"}</div>
                    <div style={{ fontSize: 11, color: "#aaa", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <FaPhone size={9} /> {c.phone || "—"}
                    </div>
                  </div>

                  {/* Pack × Qty */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{p.label || "—"}</div>
                    {qty > 1 && <div style={{ fontSize: 11, color: "#aaa" }}>× {qty}</div>}
                  </div>

                  {/* Total */}
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", fontFamily: "'Cormorant Garamond', serif" }}>
                    ₹{order.totalPrice?.toLocaleString() || "—"}
                  </span>

                  {/* Payment */}
                  <span className="status-pill" style={{ background: payMeta.bg, color: payMeta.color }}>
                    {payMeta.label}
                  </span>

                  {/* Status */}
                  <StatusBadge status={order.status} />

                  {/* Date */}
                  <span style={{ fontSize: 11, color: "#aaa" }}>
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "—"}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* ── Pagination ── */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 24 }}>
            <button
              onClick={() => fetchOrders(page - 1)}
              disabled={page <= 1}
              className="action-btn"
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#555", opacity: page <= 1 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            <span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>
              Page {page} of {pages}
            </span>
            <button
              onClick={() => fetchOrders(page + 1)}
              disabled={page >= pages}
              className="action-btn"
              style={{ background: "#2d5a27", color: "#fff", opacity: page >= pages ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        )}

        {/* ── Footer note ── */}
        <div style={{ textAlign: "center", marginTop: 32, color: "#aaa", fontSize: 12 }}>
          <MdVerified size={12} color="#2d5a27" style={{ marginRight: 4, verticalAlign: "middle" }} />
          Nabhi Amrit Admin · Dreamz Hub © 2026
        </div>
      </div>

      {/* ── Order Detail Drawer ── */}
      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          updating={updating}
        />
      )}
    </div>
  );
}