import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Skills = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_URL}/api/skills`);
            const data = await res.json();

            // Transform API data to match component structure
            const transformedData = data.map((category, index) => ({
                title: category.category,
                color: getColorByIndex(index),
                iconColor: getIconColorByIndex(index),
                skills: category.skills || []
            }));

            setSkillCategories(transformedData);
        } catch (error) {
            console.error('Error fetching skills:', error);
            // Fallback to static data if API fails
            setSkillCategories([
                {
                    title: 'Programming',
                    color: 'bg-neon-green',
                    iconColor: 'text-[var(--color-neon-green)]',
                    skills: [
                        { name: 'Python', level: 60 },
                        { name: 'C', level: 65 },
                        { name: 'C++', level: 50 },
                        { name: 'HTML', level: 75 },
                        { name: 'CSS', level: 75 },
                    ]
                },
                {
                    title: 'Cybersecurity Tools',
                    color: 'bg-neon-blue',
                    iconColor: 'text-[var(--color-neon-blue)]',
                    skills: [
                        { name: 'Kali Linux', level: 85 },
                        { name: 'Burp Suite', level: 80 },
                        { name: 'Nmap', level: 85 },
                        { name: 'Wireshark', level: 75 },
                        { name: 'Metasploit', level: 70 },
                    ]
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getColorByIndex = (index) => {
        const colors = ['bg-neon-green', 'bg-neon-blue', 'bg-purple-500', 'bg-yellow-500'];
        return colors[index % colors.length];
    };

    const getIconColorByIndex = (index) => {
        const colors = ['text-[var(--color-neon-green)]', 'text-[var(--color-neon-blue)]', 'text-purple-400', 'text-yellow-400'];
        return colors[index % colors.length];
    };

    const customColorClasses = {
        'bg-neon-green': 'bg-[var(--color-neon-green)]',
        'bg-neon-blue': 'bg-[var(--color-neon-blue)]',
        'bg-purple-500': 'bg-purple-500',
        'bg-yellow-500': 'bg-yellow-500',
    };

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4 text-right justify-end">
                    <div className="h-[1px] bg-gray-600 flex-grow mr-4 hidden md:block"></div>
                    <span className="text-white">Technical Arsenal</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="glass-card p-6 animate-pulse">
                                <div className="h-6 bg-gray-700 rounded mb-6 w-1/2"></div>
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between mb-1">
                                                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                                                <div className="h-4 bg-gray-700 rounded w-12"></div>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : skillCategories.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            <p>No skills found. Add some in the admin panel!</p>
                        </div>
                    ) : (
                        skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="glass-card p-6 border-t-2"
                                style={{
                                    borderTopColor: category.color === 'bg-neon-green' ? 'var(--color-neon-green)' :
                                        category.color === 'bg-neon-blue' ? 'var(--color-neon-blue)' :
                                            category.color === 'bg-purple-500' ? '#a855f7' : '#eab308'
                                }}
                            >
                                <h3 className={`text-xl font-bold font-mono mb-6 ${category.iconColor}`}>{category.title}</h3>

                                <div className="space-y-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between font-mono text-sm mb-1">
                                                <span className="text-gray-300">{skill.name}</span>
                                                <span className="text-gray-500">{skill.level}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-[var(--color-cyber-dark)] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className={`h-full ${customColorClasses[category.color]}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;