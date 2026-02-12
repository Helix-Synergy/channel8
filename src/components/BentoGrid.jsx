import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { channels as verticals } from '../data/channels.jsx';

const TiltCard = ({ item }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
    );
};

const BentoGrid = () => {
    return (
        <section className="py-20 px-6 bg-navy-900 overflow-hidden relative">
            {/* Background Noise */}
            <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-5 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    Our <span className="text-teal-400">Content Universe</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {verticals.map((item) => (
                        <div key={item.id} className="flex justify-center">
                            <Link to={`/channel/${item.id}`} className="w-full">
                                <TiltCard item={item} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
