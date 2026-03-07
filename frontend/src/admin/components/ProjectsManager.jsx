import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import ImageUpload from './ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/projects/${editing}` : `${API_URL}/api/projects`;
    const method = editing ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form)
    });

    setForm({});
    setEditing(null);
    setShowForm(false);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditing(project._id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Projects</h2>
          <p className="text-gray-400 mt-1">Add, edit, or remove your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Project' : 'Add New Project'}</h3>
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
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={form.tech?.join(', ') || ''}
                  onChange={(e) => setForm({ ...form, tech: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="text"
                  value={form.github || ''}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              </div>
              <ImageUpload
                value={form.image || ''}
                onChange={(filePath) => setForm({ ...form, image: filePath })}
                label="Project Image"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured || false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm">Mark as Featured</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Add'} Project
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
            {/* Project Image */}
            <div className="relative h-48 bg-[var(--color-cyber-dark)] overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              {project.featured && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              {project.tech && project.tech.length > 0 && (
                <p className="text-[var(--color-neon-blue)] text-sm mb-3">{project.tech[0]}</p>
              )}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
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

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No projects yet. Click "Add Project" to create one.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
