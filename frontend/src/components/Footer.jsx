import { Terminal, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-[var(--color-neon-green)]/20 bg-[var(--color-cyber-black)] pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="text-[var(--color-neon-green)] w-6 h-6" />
                        <span className="text-xl font-mono font-bold text-white tracking-wider glow-text">
                            <span className="text-[var(--color-neon-green)]">&lt;</span>
                            Nithish
                            <span className="text-[var(--color-neon-green)]"> /&gt;</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://github.com/nithish-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/in/nithish-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-cyber-gray)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-gray-500">
                    <p>
                        Designed & Built by <span className="text-[var(--color-neon-green)]">Nithish</span>
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()} All rights reserved. <span className="text-[var(--color-neon-blue)]">System Status: Online</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
