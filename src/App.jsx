import { useEffect, useState, lazy, Suspense, useLayoutEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global Contexts & Utils
// Global Contexts & Utils
import { ThemeProvider } from './context/ThemeContext';
import { initSmoothScroll, destroySmoothScroll } from './utils/smoothScroll';

// UI & Layout
import Loader from './components/ui/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';


// Lazy Loaded Heavy Components
const ThreeScene = lazy(() => import('./components/background/ThreeScene'));
const CommandPalette = lazy(() => import('./components/ui/CommandPalette'));

// Cinematic Project Sequences (Lazy loaded for performance)
const AssessmentProject = lazy(() => import('./components/sections/AssessmentProject'));
const FeaturedProject = lazy(() => import('./components/sections/FeaturedProject')); // PeerNotes
const BankProject = lazy(() => import('./components/sections/BankProject'));

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import GithubStats from './components/sections/GithubStats';
import Contact from './components/sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    if (loading) return;

    const sections = [
      { id: '#about', color: '#020205' },
      { id: '#skills', color: '#050510' },
      { id: '#project-assessment', color: '#080816' },
      { id: '#project-peernotes', color: '#0a0a1f' },
      { id: '#project-banksystem', color: '#080816' },
      { id: '#experience', color: '#050510' },
      { id: '#contact', color: '#000000' }
    ];

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const el = document.querySelector(section.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to("body", {
                backgroundColor: section.color,
                duration: 1.2,
                ease: "power2.inOut"
              });
            }
          }
        });
      });
    }, document.body);

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    // Only initialize smooth scrolling after the loader has finished
    if (!loading) {
      initSmoothScroll();
    }

    // Global hover detection for CustomCursor
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      destroySmoothScroll();
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [loading]);

  return (
    <ThemeProvider>
      <div className="bg-black min-h-screen text-white/90 selection:bg-white/30 font-sans transition-colors duration-1000">

        {loading && <Loader onComplete={() => setLoading(false)} />}

        {!loading && (
          <>
            <Suspense fallback={null}>
              <ThreeScene />
            </Suspense>
            <Suspense fallback={null}>
              <CommandPalette />
            </Suspense>
            <ScrollProgress />
            <CustomCursor isHovering={isHovering} />
            <Navbar />

            <main className="w-full relative z-10 flex flex-col items-center overflow-hidden">
              <Hero />
              <About />
              <Skills />

              <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white/20">Loading Assessment...</div>}>
                <AssessmentProject />
              </Suspense>

              <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white/20">Loading PeerNotes...</div>}>
                <FeaturedProject />
              </Suspense>

              <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white/20">Loading BankSystem...</div>}>
                <BankProject />
              </Suspense>

              <Experience />
              <Education />
              <Achievements />
              <GithubStats />
              <Contact />
            </main>

            <Footer />
            <Analytics />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
