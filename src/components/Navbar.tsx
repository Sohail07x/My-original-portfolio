import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isSayHiHovered, setIsSayHiHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when active section changes or window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'work' },
    { label: 'Skills', id: 'skills' },
    { label: 'Resume', id: 'resume' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id === 'resume') {
      onOpenResume();
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 pointer-events-none">
        <div
          className={`pointer-events-auto inline-flex items-center justify-between gap-1.5 sm:gap-2 rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 sm:px-2.5 py-1.5 sm:py-2 transition-all duration-300 max-w-full ${
            hasScrolled ? 'shadow-lg shadow-black/40 border-white/20 bg-surface/95' : ''
          }`}
        >
          {/* Logo: 9x9 circle with MS initials */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('home');
            }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer focus:outline-none shrink-0"
            aria-label="Mahammad Sohail Home"
          >
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                background: isLogoHovered
                  ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
                  : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
              }}
            />
            <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-xs sm:text-[13px] text-text-primary tracking-normal select-none font-semibold">
                {USER_INFO.initials}
              </span>
            </div>
          </button>

          {/* Desktop & Tablet Links (Hidden on small mobile < 640px) */}
          <div className="hidden sm:flex items-center">
            <div className="w-px h-5 bg-stroke mx-1 shrink-0" />

            <div className="flex items-center gap-0.5 md:gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleLinkClick(item.id, e)}
                    className={`text-xs md:text-sm rounded-full px-2.5 md:px-3.5 py-1.5 transition-all duration-200 cursor-pointer font-medium whitespace-nowrap ${
                      isActive
                        ? 'text-text-primary bg-stroke/50 shadow-inner'
                        : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-stroke mx-1 shrink-0" />
          </div>

          {/* Mobile Current Section & Menu Toggle Button (< 640px) */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs px-2.5 py-1.5 rounded-full bg-stroke/40 text-text-primary font-medium flex items-center gap-1.5 cursor-pointer border border-stroke"
            >
              <span className="capitalize text-[11px] text-muted">
                {activeSection === 'work' ? 'Projects' : activeSection}
              </span>
              <span className="text-[10px] text-text-primary font-mono">
                {mobileMenuOpen ? '✕' : '▾'}
              </span>
            </button>
          </div>

          {/* "Say hi" button */}
          <div
            className="relative inline-flex items-center shrink-0"
            onMouseEnter={() => setIsSayHiHovered(true)}
            onMouseLeave={() => setIsSayHiHovered(false)}
          >
            <span
              className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                inset: '-2px',
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isSayHiHovered ? 1 : 0,
              }}
            />

            <button
              onClick={onOpenContact}
              className="relative z-10 text-xs md:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 bg-surface hover:text-text-primary text-text-primary/90 backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer font-medium whitespace-nowrap"
            >
              <span>Say hi</span>
              <span className="text-xs transition-transform duration-200">
                ↗
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute top-16 left-4 right-4 bg-surface border border-stroke rounded-3xl p-5 shadow-2xl flex flex-col gap-2"
            >
              <div className="text-[11px] font-mono text-muted uppercase tracking-widest px-3 pb-2 border-b border-stroke/60 flex items-center justify-between">
                <span>Navigation</span>
                <span className="text-text-primary">Mahammad Sohail</span>
              </div>

              <div className="flex flex-col gap-1 py-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => handleLinkClick(item.id, e)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-stroke/60 text-text-primary font-semibold'
                          : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full accent-gradient" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stroke/60 flex items-center justify-between gap-2">
                <a
                  href={`tel:${USER_INFO.phone}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-bg border border-stroke text-xs font-mono text-text-primary"
                >
                  Call Phone
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-text-primary text-bg text-xs font-medium"
                >
                  Contact Form
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
