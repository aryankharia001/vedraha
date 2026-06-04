// ─────────────────────────────────────────────────────────────────────────────
// ProductReviewSection.jsx
// Fully functional reviews section backed by /api/reviews.
// Props:
//   productId  – the id used to scope reviews (required)
//   themeColor – brand color (optional, defaults to #2d5a27)
//
// Features:
//   • Fetches paginated reviews + rating summary from the DB
//   • Star filter, sort (recent / highest / lowest)
//   • "Write a Review" form (name, rating, title, body) → POST /api/reviews
//   • Total rating + per-star histogram in the UI
//   • Pagination (prev / next + page numbers)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { backendurl } from "../App";

const PAGE_SIZE = 5;
const STAR_OPTIONS = [0, 5, 4, 3, 2, 1];
const SORT_OPTIONS = [
  { key: "recent", label: "Most recent" },
  { key: "highest", label: "Highest rating" },
  { key: "lowest", label: "Lowest rating" },
];

// ─── Tiny helpers ────────────────────────────────────────────────────────────
const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StarBar = ({ rating = 0, size = 12, color = "#c8a84b" }) => (
  <div className="inline-flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <FaStar
        key={i}
        size={size}
        color={i <= Math.round(rating) ? color : "#e5e7eb"}
      />
    ))}
  </div>
);

const Spinner = () => (
  <div className="flex items-center justify-center py-10">
    <span className="w-7 h-7 border-2 border-gray-200 border-t-[#2d5a27] rounded-full animate-spin" />
  </div>
);

