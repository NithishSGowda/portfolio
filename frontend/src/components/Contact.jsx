import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Terminal, Send, Download } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [contactData, setContactData] = useState({
        title: 'Initialize Connection',
        subtitle: "Let's build secure logic together.",
        description: "Whether you have a question, a project proposal, or just want to discuss the latest in AI security, I'm always open to connecting. My inbox is actively monitored.",
        email: 'contact@nithish.dev',
        github: 'github.com/nithish-dev',
        linkedin: 'linkedin.com/in/nithish-dev',
        resumeText: 'Download Resume'
    });

    useEffect(() => {
        const savedData = localStorage.getItem('contactData');
        if (savedData) {
            setContactData(JSON.parse(savedData));
        }

        // Listen for localStorage changes
        const handleStorageChange = () => {
            const updatedData = localStorage.getItem('contactData');
            if (updatedData) {
                setContactData(JSON.parse(updatedData));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for custom events (for same-tab updates)
        window.addEventListener('contactDataUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('contactDataUpdated', handleStorageChange);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save message to localStorage
        const message = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: Date.now(),
            read: false
        };
        
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        existingMessages.unshift(message);
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
        
        // Dispatch event to notify admin dashboard
        window.dispatchEvent(new Event('newContactMessage'));
        
        alert('Message transmission successful! Thank you for reaching out.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-16 flex items-center gap-4">
                    <span className="text-white">{contactData.title}</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">{contactData.subtitle}</h3>
                        <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                            {contactData.description}
                        </p>

                        <div className="space-y-6">
                            <a href={`mailto:${contactData.email}`} className="flex items-center gap-4 text-gray-300 hover:text-[var(--color-neon-green)] transition-colors group">
                                <div className="p-3 bg-[var(--color-cyber-gray)] rounded-lg group-hover:bg-[var(--color-neon-green)]/10 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-lg">{contactData.email}</span>
                            </a>

                            <a href={`https://${contactData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-[var(--color-neon-blue)] transition-colors group">
                                <div className="p-3 bg-[var(--color-cyber-gray)] rounded-lg group-hover:bg-[var(--color-neon-blue)]/10 transition-colors">
                                    <Github className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-lg">{contactData.github}</span>
                            </a>

                            <a href={`https://${contactData.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors group">
                                <div className="p-3 bg-[var(--color-cyber-gray)] rounded-lg group-hover:bg-purple-500/10 transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-lg">{contactData.linkedin}</span>
                            </a>
                        </div>

                        <div className="mt-12">
                            <p className="text-gray-400 font-mono mb-4 text-sm">&gt; Access clearance document:</p>
                            {contactData.resumeFile ? (
                                <a
                                    href={contactData.resumeFile.data}
                                    download={contactData.resumeFile.name}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[var(--color-neon-green)] text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all font-mono"
                                >
                                    <Download className="w-5 h-5" /> {contactData.resumeText}
                                </a>
                            ) : (
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[var(--color-neon-green)] text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all font-mono"
                                >
                                    <Download className="w-5 h-5" /> {contactData.resumeText}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <div className="flex items-center gap-2 mb-6 text-[var(--color-neon-blue)] font-mono border-b border-[var(--color-cyber-dark)] pb-4">
                            <Terminal className="w-5 h-5" />
                            <span>secure_message_client.sh</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">Identifier</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-[var(--color-cyber-dark)] border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] transition-colors font-mono"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">Return Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full bg-[var(--color-cyber-dark)] border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] transition-colors font-mono"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">Payload</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows="4"
                                    className="w-full bg-[var(--color-cyber-dark)] border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-green)] focus:ring-1 focus:ring-[var(--color-neon-green)] transition-colors font-mono resize-none"
                                    placeholder="Enter message content..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-[var(--color-neon-green)] text-[var(--color-cyber-black)] font-bold font-mono py-3 px-4 rounded-md hover:bg-[#00e63a] transition-colors"
                            >
                                <Send className="w-5 h-5" /> Execute Transmission
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
