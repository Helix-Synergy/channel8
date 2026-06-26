import React from 'react';
import HeroSection from '../components/HeroSection';
import BentoGrid from '../components/BentoGrid';
import PodcastHub from '../components/PodcastHub';
import Collaboration from '../components/Collaboration';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO 
                title="Home" 
                description="Welcome to Channel 8 Network - One Network. Infinite Voices. Explore our credible, engaging, and informative stories across diverse topics." 
                url="https://channel8network.online/"
            />
            <HeroSection />
            <BentoGrid />
            <PodcastHub />
            <Collaboration />
        </>
    );
};

export default Home;
