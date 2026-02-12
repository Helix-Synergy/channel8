import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Users, Eye, Video } from 'lucide-react';
import { channels } from '../data/channels.jsx';

const ChannelDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const channel = channels.find(c => c.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!channel) {
        return (
            <div className="min-h-screen bg-navy-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Channel Not Found</h2>
                    <button onClick={() => navigate('/')} className="text-teal-400 hover:underline">
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy-900 pb-20 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-gradient-to-br ${channel.color} opacity-20 pointer-events-none`} />

            <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-navy-900 transition-all">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-medium">Back</span>
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-20 text-center md:text-left w-full md:w-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-64 h-64 flex-shrink-0 flex items-center justify-center"
                    >
                        {/* Always use img if available, falls back to icon only if img is missing (logic handled in data usually, but here we assume img exists for these) */}
                        <img src={channel.tileImg} alt={channel.title} className="w-full h-full object-contain" />
                    </motion.div>

                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-4"
                        >
                            {channel.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-2xl"
                        >
                            {channel.desc}
                        </motion.p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-20">
                    {[
                        { label: 'Subscribers', value: channel.stats.subscribers, icon: <Users /> },
                        { label: 'Videos', value: channel.stats.videos, icon: <Video /> },
                        { label: 'Total Views', value: channel.stats.views, icon: <Eye /> },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                        >
                            <div className="flex justify-center text-teal-400 mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* About Section */}
                <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-white mb-6">About this Channel</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            {channel.longDesc}
                        </p>
                        <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-900/40">
                            <Play size={20} fill="currentColor" /> Subscribe on YouTube
                        </button>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-64 rounded-2xl bg-gray-600/20 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Content preview" />
                            </div>
                            <div className="h-64 rounded-2xl bg-gray-600/20 overflow-hidden translate-y-8">
                                <img src="https://images.unsplash.com/photo-1626544827763-d516dce335ca?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Content preview 2" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChannelDetail;
