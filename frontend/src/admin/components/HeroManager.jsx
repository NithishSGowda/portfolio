import { useState, useEffect } from 'react';
import { Edit, Save, X, Home, Plus, Trash2 } from 'lucide-react';

const HeroManager = () => {
  const [heroData, setHeroData] = useState({
    name: 'Nithish S Gowda',
    profileImage: null,
    statusText: 'System Online // Access Granted',
    typewriterTexts: [],
    description: '',
    primaryButtonText: 'Deployments',
    primaryButtonLink: '#projects',
    secondaryButtonText: 'Initialize Contact',
    secondaryButtonLink: '#contact'
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTypewriterText, setNewTypewriterText] = useState('');

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      // Try to get from localStorage first
      const localData = localStorage.getItem('heroData');
      if (localData) {
        const parsedData = JSON.parse(localData);
        // Update name if it's still the old one
        if (parsedData.name === 'Nithish') {
          parsedData.name = 'Nithish S Gowda';
          localStorage.setItem('heroData', JSON.stringify(parsedData));
        }
        setHeroData(parsedData);
      } else {
        // Set default data
        const defaultData = {
          name: 'Nithish S Gowda',
          profileImage: null,
          statusText: 'System Online // Access Granted',
          typewriterTexts: [
            'AI Security Researcher',
            'Cybersecurity Engineer',
            'Python Developer',
            'BlockChain Technology',
            'Ethical Hacker'
          ],
          description: 'Specializing in securing web applications, researching AI vulnerabilities, and building robust backend systems. Turning coffee into secure, scalable code.',
          primaryButtonText: 'Deployments',
          primaryButtonLink: '#projects',
          secondaryButtonText: 'Initialize Contact',
          secondaryButtonLink: '#contact'
        };
        setHeroData(defaultData);
        localStorage.setItem('heroData', JSON.stringify(defaultData));
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Save to localStorage
      localStorage.setItem('heroData', JSON.stringify(heroData));
      
      // Dispatch event to notify portfolio
      window.dispatchEvent(new Event('heroDataUpdated'));
      
      setEditing(false);
      alert('Hero section updated successfully!');
    } catch (error) {
      console.error('Error saving hero data:', error);
      alert(`Error saving data: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeroData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file');
    }
  };

  const removeImage = () => {
    setHeroData(prev => ({
      ...prev,
      profileImage: null
    }));
  };

  const handleChange = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTypewriterText = () => {
    if (newTypewriterText.trim()) {
      setHeroData(prev => ({
        ...prev,
        typewriterTexts: [...prev.typewriterTexts, newTypewriterText.trim()]
      }));
      setNewTypewriterText('');
    }
  };

  const removeTypewriterText = (index) => {
    setHeroData(prev => ({
      ...prev,
      typewriterTexts: prev.typewriterTexts.filter((_, i) => i !== index)
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
          <h2 className="text-3xl font-bold">Manage Hero Section</h2>
          <p className="text-gray-400 mt-1">Customize the main landing page content</p>
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

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-[var(--color-neon-green)]" />
            <h3 className="text-2xl font-bold">Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">Name</label>
              {editing ? (
                <input
                  type="text"
                  value={heroData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-white font-bold text-xl">{heroData.name}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">Status Text</label>
              {editing ? (
                <input
                  type="text"
                  value={heroData.statusText}
                  onChange={(e) => handleChange('statusText', e.target.value)}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                />
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-[var(--color-neon-blue)] font-mono">{heroData.statusText}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-purple-400">Profile Image</label>
            {editing ? (
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[var(--color-neon-green)] file:text-black"
                />
                {heroData.profileImage && (
                  <div className="flex items-center gap-4 bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                    <img src={heroData.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                    <button
                      onClick={removeImage}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                {heroData.profileImage ? (
                  <div className="flex items-center gap-4">
                    <img src={heroData.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                    <span className="text-purple-400">Profile image uploaded</span>
                  </div>
                ) : (
                  <p className="text-gray-500">No profile image uploaded</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
            {editing ? (
              <textarea
                value={heroData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white h-24"
                placeholder="Main description text..."
              />
            ) : (
              <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                <p className="text-gray-300">{heroData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Typewriter Texts */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6">Typewriter Animation Texts</h3>
          
          {editing && (
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newTypewriterText}
                onChange={(e) => setNewTypewriterText(e.target.value)}
                placeholder="Add new typewriter text..."
                className="flex-1 bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                onKeyPress={(e) => e.key === 'Enter' && addTypewriterText()}
              />
              <button
                onClick={addTypewriterText}
                className="px-4 py-3 bg-[var(--color-neon-green)] text-black rounded hover:bg-[#00e63a] transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="space-y-3">
            {heroData.typewriterTexts?.map((text, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[var(--color-cyber-dark)] rounded border border-gray-700">
                <span className="flex-1 text-white font-mono">{text}</span>
                {editing && (
                  <button
                    onClick={() => removeTypewriterText(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6">Action Buttons</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-green)]">Primary Button</label>
              {editing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={heroData.primaryButtonText}
                    onChange={(e) => handleChange('primaryButtonText', e.target.value)}
                    placeholder="Button text"
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  />
                  <input
                    type="text"
                    value={heroData.primaryButtonLink}
                    onChange={(e) => handleChange('primaryButtonLink', e.target.value)}
                    placeholder="Button link"
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  />
                </div>
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-[var(--color-neon-green)] font-bold">{heroData.primaryButtonText}</p>
                  <p className="text-gray-400 text-sm">{heroData.primaryButtonLink}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--color-neon-blue)]">Secondary Button</label>
              {editing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={heroData.secondaryButtonText}
                    onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                    placeholder="Button text"
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  />
                  <input
                    type="text"
                    value={heroData.secondaryButtonLink}
                    onChange={(e) => handleChange('secondaryButtonLink', e.target.value)}
                    placeholder="Button link"
                    className="w-full bg-[var(--color-cyber-black)] border border-gray-700 rounded px-4 py-3 text-white"
                  />
                </div>
              ) : (
                <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700">
                  <p className="text-[var(--color-neon-blue)] font-bold">{heroData.secondaryButtonText}</p>
                  <p className="text-gray-400 text-sm">{heroData.secondaryButtonLink}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroManager;