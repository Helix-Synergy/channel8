import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music } from 'lucide-react';

const PodcastHub = () => {
    const [episodes, setEpisodes] = useState([]);
    const [activeEpisode, setActiveEpisode] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await fetch(`${API_URL}/podcasts`);
                const data = await response.json();

                // Map backend data to frontend structure
                const mappedEpisodes = data.map(pod => ({
                    id: pod._id,
                    title: pod.title,
                    duration: pod.duration,
                    date: pod.date,
                    image: pod.thumbnailUrl ? `${API_URL.replace('/api', '')}/${pod.thumbnailUrl.replace(/\\/g, '/')}` : '/images/podcast_placeholder.jpg',
                    audioUrl: pod.audioUrl,
                    description: pod.description
                }));

                setEpisodes(mappedEpisodes);
                if (mappedEpisodes.length > 0) {
                    setActiveEpisode(mappedEpisodes[0]);
                }
            } catch (error) {
                console.error("Failed to fetch podcasts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcasts();
    }, []);

    if (loading) return <div className="py-20 text-center text-white">Loading episodes...</div>;
    // Removed empty check to render section even if empty, or keep? Better to hide if empty?
    if (episodes.length === 0) return null;

    return (
        <section className="py-20 bg-navy-800 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Left Side: Dynamic Thumbnail & Visualizer */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold mb-6"
                        >
                            Latest <span className="text-cyan-DEFAULT">Episodes</span>
                        </motion.h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            {activeEpisode?.description || "Detailed conversations on politics, economy, technology, society, and culture."}
                        </p>

                        {/* Interactive Thumbnail Container */}
                        <a
                            href={activeEpisode?.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative w-full aspect-video md:aspect-[16/10] bg-navy-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-8 group cursor-pointer"
                        >
                            {activeEpisode && (
                                <AnimatePresence mode='wait'>
                                    <motion.img
                                        key={activeEpisode.id}
                                        src={activeEpisode.image}
                                        alt={activeEpisode.title}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                            )}

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent" />

                            {/* Visualizer overlaid on thumbnail */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                <div className="flex items-end gap-1 h-12">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 bg-teal-400/80 rounded-full"
                                            animate={{
                                                height: [10, Math.random() * 30 + 10, 10],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                repeatType: "mirror",
                                                delay: i * 0.1,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-white/80">
                                    <Play size={24} className="fill-current text-teal-400 animate-pulse" />
                                    <span className="text-sm font-bold tracking-widest">NOW PLAYING</span>
                                </div>
                            </div>
                        </a>

                        <div className="flex gap-4">
                            {activeEpisode?.audioUrl && (
                                <a href={activeEpisode.audioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#1ed760] transition-colors shadow-lg shadow-green-900/20">
                                    <Music size={20} /> Listen / Watch
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Episode List */}
                    <div className="w-full md:w-1/2">
                        <div className="space-y-4">
                            {episodes.map((ep, index) => (
                                <motion.div
                                    key={ep.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => window.open(ep.audioUrl, '_blank')}
                                    onMouseEnter={() => setActiveEpisode(ep)}
                                    className={`
                                        p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer
                                        bg-white/5 border-white/10 hover:bg-white/10 hover:border-teal-500/30
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110
                                            bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white
                                        `}>
                                            <Play size={20} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-white transition-colors group-hover:text-teal-400">
                                                {ep.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 line-clamp-1">{ep.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-white font-mono text-sm">{ep.duration}</span>
                                        <span className="text-xs text-gray-500">{ep.date}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PodcastHub;
