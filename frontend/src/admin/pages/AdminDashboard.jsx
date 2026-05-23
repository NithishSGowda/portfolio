import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, FolderKanban, GraduationCap, Code, Award, Calendar, TrendingUp, Users, Mail, LayoutDashboard, User, Home, MessageSquare } from 'lucide-react';
import ProjectsManager from '../components/ProjectsManager';
import EducationManager from '../components/EducationManager';
import SkillsManager from '../components/SkillsManager';
import CertificationsManager from '../components/CertificationsManager';
import EventsManager from '../components/EventsManager';
import AboutManager from '../components/AboutManager';
import HeroManager from '../components/HeroManager';
import ContactManager from '../components/ContactManager';
import MessagesManager from '../components/MessagesManager';
import BlogManager from '../components/BlogManager';
import { FileText } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ projects: 0, education: 0, skills: 0, certifications: 0, events: 0, unreadMessages: 0, blogs: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();

    // Listen for new messages
    const handleNewMessage = () => {
      fetchStats();
    };

    window.addEventListener('newContactMessage', handleNewMessage);

    return () => {
      window.removeEventListener('newContactMessage', handleNewMessage);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, education, skills, certifications, events, blogs] = await Promise.all([
        fetch(`${API_URL}/api/projects`).then(r => r.json()),
        fetch(`${API_URL}/api/education`).then(r => r.json()),
        fetch(`${API_URL}/api/skills`).then(r => r.json()),
        fetch(`${API_URL}/api/certifications`).then(r => r.json()),
        fetch(`${API_URL}/api/events`).then(r => r.json()),
        fetch(`${API_URL}/api/blogs`).then(r => r.json())
      ]);

      // Get unread messages from localStorage
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const unreadCount = messages.filter(msg => !msg.read).length;

      setStats({
        projects: projects.length,
        education: education.length,
        skills: skills.length,
        certifications: certifications.length,
        events: events.length,
        unreadMessages: unreadCount,
        blogs: blogs.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'hero', label: 'Hero Section', icon: <Home className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: stats.unreadMessages }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-cyber-black)] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[var(--color-cyber-dark)] border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-neon-blue)] flex items-center justify-center text-xl font-bold">
              A
            </div>
            <div>
              <h3 className="font-bold">Admin</h3>
              <p className="text-sm text-gray-400">admin@portfolio.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${activeTab === item.id
                  ? 'bg-[var(--color-neon-blue)] text-white'
                  : 'text-gray-300 hover:bg-[var(--color-cyber-gray)]'
                }`}
            >
              {item.icon}
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-[var(--color-cyber-dark)] border-b border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Portfolio Admin Panel</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-[var(--color-neon-green)] text-black rounded-lg hover:bg-[#00e63a] transition-colors"
            >
              View Portfolio
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
                <p className="text-gray-400">Welcome back! Here's what's happening with your portfolio.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Projects</p>
                  <h3 className="text-3xl font-bold">{stats.projects}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Blog Posts</p>
                  <h3 className="text-3xl font-bold">{stats.blogs}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Education</p>
                  <h3 className="text-3xl font-bold">{stats.education}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Skill Categories</p>
                  <h3 className="text-3xl font-bold">{stats.skills}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Certifications</p>
                  <h3 className="text-3xl font-bold">{stats.certifications}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="glass-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-orange-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Unread Messages</p>
                  <h3 className="text-3xl font-bold">{stats.unreadMessages}</h3>
                  <div className="flex items-center gap-1 mt-2 text-orange-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="glass-card p-6 hover:-translate-y-1 transition-transform text-left"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <FolderKanban className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-bold mb-1">Add Project</h4>
                    <p className="text-sm text-gray-400">Create a new project</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className="glass-card p-6 hover:-translate-y-1 transition-transform text-left"
                  >
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-bold mb-1">Manage Skills</h4>
                    <p className="text-sm text-gray-400">Update your skills</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('certifications')}
                    className="glass-card p-6 hover:-translate-y-1 transition-transform text-left"
                  >
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="font-bold mb-1">Add Certificate</h4>
                    <p className="text-sm text-gray-400">Add new certification</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('events')}
                    className="glass-card p-6 hover:-translate-y-1 transition-transform text-left"
                  >
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-bold mb-1">Add Event</h4>
                    <p className="text-sm text-gray-400">Create new event</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && <HeroManager />}
          {activeTab === 'about' && <AboutManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'certifications' && <CertificationsManager />}
          {activeTab === 'events' && <EventsManager />}
          {activeTab === 'blogs' && <BlogManager />}
          {activeTab === 'contact' && <ContactManager />}
          {activeTab === 'messages' && <MessagesManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
