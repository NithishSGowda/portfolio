import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/" element={
                    <div className="bg-cyber-grid min-h-screen text-gray-300 font-sans selection:bg-[var(--color-neon-green)] selection:text-[var(--color-cyber-black)] relative z-0">
                        <Navbar />
                        <main className="relative z-10">
                            <Hero />
                            <About />
                            <Education />
                            <Skills />
                            <Projects />
                            <Certifications />
                            <Achievements />
                            <Contact />
                        </main>
                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
