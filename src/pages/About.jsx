import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, TrendingUp } from 'lucide-react';

const stats = [
    { id: 1, label: 'Monthly Views', value: '1M+', icon: <TrendingUp /> },
    { id: 2, label: 'Community Members', value: '50K+', icon: <Users /> },
    { id: 3, label: 'Content Verticals', value: '8', icon: <Globe /> },
    { id: 4, label: 'Awards Won', value: '12', icon: <Award /> },
];

const About = () => {
    return (
        <div className="min-h-screen bg-navy-900 pb-20 overflow-x-hidden">

            {/* Hero Section with Parallax-like Image */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/about_hero.jpg"
                        alt="Team collaboration"
                        className="w-full h-full object-cover opacity-30 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/50 to-navy-900" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold tracking-widest uppercase mb-6"
                    >
                        Who We Are
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Digital Media</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a collective of storytellers, innovators, and creators dedicated to crafting content that matters.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-navy-800/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl text-center shadow-xl hover:bg-navy-700/80 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-teal-400 mx-auto mb-4 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Our Story Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-teal-500/20 rounded-[40px] rotate-3 blur-2xl transform translate-y-4" />
                        <img
                            src="/images/about_story.jpg"
                            alt="Office Meeting"
                            className="relative rounded-[30px] shadow-2xl border border-white/10 z-10"
                        />

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 z-20 bg-navy-800 p-6 rounded-2xl border border-white/10 shadow-xl max-w-[200px]">
                            <div className="text-4xl font-bold text-teal-400 mb-1">8+</div>
                            <div className="text-sm text-white font-medium">Years of Excellence in Digital Storytelling</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">Built on <span className="text-teal-400">Passion</span> & Purpose</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Channel 8 Network started as a small idea: to bridge the gap between complex information and engaging storytelling. Today, we stand as a trusted voice in the digital landscape.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            From in-depth financial analysis to exploring the latest in automobiles and simplified health advice, our 8 core verticals ensure there's something valuable for everyone.
                        </p>

                        <a
                            href="https://www.youtube.com/@Channel8network"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                        >
                            Join Our Journey
                        </a>
                    </motion.div>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative p-10 rounded-[40px] bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">Our Mission</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                To democratize information by creating high-quality, accessible, and visually compelling content that empowers individuals to make informed decisions in their daily lives.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative p-10 rounded-[40px] bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Globe size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Our Vision</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                To be the world’s most trusted and innovative digital media network, fostering a global community connected through knowledge, curiosity, and shared stories.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
