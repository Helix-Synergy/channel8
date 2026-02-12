import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { Heart, DollarSign, BookOpen, Car, Utensils, Plane, Monitor, Lightbulb } from 'lucide-react';

const verticals = [
    { id: 1, title: 'Health', icon: <Heart size={32} />, img: '/logos/health.png', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
    { id: 2, title: 'Finance', icon: <DollarSign size={32} />, img: '/logos/finance.png', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
    { id: 3, title: 'Education', icon: <BookOpen size={32} />, img: '/logos/education.png', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { id: 4, title: 'Automobiles', icon: <Car size={32} />, img: '/logos/automobiles.png', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
    { id: 5, title: 'Food', icon: <Utensils size={32} />, img: '/logos/food.png', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
    { id: 6, title: 'Travel', icon: <Plane size={32} />, img: '/logos/Travel3.png', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' },
    { id: 7, title: 'Technology', icon: <Monitor size={32} />, img: '/logos/technology.png', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
    { id: 8, title: 'Innovation', icon: <Lightbulb size={32} />, img: '/logos/innovation.jpg', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
];

// Planet Component using 2D Elliptical Projection (Pseudo-3D)
const Planet = ({ item, index, total, rotate }) => {
    const initialAngle = (index * 360) / total;
    // Map time-based rotation to an angle (degrees)
    const currentAngle = useTransform(rotate, r => (r + initialAngle) % 360);

    // Radii for the Ellipse
    // Mobile vs Desktop: We'll use responsiveness in the transform logic or explicit values?
    // Motion values react to state, but CSS media queries are cleaner.
    // However, math-based projection requires JS values. We'll set a standard desktop size and scale strictly for mobile via CSS or logic.
    // Let's use a base radius and multiplier.

    // 2D Projection Logic:
    // x = Rx * cos(theta)
    // y = Ry * sin(theta)  <-- This 'y' is the visual vertical offset on screen (Depth)

    const x = useTransform(currentAngle, a => {
        const rad = (a * Math.PI) / 180;
        // Rx: Horizontal Radius (Wide) -> Increased to 450px for wider orbit
        return Math.cos(rad) * 450;
    });

    const y = useTransform(currentAngle, a => {
        const rad = (a * Math.PI) / 180;
        // Ry: Vertical Radius (Squashed to look like a disk) -> Increased to 100px for better 3D perception
        return Math.sin(rad) * 100;
    });

    // Scale & Z-Index based on 'y' position (Depth)
    // When Sin(a) is 1 (Bottom/Front) -> Max Scale
    // When Sin(a) is -1 (Top/Back) -> Min Scale
    const scale = useTransform(currentAngle, a => {
        const rad = (a * Math.PI) / 180;
        const sine = Math.sin(rad);
        return 0.8 + (0.4 * sine); // Range: 0.4 (Back) to 1.2 (Front)
    });

    const zIndex = useTransform(currentAngle, a => {
        const rad = (a * Math.PI) / 180;
        const sine = Math.sin(rad);
        return Math.round(100 + (100 * sine)); // Z-Index 0 to 200
    });

    const opacity = useTransform(currentAngle, a => {
        const rad = (a * Math.PI) / 180;
        const sine = Math.sin(rad);
        // Dim the back items slightly
        return 0.5 + (0.5 * (sine + 1) / 2); // 0.5 to 1.0
    });

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 flex items-center justify-center"
            style={{
                x,
                y,
                zIndex,
                scale,
                opacity
            }}
        >
            {/* Main Card Content - No Rotation applied to this, so it stays flat/readable */}
            <div className="group cursor-pointer relative -translate-x-1/2 -translate-y-1/2">
                {/* Soft Rounded (Squircle) Logo Layout */}
                <div className={`
                    w-28 h-28 md:w-32 md:h-32 flex items-center justify-center
                    rounded-full ${item.bg} backdrop-blur-md border border-white/20 
                    shadow-2xl hover:scale-110 hover:bg-navy-800 transition-all duration-300 p-2
                 `}>
                    {/* Icon or Image Logo */}
                    <div className={`
                        w-full h-full flex items-center justify-center 
                        ${item.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
                     `}>
                        {item.img ? (
                            <img src={item.img} alt={item.title} className="w-full h-full object-contain rounded-full" />
                        ) : (
                            item.icon
                        )}
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Optional: Tooltip on Hover since text is gone */}
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                        {item.title}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const HeroSection = () => {
    // Use Ref for animation loop to avoid closure staleness without re-binding
    const isHoveredRef = useRef(false);

    // Manual Rotation Value
    const rotate = useMotionValue(0);

    // Animation Loop
    useAnimationFrame((time, delta) => {
        if (!isHoveredRef.current) {
            // 360 degrees in 60000ms (60s) => Speed = 360/60000 deg/ms
            const speed = 360 / 60000;
            rotate.set(rotate.get() + speed * delta);
        }
    });

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-navy-900 pt-16">

            {/* Background Ambience */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-center">

                {/* Central Sun */}
                <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white/5 backdrop-blur-sm border border-teal-500/30 shadow-[0_0_60px_rgba(0,128,128,0.2)] flex items-center justify-center relative z-20 overflow-hidden"
                        animate={{
                            boxShadow: ["0 0 60px rgba(0,128,128,0.2)", "0 0 100px rgba(0,255,255,0.4)", "0 0 60px rgba(0,128,128,0.2)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="/channel8_logo_center.png"
                            alt="Channel 8 Logo"
                            className="w-full h-full object-cover"
                        />

                        {/* Inner Glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 blur-xl z-10" />
                    </motion.div>
                </div>


                {/* Orbit Container */}
                {/* We just need a centering div now, no 3D transform */}
                <div
                    className="relative flex items-center justify-center w-full h-[600px]"
                    onMouseEnter={() => { isHoveredRef.current = true; }}
                    onMouseLeave={() => { isHoveredRef.current = false; }}
                >
                    {/* Visual Orbit Rings - Resized for Rx=450, Ry=100 -> W=900, H=200 */}
                    {/* Visual Orbit Rings - Removed */}

                    {/* Planets Layer */}
                    <div className="relative w-full h-full pointer-events-none">
                        {verticals.map((item, index) => (
                            // We can add a mobile scale factor here if needed, but for now rely on scaling logic
                            <Planet
                                key={item.id}
                                item={item}
                                index={index}
                                total={verticals.length}
                                rotate={rotate}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 text-center pointer-events-none">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">Impactful Digital Storytelling</h2>
                    <p className="text-gray-400 font-light drop-shadow-md">Explore our universe of content</p>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
