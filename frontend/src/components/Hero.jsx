import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, BrainCircuit, ArrowRight, Download, Terminal } from 'lucide-react';

const useTypewriter = (words, typingSpeed = 70, deletingSpeed = 50, delaySpeed = 1500) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            if (currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                timer = setTimeout(() => { }, typingSpeed);
            } else {
                timer = setTimeout(() => {
                    setCurrentText(currentText.substring(0, currentText.length - 1));
                }, deletingSpeed);
            }
        } else {
            if (currentText === currentWord) {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, delaySpeed);
            } else {
                timer = setTimeout(() => {
                    setCurrentText(currentWord.substring(0, currentText.length + 1));
                }, typingSpeed);
            }
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delaySpeed]);

    return currentText;
};

const Hero = () => {
    const [heroData, setHeroData] = useState({
        name: 'Nithish S Gowda',
        profileImage: null,
        typewriterTexts: [
            'AI Security Researcher',
            'Cybersecurity Engineer',
            'Python Developer',
            'BlockChain Technology',
            'Ethical Hacker'
        ],
        statusText: 'System Online // Access Granted',
        description: 'Specializing in securing web applications, researching AI vulnerabilities, and building robust backend systems. Turning coffee into secure, scalable code.',
        primaryButtonText: 'Deployments',
        primaryButtonLink: '#projects',
        secondaryButtonText: 'Initialize Contact',
        secondaryButtonLink: '#contact'
    });

    useEffect(() => {
        const savedData = localStorage.getItem('heroData');
        if (savedData) {
            setHeroData(JSON.parse(savedData));
        }

        // Listen for hero data updates
        const handleHeroUpdate = () => {
            const updatedData = localStorage.getItem('heroData');
            if (updatedData) {
                setHeroData(JSON.parse(updatedData));
            }
        };

        window.addEventListener('heroDataUpdated', handleHeroUpdate);

        return () => {
            window.removeEventListener('heroDataUpdated', handleHeroUpdate);
        };
    }, []);

    const typewriterText = useTypewriter(heroData.typewriterTexts);

    return (
        <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-neon-blue)]/30 bg-[var(--color-neon-blue)]/5 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-neon-blue)] animate-pulse"></span>
                    <span className="text-[var(--color-neon-blue)] font-mono text-sm">{heroData.statusText}</span>
                </motion.div>

                {heroData.profileImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-[var(--color-neon-green)]/30 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
                            <img 
                                src={heroData.profileImage} 
                                alt={heroData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tight mb-6"
                >
                    Hi, I am <span className="text-gradient">{heroData.name}</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-mono mb-8 h-12"
                >
                    <span className="mr-2">&gt;</span>
                    <span className="text-white">
                        {typewriterText}
                        <span className="animate-pulse ml-1 text-[var(--color-neon-green)]">_</span>
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="max-w-2xl mx-auto mb-12 text-gray-400 font-sans text-lg"
                >
                    {heroData.description}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href={heroData.primaryButtonLink}
                        className="w-full sm:w-auto px-8 py-3 rounded-md font-mono font-semibold bg-[var(--color-neon-green)] text-[var(--color-cyber-black)] hover:bg-[var(--color-neon-green)]/90 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        {heroData.primaryButtonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href={heroData.secondaryButtonLink}
                        className="w-full sm:w-auto px-8 py-3 rounded-md font-mono font-semibold border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {heroData.secondaryButtonText}
                        <Terminal className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
            >
                <div className="glass-card p-6 flex flex-col items-center text-center">
                    <Shield className="w-10 h-10 text-[var(--color-neon-green)] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Cyber Defense</h3>
                    <p className="text-sm text-gray-400">Vulnerability scanning, pentesting, & secure architecture</p>
                </div>
                <div className="glass-card p-6 flex flex-col items-center text-center border-[var(--color-neon-blue)]/20 hover:border-[var(--color-neon-blue)]/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                    <Code className="w-10 h-10 text-[var(--color-neon-blue)] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Backend Systems</h3>
                    <p className="text-sm text-gray-400">Python, APIs, and scalable infrastructure</p>
                </div>
                <div className="glass-card p-6 flex flex-col items-center text-center border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <BrainCircuit className="w-10 h-10 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">AI Security</h3>
                    <p className="text-sm text-gray-400">Securing AI pipelines & building intelligent automation</p>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
