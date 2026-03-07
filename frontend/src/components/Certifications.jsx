import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const res = await fetch(`${API_URL}/api/certifications`);
            const data = await res.json();
            setCertifications(data);
        } catch (error) {
            console.error('Error fetching certifications:', error);
            // Fallback to static data if API fails
            setCertifications([
                {
                    title: 'AWS Certified Solutions Architect',
                    issuer: 'Amazon Web Services',
                    date: 'January 2024',
                    credentialId: 'AWS-12345',
                    description: 'Validates expertise in designing distributed systems on AWS.',
                    link: '#'
                },
                {
                    title: 'Certified Ethical Hacker (CEH)',
                    issuer: 'EC-Council',
                    date: 'December 2023',
                    credentialId: 'CEH-67890',
                    description: 'Demonstrates knowledge of ethical hacking and penetration testing.',
                    link: '#'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4">
                    <span className="text-white">Certifications</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="glass-card p-6 animate-pulse">
                                <div className="mb-4 aspect-video bg-gray-700 rounded-lg"></div>
                                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                <div className="h-3 bg-gray-700 rounded mb-3 w-2/3"></div>
                                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                            </div>
                        ))
                    ) : certifications.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                            <p>No certifications found. Add some in the admin panel!</p>
                        </div>
                    ) : (
                        certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-6 hover:-translate-y-2 transition-transform group"
                            >
                                <div className="mb-4 aspect-video bg-[var(--color-cyber-dark)] rounded-lg flex items-center justify-center border border-[var(--color-neon-green)]/20 overflow-hidden">
                                    {cert.image ? (
                                        <img
                                            src={cert.image.startsWith('http') ? cert.image : `${API_URL}${cert.image}`}
                                            alt={cert.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <Award className={`w-16 h-16 text-[var(--color-neon-green)]/30 ${cert.image ? 'hidden' : ''}`} />
                                </div>

                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white font-mono flex-1">{cert.title}</h3>
                                </div>

                                <div className="text-[var(--color-neon-blue)] text-sm font-mono mb-3">{cert.issuer}</div>

                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <Calendar className="w-3 h-3" />
                                    <span>{cert.date}</span>
                                </div>

                                <p className="text-gray-400 text-sm mb-4">{cert.description}</p>

                                {cert.credentialId && (
                                    <div className="text-xs text-gray-500 font-mono mb-4">
                                        ID: {cert.credentialId}
                                    </div>
                                )}

                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[var(--color-neon-green)] hover:text-[var(--color-neon-blue)] transition-colors text-sm font-mono"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Certificate
                                    </a>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Certifications;
