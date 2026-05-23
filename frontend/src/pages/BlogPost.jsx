import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Tag, User } from 'lucide-react';
import TypewriterMarkdown from '../components/TypewriterMarkdown';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`);
            if (!res.ok) throw new Error('Blog not found');
            const data = await res.json();
            setBlog(data);
        } catch (err) {
            setError(err.message);
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

    if (error || !blog) {
        return (
            <div className="bg-cyber-grid min-h-screen text-gray-300 font-sans flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold font-mono text-white mb-4">404 - Not Found</h1>
                <p className="text-gray-400 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
            </div>
        );
    }

    return (
        <div className="bg-cyber-grid min-h-screen text-gray-300 font-sans selection:bg-[var(--color-neon-green)] selection:text-[var(--color-cyber-black)] relative z-0">
            
            <main className="relative z-10 pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <article className="glass-card p-8 md:p-12">
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-bold font-mono text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400 mb-6 border-b border-gray-800 pb-6">
                            <div className="flex items-center gap-2 text-[var(--color-neon-green)] font-bold">
                                <User className="w-4 h-4" />
                                Nithish S Gowda
                            </div>
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
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
