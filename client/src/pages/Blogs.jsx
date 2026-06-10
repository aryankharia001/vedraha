/**
 * Blogs.jsx — Public Blog Listing Page
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

const SkeletonCard = () => (
  <div 
    className="flex flex-col rounded-2xl overflow-hidden animate-pulse bg-white"
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
  >
    <div className="aspect-[16/10] w-full bg-gray-200" />
    <div className="p-5 flex flex-col flex-1 gap-3">
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-3 w-1/4 bg-gray-200 rounded mt-auto" />
    </div>
  </div>
);

export default function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingDummy, setUsingDummy] = useState(false);

  // Multi-Selection Tracking Lists
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); 

  // Collapse Accordion Panel states
  const [showCategories, setShowCategories] = useState(true);
  const [showTags, setShowTags] = useState(false);

  // Static immutable reference collections
  const [staticCategories, setStaticCategories] = useState([]);
  const [staticTags, setStaticTags] = useState([]);
  const [hasStoredFilters, setHasStoredFilters] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Fetch hook
  useEffect(() => {
    let cancelled = false;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const params = { page, limit: PAGE_LIMIT, published: "true" };
        
        if (selectedCategories.length > 0) {
          params.category = selectedCategories[0];
        }

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
          setBlogs(DUMMY_BLOGS);
          setTotal(DUMMY_BLOGS.length);
          setPages(1);
          setUsingDummy(true);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blogs:", err);
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
  }, [page, selectedCategories]);

  // Read state setup
  useEffect(() => {
    if (blogs.length > 0 && !hasStoredFilters) {
      const catSet = new Set();
      const tagSet = new Set();

      blogs.forEach((b) => {
        (b.categories || []).forEach((c) => catSet.add(c));
        (b.tags || []).forEach((t) => tagSet.add(t));
      });

      setStaticCategories(Array.from(catSet).sort());
      setStaticTags(Array.from(tagSet).sort());
      setHasStoredFilters(true);
    }
  }, [blogs, hasStoredFilters]);

  const handleCategoryToggle = (category) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    let output = blogs;

    if (selectedCategories.length > 0) {
      output = output.filter((b) =>
        (b.categories || []).some((c) => selectedCategories.includes(c))
      );
    }

    if (selectedTags.length > 0) {
      output = output.filter((b) =>
        (b.tags || []).some((t) => selectedTags.includes(t))
      );
    }

    if (!debouncedSearch.trim()) return output;
    const q = debouncedSearch.toLowerCase();
    return output.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.creator?.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [blogs, selectedCategories, selectedTags, debouncedSearch]);

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--new-bg-white-color, #f2eafa)",
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
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
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
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={pickImage(blog)}
                        alt={blog.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span
                        className="absolute bottom-0 left-0 text-white text-xs font-medium px-4 py-1.5 rounded-tr-xl z-10"
                        style={{ backgroundColor: "var(--new-purple-color)" }}
                      >
                        {pickCategory(blog)}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div
                        className="flex items-center gap-2 text-xs mb-2.5 font-medium"
                        style={{ color: "var(--new-para-text, #b3b3b3)" }}
                      >
                        <span>{blog.creator || "Vedraha Wellness"}</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ backgroundColor: "var(--new-purple-color)" }}
                        />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h3
                        className="text-lg font-bold leading-snug mb-2 line-clamp-2"
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
                        className="text-sm font-bold underline underline-offset-4 mt-auto w-fit"
                        style={{ color: "var(--new-purple-color)" }}
                      >
                        Read More
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* ─── SIDEBAR FILTER ────────────────────────────────────────────── */}
          <aside className="w-full lg:w-72 lg:flex-shrink-0 order-1 lg:order-2">
            <div
              className="rounded-2xl p-6 lg:sticky lg:top-28 flex flex-col gap-6 bg-white transition-all duration-300"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {/* Search Element Block */}
              <div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider mb-2.5"
                  style={{ color: "var(--new-heading-text, #21124c)" }}
                >
                  Search Content
                </h3>

                <div
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white w-full border transition-all duration-300 focus-within:ring-2 focus-within:ring-[rgba(93,39,170,0.2)] focus-within:border-purple-400"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--new-purple-color)" }}
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search blogs…"
                    className="bg-transparent outline-none focus:outline-none text-sm w-full font-medium"
                    style={{ color: "var(--new-heading-text, #21124c)" }}
                  />
                </div>
              </div>

              {/* Categories Section with Accordion Smooth Transition */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center justify-between w-full text-[11px] font-bold uppercase tracking-wider mb-2.5 border-b pb-1 border-gray-100 group select-none text-left cursor-pointer"
                  style={{ color: "var(--new-para-text, #aaa4b8)" }}
                >
                  <span>Categories</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 transform ${showCategories ? "rotate-180" : "rotate-0"}`}
                    style={{ color: "var(--new-purple-color)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${showCategories ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"}`}>
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 pt-1 pb-2">
                      {/* "All" Categories Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedCategories([])}
                        className="px-3 py-1.5 rounded text-xs font-semibold transition-all duration-150 text-left flex items-center select-none hover:opacity-90 cursor-pointer"
                        style={{
                          backgroundColor: selectedCategories.length === 0 ? "var(--new-purple-color)" : "var(--new-bg-color, #f2eafa)",
                          color: selectedCategories.length === 0 ? "#ffffff" : "var(--new-heading-text, #21124c)",
                          border: selectedCategories.length === 0 ? "1px solid var(--new-purple-color)" : "1px solid rgba(0,0,0,0.04)"
                        }}
                      >
                        All
                      </button>

                      {staticCategories.map((cat) => {
                        const isActive = selectedCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategoryToggle(cat)}
                            className="px-3 py-1.5 rounded text-xs font-semibold transition-all duration-150 text-left flex items-center gap-1.5 select-none hover:opacity-90 cursor-pointer"
                            style={{
                              backgroundColor: isActive ? "var(--new-purple-color)" : "var(--new-bg-color, #f2eafa)",
                              color: isActive ? "#ffffff" : "var(--new-heading-text, #21124c)",
                              border: isActive ? "1px solid var(--new-purple-color)" : "1px solid rgba(0,0,0,0.04)"
                            }}
                          >
                            <span>{cat}</span>
                            {isActive && <span className="text-[10px] font-bold">✕</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags Section with Accordion Smooth Transition */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setShowTags(!showTags)}
                  className="flex items-center justify-between w-full text-[11px] font-bold uppercase tracking-wider mb-2.5 border-b pb-1 border-gray-100 group select-none text-left cursor-pointer"
                  style={{ color: "var(--new-para-text, #aaa4b8)" }}
                >
                  <span>Tags</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 transform ${showTags ? "rotate-180" : "rotate-0"}`}
                    style={{ color: "var(--new-purple-color)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${showTags ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"}`}>
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 pt-1 pb-1">
                      {/* "All" Tags Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedTags([])}
                        className="px-2.5 py-1.5 rounded text-xs font-semibold transition-all duration-150 flex items-center select-none hover:opacity-90 cursor-pointer"
                        style={{
                          backgroundColor: selectedTags.length === 0 ? "var(--new-purple-color)" : "rgba(0,0,0,0.02)",
                          color: selectedTags.length === 0 ? "#ffffff" : "var(--new-purple-color)",
                          border: selectedTags.length === 0 ? "1px solid var(--new-purple-color)" : "1px solid rgba(93,39,170,0.15)"
                        }}
                      >
                        All
                      </button>

                      {staticTags.map((tag) => {
                        const isActive = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className="px-2.5 py-1.5 rounded text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 select-none hover:opacity-90 cursor-pointer"
                            style={{
                              backgroundColor: isActive ? "var(--new-purple-color)" : "rgba(0,0,0,0.02)",
                              color: isActive ? "#ffffff" : "var(--new-purple-color)",
                              border: isActive ? "1px solid var(--new-purple-color)" : "1px solid rgba(93,39,170,0.15)"
                            }}
                          >
                            <span>#{tag}</span>
                            {isActive && <span className="text-[10px] font-bold">✕</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>

        {/* Pagination Controls */}
        {!loading && !error && pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-md text-xs font-semibold transition disabled:opacity-40 cursor-pointer"
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
              className="px-4 py-2 rounded-md text-xs font-semibold transition disabled:opacity-40 cursor-pointer"
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

        {/* Total count status block */}
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