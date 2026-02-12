import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import VideoSubmissionModal from '../components/VideoSubmissionModal';

import API_BASE_URL from '../config';

const Contact = () => {
    const location = useLocation();
    const [subject, setSubject] = useState('Select a topic...');
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location.state?.subject) {
            setSubject(location.state.subject);
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        if (subject === 'Select a topic...') {
            setStatus({ type: 'error', message: 'Please select a subject.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const apiBase = API_BASE_URL;
            const response = await fetch(`${apiBase}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, subject }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
                setSubject('Select a topic...');
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to server.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-navy-900 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Conversation</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Whether you have a story to tell, a partnership proposal, or just want to say hello, our team is ready to listen.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Visual & Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full lg:w-5/12 space-y-8"
                    >
                        {/* Feature Image Card */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 lg:h-96 group">
                            <img
                                src="/images/contact_placeholder.svg"
                                alt="Studio Microphone"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent flex flex-col justify-end p-8">
                                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase mb-3 backdrop-blur-sm self-start">
                                    Global HQ
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-1">Hyderabad, India</h3>
                                <p className="text-gray-300 text-sm">The heart of our digital operations.</p>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Email Us</p>
                                    <p className="text-white font-medium">info@channel8network.com</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Call Us</p>
                                    <p className="text-white font-medium">+91-7075782798</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full lg:w-7/12"
                    >
                        <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl relative overflow-hidden">
                            {/* Decorative Form blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />

                            {status.message && (
                                <div className={`mb-6 p-4 rounded-xl ${status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-navy-900 transition-all placeholder:text-gray-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-navy-900 transition-all placeholder:text-gray-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-bold text-gray-300 ml-1">Subject</label>
                                <div className="relative">
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-navy-900 transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Select a topic...</option>
                                        <option>Business Partnership</option>
                                        <option>Advertising Inquiry</option>
                                        <option>Content Contribution</option>
                                        <option>General Feedback</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                        <MessageSquare size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8 flex-grow flex flex-col">
                                <label className="text-sm font-bold text-gray-300 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full flex-grow bg-navy-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-navy-900 transition-all placeholder:text-gray-600 resize-none"
                                    placeholder="Tell us about your project or inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full group relative overflow-hidden py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all transform hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Video Submission CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-4">Have a video you'd like to feature on Channel 8?</p>
                    <button
                        onClick={() => setShowVideoModal(true)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-navy-800 hover:bg-navy-700 text-teal-400 font-bold rounded-full border border-teal-500/30 hover:border-teal-500 transition-all shadow-lg hover:shadow-teal-500/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        Submit Your Video
                    </button>
                </motion.div>

                <VideoSubmissionModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
            </div>
        </div >
    );
};

export default Contact;
