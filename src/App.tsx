import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BackgroundFX } from './components/BackgroundFX';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ProfileCard } from './components/ProfileCard';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Gamertags } from './sections/Gamertags';
import { Hero } from './sections/Hero';
import { Interests } from './sections/Interests';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-white selection:bg-volt selection:text-black">
      <BackgroundFX />
      <CursorGlow />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Navbar />
            <main className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-6 px-4 pb-8 pt-24 sm:px-6 lg:grid-cols-[410px_minmax(0,1fr)] lg:px-8 xl:gap-8">
              <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
                <ProfileCard />
              </aside>
              <div className="space-y-6">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Interests />
                <Contact />
                <Gamertags />
                <Footer />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
