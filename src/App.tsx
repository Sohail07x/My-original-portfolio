import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { SelectedWorks } from './components/SelectedWorks';
import { TechnicalSkills } from './components/TechnicalSkills';
import { Journal } from './components/Journal';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { ContactFooter } from './components/ContactFooter';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { ArticleModal } from './components/ArticleModal';
import { Project, ExplorationItem, JournalEntry } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modals state
  const [selectedItem, setSelectedItem] = useState<Project | ExplorationItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Active section tracking via scroll position
  useEffect(() => {
    if (isLoading) return;

    const sections = ['home', 'about', 'work', 'skills', 'journal', 'explorations', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/20 selection:text-white font-body">
      {/* Section 1: Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-0">
        {/* Section 2: Hero */}
        <Hero
          onSeeWorks={() => handleNavigate('work')}
          onAboutMe={() => handleNavigate('about')}
          onReachOut={() => setIsContactOpen(true)}
        />

        {/* Section 2.5: About Me & Education */}
        <AboutMe
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Section 3: Selected Works (Bento Grid) */}
        <SelectedWorks
          onSelectProject={(project) => setSelectedItem(project)}
          onViewAllWork={() => handleNavigate('work')}
        />

        {/* Section 3.5: Technical Skills (Honest proficiency breakdown) */}
        <TechnicalSkills />

        {/* Section 4: Journal / Insights */}
        <Journal
          onSelectArticle={(article) => setSelectedArticle(article)}
          onViewAllArticles={() => {
            const el = document.getElementById('journal');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <Explorations
          onSelectExploration={(exploration) => setSelectedItem(exploration)}
        />

        {/* Section 6: Stats */}
        <Stats />

        {/* Section 7: Contact / Footer */}
        <ContactFooter onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Modals & Overlays */}
      <ProjectModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ArticleModal
        entry={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
