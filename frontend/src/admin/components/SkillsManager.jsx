import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Code, Minus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ category: '', skills: [] });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({ name: '', level: 50 });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_URL}/api/skills`);
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editing ? `${API_URL}/api/skills/${editing}` : `${API_URL}/api/skills`;
    const method = editing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });

      setForm({ category: '', skills: [] });
      setCurrentSkill({ name: '', level: 50 });
      setEditing(null);
      setShowForm(false);
      fetchSkills();
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill category?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skills:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item._id);
    setShowForm(true);
  };

  const addSkill = () => {
    if (currentSkill.name.trim()) {
      setForm({
        ...form,
        skills: [...form.skills, { ...currentSkill }]
      });
      setCurrentSkill({ name: '', level: 50 });
    }
  };

  const removeSkill = (index) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Skills</h2>
          <p className="text-gray-400 mt-1">Add, edit, or remove your skill categories</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Skill Category
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit Skill Category' : 'Add New Skill Category'}</h3>
              <button onClick={() => { setShowForm(false); setForm({ category: '', skills: [] }); setCurrentSkill({ name: '', level: 50 }); setEditing(null); }} className="p-2 hover:bg-[var(--color-cyber-gray)] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  placeholder="e.g., Programming Languages"
                  required
                />
              </div>

              {/* Add Skills Section */}
              <div>
                <label className="block text-sm font-medium mb-3">Add Skills</label>
                <div className="space-y-4 p-4 bg-[var(--color-cyber-dark)] rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Skill Name</label>
                      <input
                        type="text"
                        value={currentSkill.name}
                        onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                        className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-3 py-2 text-white text-sm"
                        placeholder="e.g., Python"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Proficiency Level: {currentSkill.level}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentSkill.level}
                        onChange={(e) => setCurrentSkill({ ...currentSkill, level: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="w-full px-4 py-2 bg-[var(--color-neon-green)] text-black rounded hover:bg-[#00e63a] transition-colors text-sm font-medium"
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Skills List */}
              {form.skills.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-3">Skills in this Category</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {form.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[var(--color-cyber-dark)] rounded">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updatedSkills = [...form.skills];
                              updatedSkills[index].name = e.target.value;
                              setForm({ ...form, skills: updatedSkills });
                            }}
                            className="bg-[var(--color-cyber-black)] border border-gray-700 rounded px-2 py-1 text-white text-sm"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => {
                                const updatedSkills = [...form.skills];
                                updatedSkills[index].level = parseInt(e.target.value);
                                setForm({ ...form, skills: updatedSkills });
                              }}
                              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <span className="text-xs text-gray-400 w-10">{skill.level}%</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors ml-2"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] font-medium">
                  {editing ? 'Update' : 'Add'} Skill Category
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm({ category: '', skills: [] }); setCurrentSkill({ name: '', level: 50 }); setEditing(null); }} className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(item => (
          <div key={item._id} className="glass-card overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="relative h-32 bg-gradient-to-br from-green-600/20 to-blue-600/20 flex items-center justify-center">
              <Code className="w-16 h-16 text-green-400" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-white">{item.category}</h3>
              
              <div className="space-y-2 mb-4">
                {item.skills?.slice(0, 3).map((skill, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-neon-green)] transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                  </div>
                ))}
                {item.skills?.length > 3 && (
                  <p className="text-xs text-gray-500">+{item.skills.length - 3} more skills</p>
                )}
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

      {skills.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No skill categories yet. Click "Add Skill Category" to create one.</p>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-neon-green);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: var(--color-neon-green);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SkillsManager;