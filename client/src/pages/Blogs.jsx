/**
 * Blogs.jsx — Public Blog Listing Page
 *
 * Reads from backend GET /api/blogs and renders blog cards.
 * - font-[var(--font-new-1)] body  ·  var(--font-new-2) display / headings
 * - Same design language as NewsBlogs section on the home page
 * - Supports category filter, pagination, and search
 * - Clicking a card navigates to /blogs/:id
 * - Falls back to dummy data when backend is empty/unavailable
 */

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../App";
import SectionHeader from "./NabhiHome/components/SectionHeader";
import { DUMMY_BLOGS } from "./dummyBlogs";

const PAGE_LIMIT = 12;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const pickCategory = (blog) =>
  Array.isArray(blog.categories) && blog.categories.length
    ? blog.categories[0]
    : "Wellness";

const pickImage = (blog) =>
  blog?.thumbnail?.secureUrl ||
  blog?.mainPicture?.secureUrl ||
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600";

export default function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingDummy, setUsingDummy] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch blogs whenever filters or page change
  useEffect(() => {
    let cancelled = false;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const params = { page, limit: PAGE_LIMIT, published: "true" };
        if (activeCategory !== "All") params.category = activeCategory;

        const res = await axios.get(`${backendurl}/api/blogs`, { params });
        if (cancelled) return;

        const data = res.data || {};
        const fetched = Array.isArray(data.blogs) ? data.blogs : [];
        if (fetched.length > 0) {
          setBlogs(fetched);
          setTotal(data.total || fetched.length);
          setPages(data.pages || 1);
          setUsingDummy(false);
        } else {
          // Fall back to dummy data
          setBlogs(DUMMY_BLOGS);
          setTotal(DUMMY_BLOGS.length);
          setPages(1);
          setUsingDummy(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blogs:", err);
          // On error fall back to dummy data
          setBlogs(DUMMY_BLOGS);
          setTotal(DUMMY_BLOGS.length);
          setPages(1);
          setUsingDummy(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      cancelled = true;
    };
  }, [page, activeCategory]);

  // Derive the unique category list from the current blog set + a fallback
  const categories = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => (b.categories || []).forEach((c) => set.add(c)));
    const list = Array.from(set).sort();
    return ["All", ...list];
  }, [blogs]);

  // Client-side search filter (server doesn't expose a search param)
  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.creator?.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [blogs, search]);

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--new-bg-color, #f2eafa)",
        fontFamily: "var(--font-new-1)",
      }}
    >
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          subtitle="News & Blogs"
          heading="Our Latest"
          headingHighlight="News & Blogs"
        />

        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          {/* Blog grid (LEFT) */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {/* Loading / Error / Empty states */}
            {loading && (
              <div className="py-20 text-center text-sm" style={{ color: "var(--new-para-text, #b3b3b3)" }}>
                Loading blogs…
              </div>
            )}

            {!loading && error && (
              <div className="py-20 text-center text-sm" style={{ color: "#a81313" }}>
                {error}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="py-20 text-center text-sm" style={{ color: "var(--new-para-text, #b3b3b3)" }}>
                No blogs found. {search && `No results for “${search}”.`}
              </div>
            )}

            {/* Blog grid: 2 columns on desktop, 1 column on mobile */}
            {!loading && !error && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((blog) => (
                  <article
                    key={blog._id}
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-white, #ffffff)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 25px rgba(0,0,0,0.10)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={pickImage(blog)}
                        alt={blog.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span
                        className="absolute bottom-0 left-0 text-white text-xs font-medium px-4 py-1.5 rounded-tr-xl z-10"
                        style={{ backgroundColor: "var(--new-primary-color, #35105f)" }}
                      >
                        {pickCategory(blog)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="flex items-center gap-2 text-xs mb-2.5 font-medium"
                        style={{ color: "var(--new-para-text, #b3b3b3)" }}
                      >
                        <span>{blog.creator || "Vedraha Wellness"}</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ backgroundColor: "var(--new-accent-color, #df8804)" }}
                        />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h3
                        className="text-lg font-bold leading-snug mb-2 line-clamp-2 transition-opacity"
                        style={{ color: "var(--color-black, #000000)" }}
                      >
                        {blog.title}
                      </h3>

                      {blog.excerpt && (
                        <p
                          className="text-sm leading-relaxed mb-4 line-clamp-3"
                          style={{ color: "var(--new-para-text, #6b6080)" }}
                        >
                          {blog.excerpt}
                        </p>
                      )}

                      <span
                        className="text-sm font-bold underline underline-offset-4 mt-auto w-fit transition-opacity hover:opacity-80"
                        style={{ color: "var(--new-purple-color, #5d27aa)" }}
                      >
                        Read More
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Filter sidebar (RIGHT) */}
          <aside className="w-full lg:w-72 lg:flex-shrink-0 order-1 lg:order-2">
            <div
              className="rounded-2xl p-5 lg:sticky lg:top-28"
              style={{
                backgroundColor: "var(--color-white, #ffffff)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{
                  color: "var(--new-heading-text, #21124c)",
                  fontFamily: "var(--font-new-1)",
                }}
              >
                Filter
              </h3>

              {/* Search input */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white mb-4 w-full"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--new-para-text, #b3b3b3)" }}
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blogs, tags…"
                  className="bg-transparent outline-none text-sm w-full"
                  style={{
                    fontFamily: "var(--font-new-1)",
                    color: "var(--new-heading-text, #21124c)",
                  }}
                />
              </div>

              <p
                className="text-[11px] font-bold uppercase tracking-wider mb-3"
                style={{ color: "var(--new-para-text, #aaa4b8)" }}
              >
                Categories
              </p>

              {/* Category pills (vertical) */}
              <div className="flex flex-col gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setPage(1);
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 text-left"
                      style={{
                        backgroundColor: isActive
                          ? "var(--new-primary-color, #35105f)"
                          : "var(--new-bg-color, #f2eafa)",
                        color: isActive
                          ? "var(--color-white, #ffffff)"
                          : "var(--new-heading-text, #21124c)",
                        border: isActive
                          ? "1px solid var(--new-primary-color, #35105f)"
                          : "1px solid rgba(0,0,0,0.06)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Pagination */}
        {!loading && !error && pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-md text-xs font-semibold transition disabled:opacity-40"
              style={{
                backgroundColor: "var(--color-white, #ffffff)",
                color: "var(--new-heading-text, #21124c)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              ← Prev
            </button>
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--new-para-text, #6b6080)" }}
            >
              Page {page} of {pages}
            </span>
            <button
              type="button"
              disabled={page === pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="px-4 py-2 rounded-md text-xs font-semibold transition disabled:opacity-40"
              style={{
                backgroundColor: "var(--color-white, #ffffff)",
                color: "var(--new-heading-text, #21124c)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Total count */}
        {!loading && !error && total > 0 && (
          <p
            className="text-center mt-6 text-xs"
            style={{ color: "var(--new-para-text, #aaa4b8)" }}
          >
            Showing {filtered.length} of {total} blog{total !== 1 ? "s" : ""}
            {usingDummy && " (preview data)"}
          </p>
        )}
      </div>
    </div>
  );
}
