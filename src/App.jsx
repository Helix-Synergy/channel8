import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Platforms from './pages/Platforms';
import Contact from './pages/Contact';
import ChannelDetail from './pages/ChannelDetail';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inner App Content to handle Location-based Loading
const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Trigger loading on every route change
    setIsLoading(true);

    // Short timeout for smoother transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-teal-500 selection:text-white flex flex-col relative">
      {/* Conditional Loading Overlay */}
      {isLoading && <Loading />}

      <ScrollToTop />
      <Navbar />

      <main className="flex-grow pb-24"> {/* Padding bottom for sticky player */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
