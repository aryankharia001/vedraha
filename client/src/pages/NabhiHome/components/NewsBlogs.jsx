import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendurl } from '../../../App';
import SectionHeader from './SectionHeader';
import { DUMMY_BLOGS } from '../../dummyBlogs';

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
  blog?.thumbnail?.secureUrl ||
  blog?.mainPicture?.secureUrl ||
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600";

export default function NewsBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/blogs`, {
          params: { limit: 3, published: "true" },
        });
        if (cancelled) return;
        const fetched = Array.isArray(res.data?.blogs) ? res.data.blogs : [];
        if (fetched.length > 0) {
          setBlogs(fetched.slice(0, 3));
        } else {
          // Fall back to dummy data (first 3)
          setBlogs(DUMMY_BLOGS.slice(0, 3));
        }
      } catch (err) {
        console.error("NewsBlogs fetch error:", err);
        if (!cancelled) setBlogs(DUMMY_BLOGS.slice(0, 3));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="py-12 md:py-16"
      style={{
        backgroundColor: "var(--new-bg-white-color)",
        fontFamily: "var(--font-new-1)",
      }}
    >
      <div
        className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: "var(--new-bg-white-color)",
          fontFamily: "var(--font-new-1)",
        }}
      >
        <SectionHeader
          subtitle="News & Blogs"
          heading="Our Latest"
          headingHighlight="News & Blogs"
        />

        {/* Blog Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm" style={{ color: "var(--new-para-text)" }}>
            Loading blogs…
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: "var(--new-para-text)" }}>
            No blogs available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 md:mt-10">
            {blogs.map((post) => (
              <article
                key={post._id}
                onClick={() => navigate(`/blogs/${post._id}`)}
                className="group flex flex-col rounded-[10px] overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
                style={{ backgroundColor: "var(--color-white, #ffffff)" }}
              >
                {/* Image Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden isolation-auto">
                  <img
                    src={pickImage(post)}
                    alt={post.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category Badge tucked in bottom-left */}
                  <span
                    className="absolute bottom-0 left-0 text-white text-xs font-medium px-4 py-1.5 rounded-tr-xl z-10"
                    style={{ backgroundColor: "var(--new-primary-color)" }}
                  >
                    {pickCategory(post)}
                  </span>
                </div>

                {/* Text Content Area */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Meta details */}
                  <div
                    className="flex items-center gap-2 text-xs mb-2.5 font-medium"
                    style={{ color: "var(--new-para-text)" }}
                  >
                    <span>{post.creator || "Vedraha Wellness"}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: "var(--new-accent-color)" }}
                    />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold leading-snug mb-4 line-clamp-2 group-hover:opacity-85 transition-opacity"
                    style={{ color: "var(--color-black)" }}
                  >
                    {post.title}
                  </h3>

                  {/* Read More Link */}
                  <span
                    className="text-sm font-bold underline underline-offset-4 mt-auto w-fit transition-opacity hover:opacity-80"
                    style={{ color: "var(--new-purple-color)" }}
                  >
                    Read More
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View all button */}
        {!loading && blogs.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => navigate("/blogs-en")}
              className="px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "var(--new-primary-color, #35105f)",
                color: "var(--color-white, #ffffff)",
                letterSpacing: "0.04em",
              }}
            >
              View All Blogs →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
