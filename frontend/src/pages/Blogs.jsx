import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterMarkdown from '../components/TypewriterMarkdown';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            setBlogs(data.filter(b => b.published));
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-cyber-grid min-h-screen text-gray-300 font-sans flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-neon-green)] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-mono text-[var(--color-neon-green)]">Loading Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cyber-grid min-h-screen text-gray-300 font-sans selection:bg-[var(--color-neon-green)] selection:text-[var(--color-cyber-black)] relative z-0">
            
            <main className="relative z-10 pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-12 flex items-center gap-4">
                    <span className="text-white">Blog Archive</span>
                    <div className="h-[1px] bg-gray-600 flex-grow ml-4"></div>
                </h1>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 font-mono">
                        No articles published yet.
                    </div>
                ) : (
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
                                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                                    </h3>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400 mb-6 border-b border-gray-800 pb-6">
                                        <div className="flex items-center gap-2 text-[var(--color-neon-green)] font-bold">
                                            <User className="w-4 h-4" />
                                            Nithish S Gowda
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
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
                                        <Link to={`/blog/${blog._id}`}>
                                            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-[var(--color-neon-green)]/20 mb-8 cursor-pointer">
                                                <img 
                                                    src={blog.coverImage} 
                                                    alt={blog.title} 
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </Link>
                                    )}
                                </header>

                                <div className="prose prose-invert prose-green max-w-none font-sans">
                                    <TypewriterMarkdown content={blog.content} />
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
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blogs;
