// pages/admin/BlogManagementPage.jsx
// Admin page for managing blogs - create, edit, list, delete

import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { backendurl } from '../../App';

const BlogManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // editId is only set when we have a real MongoDB id (edit route)
  // On /admin/blogs/create the word "create" may be caught as id — ignore it
  const editId = id && id !== 'create' ? id : null;
  const location = useLocation();
  const showForm = !!editId || location.pathname.includes('/create');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [subheadings, setSubheadings] = useState([{ heading: '', content: '' }]);
  const [isPublished, setIsPublished] = useState(false);
  const [mainPicture, setMainPicture] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (editId) {
      fetchBlog(editId);
    } else if (!showForm) {
      fetchBlogs();
    } else {
      // create mode — nothing to fetch, just clear loading
      setLoading(false);
    }
  }, [editId, showForm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendurl}/api/blogs?limit=100`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchBlog = async (blogId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendurl}/api/blogs/${blogId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const blog = res.data;
      setTitle(blog.title || '');
      setCreator(blog.creator || '');
      setCategories(blog.categories?.join(', ') || '');
      setTags(blog.tags?.join(', ') || '');
      setExcerpt(blog.excerpt || '');
      setSubheadings(blog.subheadings?.length ? blog.subheadings : [{ heading: '', content: '' }]);
      setIsPublished(blog.isPublished || false);
      setMetaTitle(blog.seo?.metaTitle || '');
      setMetaDescription(blog.seo?.metaDescription || '');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubheading = () => {
    setSubheadings([...subheadings, { heading: '', content: '' }]);
  };

  const handleRemoveSubheading = (index) => {
    setSubheadings(subheadings.filter((_, i) => i !== index));
  };

  const handleSubheadingChange = (index, field, value) => {
    const updated = [...subheadings];
    updated[index][field] = value;
    setSubheadings(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!token) {
    //   alert('Please login as admin');
    //   return;
    // }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('creator', creator);
      formData.append('categories', JSON.stringify(categories.split(',').map(c => c.trim()).filter(Boolean)));
      formData.append('tags', JSON.stringify(tags.split(',').map(t => t.trim()).filter(Boolean)));
      formData.append('excerpt', excerpt);
      formData.append('subheadings', JSON.stringify(subheadings.filter(s => s.heading && s.content)));
      formData.append('isPublished', isPublished);
      formData.append('seo', JSON.stringify({ metaTitle, metaDescription, keywords: [] }));

      if (mainPicture) formData.append('mainPicture', mainPicture);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };

      if (editId) {
        await axios.put(`${backendurl}/api/blogs/${editId}`, formData, config);
        alert('Blog updated successfully');
      } else {
        await axios.post(`${backendurl}/api/blogs`, formData, config);
        alert('Blog created successfully');
      }
      navigate('/admin/blogs');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${backendurl}/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog');
    }
  };

  // List view
  if (!showForm) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Blog Management</h2>
          <button
            onClick={() => navigate('/admin/blogs/create')}
            style={{
              padding: '10px 20px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            + Create New Blog
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Title</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Creator</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Categories</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{blog.title}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{blog.creator}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{blog.categories?.join(', ')}</td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <span style={{ color: blog.isPublished ? 'green' : 'orange' }}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                    <button
                      onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
                      style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && blogs.length === 0 && <p>No blogs found. Create your first blog!</p>}
      </div>
    );
  }

  // Form view (create/edit)
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/admin/blogs')} style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        ← Back to Blogs
      </button>

      <h2>{editId ? 'Edit Blog' : 'Create New Blog'}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Creator *</label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Categories (comma separated)</label>
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Health, Wellness, Nutrition"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tips, guide, recipe"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Excerpt / Short Description</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Main Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainPicture(e.target.files[0])}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Subheadings with Content</label>
            {subheadings.map((sub, index) => (
              <div key={index} style={{ marginBottom: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
                <input
                  type="text"
                  value={sub.heading}
                  onChange={(e) => handleSubheadingChange(index, 'heading', e.target.value)}
                  placeholder="Subheading"
                  style={{ width: '100%', padding: '8px', marginBottom: '8px', fontSize: '16px' }}
                />
                <textarea
                  value={sub.content}
                  onChange={(e) => handleSubheadingChange(index, 'content', e.target.value)}
                  placeholder="Content for this subheading..."
                  rows={4}
                  style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                />
                {subheadings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSubheading(index)}
                    style={{ marginTop: '8px', padding: '4px 8px', color: 'red' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubheading}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              + Add Subheading
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Meta Title (SEO)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Meta Description (SEO)</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <span style={{ fontWeight: 'bold' }}>Publish Blog</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              background: saving ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : editId ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogManagementPage;