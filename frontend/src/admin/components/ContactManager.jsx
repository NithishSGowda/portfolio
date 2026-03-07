import { useState, useEffect } from 'react';
import { Edit, Save, X, Mail } from 'lucide-react';

const ContactManager = () => {
  const [contactData, setContactData] = useState({
    title: 'Initialize Connection',
    subtitle: "Let's build secure logic together.",
    description: "Whether you have a question, a project proposal, or just want to discuss the latest in AI security, I'm always open to connecting. My inbox is actively monitored.",
    email: 'contact@nithish.dev',
    github: 'github.com/nithish-dev',
    linkedin: 'linkedin.com/in/nithish-dev',
    resumeText: 'Download Resume',
    resumeFile: null
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const localData = localStorage.getItem('contactData');
      if (localData) {
        setContactData(JSON.parse(localData));
      } else {
        const defaultData = {
          title: 'Initialize Connection',
          subtitle: "Let's build secure logic together.",
          description: "Whether you have a question, a project proposal, or just want to discuss the latest in AI security, I'm always open to connecting. My inbox is actively monitored.",
          email: 'contact@nithish.dev',
          github: 'github.com/nithish-dev',
          linkedin: 'linkedin.com/in/nithish-dev',
          resumeText: 'Download Resume',
          resumeFile: null
        };
        setContactData(defaultData);
        localStorage.setItem('contactData', JSON.stringify(defaultData));
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem('contactData', JSON.stringify(contactData));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('contactDataUpdated'));
      
      setEditing(false);
      alert('Contact section updated successfully!');
    } catch (error) {
      console.error('Error saving contact data:', error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContactData(prev => ({
          ...prev,
          resumeFile: {
            name: file.name,
            data: event.target.result,
            type: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const removeResume = () => {
    setContactData(prev => ({
      ...prev,
      resumeFile: null
    }));
  };

  const handleChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4 w-1/3"></div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Contact Section</h2>
          <p className="text-gray-400 mt-1">Customize contact information and social links</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--color-neon-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Edit Content
            </button>
          )}
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-[var(--color-neon-green)]" />
          <h3 className="text-2xl font-bold">Contact Information</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">Section Title</label>
              {editing ? (
                <input
                  type="text"
                  value={contactData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-white font-bold">{contactData.title}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">Subtitle</label>
              {editing ? (
                <input
                  type="text"
                  value={contactData.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-white">{contactData.subtitle}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
            {editing ? (
              <textarea
                value={contactData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-24"
                placeholder="Contact description..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{contactData.description}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">Email</label>
              {editing ? (
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-[var(--color-neon-green)] font-mono">{contactData.email}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">GitHub</label>
              {editing ? (
                <input
                  type="text"
                  value={contactData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-[var(--color-neon-blue)] font-mono">{contactData.github}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-purple-400">LinkedIn</label>
              {editing ? (
                <input
                  type="text"
                  value={contactData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-purple-400 font-mono">{contactData.linkedin}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">Resume Button Text</label>
            {editing ? (
              <input
                type="text"
                value={contactData.resumeText}
                onChange={(e) => handleChange('resumeText', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-[var(--color-neon-green)] font-mono">{contactData.resumeText}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-yellow-400">Resume File (PDF)</label>
            {editing ? (
              <div className="space-y-3">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[var(--color-neon-green)] file:text-black"
                />
                {contactData.resumeFile && (
                  <div className="flex items-center justify-between bg-[var(--color-cyber-dark)] p-3 rounded border border-gray-700">
                    <span className="text-white">{contactData.resumeFile.name}</span>
                    <button
                      onClick={removeResume}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                {contactData.resumeFile ? (
                  <p className="text-yellow-400">{contactData.resumeFile.name}</p>
                ) : (
                  <p className="text-gray-500">No resume uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;