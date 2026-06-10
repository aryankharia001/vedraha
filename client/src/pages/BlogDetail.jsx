/**
 * BlogDetail.jsx — Single Blog Post Page
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../App";
import { DUMMY_BLOGS } from "./dummyBlogs";

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
  Array.isArray(blog?.categories) && blog.categories.length
    ? blog.categories
    : ["Wellness"]; // Returns array to render multiple badges if needed, defaults to array

const pickImage = (blog) =>
  blog?.mainPicture?.secureUrl ||
  blog?.thumbnail?.secureUrl ||
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200";

const getReadingTime = (blog) => {
  if (!blog) return null;
  const parts = [];
  if (blog.excerpt) parts.push(blog.excerpt);
  if (Array.isArray(blog.subheadings)) {
    blog.subheadings.forEach((sh) => {
      if (sh?.heading) parts.push(sh.heading);
      if (sh?.content) parts.push(sh.content);
    });
  }
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  return Math.max(1, Math.ceil(words / 200));
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        setNotFound(false);

        let fetchedBlog = null;
        try {
          const res = await axios.get(`${backendurl}/api/blogs/${id}`);
          fetchedBlog = res.data;
        } catch (apiErr) {
          const dummy = DUMMY_BLOGS.find((b) => b._id === id);
          if (dummy) {
            fetchedBlog = dummy;
          } else {
            throw apiErr;
          }
        }
        if (cancelled) return;
        setBlog(fetchedBlog);

        try {
          const rel = await axios.get(`${backendurl}/api/blogs`, {
            params: { limit: 20, published: "true" },
          });
          if (!cancelled) {
            const apiRelated = (rel.data?.blogs || []).filter(
              (b) => b._id !== fetchedBlog._id
            );
            if (apiRelated.length > 0) {
              setRelated(apiRelated);
            } else {
              setRelated(
                DUMMY_BLOGS.filter((b) => b._id !== fetchedBlog._id)
              );
            }
          }
        } catch {
          if (!cancelled) {
            setRelated(
              DUMMY_BLOGS.filter((b) => b._id !== fetchedBlog._id)
            );
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load blog:", err);
          setError("Blog not found or could not be loaded.");
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (id) load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!blog) return;

    const seoTitle =
      blog.seo?.metaTitle?.trim() || `${blog.title} | Vedraha Wellness`;
    const seoDescription =
      blog.seo?.metaDescription?.trim() || blog.excerpt || "";
    const seoKeywords = (blog.seo?.keywords || []).join(", ");

    const previousTitle = document.title;
    document.title = seoTitle;

    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector.replace(/[\[\]"]/g, "").split("=");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", seoDescription);
    setMeta('meta[name="keywords"]', "content", seoKeywords);

    return () => {
      document.title = previousTitle;
    };
  }, [blog]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-20 pb-20"
        style={{
          backgroundColor: "var(--new-bg-white-color)",
          fontFamily: "var(--font-new-1)",
        }}
      >
        <p
          className="text-sm font-medium animate-pulse"
          style={{ color: "var(--new-para-text)" }}
        >
          Loading blog…
        </p>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-5 sm:px-[2.25rem]"
        style={{
          backgroundColor: "var(--new-bg-white-color)",
          fontFamily: "var(--font-new-1)",
        }}
      >
        <h1
          className="text-2xl font-bold mb-3 tracking-tight"
          style={{ color: "var(--color-black)" }}
        >
          Blog not found
        </h1>
        <p
          className="text-sm mb-6 max-w-xs text-center"
          style={{ color: "var(--new-para-text)" }}
        >
          {error || "The blog you're looking for does not exist."}
        </p>
        {/* <button
          type="button"
          onClick={() => navigate("/blogs-en")}
          className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          style={{
            backgroundColor: "var(--new-purple-color)",
            color: "var(--color-white, #ffffff)",
          }}
        >
          ← Back to Blogs
        </button> */}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20 pb-20 px-5 sm:px-[2.25rem]"
      style={{
        backgroundColor: "var(--new-bg-white-color)",
        fontFamily: "var(--font-new-1)",
      }}
    >
      <div className="w-full mx-auto" style={{ maxWidth: "1240px" }}>
        
        {/* Back link */}
        {/* <Link
          to="/blogs-en"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wide mb-6 transition-all duration-200 hover:opacity-70"
          style={{ color: "var(--new-purple-color)" }}
        >
          ← Back to all blogs
        </Link> */}

        {/* Core Split Layout From Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title, Feature Image, Content (Spans 8 cols) */}
          <div className="lg:col-span-8 order-1">
            
            {/* Title - Clean, elegant, dark text */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8"
              style={{ color: "var(--color-black)" }}
            >
              {blog.title}
            </h1>

            {/* Main picture — Beautifully rounded clean box */}
            {pickImage(blog) && (
              <div className="rounded-2xl overflow-hidden mb-10 w-full bg-gray-50">
                <img
                  src={pickImage(blog)}
                  alt={blog.title}
                  className="w-full h-auto object-cover max-h-[520px]"
                  loading="lazy"
                />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <p
                className="text-base md:text-lg leading-relaxed mb-8 text-gray-600 font-normal"
                style={{ color: "var(--new-para-text)" }}
              >
                {blog.excerpt}
              </p>
            )}

            {/* Subheadings / Body Content Blocks */}
            {Array.isArray(blog.subheadings) && blog.subheadings.length > 0 ? (
              <div className="space-y-10 mb-14">
                {blog.subheadings.map((sh, idx) => (
                  <section key={sh._id || idx} className="space-y-3">
                    <h2
                      className="text-xl md:text-2xl font-bold tracking-tight"
                      style={{ color: "var(--color-black)" }}
                    >
                      {idx + 1}. {sh.heading}
                    </h2>
                    <div
                      className="text-sm md:text-base leading-[1.8] whitespace-pre-line font-normal opacity-90"
                      style={{ color: "var(--new-para-text)" }}
                    >
                      {sh.content}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p
                className="text-sm leading-relaxed mb-14"
                style={{ color: "var(--new-para-text)" }}
              >
                This blog post has no content yet. Check back soon!
              </p>
            )}
          </div>

          {/* Right Column: Sidebar Meta Information (Spans 4 cols) */}
          <div className="lg:col-span-4 order-2 lg:sticky lg:top-28 space-y-8 lg:pl-4">
            
            {/* Category Section */}
            <div>
              <h4 className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-2.5">
                Category
              </h4>
              <div className="flex flex-wrap gap-2">
                {pickCategory(blog).map((cat, index) => (
                  <span
                    key={index}
                    className="inline-block text-[11px] font-medium px-3 py-1 rounded-md bg-gray-100 text-gray-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Written By Section */}
            <div>
              <h4 className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-3">
                Written by
              </h4>
              <div className="flex items-center gap-3">
                {/* Fallback Initial/Avatar circle to match the look */}
                <div className="w-11 h-11 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center font-bold text-gray-600 text-sm border border-gray-100">
                  {blog.creator ? blog.creator.charAt(0) : "V"}
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 leading-tight">
                    {blog.creator || "Vedraha Wellness"}
                  </h5>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {formatDate(blog.createdAt)} 
                    {(() => {
                      const minutes = getReadingTime(blog);
                      if (!minutes) return null;
                      return ` • ${minutes} min read`;
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Post Metadata details */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] font-medium text-gray-400">
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <p>Last updated: <span className="text-gray-600">{formatDate(blog.updatedAt)}</span></p>
              )}
              {blog.isPublished === false && (
                <p>Status: <span style={{ color: "var(--new-purple-color)" }}>Draft Mode</span></p>
              )}
            </div>

            {/* Tags Section */}
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-2.5">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded text-gray-500 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SEO Keywords */}
            {Array.isArray(blog.seo?.keywords) && blog.seo.keywords.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-2.5">
                  Topics
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {blog.seo.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] font-medium px-2 py-0.5 rounded border border-gray-100 text-gray-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related blogs stack */}
        {related.length > 0 && (
          <div className="mt-28 border-t pt-14" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <h2
              className="text-2xl font-bold tracking-tight mb-8"
              style={{ color: "var(--color-black)" }}
            >
              Latest insights and trends
            </h2> 

            {/* Grid layout matching footer spacing columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] md:gap-[2.5rem]">
              {related.slice(0, 3).map((rb) => (
                <article
                  key={rb._id}
                  onClick={() => navigate(`/blogs/${rb._id}`)}
                  className="group flex flex-col cursor-pointer transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-sm bg-gray-50">
                    <img
                      src={
                        rb.thumbnail?.secureUrl ||
                        rb.mainPicture?.secureUrl ||
                        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
                      }
                      alt={rb.title}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <span
                      className="absolute bottom-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded bg-white text-gray-800 z-10 shadow-sm"
                    >
                      {Array.isArray(rb.categories) && rb.categories.length ? rb.categories[0] : "Wellness"}
                    </span>
                  </div>

                  <div className="pt-4 flex flex-col flex-1">
                    <div
                      className="flex items-center gap-2 text-[11px] mb-2 font-medium text-gray-400"
                    >
                      <span>{rb.creator || "Vedraha Wellness"}</span>
                      <span className="w-1 h-1 rounded-full inline-block bg-current opacity-40" />
                      <span>{formatDate(rb.createdAt)}</span>
                    </div>

                    <h3
                      className="text-base font-bold leading-snug mb-2 line-clamp-2 text-gray-900 group-hover:text-purple-700 transition-colors"
                    >
                      {rb.title}
                    </h3>

                    {rb.excerpt && (
                      <p
                        className="text-xs leading-relaxed mb-4 line-clamp-2 font-normal text-gray-500"
                      >
                        {rb.excerpt}
                      </p>
                    )}

                    <span
                      className="text-xs font-semibold mt-auto w-fit text-gray-400 group-hover:text-gray-900 transition-colors"
                    >
                      Read Article →
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* View All Button */}
            {related.length > 3 && (
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  onClick={() => navigate("/blogs-en")}
                  className="px-7 py-3 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                  style={{
                    backgroundColor: "var(--new-purple-color)",
                    color: "var(--color-white, #ffffff)",
                  }}
                >
                  View All Blogs
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}