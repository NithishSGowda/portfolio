import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [semesterData, setSemesterData] = useState([
        { semester: 1, sgpa: 5.74 },
        { semester: 2, sgpa: 6.9 },
        { semester: 3, sgpa: 7.34 },
        { semester: 4, sgpa: 7.18 },
        { semester: 5, sgpa: 8.09 }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await fetch(`${API_URL}/api/education`);
            if (response.ok) {
                const data = await response.json();

                // Filter education entries and semester data from flat array
                const educationEntries = data.filter(item => item.degree && item.institution);
                const semesterEntries = data.filter(item => item.type === 'semester' || (item.semester !== undefined && item.sgpa !== undefined));

                if (educationEntries.length > 0) {
                    setEducation(educationEntries);
                }
                if (semesterEntries.length > 0) {
                    setSemesterData(semesterEntries.sort((a, b) => a.semester - b.semester));
                }
            }
        } catch (error) {
            console.error('Error fetching education data:', error);
            // Fallback to static data
            setEducation([
                {
                    degree: '10th',
                    institution: 'Jnanasagra International Public School',
                    location: 'Channarayapatna, Karnataka',
                    period: '2021',
                    grade: '70%',
                    highlights: ['CBSE Board']
                },
                {
                    degree: 'Bachelor of Technology in Computer Science',
                    institution: 'Maharaja Institute of Technology Mysore',
                    location: 'Mysore, Karnataka',
                    period: '2023 - 2027',
                    grade: 'CGPA: 7.00/10',
                    highlights: [
                        'Specialized in Cybersecurity and blockchain Technology',
                        'Relevant coursework: Network Security, Cryptography, Machine Learning'
                    ]
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4">
                    <span className="text-white">Education</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                {loading ? (
                    <div className="space-y-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="glass-card p-6 md:p-8 animate-pulse">
                                <div className="h-6 bg-gray-700 rounded mb-4 w-2/3"></div>
                                <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <GraduationCap className="w-6 h-6 text-[var(--color-neon-green)] mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-xl font-bold text-white font-mono">{edu.degree}</h3>
                                                <p className="text-[var(--color-neon-blue)] font-semibold mt-1">{edu.institution}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 ml-9">
                                            {edu.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{edu.location}</span>
                                                </div>
                                            )}
                                            {edu.period && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{edu.period}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {edu.grade && (
                                        <div className="md:text-right">
                                            <span className="inline-block px-4 py-2 rounded-md bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/30 text-[var(--color-neon-green)] font-mono text-sm">
                                                {edu.grade}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {edu.highlights && edu.highlights.length > 0 && (
                                    <ul className="ml-9 space-y-2">
                                        {edu.highlights.map((highlight, i) => (
                                            <li key={i} className="text-gray-300 flex items-start gap-2">
                                                <span className="text-[var(--color-neon-green)] mt-1">▹</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}

                        {semesterData.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="glass-card p-6 md:p-8"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-[var(--color-neon-blue)]" />
                                    <h3 className="text-xl font-bold text-white font-mono">Semester-wise SGPA Progress</h3>
                                </div>
                                <div className="relative h-64">
                                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="var(--color-neon-blue)" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="var(--color-neon-blue)" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {semesterData.map((point, i) => {
                                            const x = 50 + (i * (400 / Math.max(semesterData.length - 1, 1)));
                                            const y = 180 - (point.sgpa * 18);
                                            return (
                                                <g key={i}>
                                                    <motion.circle
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                                        cx={x}
                                                        cy={y}
                                                        r="6"
                                                        fill="var(--color-neon-blue)"
                                                        className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                                    />
                                                    <text x={x} y="195" textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="monospace">
                                                        Sem {point.semester}
                                                    </text>
                                                    <text x={x} y={y - 12} textAnchor="middle" fill="var(--color-neon-green)" fontSize="14" fontFamily="monospace" fontWeight="bold">
                                                        {point.sgpa}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            d={`M ${50},${180 - semesterData[0].sgpa * 18} ${semesterData.map((p, i) => `L ${50 + i * (400 / Math.max(semesterData.length - 1, 1))},${180 - p.sgpa * 18}`).join(' ')}`}
                                            stroke="var(--color-neon-blue)"
                                            strokeWidth="3"
                                            fill="none"
                                            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                        />
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            d={`M ${50},${180 - semesterData[0].sgpa * 18} ${semesterData.map((p, i) => `L ${50 + i * (400 / Math.max(semesterData.length - 1, 1))},${180 - p.sgpa * 18}`).join(' ')} L ${50 + (semesterData.length - 1) * (400 / Math.max(semesterData.length - 1, 1))},180 L 50,180 Z`}
                                            fill="url(#areaGradient)"
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default Education;