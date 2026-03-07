import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Award, ExternalLink } from 'lucide-react';
import ImageUpload from './ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/certifications`);
      const data = await res.json();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/certifications/${editing}` : `${API_URL}/api/certifications`;
    const method = editing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });

      setForm({});
      setEditing(null);
      setShowForm(false);
      fetchCertifications();
    } catch (error) {
      console.error('Error saving certification:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/api/certifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item._id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Certifications</h2>
          <p className="text-gray-400 mt-1">Add, edit, or remove your professional certifications</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Certification' : 'Add New Certification'}</h3>
              <button onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="p-2 hover:bg-[var(--color-cyber-gray)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium mb-2">Issuer</label>
                <input
                  type="text"
                  value={form.issuer || ''}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  value={form.date || ''}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  placeholder="e.g., March 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Credential ID</label>
                <input
                  type="text"
                  value={form.credentialId || ''}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  rows="3"
                />
              </div>
              <ImageUpload
                value={form.image || ''}
                onChange={(filePath) => setForm({ ...form, image: filePath })}
                label="Certificate Image"
              />
              <div>
                <label className="block text-sm font-medium mb-2">Verification Link</label>
                <input
                  type="url"
                  value={form.link || ''}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Add'} Certification
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map(item => (
          <div key={item._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="relative h-32 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 flex items-center justify-center">
              <Award className="w-16 h-16 text-yellow-400" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-[var(--color-neon-blue)] text-sm mb-2">{item.issuer}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">{item.date}</span>
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-neon-green)] hover:text-green-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              {item.credentialId && (
                <p className="text-xs text-gray-500 mb-3">ID: {item.credentialId}</p>
              )}
              {item.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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

      {certifications.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No certifications yet. Click "Add Certification" to create one.</p>
        </div>
      )}
    </div>
  );
};

export default CertificationsManager;