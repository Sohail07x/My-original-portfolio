import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    if (id === 'resume') {
      onOpenResume();
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-1.5 sm:py-2 transition-all duration-300 ${
          hasScrolled ? 'shadow-md shadow-black/30 border-white/20' : ''
        }`}
      >
        {/* Logo: 9x9 circle with MS initials */}
        <button
          onClick={() => onNavigate('home')}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          className="relative w-9 h-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer focus:outline-none shrink-0"
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
            <span className="font-display italic text-[13px] text-text-primary tracking-normal select-none font-semibold">
              {USER_INFO.initials}
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block shrink-0" />

        {/* Nav links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleLinkClick(item.id, e)}
                className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-text-primary bg-stroke/50 shadow-inner'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block shrink-0" />

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
            className="relative z-10 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface hover:text-text-primary text-text-primary/90 backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap"
          >
            <span>Say hi</span>
            <span className="text-xs transition-transform duration-200">
              ↗
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
