
import React, { useEffect, useState, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DesignCanvas } from './components/DesignCanvas';
import { Services } from './components/Services';
import { Capabilities } from './components/Capabilities';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Showcase } from './components/Showcase';
import { Manifesto } from './components/Manifesto';
import { Footer } from './components/Footer';
import { ContactOverlay } from './components/ContactOverlay';
import { Preloader } from './components/Preloader';
import { PortfolioItem } from './types';
import { allProjects } from './data';
import { triggerHaptic } from './utils/haptics';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SchemaMarkup } from './components/SchemaMarkup';

// Lazy load heavy components
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const AllProjects = React.lazy(() => import('./components/AllProjects').then(module => ({ default: module.AllProjects })));

function App() {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const isModalOpen = !!selectedProject || isContactOpen || isAllProjectsOpen;

  // Console Greeting & Initialization Log
  useEffect(() => {
    const studioLogo = `
    ██╗  ██╗██╗   ██╗████████╗███████╗███████╗██╗   ██╗
    ██║ ██╔╝██║   ██║╚══██╔══╝██╔════╝██╔════╝██║   ██║
    █████╔╝ ██║   ██║   ██║   ███████╗█████╗  ██║   ██║
    ██╔═██╗ ██║   ██║   ██║   ╚════██║██╔══╝  ╚██╗ ██╔╝
    ██║  ██╗╚██████╔╝   ██║   ███████║███████╗ ╚████╔╝ 
    ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝  ╚═══╝  
    `;

    console.log(
      `%c${studioLogo}%c\n%c KUTSEV STUDIO %c v4.0.1 %c\n%cDesign Engineering Studio.%c\n\nInitializing core systems...\n%c- UI/UX Engine: %cACTIVE\n%c- WebGL Renderer: %cACTIVE\n%c- Haptic Feedback: %cREADY\n\n%cJoin the future: %chello@kutsev.studio`,
      "color: #3758f9; font-weight: bold; font-family: monospace;",
      "",
      "background: #3758f9; color: white; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold; font-family: sans-serif;",
      "background: #121212; color: #3758f9; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid #3758f9; font-family: monospace;",
      "",
      "color: #888; font-style: italic; font-family: sans-serif;",
      "",
      "color: #555; font-family: monospace;",
      "color: #3758f9; font-weight: bold; font-family: monospace;",
      "color: #555; font-family: monospace;",
      "color: #3758f9; font-weight: bold; font-family: monospace;",
      "color: #555; font-family: monospace;",
      "color: #ccf381; font-weight: bold; font-family: monospace;",
      "color: #555; font-family: sans-serif;",
      "color: #3758f9; text-decoration: underline; font-family: sans-serif;"
    );
  }, []);

  // Lock body scroll when modal is open or loading
  useEffect(() => {
    if (isModalOpen || loading) {
      document.body.style.overflow = 'hidden';
      // Reset cursor state when modal opens
      document.body.classList.remove('cursor-text-mode', 'hovering');
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen, loading]);

  // Kickstart animations and browser rendering after loading
  useEffect(() => {
    if (!loading) {
      const isMobile = window.innerWidth < 768;

      const kickstart = () => {
        if (!isMobile) {
          document.body.style.transform = 'translateZ(0)';
          window.scrollTo(0, 1);
          
          const events = [
            new Event('resize'),
            new Event('scroll'),
            new MouseEvent('mousemove', {
              view: window,
              bubbles: true,
              cancelable: true,
              clientX: window.innerWidth / 2,
              clientY: window.innerHeight / 2
            })
          ];
          
          setTimeout(() => {
            window.scrollTo(0, 0);
            events.forEach(e => window.dispatchEvent(e));
            document.body.style.transform = '';
          }, 50);
        } else {
          window.dispatchEvent(new Event('resize'));
        }
      };
      
      const timer = setTimeout(kickstart, 150);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % allProjects.length;
    setSelectedProject(allProjects[nextIndex]);
    triggerHaptic();
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    setSelectedProject(allProjects[prevIndex]);
    triggerHaptic();
  };

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-accent selection:text-white relative">
      <SchemaMarkup />
      {window.innerWidth >= 768 && <CustomCursor />}
      {window.innerWidth >= 768 && <ScrollProgress />}
      <div className="bg-noise"></div>
      {window.innerWidth < 768 && <div className="bg-grain-static"></div>}
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Header 
            onContactClick={() => setIsContactOpen(true)} 
          />
          
          <div className={`transition-all duration-700 ${isModalOpen ? 'pointer-events-none select-none opacity-20 md:opacity-20 md:blur-md md:grayscale' : 'opacity-100'}`}>
            <main>
              <Hero onContactClick={() => setIsContactOpen(true)} />
              <DesignCanvas 
                onOpenAllProjects={() => setIsAllProjectsOpen(true)} 
                isPaused={isModalOpen}
              />
              <Services />
              <Capabilities />
              <Showcase 
                onProjectClick={setSelectedProject} 
                onOpenAllProjects={() => setIsAllProjectsOpen(true)}
              />
              <Process isPaused={isModalOpen} />
              <Pricing onContactClick={() => setIsContactOpen(true)} />
              <Manifesto />
            </main>
            
            <Footer onContactClick={() => setIsContactOpen(true)} />
          </div>
        </>
      )}

      {/* Pages / Overlays */}
      <Suspense fallback={null}>
        <AllProjects 
          isOpen={isAllProjectsOpen} 
          onClose={() => setIsAllProjectsOpen(false)}
          onProjectSelect={(project) => {
            setSelectedProject(project);
            // Keep archive open in background or handle state to return to it
          }}
        />
        
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      </Suspense>
      
      <ContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
