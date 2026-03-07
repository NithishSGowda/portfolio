import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Code, Users, Zap, Target, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const Achievements = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const events = [
        {
            title: 'SAP Inside Track 2025 Bengaluru',
            type: 'Conference',
            date: 'March 2025',
            description: 'Attended the 3rd Edition of SAP Inside Track 2025, featuring sessions on GitHub Security, AI & Generative AI, and enterprise innovation.',
            icon: <Users className="w-6 h-6 text-[var(--color-neon-blue)]" />,
            details: 'The event offered a perfect blend of lecture sessions, demo pods, and hands-on experiences. Key sessions included: GitHub Security insights by Dhanashri Chavan (Secret Scanning, PII handling, GitHub Copilot with Vision), AI & Generative AI talk by Vigneshwari Sambandan (SAP Flywheel, Joule AI), SAP Startup Studio session by Ashmita Sinha, and industry perspectives from Ankit Gupta (MD, Protiviti India) and Ronit Mangal (CIO, Licious) on enterprise adaptation to future challenges.',
            images: ['/sap-inside-track.png', '/sap-inside-track-2.png', '/sap-inside-track-3.png', '/sap-inside-track-4.png'],
            ticket: '#'
        },
        {
            title: 'IEEE Future Networks World Forum 2025',
            type: 'Conference',
            date: 'March 2025',
            description: 'Participated in IEEE Future Networks World Forum 2025 in Bengaluru, a global stage for leaders, researchers, and innovators working on 6G and next-generation networks.',
            icon: <Users className="w-6 h-6 text-[var(--color-neon-blue)]" />,
            details: 'Gained valuable insights from experts at Nokia Bell Labs and other industry pioneers. Explored discussions on future wireless systems, AI-driven networks, and digital inclusion. Engaged with researchers, engineers, and fellow students passionate about shaping the future of communication systems. Learned about cutting-edge advancements in next-gen connectivity, sustainable network technologies, and innovation in telecom.',
            images: ['/ieee-future-networks-1.png', '/ieee-future-networks-2.png', '/ieee-future-networks-3.png', '/ieee-future-networks-4.png'],
            ticket: '#'
        }
    ];

    const hackathons = [
        {
            title: 'Jnana Cauvery 2K25 - Analytics Arena',
            position: 'Participant',
            date: 'May 2025',
            description: 'Participated in State Level Analytics Arena hosted by P.E.S. College of Engineering, Mandya and supported by IEEE.',
            icon: <Code className="w-6 h-6 text-[var(--color-neon-green)]" />,
            details: 'Events like this are crucial for bridging the gap between academic theory and real-world data analysis challenges. Gained valuable insight into the practical application of analytics tools and data science methodologies.',
            images: [],
            certificate: '/jnana-cauvery-2k25.png'
        },
        {
            title: 'Hackfinity Hackathon',
            position: 'Team Tech Titans',
            date: 'May 2025',
            description: 'Participated in Hackfinity Hackathon organized by Department of Information Science & Engineering, MIT Mysore on 9th and 10th May 2025.',
            icon: <Code className="w-6 h-6 text-[var(--color-neon-green)]" />,
            details: 'As part of Team Tech Titans, it was an exciting experience to brainstorm, collaborate, and work on innovative solutions under time constraints. This hackathon truly enhanced problem-solving, teamwork, and technical skills while giving exposure to real-world challenges.',
            images: [],
            certificate: '/hackfinity-certificate.pdf'
        }
    ];

    const allItems = [...events.map(e => ({ ...e, category: 'Event' })), ...hackathons.map(h => ({ ...h, category: 'Hackathon' }))];

    return (
        <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-16 flex items-center gap-4">
                    <span className="text-white">Events & Hackathons</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold font-mono text-[var(--color-neon-blue)] mb-6 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Events Attended
                        </h3>
                        <div className="space-y-4">
                            {events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setSelectedItem({ ...event, category: 'Event' })}
                                    className="glass-card p-6 hover:-translate-y-1 transition-transform cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-[var(--color-cyber-dark)] flex-shrink-0">
                                            {event.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white font-mono">{event.title}</h4>
                                                <span className="text-[var(--color-neon-green)] font-mono text-xs bg-[var(--color-neon-green)]/10 px-2 py-1 rounded">
                                                    {event.date}
                                                </span>
                                            </div>
                                            <div className="text-[var(--color-neon-blue)] text-sm mb-2 font-mono">{event.type}</div>
                                            <p className="text-gray-400 text-sm">{event.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold font-mono text-[var(--color-neon-green)] mb-6 flex items-center gap-2">
                            <Code className="w-6 h-6" />
                            Hackathons
                        </h3>
                        <div className="space-y-4">
                            {hackathons.map((hack, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setSelectedItem({ ...hack, category: 'Hackathon' })}
                                    className="glass-card p-6 hover:-translate-y-1 transition-transform cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-[var(--color-cyber-dark)] flex-shrink-0">
                                            {hack.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white font-mono">{hack.title}</h4>
                                                <span className="text-[var(--color-neon-green)] font-mono text-xs bg-[var(--color-neon-green)]/10 px-2 py-1 rounded">
                                                    {hack.date}
                                                </span>
                                            </div>
                                            <div className="text-yellow-400 text-sm mb-2 font-mono">{hack.position}</div>
                                            <p className="text-gray-400 text-sm">{hack.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--color-cyber-dark)] hover:bg-[var(--color-cyber-gray)] transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            <div className="mb-6">
                                <span className="text-[var(--color-neon-green)] font-mono text-sm bg-[var(--color-neon-green)]/10 px-3 py-1 rounded">
                                    {selectedItem.category}
                                </span>
                                <h3 className="text-3xl font-bold text-white font-mono mt-4 mb-2">{selectedItem.title}</h3>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-[var(--color-neon-blue)] font-mono">{selectedItem.type || selectedItem.position}</span>
                                    <span className="text-gray-400">{selectedItem.date}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-white font-mono mb-3">Details</h4>
                                <p className="text-gray-300 leading-relaxed">{selectedItem.details}</p>
                            </div>

                            {selectedItem.images && selectedItem.images.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-white font-mono mb-3">Images</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedItem.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`${selectedItem.title} - Image ${i + 1}`}
                                                className="w-full aspect-video object-cover rounded-lg border border-[var(--color-neon-green)]/20"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedItem.certificate && (
                                <div>
                                    <h4 className="text-lg font-bold text-white font-mono mb-3">Certificate</h4>
                                    <a
                                        href={selectedItem.certificate}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/30 text-[var(--color-neon-green)] hover:bg-[var(--color-neon-green)]/20 transition-colors font-mono"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Certificate
                                    </a>
                                </div>
                            )}

                            {selectedItem.ticket && (
                                <div>
                                    <h4 className="text-lg font-bold text-white font-mono mb-3">Ticket</h4>
                                    <a
                                        href={selectedItem.ticket}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-neon-blue)]/10 border border-[var(--color-neon-blue)]/30 text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/20 transition-colors font-mono"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Ticket
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
