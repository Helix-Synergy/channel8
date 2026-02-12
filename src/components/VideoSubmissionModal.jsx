import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Video, CheckCircle } from 'lucide-react';
import API_BASE_URL from '../config';

const VideoSubmissionModal = ({ isOpen, onClose }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('video/')) {
            setFile(file);
        } else {
            alert("Please upload a video file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('description', formData.description);
        data.append('video', file);

        try {
            const apiBase = API_BASE_URL;
            const response = await fetch(`${apiBase}/videos/upload`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFile(null);
                    setFormData({ name: '', email: '', description: '' });
                    onClose();
                }, 3000);
            } else {
                setStatus({ type: 'error', message: result.message || 'Upload failed.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to server.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-400">
                                    <Video size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Submit Your Content</h2>
                                <p className="text-gray-400">Share your video story with the Channel 8 Network.</p>
                            </div>

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4"
                                    >
                                        <CheckCircle size={40} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Submission Received!</h3>
                                    <p className="text-gray-400">Thank you for sharing your content. Our team will review it shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-300 ml-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-all placeholder:text-gray-600"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-all placeholder:text-gray-600"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300 ml-1">Video Description</label>
                                        <textarea
                                            required
                                            rows="3"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-all placeholder:text-gray-600 resize-none"
                                            placeholder="Tell us about your video..."
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300 ml-1">Upload Video</label>
                                        <div
                                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? 'border-teal-500 bg-teal-500/10' : 'border-white/10 hover:border-white/30 bg-navy-950'}`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                type="file"
                                                accept="video/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleFileChange}
                                            />
                                            <div className="flex flex-col items-center gap-3">
                                                {file ? (
                                                    <>
                                                        <div className="w-12 h-12 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center">
                                                            <Video size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{file.name}</p>
                                                            <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                        </div>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-red-400 text-sm hover:underline">Remove</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-12 h-12 bg-white/5 text-gray-400 rounded-full flex items-center justify-center">
                                                            <Upload size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">Click to upload or drag and drop</p>
                                                            <p className="text-gray-500 text-sm">MP4, MOV, or WEBM (Max 500MB)</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {status.message && (
                                        <div className={`p-4 rounded-xl ${status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                            {status.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={!file || isSubmitting}
                                        className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg ${file && !isSubmitting ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-teal-500/40 transform hover:-translate-y-1' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        {isSubmitting ? 'Uploading...' : 'Submit Video'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoSubmissionModal;
