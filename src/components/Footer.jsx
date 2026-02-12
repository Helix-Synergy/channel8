import React from 'react';
import { Instagram, Youtube, Facebook, Mail, MapPin, Phone, Linkedin } from 'lucide-react';

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
                            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500 hover:text-navy-900 transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {['About Us', 'Platforms', 'Advertise', 'Privacy Policy', 'Terms & Conditions'].map(item => (
                            <li key={item}><a href="#" className="hover:text-teal-400 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3"><Mail size={16} /> info@channel8network.com</li>
                        <li className="flex items-center gap-3"><Phone size={16} /> +91-7075782798</li>
                        <li className="flex items-center gap-3"><MapPin size={16} /> Global Digital Operations</li>
                    </ul>
                </div>
            </div>

            <div className="mt-16 text-center text-xs border-t border-white/5 pt-8">
                © 2026 Channel 8 Network. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
