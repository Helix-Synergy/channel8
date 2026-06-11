import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail, MapPin, Phone, Linkedin, Users } from 'lucide-react';
import { io } from 'socket.io-client';
import API_BASE_URL from '../config';

const SOCKET_URL = API_BASE_URL.replace('/api', '');

const XLogo = ({ size = 18, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231h0.001ZM17.086 19.77h1.018L7.006 4.195H5.914l11.172 15.575H17.086Z"></path>
    </svg>
);

const Footer = () => {
    const [visitorCount, setVisitorCount] = useState(1000);

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('visitorCount', (count) => {
            setVisitorCount(count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <footer className="bg-navy-950 pt-20 pb-32 border-t border-white/5 text-gray-400">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-bold text-white mb-4">Channel <span className="text-teal-500">8</span> Network</h2>
                    <p className="mb-6 max-w-md text-sm leading-relaxed">
                        A dynamic digital media and content broadcasting company delivering credible, engaging, and informative stories across multiple digital platforms.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { Icon: Youtube, href: "https://www.youtube.com/@Channel8network" },
                            { Icon: XLogo, href: "https://x.com/Channel8Network" },
                            { Icon: Instagram, href: "https://www.instagram.com/channel8_network/" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/channel-8-network-b43385395/" },
                            { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583259411504" }
                        ].map(({ Icon, href }, i) => (
                            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teal-500 text-navy-900 flex items-center justify-center hover:bg-white/5 hover:text-white transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { name: 'About Us', path: '/about' },
                            { name: 'Our Channels', path: '/platforms' },
                            { name: 'Advertise', path: '/contact' },
                            { name: 'Privacy Policy', path: '#' },
                            { name: 'Terms & Conditions', path: '#' }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link to={item.path} className="hover:text-teal-400 transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3"><Mail size={16} /> hello@channel8network.online</li>
                        <li className="flex items-center gap-3"><Phone size={16} /> 7075 782 798</li>
                        <li className="flex items-start gap-3"><MapPin size={16} className="mt-1 flex-shrink-0" /> <span>Mahaveer Radiance, Near Madhapur metro station, CBI Colony, Hyderabad, Telangana 500081</span></li>
                    </ul>
                </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8">
                <div className="text-xs text-center md:text-left mb-4 md:mb-0">
                    © 2026 Channel 8 Network. All rights reserved.
                </div>
                <div className="flex items-center gap-2 text-sm text-teal-400 font-medium bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/20">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                    </div>
                    <Users size={16} />
                    <span>Live Visitors: {visitorCount}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
