import { motion } from 'framer-motion';
import { Target, Server, ShieldCheck, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const About = () => {
    const [aboutContent, setAboutContent] = useState({
        introduction: "Hello! I'm Nithish, currently pursuing a Bachelor's degree in Computer Science Engineering (CSE – Internet of Things, Cybersecurity, and Blockchain Technology).",
        mainDescription: "I have a strong passion for Cybersecurity and Python development. My journey began with building simple Python scripts and gradually evolved into analyzing complex systems to understand how vulnerabilities occur. I believe that to build secure systems, you must first think like an attacker.",
        blockchainDescription: "Along with cybersecurity, I have knowledge of Blockchain technology, where I explore concepts such as decentralized systems, cryptographic security, and distributed ledgers. I am also skilled in frontend development using HTML and CSS, allowing me to design and build clean, responsive user interfaces for web applications.",
        currentFocus: "Currently, my primary focus lies at the intersection of Artificial Intelligence and Cybersecurity. I am actively researching how Large Language Models (LLMs) can be exploited and building AI-driven tools that help detect vulnerabilities, analyze threats, and strengthen system security.",
        currentObjective: "Seeking opportunities to contribute to cutting-edge security products and protect critical infrastructure."
    });

    useEffect(() => {
        const savedData = localStorage.getItem('aboutData');
        if (savedData) {
            setAboutContent(JSON.parse(savedData));
        }

        // Listen for about data updates
        const handleAboutUpdate = () => {
            const updatedData = localStorage.getItem('aboutData');
            if (updatedData) {
                setAboutContent(JSON.parse(updatedData));
            }
        };

        window.addEventListener('aboutDataUpdated', handleAboutUpdate);

        return () => {
            window.removeEventListener('aboutDataUpdated', handleAboutUpdate);
        };
    }, []);
    const focusAreas = [
        {
            title: 'Cybersecurity',
            icon: <ShieldCheck className="w-6 h-6 text-[var(--color-neon-green)]" />,
            description: 'Penetration testing, vulnerability assessment, and securing infrastructure against modern threats.'
        },
        {
            title: 'AI Security',
            icon: <Target className="w-6 h-6 text-purple-400" />,
            description: 'Researching adversarial attacks, securing LLMs, and building AI tools for defense.'
        },
        {
            title: 'Python Development',
            icon: <Server className="w-6 h-6 text-[var(--color-neon-blue)]" />,
            description: 'Building robust backend systems, automations, and custom security tooling.'
        },
        {
            title: 'Web Security',
            icon: <Lock className="w-6 h-6 text-yellow-400" />,
            description: 'Implementing secure architectures, OWASP top 10 mitigation, and DevSecOps practices.'
        }
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4">
                    <span className="text-white">About Me</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6 text-gray-300 font-sans text-lg">
                        <p className="leading-relaxed">
                            {aboutContent.introduction}
                        </p>
                        <p className="leading-relaxed">
                            {aboutContent.mainDescription}
                        </p>
                        <p className="leading-relaxed">
                            {aboutContent.blockchainDescription}
                        </p>
                        <p className="leading-relaxed">
                            {aboutContent.currentFocus}
                        </p>

                        <div className="mt-8 p-4 glass-card border-[var(--color-neon-green)]/20">
                            <p className="font-mono text-[var(--color-neon-green)] text-sm mb-2">&gt; Current Objective:</p>
                            <p className="text-gray-300">{aboutContent.currentObjective}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {focusAreas.map((area, index) => (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-5 group hover:-translate-y-1 transition-transform"
                            >
                                <div className="mb-4 p-2 rounded-lg bg-[var(--color-cyber-dark)] inline-block group-hover:bg-[var(--color-cyber-black)] transition-colors">
                                    {area.icon}
                                </div>
                                <h3 className="text-white font-mono font-bold mb-2">{area.title}</h3>
                                <p className="text-sm text-gray-400">{area.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
