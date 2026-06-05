import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";

// ── Token persistence ────────────────────────────────────────────────────────
const TOKEN_KEY = "admin_contact_token";
const USER_KEY  = "admin_contact_user";

const getStoredAuth = () => ({
  token: localStorage.getItem(TOKEN_KEY) || "",
  user:  (() => { try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { return null; } })(),
});

const setStoredAuth = (token, user) => {
  if (token) localStorage.setItem(TOKEN_KEY, token); else localStorage.removeItem(TOKEN_KEY);
  if (user)  localStorage.setItem(USER_KEY,  JSON.stringify(user)); else localStorage.removeItem(USER_KEY);
};

// ── Status chip styling ──────────────────────────────────────────────────────
const STATUS_STYLES = {
  new:      { bg: "bg-[#fef3c7]", text: "text-[#92400e]", dot: "bg-[#f59e0b]" },
  read:     { bg: "bg-[#dbeafe]", text: "text-[#1e40af]", dot: "bg-[#3b82f6]" },
  replied:  { bg: "bg-[#dcfce7]", text: "text-[#166534]", dot: "bg-[#22c55e]" },
  archived: { bg: "bg-gray-200",  text: "text-gray-700",  dot: "bg-gray-500"   },
};

const LANG_LABEL = { en: "English", hi: "Hindi", ta: "Tamil", te: "Telugu" };

const CATEGORY_LABEL = {
  product:   "Product Enquiry",
  order:     "Order & Delivery",
  wellness:  "Wellness Guidance",
  wholesale: "Wholesale / B2B",
  feedback:  "Feedback & Reviews",
  other:     "Other",
  "":        "—",
};

const CATEGORY_OPTIONS = [
  { value: "product",   label: "Product Enquiry" },
  { value: "order",     label: "Order & Delivery" },
  { value: "wellness",  label: "Wellness Guidance" },
  { value: "wholesale", label: "Wholesale / B2B" },
  { value: "feedback",  label: "Feedback & Reviews" },
  { value: "other",     label: "Other" },
];

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

