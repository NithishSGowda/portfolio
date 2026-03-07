import { useState, useEffect } from 'react';
import { Edit, Save, X, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AboutManager = () => {
  const [aboutData, setAboutData] = useState({
    introduction: '',
    mainDescription: '',
    blockchainDescription: '',
    currentFocus: '',
    currentObjective: ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/about`);
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);
      } else {
        // Set default data if no data exists
        setAboutData({
          introduction: "Hello! I'm Nithish, currently pursuing a Bachelor's degree in Computer Science Engineering (CSE – Internet of Things, Cybersecurity, and Blockchain Technology).",
          mainDescription: "I have a strong passion for Cybersecurity and Python development. My journey began with building simple Python scripts and gradually evolved into analyzing complex systems to understand how vulnerabilities occur. I believe that to build secure systems, you must first think like an attacker.",
          blockchainDescription: "Along with cybersecurity, I have knowledge of Blockchain technology, where I explore concepts such as decentralized systems, cryptographic security, and distributed ledgers. I am also skilled in frontend development using HTML and CSS, allowing me to design and build clean, responsive user interfaces for web applications.",
          currentFocus: "Currently, my primary focus lies at the intersection of Artificial Intelligence and Cybersecurity. I am actively researching how Large Language Models (LLMs) can be exploited and building AI-driven tools that help detect vulnerabilities, analyze threats, and strengthen system security.",
          currentObjective: "Seeking opportunities to contribute to cutting-edge security products and protect critical infrastructure."
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem('aboutData', JSON.stringify(aboutData));

      // Dispatch event to notify portfolio
      window.dispatchEvent(new Event('aboutDataUpdated'));

      setEditing(false);
      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error saving about data:', error);
      alert('Error saving data');
    }
  };

  const handleChange = (field, value) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4 w-1/3"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage About Section</h2>
          <p className="text-gray-400 mt-1">Edit the about me content and descriptions</p>
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
          <User className="w-6 h-6 text-[var(--color-neon-green)]" />
          <h3 className="text-2xl font-bold">About Me Content</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">
              Introduction Paragraph
            </label>
            {editing ? (
              <textarea
                value={aboutData.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-20"
                placeholder="Introduction paragraph..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{aboutData.introduction}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">
              Main Description
            </label>
            {editing ? (
              <textarea
                value={aboutData.mainDescription}
                onChange={(e) => handleChange('mainDescription', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-24"
                placeholder="Main description about your passion and journey..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{aboutData.mainDescription}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-purple-400">
              Blockchain & Skills Description
            </label>
            {editing ? (
              <textarea
                value={aboutData.blockchainDescription}
                onChange={(e) => handleChange('blockchainDescription', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-24"
                placeholder="Description about blockchain knowledge and other skills..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{aboutData.blockchainDescription}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">
              Current Focus
            </label>
            {editing ? (
              <textarea
                value={aboutData.currentFocus}
                onChange={(e) => handleChange('currentFocus', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-24"
                placeholder="Current focus and research areas..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{aboutData.currentFocus}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">
              Current Objective
            </label>
            {editing ? (
              <textarea
                value={aboutData.currentObjective}
                onChange={(e) => handleChange('currentObjective', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-16"
                placeholder="Current objective or goal..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700 border-[var(--color-neon-green)]/20">
                <p className="font-mono text-[var(--color-neon-green)] text-sm mb-2">&gt; Current Objective:</p>
                <p className="text-gray-300">{aboutData.currentObjective}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManager;