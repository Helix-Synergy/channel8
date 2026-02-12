import React from 'react';
import HeroSection from '../components/HeroSection';
import BentoGrid from '../components/BentoGrid';
import PodcastHub from '../components/PodcastHub';
import Collaboration from '../components/Collaboration';

const Home = () => {
    return (
        <>
            <HeroSection />
            <BentoGrid />
            <PodcastHub />
            <Collaboration />
        </>
    );
};

export default Home;