// ─── Login screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendurl}/api/auth/admin-login`,
        { email: email.trim().toLowerCase(), password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (!res.data?.success) throw new Error(res.data?.message || "Login failed");
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--color-primary-light)" }}>
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-4"
        style={{ border: "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)" }}
      >
        <div className="text-center mb-2">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ background: "var(--color-primary)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Contact Messages Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
            style={{ "--tw-ring-color": "var(--color-primary)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white rounded-xl font-semibold text-sm transition-colors"
          style={{ background: loading ? "var(--color-muted)" : "var(--color-primary)" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

// ─── Detail drawer ───────────────────────────────────────────────────────────
function MessageDetail({ message, onClose, onUpdate, onDelete }) {
  if (!message) return null;

  const changeStatus = async (status) => {
    await onUpdate(message._id, { status });
  };
  const toggleArchive = async () => {
    await onUpdate(message._id, { isArchived: !message.isArchived });
  };
  const remove = async () => {
    if (!window.confirm("Delete this message permanently?")) return;
    await onDelete(message._id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 px-5 py-4 flex items-center justify-between border-b border-gray-100"
          style={{ background: "var(--color-primary-light)" }}
        >
          <h2 className="font-bold text-gray-900">Message Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900" aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">From</p>
            <p className="text-base font-semibold text-gray-900">{message.name}</p>
            <p className="text-sm text-gray-600">{message.email}</p>
            {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Received</p>
              <p className="text-gray-800">{formatDate(message.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Language</p>
              <p className="text-gray-800">{LANG_LABEL[message.lang] || message.lang}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Category</p>
              <p className="text-gray-800">{CATEGORY_LABEL[message.category] || "—"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Message</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {message.message}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {["new", "read", "replied", "archived"].map((s) => (
              <button
                key={s}
                onClick={() => changeStatus(s)}
                disabled={message.status === s}
                className="px-3 py-1.5 text-xs font-semibold rounded-full border capitalize disabled:cursor-default"
                style={
                  message.status === s
                    ? { background: "var(--color-primary)", color: "white", borderColor: "var(--color-primary)" }
                    : { background: "white", color: "var(--color-primary)", borderColor: "color-mix(in srgb, var(--color-primary) 40%, transparent)" }
                }
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-4">
            <a
              href={`mailto:${message.email}?subject=${encodeURIComponent("Re: Your message to " + "Home With Care")}`}
              className="flex-1 text-center py-2.5 text-white text-sm font-semibold rounded-lg no-underline"
              style={{ background: "var(--color-primary)" }}
            >
              Reply via Email
            </a>
            <button
              onClick={toggleArchive}
              className="px-4 py-2.5 text-sm font-semibold rounded-lg border"
              style={{ color: "var(--color-primary)", borderColor: "color-mix(in srgb, var(--color-primary) 40%, transparent)" }}
            >
              {message.isArchived ? "Unarchive" : "Archive"}
            </button>
          </div>

          <button
            onClick={remove}
            className="w-full text-sm text-red-600 hover:text-red-800 font-semibold pt-2"
          >
            Delete message
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function AdminContactMessages() {
  const [{ token, user }, setAuth] = useState(getStoredAuth);

  const [messages, setMessages]     = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [statusCounts, setCounts]   = useState({ new: 0, read: 0, replied: 0, archived: 0 });
  const [filters, setFilters]       = useState({ status: "", q: "", lang: "", category: "", archived: "false", page: 1 });
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [selected, setSelected]     = useState(null);

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: backendurl });
    instance.interceptors.request.use((cfg) => {
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
      return cfg;
    });
    return instance;
  }, [token]);

  // If a stale token returns 401, kick back to login
  useEffect(() => {
    const id = api.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err.response?.status === 401) handleLogout();
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const fetchMessages = async (overrides = {}) => {
    const params = { ...filters, ...overrides };
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/contact", { params });
      if (!res.data?.success) throw new Error(res.data?.message || "Failed to load");
      setMessages(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      setCounts(res.data.statusCounts || { new: 0, read: 0, replied: 0, archived: 0 });
      setFilters((f) => ({ ...f, ...params }));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMessages({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters.status, filters.lang, filters.category, filters.archived]);

  const handleLogin = (newToken, newUser) => {
    setStoredAuth(newToken, newUser);
    setAuth({ token: newToken, user: newUser });
  };

  const handleLogout = () => {
    setStoredAuth("", null);
    setAuth({ token: "", user: null });
    setMessages([]);
    setSelected(null);
  };

  const updateMessage = async (id, body) => {
    try {
      const res = await api.patch(`/api/contact/${id}`, body);
      if (!res.data?.success) throw new Error(res.data?.message || "Update failed");
      // Refresh list and detail
      fetchMessages();
      if (selected?._id === id) setSelected(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Update failed");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await api.delete(`/api/contact/${id}`);
      if (!res.data?.success) throw new Error(res.data?.message || "Delete failed");
      setSelected(null);
      fetchMessages();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Delete failed");
    }
  };

  const openMessage = async (id) => {
    try {
      const res = await api.get(`/api/contact/${id}`);
      if (!res.data?.success) throw new Error(res.data?.message || "Not found");
      setSelected(res.data.data);
      fetchMessages();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to open");
    }
  };

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-30"
        style={{ background: "var(--color-primary-dark)" }}
      >
        <div>
          <h1 className="text-white text-lg font-bold">Contact Messages</h1>
          <p className="text-white/70 text-xs">
            Signed in as {user?.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Status counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { key: "new",      label: "New" },
            { key: "read",     label: "Read" },
            { key: "replied",  label: "Replied" },
            { key: "archived", label: "Archived" },
          ].map(({ key, label }) => {
            const isActive = filters.status === key;
            return (
              <button
                key={key}
                onClick={() => setFilters((f) => ({ ...f, status: isActive ? "" : key, page: 1 }))}
                className="bg-white rounded-xl border p-3 text-left transition-shadow hover:shadow-sm"
                style={{
                  borderColor: isActive ? "var(--color-primary)" : "#e5e7eb",
                  boxShadow: isActive ? "0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent)" : "none",
                }}
              >
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts[key] ?? 0}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search name, email, message…"
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            onKeyDown={(e) => { if (e.key === "Enter") fetchMessages({ page: 1 }); }}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
          <select
            value={filters.lang}
            onChange={(e) => setFilters((f) => ({ ...f, lang: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
          >
            <option value="">All languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
          >
            <option value="">All categories</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select
            value={filters.archived}
            onChange={(e) => setFilters((f) => ({ ...f, archived: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none"
          >
            <option value="false">Active only</option>
            <option value="true">Archived only</option>
            <option value="all">Show all</option>
          </select>
          <button
            onClick={() => fetchMessages({ page: 1 })}
            className="px-4 py-2 text-white text-sm font-semibold rounded-lg"
            style={{ background: "var(--color-primary)" }}
          >
            Apply
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Loading…</div>
          ) : messages.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">No messages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-xs uppercase tracking-widest text-gray-500">
                    <th className="px-4 py-3 font-bold">From</th>
                    <th className="px-4 py-3 font-bold">Message</th>
                    <th className="px-4 py-3 font-bold">Category</th>
                    <th className="px-4 py-3 font-bold">Lang</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr
                      key={m._id}
                      onClick={() => openMessage(m._id)}
                      className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                      style={m.isArchived ? { opacity: 0.6 } : {}}
                    >
                      <td className="px-4 py-3 align-top">
                        <p className="font-semibold text-gray-900">{m.name}</p>
                        <p className="text-gray-500 text-xs">{m.email}</p>
                        {m.phone && <p className="text-gray-500 text-xs">{m.phone}</p>}
                      </td>
                      <td className="px-4 py-3 align-top max-w-xs">
                        <p className="text-gray-800 line-clamp-2">{m.message}</p>
                      </td>
                      <td className="px-4 py-3 align-top text-gray-700 text-xs whitespace-nowrap">
                        {CATEGORY_LABEL[m.category] || "—"}
                      </td>
                      <td className="px-4 py-3 align-top text-gray-600 text-xs">
                        {LANG_LABEL[m.lang] || m.lang}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <StatusBadge status={m.status} />
                      </td>
                      <td className="px-4 py-3 align-top text-gray-600 text-xs whitespace-nowrap">
                        {formatDate(m.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
            </span>
            <div className="flex gap-2">
              <button
                disabled={!pagination.hasPrev}
                onClick={() => fetchMessages({ page: pagination.page - 1 })}
                className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={!pagination.hasNext}
                onClick={() => fetchMessages({ page: pagination.page + 1 })}
                className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      {selected && (
        <MessageDetail
          message={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateMessage}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
}
