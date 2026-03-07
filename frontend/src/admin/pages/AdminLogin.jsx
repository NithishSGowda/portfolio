import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-cyber-black)] flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white font-mono mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 font-mono">Username</label>
            <div className="flex items-center gap-2 bg-[var(--color-cyber-dark)] border border-gray-700 rounded px-3 py-2">
              <User className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="bg-transparent text-white outline-none flex-1"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 font-mono">Password</label>
            <div className="flex items-center gap-2 bg-[var(--color-cyber-dark)] border border-gray-700 rounded px-3 py-2">
              <Lock className="w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="bg-transparent text-white outline-none flex-1"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-neon-green)] text-[var(--color-cyber-black)] font-bold py-3 rounded hover:bg-[#00e63a] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
