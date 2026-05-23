import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            // Filter to only show published blogs
            setBlogs(data.filter(b => b.published));
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null;
    }

    if (blogs.length === 0) {
        return null; // Don't show the section if there are no blogs
    }

    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 flex items-center gap-4">
                    <span className="text-white">Blog</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h2>

                <div className="space-y-16">
                    {blogs.map((blog, index) => (
                        <motion.article
                            key={blog._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-8 md:p-12 relative overflow-hidden"
                        >
                            <header className="mb-10">
                                <h3 className="text-3xl md:text-4xl font-bold font-mono text-white mb-6 leading-tight hover:text-[var(--color-neon-green)] transition-colors">
                                    {blog.title}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400 mb-6 border-b border-gray-800 pb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-[var(--color-neon-green)]" />
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    {blog.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[var(--color-neon-blue)]" />
                                            {blog.readTime}
                                        </div>
                                    )}
                                </div>

                                {blog.coverImage && (
                                    <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-[var(--color-neon-green)]/20 mb-8">
                                        <img 
                                            src={blog.coverImage} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </header>

                            <div className="prose prose-invert prose-green max-w-none font-sans">
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
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
                                    }}
                                >
                                    {blog.content}
                                </ReactMarkdown>
                            </div>

                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-wrap items-center gap-3">
                                    <Tag className="w-5 h-5 text-gray-500" />
                                    {blog.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono text-[var(--color-neon-green)] bg-[var(--color-cyber-dark)] px-3 py-1.5 rounded border border-[var(--color-neon-green)]/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default BlogSection;
