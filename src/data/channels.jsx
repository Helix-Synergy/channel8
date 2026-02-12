import { Heart, DollarSign, BookOpen, Car, Utensils, Plane, Monitor, Lightbulb } from 'lucide-react';

export const channels = [
    {
        id: 'health',
        title: 'Health',
        icon: <Heart size={32} />,
        img: '/logos/health.png',
        color: 'from-pink-500 to-rose-500',
        desc: 'Expert medical advice, wellness tips, and healthy living guides.',
        longDesc: 'Our Health vertical connects you with leading medical professionals, fitness experts, and mental health advocates. We cover everything from breakthrough medical research to daily wellness habits, ensuring you have the knowledge to live a longer, healthier life.',
        stats: { subscribers: '250K+', videos: '1.2K', views: '15M' },
        tileImg: '/images/health.png'
    },
    {
        id: 'finance',
        title: 'Finance',
        icon: <DollarSign size={32} />,
        img: '/logos/finance.png',
        color: 'from-emerald-400 to-green-600',
        desc: 'Market analysis, investment strategies, and personal finance tips.',
        longDesc: 'Navigate the complex world of money with confidence. Our Finance channel demystifies the stock market, crypto trends, and personal budgeting, providing you with actionable insights to grow your wealth.',
        stats: { subscribers: '180K+', videos: '850', views: '12M' },
        tileImg: '/images/Finance.png'
    },
    {
        id: 'education',
        title: 'Education',
        icon: <BookOpen size={32} />,
        img: '/logos/education.png',
        color: 'from-blue-400 to-indigo-600',
        desc: 'Educational resources, tutorials, and career guidance for all ages.',
        longDesc: 'Empowering minds through knowledge. Whether you are a student, professional, or lifelong learner, our Education vertical offers comprehensive tutorials, career advice, and skill-building workshops.',
        stats: { subscribers: '300K+', videos: '2.5K', views: '25M' },
        tileImg: '/images/Education.png'
    },
    {
        id: 'automobiles',
        title: 'Automobiles',
        icon: <Car size={32} />,
        img: '/logos/automobiles.png',
        color: 'from-orange-400 to-red-600',
        desc: 'Car reviews, industry news, and automotive technology updates.',
        longDesc: 'Fasten your seatbelts for the latest in the automotive world. From detailed car reviews and test drives to future tech and EV revolutions, we cover every mile of the industry.',
        stats: { subscribers: '500K+', videos: '900', views: '40M' },
        tileImg: '/images/Automobiles.png'
    },
    {
        id: 'food',
        title: 'Food',
        icon: <Utensils size={32} />,
        img: '/logos/food.png',
        color: 'from-yellow-400 to-orange-500',
        desc: 'Culinary adventures, recipes, and food culture from around the world.',
        longDesc: 'A celebration of taste and culture. Join us on a culinary journey as we explore street food gems, fine dining masterpieces, and easy home-cooked recipes that bring families together.',
        stats: { subscribers: '600K+', videos: '1.5K', views: '60M' },
        tileImg: '/images/Food.png'
    },
    {
        id: 'travel',
        title: 'Travel',
        icon: <Plane size={32} />,
        img: '/logos/travel.png',
        color: 'from-sky-400 to-blue-500',
        desc: 'Travel guides, destination reviews, and tips for the modern explorer.',
        longDesc: 'Discover the hidden corners of the globe. Our Travel experts provide immersive guides, budget hacks, and luxury escape reviews to help you plan your next unforgettable adventure.',
        stats: { subscribers: '450K+', videos: '1.1K', views: '35M' },
        tileImg: '/images/Travel.png'
    },
    {
        id: 'technology',
        title: 'Technology',
        icon: <Monitor size={32} />,
        img: '/logos/technology.png', // Placeholder if not available
        color: 'from-purple-500 to-indigo-500',
        desc: 'Gadget reviews, tech news, and deep dives into the future of AI.',
        longDesc: 'Stay ahead of the curve. We break down the latest gadgets, software updates, and AI breakthroughs, helping you understand how technology is shaping our future.',
        stats: { subscribers: '320K+', videos: '950', views: '22M' },
        tileImg: '/images/Science.png'
    },
    {
        id: 'innovation',
        title: 'Innovation',
        icon: <Lightbulb size={32} />,
        img: '/logos/innovation.png', // Placeholder
        color: 'from-amber-400 to-orange-600',
        desc: 'Groundbreaking ideas, startups, and the future of technology.',
        longDesc: 'Where imagination meets reality. Explore the cutting-edge innovations transforming our world, from sustainable energy solutions to next-gen robotics and beyond.',
        stats: { subscribers: '200K+', videos: '600', views: '10M' },
        tileImg: '/images/innovation.png'
    },
];
