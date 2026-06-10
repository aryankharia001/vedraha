/**
 * BlogDetail.jsx — Single Blog Post Page
 *
 * Reads from backend GET /api/blogs/:id and renders a full blog post.
 * - font-[var(--font-new-1)] body  ·  var(--font-new-2) display / headings
 * - Renders dynamic subheadings + content blocks from the backend
 * - Shows tags and related blogs from same category
 * - Falls back to dummy data when backend is empty/unavailable
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
    ? blog.categories[0]
    : "Wellness";

const pickImage = (blog) =>
  blog?.mainPicture?.secureUrl ||
  blog?.thumbnail?.secureUrl ||
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200";

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

        // Try backend first
        let fetchedBlog = null;
        try {
          const res = await axios.get(`${backendurl}/api/blogs/${id}`);
          fetchedBlog = res.data;
        } catch (apiErr) {
          // Backend failed — fall back to dummy data
          const dummy = DUMMY_BLOGS.find((b) => b._id === id);
          if (dummy) {
            fetchedBlog = dummy;
          } else {
            throw apiErr;
          }
        }
        if (cancelled) return;
        setBlog(fetchedBlog);

        // Load related blogs from same category
        const cat = pickCategory(fetchedBlog);
        if (cat && cat !== "Wellness") {
          try {
            const rel = await axios.get(`${backendurl}/api/blogs`, {
              params: { category: cat, limit: 3, published: "true" },
            });
            if (!cancelled) {
              const apiRelated = (rel.data?.blogs || []).filter(
                (b) => b._id !== fetchedBlog._id
              );
              if (apiRelated.length > 0) {
                setRelated(apiRelated.slice(0, 3));
              } else {
                // Fallback: pick dummy blogs from same category
                setRelated(
                  DUMMY_BLOGS.filter(
                    (b) =>
                      b._id !== fetchedBlog._id &&
                      (b.categories || []).includes(cat)
                  ).slice(0, 3)
                );
              }
            }
          } catch {
            if (!cancelled) {
              setRelated(
                DUMMY_BLOGS.filter(
                  (b) =>
                    b._id !== fetchedBlog._id &&
                    (b.categories || []).includes(cat)
                ).slice(0, 3)
              );
            }
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

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-28 pb-20"
        style={{
          backgroundColor: "var(--new-bg-color, #f2eafa)",
          fontFamily: "var(--font-new-1)",
        }}
      >
        <p
          className="text-sm"
          style={{ color: "var(--new-para-text, #b3b3b3)" }}
        >
          Loading blog…
        </p>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4"
        style={{
          backgroundColor: "var(--new-bg-color, #f2eafa)",
          fontFamily: "var(--font-new-1)",
        }}
      >
        <h1
          className="text-2xl font-bold mb-3"
          style={{
            color: "var(--new-heading-text, #21124c)",
            fontFamily: "var(--font-new-2, 'Times New Roman')",
          }}
        >
          Blog not found
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: "var(--new-para-text, #6b6080)" }}
        >
          {error || "The blog you're looking for does not exist."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/blogs-en")}
          className="px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: "var(--new-primary-color, #35105f)",
            color: "var(--color-white, #ffffff)",
          }}
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--new-bg-color, #f2eafa)",
        fontFamily: "var(--font-new-1)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/blogs-en"
          className="inline-flex items-center gap-2 text-xs font-semibold mb-6 transition-opacity hover:opacity-80"
          style={{ color: "var(--new-purple-color, #5d27aa)" }}
        >
          ← Back to all blogs
        </Link>

        {/* Category badge */}
        <div className="mb-4">
          <span
            className="inline-block text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: "var(--new-primary-color, #35105f)",
              letterSpacing: "0.1em",
            }}
          >
            {pickCategory(blog)}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-5"
          style={{
            color: "var(--new-heading-text, #21124c)",
            fontFamily: "var(--font-new-2, 'Times New Roman')",
          }}
        >
          {blog.title}
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-3 text-xs font-medium pb-6 mb-8"
          style={{
            color: "var(--new-para-text, #b3b3b3)",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span>{blog.creator || "Vedraha Wellness"}</span>
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ backgroundColor: "var(--new-accent-color, #df8804)" }}
          />
          <span>{formatDate(blog.createdAt)}</span>
          {blog.isPublished === false && (
            <>
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: "var(--new-accent-color, #df8804)" }}
              />
              <span
                style={{ color: "var(--new-accent-color, #df8804)" }}
              >
                Draft
              </span>
            </>
          )}
        </div>

        {/* Main picture */}
        {pickImage(blog) && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={pickImage(blog)}
              alt={blog.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            className="text-base md:text-lg leading-relaxed mb-8 italic"
            style={{ color: "var(--new-para-text, #6b6080)" }}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Subheadings / Body */}
        {Array.isArray(blog.subheadings) && blog.subheadings.length > 0 ? (
          <div className="space-y-8">
            {blog.subheadings.map((sh, idx) => (
              <section key={sh._id || idx}>
                <h2
                  className="text-xl md:text-2xl font-semibold mb-3"
                  style={{
                    color: "var(--new-heading-text, #21124c)",
                    fontFamily: "var(--font-new-2, 'Times New Roman')",
                  }}
                >
                  {sh.heading}
                </h2>
                <div
                  className="text-sm md:text-[15px] leading-[1.85] whitespace-pre-line"
                  style={{ color: "var(--new-para-text, #4a4458)" }}
                >
                  {sh.content}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--new-para-text, #6b6080)" }}
          >
            This blog post has no content yet. Check back soon!
          </p>
        )}

        {/* Tags */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div
            className="mt-10 pt-6 flex flex-wrap items-center gap-2"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
          >
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--new-para-text, #aaa4b8)" }}
            >
              Tags:
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-white, #ffffff)",
                  color: "var(--new-purple-color, #5d27aa)",
                  border: "1px solid rgba(93,39,170,0.15)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related blogs - displayed after blog detail section */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{
                color: "var(--new-heading-text, #21124c)",
                fontFamily: "var(--font-new-2, 'Times New Roman')",
              }}
            >
              More{" "}
              <span
                className="italic"
                style={{ color: "var(--new-purple-color, #5d27aa)" }}
              >
                Blogs
              </span>
            </h2>
            {/* Related blogs: 2 columns on desktop, 1 column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rb) => (
                <article
                  key={rb._id}
                  onClick={() => navigate(`/blogs/${rb._id}`)}
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
                      src={
                        rb.thumbnail?.secureUrl ||
                        rb.mainPicture?.secureUrl ||
                        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
                      }
                      alt={rb.title}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className="absolute bottom-0 left-0 text-white text-xs font-medium px-4 py-1.5 rounded-tr-xl z-10"
                      style={{ backgroundColor: "var(--new-primary-color, #35105f)" }}
                    >
                      {pickCategory(rb)}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div
                      className="flex items-center gap-2 text-xs mb-2.5 font-medium"
                      style={{ color: "var(--new-para-text, #b3b3b3)" }}
                    >
                      <span>{rb.creator || "Vedraha Wellness"}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ backgroundColor: "var(--new-accent-color, #df8804)" }}
                      />
                      <span>{formatDate(rb.createdAt)}</span>
                    </div>
                    <h3
                      className="text-lg font-bold leading-snug mb-2 line-clamp-2 transition-opacity"
                      style={{ color: "var(--color-black, #000000)" }}
                    >
                      {rb.title}
                    </h3>
                    {rb.excerpt && (
                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-2"
                        style={{ color: "var(--new-para-text, #6b6080)" }}
                      >
                        {rb.excerpt}
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
          </div>
        )}
      </div>
    </div>
  );
}
