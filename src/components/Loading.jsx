import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900">
            <div className="relative flex items-center justify-center">
                {/* Spinning Circle */}
                <motion.div
                    style={{ borderTopColor: '#14b8a6' }} // teal-500
                    className="w-32 h-32 border-4 border-white/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-teal-400 font-bold tracking-widest text-sm animate-pulse">
                        LOADING...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
