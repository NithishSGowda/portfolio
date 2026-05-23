import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, FileText } from 'lucide-react';
import ImageUpload from './ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/api/blogs`);
    const data = await res.json();
    setBlogs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/blogs/${editing}` : `${API_URL}/api/blogs`;
    const method = editing ? 'PUT' : 'POST';

    // Generate slug from title if not editing or slug is empty
    const submissionForm = { ...form };
    if (!submissionForm.slug && submissionForm.title) {
        submissionForm.slug = submissionForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(submissionForm)
    });

    setForm({});
    setEditing(null);
    setShowForm(false);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditing(blog._id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Blogs</h2>
          <p className="text-gray-400 mt-1">Draft, edit, and publish your technical articles.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Write Post
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="p-2 hover:bg-[var(--color-cyber-gray)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={form.title || ''}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug (optional, auto-generated)</label>
                    <input
                      type="text"
                      value={form.slug || ''}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      placeholder="my-awesome-post"
                    />
                  </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt (Short Summary)</label>
                <textarea
                  value={form.excerpt || ''}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  rows="2"
                  maxLength="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
                <textarea
                  value={form.content || ''}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white font-mono text-sm"
                  rows="15"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                    <input
                    type="text"
                    value={form.tags?.join(', ') || ''}
                    onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                    placeholder="Cybersecurity, React, Node"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Read Time (e.g. '5 min read')</label>
                    <input
                    type="text"
                    value={form.readTime || ''}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                    />
                </div>
              </div>

              <ImageUpload
                value={form.coverImage || ''}
                onChange={(filePath) => setForm({ ...form, coverImage: filePath })}
                label="Cover Image"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published !== false}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm">Publish Immediately</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Publish'} Post
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
            {/* Blog Image */}
            <div className="relative h-48 bg-[var(--color-cyber-dark)] overflow-hidden">
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-800">
                  <FileText className="w-12 h-12 text-gray-500" />
                </div>
              )}
              {!blog.published && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Draft
                </span>
              )}
            </div>

            {/* Blog Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">{blog.title}</h3>
              {blog.tags && blog.tags.length > 0 && (
                <p className="text-[var(--color-neon-blue)] text-sm mb-3">{blog.tags[0]}</p>
              )}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt || 'No excerpt.'}</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No blog posts yet. Click "Write Post" to start.</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
