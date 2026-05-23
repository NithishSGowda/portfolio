import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypewriterMarkdown = ({ content, speed = 10 }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const observerRef = useRef(null);
    const containerRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        
        let i = 0;
        setDisplayedContent('');
        setIsTyping(true);
        
        const interval = setInterval(() => {
            setDisplayedContent(content.substring(0, i));
            i += 3; // Render 3 characters at a time for better speed on long articles
            if (i > content.length) {
                setDisplayedContent(content);
                setIsTyping(false);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [content, speed, hasStarted]);

    // Same components configuration from your BlogPost.jsx
    const markdownComponents = {
        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4 font-mono" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-gray-800 pb-2 font-mono" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3 font-mono" {...props} />,
        p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-300" {...props} />,
        a: ({node, ...props}) => <a className="text-[var(--color-neon-blue)] hover:text-[var(--color-neon-green)] hover:underline" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-300" {...props} />,
        li: ({node, ...props}) => <li className="" {...props} />,
        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--color-neon-green)] pl-4 py-1 italic bg-gray-900/50 my-4 text-gray-400" {...props} />,
        code: ({node, inline, ...props}) => 
            inline ? 
            <code className="bg-gray-800 text-[var(--color-neon-green)] px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
            <div className="bg-[#0B0F19] rounded-lg border border-[var(--color-neon-green)]/20 overflow-hidden my-6">
                <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-[var(--color-neon-green)]/20">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                    <code {...props} />
                </pre>
            </div>
    };

    return (
        <div ref={containerRef} className="relative">
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
            >
                {displayedContent}
            </ReactMarkdown>
            {isTyping && (
                <span className="inline-block w-2 h-5 ml-1 bg-[var(--color-neon-green)] animate-pulse align-middle"></span>
            )}
        </div>
    );
};

export default TypewriterMarkdown;
