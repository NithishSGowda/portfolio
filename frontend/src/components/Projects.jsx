import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Activity, X } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: 'Cerbrus Scanner',
            description: 'AI-powered website vulnerability scanner that analyzes websites and automatically generates comprehensive security reports with actionable mitigation steps.',
            tech: ['Python', 'React', 'Google Studio API'],
            github: 'https://github.com/NithishSGowda/cerberus-scanner',
            demo: 'details',
            featured: true,
            image: '/image.png',
            fullDescription: `Cerberus Scanner is a cybersecurity tool designed to analyze websites and identify potential security vulnerabilities. The project focuses on automating the process of scanning web applications for common security issues and providing clear insights into detected threats.

The tool helps developers and security researchers quickly identify weaknesses in a website's configuration, server behavior, and response patterns.`,
            features: [
                'Website Security Scanning - Scans target website URL and analyzes responses',
                'Vulnerability Detection - Checks for XSS, missing headers, misconfigurations',
                'Automated Analysis - Processes HTTP responses automatically',
                'Security Reporting - Produces structured vulnerability reports',
                'Developer Friendly - Helps understand and fix security issues'
            ],
            technologies: ['Python', 'Requests Library', 'BeautifulSoup', 'HTML/CSS', 'Git & GitHub'],
            workflow: [
                'Target Input - User provides website URL',
                'Website Request - Sends HTTP requests and collects data',
                'Security Checks - Analyzes headers, structure, configurations',
                'Vulnerability Detection - Identifies security issues',
                'Result Generation - Categorizes and presents findings'
            ]
        },
        {
            title: 'AI Security Copilot',
            description: 'Intelligent AI system designed to explain detected code vulnerabilities, recommend precise fixes, and educate developers on secure coding practices in real-time.',
            tech: ['Python', 'Streamlit', 'Ollama Local Model', 'Cybersecurity'],
            github: 'https://github.com/NithishSGowda/ai-security-copilot',
            demo: 'details',
            featured: true,
            image: '/ai-security-copilot.png',
            fullDescription: `AI Security Copilot is an intelligent cybersecurity platform that combines Artificial Intelligence with automated security analysis to help identify vulnerabilities, analyze threats, and provide security recommendations for web applications and systems.

The project focuses on leveraging Large Language Models (LLMs) and automated scanning techniques to assist security researchers and developers in understanding security risks more effectively. By integrating AI with security analysis, the system can interpret scan results, explain vulnerabilities, and suggest mitigation strategies.`,
            features: [
                'AI-Based Security Analysis - Uses AI models to analyze and explain vulnerabilities',
                'Website Vulnerability Scanning - Automated security checks on target URLs',
                'Threat Explanation Engine - Explains how attackers might exploit vulnerabilities',
                'Security Recommendations - Suggests improvements and mitigation strategies',
                'Interactive Security Dashboard - Web-based interface for monitoring scans',
                'Automated Security Reporting - Generates structured security reports'
            ],
            technologies: ['Python', 'LLMs', 'Flask', 'HTML/CSS/JavaScript', 'Requests', 'BeautifulSoup'],
            workflow: [
                'Target Input - User enters website URL into dashboard',
                'Automated Scanning - System analyzes website responses',
                'Vulnerability Detection - Checks for XSS, headers, misconfigurations',
                'AI Analysis - AI explains vulnerabilities and exploitation methods',
                'Security Recommendations - Generates mitigation steps and best practices'
            ]
        },
        {
            title: 'ESP32 Captive Portal Game',
            description: 'IoT project that creates a WiFi access point with a captive portal hosting a browser-based Tic Tac Toe game, demonstrating embedded web servers and automatic network redirection.',
            tech: ['C++', 'ESP32', 'HTML/CSS/JS', 'IoT'],
            github: '#',
            demo: 'details',
            featured: false,
            image: '/esp32-game.png',
            fullDescription: `ESP32 Captive Portal Game is an innovative IoT project that demonstrates how a microcontroller can host a web application through a captive portal. The ESP32 device creates its own WiFi access point and automatically redirects connected users to a web page hosted directly on the device.

Instead of a traditional login page, the captive portal displays a browser-based Tic Tac Toe game that users can play instantly after connecting to the network. This project showcases the capabilities of ESP32 in building lightweight web servers and demonstrates real-world concepts used in public WiFi captive portals.`,
            features: [
                'WiFi Access Point Creation - ESP32 broadcasts its own wireless network without external router',
                'Captive Portal Redirection - Automatically redirects connected users to hosted web page',
                'Browser-Based Game - Tic Tac Toe game built with HTML/CSS/JS runs in user browser',
                'Embedded Web Server - Lightweight web server runs on ESP32 and handles user requests',
                'Fully Standalone System - Operates directly on ESP32 without external servers or internet'
            ],
            technologies: ['C++', 'ESP32', 'HTML', 'CSS', 'JavaScript', 'IoT Networking'],
            workflow: [
                'WiFi Setup - ESP32 creates WiFi access point',
                'User Connection - User connects to the WiFi network',
                'Portal Intercept - Captive portal intercepts and redirects the request',
                'Game Serving - ESP32 web server serves Tic Tac Toe game files',
                'Gameplay - User plays game directly in browser'
            ]
        },
        {
            title: 'SecureScan Pro',
            description: 'Advanced web vulnerability scanner that automatically scans websites to identify security weaknesses, misconfigurations, and potential threats through automated security checks and structured vulnerability reports.',
            tech: ['Python', 'Requests', 'BeautifulSoup', 'HTML/CSS/JS'],
            github: 'https://github.com/NithishSGowda/securescan-pro.git',
            demo: 'details',
            featured: false,
            image: '/securescan-pro.png',
            fullDescription: `SecureScan Pro is a cybersecurity tool developed to automatically scan websites and identify potential security vulnerabilities. The project focuses on helping developers and security enthusiasts analyze web applications for common security weaknesses and misconfigurations.

The scanner evaluates various aspects of a website including HTTP responses, security headers, and server configurations. By performing automated checks, SecureScan Pro can highlight vulnerabilities that attackers may exploit, allowing developers to fix issues before they become serious security risks.`,
            features: [
                'Automated Website Scanning - Scans given website URL and performs multiple security checks',
                'Vulnerability Detection - Detects missing HTTP headers, XSS, server misconfigurations, outdated software',
                'Security Severity Classification - Categorizes vulnerabilities as High, Medium, or Low Risk',
                'Security Report Generation - Produces structured reports with vulnerability details and severity',
                'Security Visualization - Dashboard showing total vulnerabilities and severity distribution',
                'User-Friendly Interface - Simple interface for entering target URL and viewing results'
            ],
            technologies: ['Python', 'Requests', 'BeautifulSoup', 'HTML/CSS/JavaScript', 'Git & GitHub'],
            workflow: [
                'Target Website Input - User provides the URL of the website to be scanned',
                'HTTP Request Collection - Scanner sends HTTP requests and collects response data',
                'Security Analysis - Analyzes HTTP headers, server info, HTML structure, security configs',
                'Vulnerability Detection - Detects potential vulnerabilities based on security rules',
                'Result Generation - Displays results showing vulnerability type, severity, and description'
            ]
        }
    ];

    const handleDemoClick = (e, project) => {
        e.preventDefault();
        if (project.demo === 'details') {
            setSelectedProject(project);
        } else if (project.demo !== '#') {
            window.open(project.demo, '_blank');
        }
    };

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4">
                    <span className="text-white">Projects</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative glass-card overflow-hidden flex flex-col h-full"
                        >
                            {project.featured && (
                                <div className="absolute top-0 right-0 bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] text-xs font-mono px-3 py-1 rounded-bl-lg border-b border-l border-[var(--color-neon-green)]/20 flex items-center gap-1 z-10">
                                    <Activity className="w-3 h-3" /> Featured
                                </div>
                            )}

                            <div className="h-48 bg-[var(--color-cyber-dark)] border-b border-[var(--color-neon-green)]/10 relative overflow-hidden group-hover:block transition-all isolate">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs z-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                            [ Image Placeholder ]
                                        </div>
                                        <div className="absolute inset-0 p-4 font-mono text-xs text-[var(--color-neon-green)]/40 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity whitespace-pre">
                                            {`root@security:~# ./analyze \n[*] AI Model Loading...\n[+] Vulnerabilities Detected\n[!] Generating Report...\n[ok] Analysis Complete.`}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8 flex-grow flex flex-col relative z-20">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-neon-blue)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={project.demo} onClick={(e) => handleDemoClick(e, project)} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors cursor-pointer">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-3 mt-auto">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs font-mono text-[var(--color-neon-green)] bg-[var(--color-cyber-dark)] px-2 py-1 rounded border border-[var(--color-neon-green)]/20">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <a
                        href="https://github.com/NithishSGowda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded border border-gray-500 text-gray-300 font-mono hover:border-[var(--color-neon-green)] hover:text-[var(--color-neon-green)] transition-all flex items-center gap-2"
                    >
                        View More on GitHub <Github className="w-4 h-4" />
                    </a>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--color-cyber-dark)] hover:bg-[var(--color-cyber-gray)] transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            <h2 className="text-4xl font-bold text-white font-mono mb-4">{selectedProject.title}</h2>
                            <p className="text-[var(--color-neon-green)] font-mono text-sm mb-8">
                                {selectedProject.title === 'Cerbrus Scanner' ? 'Automated Website Vulnerability Scanner' : 'AI-Powered Cybersecurity Analysis Platform'}
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white font-mono mb-4">Project Overview</h3>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedProject.fullDescription}</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white font-mono mb-4">Key Features</h3>
                                    <ul className="space-y-3">
                                        {selectedProject.features?.map((feature, i) => (
                                            <li key={i} className="text-gray-300 flex items-start gap-2">
                                                <span className="text-[var(--color-neon-green)] mt-1">▹</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white font-mono mb-4">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProject.technologies?.map((tech, i) => (
                                            <span key={i} className="text-sm font-mono text-[var(--color-neon-blue)] bg-[var(--color-cyber-dark)] px-3 py-2 rounded border border-[var(--color-neon-blue)]/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white font-mono mb-4">How It Works</h3>
                                    <div className="space-y-3">
                                        {selectedProject.workflow?.map((step, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-cyber-dark)]/50">
                                                <span className="text-[var(--color-neon-green)] font-mono font-bold">Step {i + 1}</span>
                                                <span className="text-gray-300">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
