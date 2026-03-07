import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, GraduationCap, TrendingUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [importing, setImporting] = useState(false);

  const importExistingData = async () => {
    if (!confirm('Import existing data from portfolio? This will add the hardcoded education and semester data to the database.')) return;
    
    setImporting(true);
    const existingSemesterData = [
      { semester: 1, sgpa: 5.74, type: 'semester' },
      { semester: 2, sgpa: 6.9, type: 'semester' },
      { semester: 3, sgpa: 7.34, type: 'semester' },
      { semester: 4, sgpa: 7.18, type: 'semester' },
      { semester: 5, sgpa: 8.09, type: 'semester' }
    ];

    try {
      const token = localStorage.getItem('token');
      
      // Import semester data first
      for (const data of existingSemesterData) {
        const response = await fetch(`${API_URL}/api/education`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          console.error('Failed to import semester:', data);
        }
      }
      
      alert('Semester data imported successfully!');
      fetchEducation();
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch(`${API_URL}/api/education`);
      const data = await res.json();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/education/${editing}` : `${API_URL}/api/education`;
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
      fetchEducation();
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/api/education/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEducation();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item._id);
    setShowForm(true);
  };

  const educationEntries = education.filter(item => item.degree && item.institution);
  const semesterEntries = education.filter(item => item.type === 'semester' || (item.semester !== undefined && item.sgpa !== undefined)).sort((a, b) => a.semester - b.semester);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Education</h2>
          <p className="text-gray-400 mt-1">Add education entries and semester data for the graph</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Entry
          </button>
          <button
            onClick={importExistingData}
            disabled={importing}
            className="flex items-center gap-2 px-4 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] transition-colors disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Portfolio Data'}
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Entry' : 'Add New Entry'}</h3>
              <button onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="p-2 hover:bg-[var(--color-cyber-gray)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Entry Type</label>
                <select
                  value={form.type || 'education'}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                >
                  <option value="education">Education Entry</option>
                  <option value="semester">Semester Data</option>
                </select>
              </div>

              {form.type !== 'semester' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Institution</label>
                    <input
                      type="text"
                      value={form.institution || ''}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      required={form.type !== 'semester'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree</label>
                    <input
                      type="text"
                      value={form.degree || ''}
                      onChange={(e) => setForm({ ...form, degree: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      required={form.type !== 'semester'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={form.location || ''}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Period</label>
                    <input
                      type="text"
                      value={form.period || ''}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      placeholder="2020 - 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Grade/GPA</label>
                    <input
                      type="text"
                      value={form.grade || ''}
                      onChange={(e) => setForm({ ...form, grade: e.target.value })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      placeholder="3.8 GPA or First Class"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Highlights (comma separated)</label>
                    <textarea
                      value={form.highlights?.join(', ') || ''}
                      onChange={(e) => setForm({ ...form, highlights: e.target.value.split(',').map(h => h.trim()).filter(h => h) })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      rows="3"
                      placeholder="Achievement 1, Achievement 2, Achievement 3"
                    />
                  </div>
                </>
              )}

              {form.type === 'semester' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Semester Number</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={form.semester || ''}
                      onChange={(e) => setForm({ ...form, semester: parseInt(e.target.value) })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      required={form.type === 'semester'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SGPA</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={form.sgpa || ''}
                      onChange={(e) => setForm({ ...form, sgpa: parseFloat(e.target.value) })}
                      className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                      placeholder="7.50"
                      required={form.type === 'semester'}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Add'} Entry
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({}); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Entries */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-400" />
          Education Entries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationEntries.map(item => (
            <div key={item._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="relative h-32 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-purple-400" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 text-white">{item.degree}</h4>
                <p className="text-[var(--color-neon-blue)] text-sm mb-2">{item.institution}</p>
                {item.location && <p className="text-gray-400 text-sm mb-2">{item.location}</p>}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">{item.period}</span>
                  {item.grade && <span className="text-[var(--color-neon-green)] text-sm font-medium">{item.grade}</span>}
                </div>
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
      </div>

      {/* Semester Data */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Semester Data (for Graph)
          </h3>
          <button
            onClick={() => {
              setForm({ type: 'semester', semester: semesterEntries.length + 1, sgpa: 7.0 });
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Semester
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {semesterEntries.length > 0 ? semesterEntries.map(item => (
            <div key={item._id} className="glass-card p-4 hover:-translate-y-1 transition-transform">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-neon-blue)] mb-2">Sem {item.semester}</div>
                <div className="text-xl font-bold text-[var(--color-neon-green)]">{item.sgpa}</div>
                <div className="text-xs text-gray-400 mb-3">SGPA</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                  >
                    <Edit className="w-3 h-3 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                  >
                    <Trash2 className="w-3 h-3 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-8 text-gray-400">
              <p>No semester data found. Click "Add Semester" or "Import Existing Data" to add semester records.</p>
            </div>
          )}
        </div>
      </div>

      {education.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No education entries yet. Click "Add Entry" to create one.</p>
        </div>
      )}


    </div>
  );
};

export default EducationManager;