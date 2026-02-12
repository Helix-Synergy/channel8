import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { channels as platforms } from '../data/channels.jsx';

const PlatformCard = ({ item, index }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link to={`/channel/${item.id}`}>
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateY,
                        rotateX,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative h-64 w-full rounded-xl shadow-xl cursor-pointer group perspective-1000"
                >
                    <div
                        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                        className="absolute inset-0 rounded-[32px] overflow-hidden shadow-lg bg-navy-950"
                    >
                        {/* Full Image (Fit) */}
                        <img
                            src={item.tileImg}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-0 rounded-[32px]"
                        />

                        {/* Gradient Overlay for Text Visibility */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/90 to-transparent pointer-events-none" />

                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 z-10 p-4 text-center pointer-events-none">
                            <button className="px-8 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 text-sm font-bold rounded-full shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 pointer-events-auto uppercase tracking-wider">
                                Explore
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

const Platforms = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-navy-900 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 relative"
                >
                    <span className="absolute -top-20 left-1/2 -translate-x-1/2 text-[120px] font-bold text-white/5 pointer-events-none select-none">
                        CHANNELS
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative z-10">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Digital Channels</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto relative z-10">
                        Explore our specialized channels, each dedicated to delivering high-quality content for every interest.
                    </p>
                </motion.div>

                {/* Platforms Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 cursor-pointer">
                    {platforms.map((item, index) => (
                        <PlatformCard key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Content Formats */}
                <div className="bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 rounded-[40px] p-10 md:p-16 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-5 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-colors duration-700" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Diverse Content Formats</h2>
                            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                Each vertical operates through dedicated YouTube channels, delivering focused and high-quality content for niche and mass audiences alike. From short-form clips to full-length documentaries, we define digital storytelling.
                            </p>
                            <a
                                href="https://www.youtube.com/@Channel8network"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-full hover:from-teal-400 hover:to-cyan-500 transition-all shadow-[0_0_30px_rgba(20,184,166,0.3)] transform hover:scale-105"
                            >
                                Start Watching
                            </a>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            {/* Placeholder for a collage or illustrative graphic */}
                            <div className="grid grid-cols-2 gap-4 opacity-80 rotate-6 hover:rotate-0 transition-transform duration-700">
                                <div className="w-40 h-56 bg-white/10 rounded-2xl animate-pulse" />
                                <div className="w-40 h-56 bg-white/10 rounded-2xl mt-12 animate-pulse" style={{ animationDelay: '1s' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platforms;
