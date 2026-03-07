import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Calendar, Code, Users } from 'lucide-react';
import ImageUpload from './ImageUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/events/${editing}` : `${API_URL}/api/events`;
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
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item._id);
    setShowForm(true);
  };

  const getCategoryIcon = (category) => {
    return category === 'hackathon' ? <Code className="w-16 h-16 text-green-400" /> : <Users className="w-16 h-16 text-blue-400" />;
  };

  const getCategoryColor = (category) => {
    return category === 'hackathon' ? 'from-green-600/20 to-emerald-600/20' : 'from-blue-600/20 to-indigo-600/20';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Events & Hackathons</h2>
          <p className="text-gray-400 mt-1">Add, edit, or remove your events and hackathon participations</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Event' : 'Add New Event'}</h3>
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
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={form.category || ''}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="event">Event</option>
                  <option value="hackathon">Hackathon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <input
                  type="text"
                  value={form.type || ''}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  placeholder="Conference, Workshop, Competition, etc."
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
                  placeholder="e.g., March 2025"
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
              <div>
                <label className="block text-sm font-medium mb-2">Details</label>
                <textarea
                  value={form.details || ''}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  rows="4"
                  placeholder="Detailed information about the event..."
                />
              </div>
              {form.category === 'hackathon' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Position/Team</label>
                  <input
                    type="text"
                    value={form.position || ''}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                    placeholder="e.g., Participant, Team Tech Titans"
                  />
                </div>
              )}
              <ImageUpload
                value={form.images || []}
                onChange={(filePaths) => setForm({ ...form, images: filePaths })}
                multiple={true}
                label="Event Images"
              />
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Add'} Event
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(item => (
          <div key={item._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className={`relative h-32 bg-gradient-to-br ${getCategoryColor(item.category)} flex items-center justify-center`}>
              {getCategoryIcon(item.category)}
              <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                {item.category}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-[var(--color-neon-blue)] text-sm mb-2">{item.type}</p>
              {item.position && (
                <p className="text-yellow-400 text-sm mb-2">{item.position}</p>
              )}
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">{item.date}</span>
              </div>
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

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No events yet. Click "Add Event" to create one.</p>
        </div>
      )}
    </div>
  );
};

export default EventsManager;