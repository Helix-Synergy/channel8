import React from 'react';
import { Play, SkipForward, Volume2 } from 'lucide-react';

const StickyPlayer = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-navy-900/90 backdrop-blur-lg border-t border-white/10 z-50 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Info */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden hidden sm:block">
                        <div className="w-full h-full bg-teal-600 flex items-center justify-center font-bold text-xs">C8</div>
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-bold">Today's Top Headlines</h4>
                        <p className="text-xs text-gray-400">Channel 8 Daily News</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <SkipForward className="transform rotate-180" size={20} />
                    </button>
                    <button className="w-10 h-10 bg-white text-navy-900 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                        <Play size={20} fill="currentColor" className="ml-1" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <SkipForward size={20} />
                    </button>
                </div>

                {/* Volume / Extra */}
                <div className="hidden md:flex items-center gap-2 w-32">
                    <Volume2 size={16} className="text-gray-400" />
                    <div className="h-1 bg-gray-700 rounded-full flex-1">
                        <div className="h-full w-2/3 bg-teal-500 rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StickyPlayer;
