import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Our Channels', path: '/platforms' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                {/* Logo */}
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3 group text-white">
                    <img src="/images/navbar_brand_logo.png" alt="Channel 8 Logo" className="w-16 h-16 rounded-lg object-cover group-hover:scale-110 transition-transform" />
                    <div className="flex items-baseline gap-1.5 text-2xl font-bold">
                        Channel <span className="text-4xl text-teal-400">8</span> Network
                    </div>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-underline"
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                    <a
                        href="https://www.youtube.com/@Channel8network"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-teal-500 text-navy-900 text-sm font-bold rounded-full hover:bg-black hover:text-teal-400 transition-all border border-teal-500 hover:border-teal-400"
                    >
                        Subscribe
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-lg font-medium ${isActive ? 'text-cyan-400' : 'text-gray-300'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