// ─── Interactive star input (used in the form) ───────────────────────────────
function StarInput({ value, onChange, size = 26 }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="bg-transparent border-0 p-0 cursor-pointer"
          aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >
          <FaStar
            size={size}
            color={i <= display ? "#c8a84b" : "#e5e7eb"}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Rating summary block ────────────────────────────────────────────────────
function RatingSummary({ summary, loading, themeColor = "#2d5a27" }) {
  const total = summary?.total || 0;
  const avg = summary?.avg || 0;
  const counts = summary?.counts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-7">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center gap-7 mb-7 flex-wrap">
      <div className="text-center min-w-[120px]">
        <div
          className="text-5xl font-bold leading-none"
          style={{ color: themeColor, fontFamily: "'DM Sans', sans-serif" }}
        >
          {total > 0 ? avg.toFixed(2) : "—"}
        </div>
        <div className="mt-2">
          <StarBar rating={avg} size={18} />
        </div>
        <div className="text-xs text-gray-400 mt-1.5">
          {total > 0
            ? `Based on ${total} review${total === 1 ? "" : "s"}`
            : "No reviews yet"}
        </div>
      </div>

      <div className="flex-1 min-w-[220px]">
        {[5, 4, 3, 2, 1].map((star) => {
          const c = counts[star] || 0;
          const pct = total > 0 ? Math.round((c / total) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs text-gray-500 min-w-[16px]">{star}</span>
              <FaStar size={11} color="#c8a84b" />
              <div className="flex-1 bg-gray-100 rounded h-1.5 overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{ width: `${pct}%`, background: "#c8a84b" }}
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[32px] text-right">
                {c}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Single review card ──────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="py-5 border-t border-gray-200">
      <div className="flex gap-3.5 items-start">
        <div className="flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c40] flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {initials(review.name)}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1 gap-2">
            <div>
              <div className="font-bold text-sm text-gray-900">
                {review.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StarBar rating={review.rating} size={12} />
                {review.verified && (
                  <MdVerified size={14} color="#2d5a27" title="Verified" />
                )}
              </div>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {formatDate(review.createdAt)}
            </span>
          </div>
          {review.title && (
            <div className="text-sm font-semibold text-gray-800 mt-1">
              {review.title}
            </div>
          )}
          {review.body && (
            <div className="text-sm text-gray-600 leading-relaxed mt-1 whitespace-pre-line">
              {review.body}
            </div>
          )}
          {Array.isArray(review.photos) && review.photos.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {review.photos.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={src}
                    alt={`review photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Review form ─────────────────────────────────────────────────────────────
function ReviewForm({ productId, onSubmitted, themeColor = "#2d5a27" }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName("");
    setRating(0);
    setTitle("");
    setBody("");
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (rating < 1) {
      setError("Please select a star rating");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`${backendurl}/api/reviews`, {
        productId,
        name: name.trim(),
        rating,
        title: title.trim(),
        body: body.trim(),
      });
      setSuccess(true);
      reset();
      onSubmitted?.();
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Could not submit your review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer"
          style={{ background: themeColor }}
        >
          Write a Review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-7 p-5 border border-gray-200 rounded-2xl bg-gray-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 m-0">Write a review</h3>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="bg-transparent border-0 cursor-pointer text-gray-400 text-xl leading-none"
          aria-label="Close review form"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#2d5a27]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">
            Rating *
          </label>
          <StarInput value={rating} onChange={setRating} />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-500 mb-1">
          Review title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#2d5a27]"
          placeholder="Sum up your experience in a line"
        />
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-500 mb-1">
          Your review
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#2d5a27] resize-y"
          placeholder="Tell others what you liked or didn't like"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 mb-2">{error}</div>
      )}
      {success && (
        <div className="text-sm text-green-700 mb-2">
          Thanks! Your review has been submitted.
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer disabled:opacity-60"
          style={{ background: themeColor }}
        >
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 bg-white cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Pagination controls ─────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = useMemo(() => {
    const out = new Set([1, totalPages, page, page - 1, page + 1]);
    return [...out]
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40 cursor-pointer"
      >
        ‹ Prev
      </button>
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const gap = prev !== undefined && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {gap && (
              <span className="px-1 text-gray-400 text-sm">…</span>
            )}
            <button
              type="button"
              onClick={() => onChange(p)}
              className={`min-w-[36px] h-9 rounded-lg border text-sm font-semibold cursor-pointer ${
                p === page
                  ? "bg-[#2d5a27] text-white border-[#2d5a27]"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40 cursor-pointer"
      >
        Next ›
      </button>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ProductReviewSection({
  productId,
  themeColor = "#2d5a27",
}) {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [starFilter, setStarFilter] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);

  const [starDropOpen, setStarDropOpen] = useState(false);
  const [sortDropOpen, setSortDropOpen] = useState(false);

  // ── Fetch summary once per productId ──────────────────────────────────────
  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    setSummaryLoading(true);
    axios
      .get(`${backendurl}/api/reviews/summary`, { params: { productId } })
      .then((res) => {
        if (cancelled) return;
        if (res.data?.success) setSummary(res.data.data);
      })
      .catch((err) => console.error("review summary error:", err))
      .finally(() => !cancelled && setSummaryLoading(false));
    return () => {
      cancelled = true;
    };
  }, [productId]);

  // ── Fetch reviews whenever filters or page change ─────────────────────────
  const fetchReviews = useCallback(
    async (targetPage = 1) => {
      if (!productId) return;
      setReviewsLoading(true);
      try {
        const params = {
          productId,
          page: targetPage,
          limit: PAGE_SIZE,
          sort: sortBy,
        };
        if (starFilter > 0) params.rating = starFilter;

        const res = await axios.get(`${backendurl}/api/reviews`, { params });
        if (res.data?.success) {
          setReviews(res.data.data || []);
          setPagination(
            res.data.pagination || {
              page: 1,
              totalPages: 1,
              total: 0,
              hasNext: false,
              hasPrev: false,
            }
          );
        }
      } catch (err) {
        console.error("reviews fetch error:", err);
      } finally {
        setReviewsLoading(false);
      }
    },
    [productId, sortBy, starFilter]
  );

  useEffect(() => {
    fetchReviews(page);
  }, [fetchReviews, page]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [starFilter, sortBy, productId]);

  const handleReviewSubmitted = async () => {
    // Refresh summary + first page
    try {
      const [s, r] = await Promise.all([
        axios.get(`${backendurl}/api/reviews/summary`, {
          params: { productId },
        }),
        axios.get(`${backendurl}/api/reviews`, {
          params: { productId, page: 1, limit: PAGE_SIZE, sort: sortBy },
        }),
      ]);
      if (s.data?.success) setSummary(s.data.data);
      if (r.data?.success) {
        setReviews(r.data.data || []);
        setPagination(
          r.data.pagination || {
            page: 1,
            totalPages: 1,
            total: 0,
            hasNext: false,
            hasPrev: false,
          }
        );
        setPage(1);
      }
    } catch (err) {
      console.error("post-submit refresh error:", err);
    }
  };

  if (!productId) return null;

  return (
    <div id="reviews" className="bg-white">
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="py-13 pb-10">
          <h2
            className="text-center text-3xl font-bold mb-6 tracking-tight leading-tight"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Customer Reviews
          </h2>

          <RatingSummary
            summary={summary}
            loading={summaryLoading}
            themeColor={themeColor}
          />

          <ReviewForm
            productId={productId}
            onSubmitted={handleReviewSubmitted}
            themeColor={themeColor}
          />

          {/* Filter + sort row */}
          <div className="flex gap-2.5 mb-5 relative flex-wrap">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setStarDropOpen((o) => !o);
                  setSortDropOpen(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-semibold text-gray-900"
              >
                {starFilter === 0 ? "All ratings" : `${starFilter} ★`}
              </button>
              {starDropOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[160px] overflow-hidden">
                  {STAR_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setStarFilter(s);
                        setStarDropOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm flex items-center gap-1.5 ${
                        starFilter === s
                          ? "bg-[#c8a84b] text-white font-bold"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      {s === 0 ? "All stars" : (
                        <>
                          <FaStar
                            size={12}
                            color={starFilter === s ? "#fff" : "#c8a84b"}
                          />{" "}
                          {s} ★
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setSortDropOpen((o) => !o);
                  setStarDropOpen(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-full bg-white cursor-pointer text-sm font-semibold text-gray-900"
              >
                {SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
              </button>
              {sortDropOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.key);
                        setSortDropOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 border-0 text-left cursor-pointer text-sm ${
                        sortBy === opt.key
                          ? "bg-[#c8a84b] text-white font-bold"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reviews list */}
          {reviewsLoading ? (
            <Spinner />
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-sm">
              {pagination.total === 0
                ? "Be the first to review this product."
                : "No reviews for this filter."}
            </div>
          ) : (
            <div>
              {reviews.map((r) => (
                <ReviewCard key={r._id} review={r} />
              ))}
            </div>
          )}

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onChange={(p) => {
              setPage(p);
              const el = document.getElementById("reviews");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
