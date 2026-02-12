import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Collaboration = () => {
    return (
        <section className="py-24 px-6 relative bg-navy-900">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative p-1 rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
                >
                    <div className="bg-navy-900 rounded-[22px] p-12 md:p-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Advertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Collaborate</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            We partner with brands, organizations, and creators to produce meaningful digital campaigns. Let’s build stories that matter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                state={{ subject: "Business Partnership" }}
                                className="px-8 py-4 bg-teal-DEFAULT text-navy-900 font-bold rounded-full hover:bg-teal-400 transition-transform hover:scale-105 shadow-lg shadow-teal-500/25 inline-block"
                            >
                                Brand Integrations
                            </Link>
                            <Link
                                to="/contact"
                                state={{ subject: "Advertising Inquiry" }}
                                className="px-8 py-4 bg-transparent border border-gray-600 text-white font-bold rounded-full hover:border-white transition-colors inline-block"
                            >
                                Sponsored Content
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Collaboration;
