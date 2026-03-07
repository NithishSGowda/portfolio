import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Events & Hackathons', href: '#achievements' },
        { name: 'Contact', href: '#contact' },

    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--color-cyber-black)]/90 backdrop-blur-md border-b border-[var(--color-neon-green)]/20 py-4 shadow-[0_4px_30px_rgba(0,255,65,0.1)]' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick(e, '#home')}>
                        <Terminal className="text-[var(--color-neon-green)] w-8 h-8" />
                        <span className="text-xl font-mono font-bold text-white tracking-wider glow-text hover:text-[var(--color-neon-green)] transition-colors">
                            <span className="text-[var(--color-neon-green)]">&lt;</span>
                            Nithish
                            <span className="text-[var(--color-neon-green)]"> /&gt;</span>
                        </span>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-gray-300 hover:text-[var(--color-neon-green)] transition-colors duration-300 font-mono text-sm relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[var(--color-neon-green)] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <button
                            onClick={() => navigate('/admin/login')}
                            className="flex items-center gap-2 px-4 py-2 rounded border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10 transition-colors font-mono text-sm"
                        >
                            <Shield className="w-4 h-4" />
                            Admin
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-[var(--color-neon-green)] focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-[var(--color-cyber-dark)]/95 backdrop-blur-md border-b border-[var(--color-neon-green)]/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="block px-3 py-2 text-base font-mono font-medium text-gray-300 hover:text-[var(--color-neon-green)] hover:bg-[var(--color-cyber-gray)] rounded-md transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => { navigate('/admin/login'); setIsOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-base font-mono font-medium text-[var(--color-neon-blue)] hover:bg-[var(--color-cyber-gray)] rounded-md transition-colors"
                        >
                            <Shield className="w-4 h-4" />
                            Admin Panel
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
