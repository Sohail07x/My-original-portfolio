import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10"
        >
          {/* Sticky Header for easy closing on mobile */}
          <div className="sticky top-0 z-20 -mt-2 -mx-2 px-2 py-2 bg-surface/95 backdrop-blur-md flex items-start justify-between pb-4 border-b border-stroke/60 mb-6 sm:mb-8">
            <div className="min-w-0 pr-3">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted mb-1">
                Curriculum Vitae
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-text-primary leading-tight">
                {USER_INFO.name}
              </h2>
              <p className="text-xs text-muted mt-0.5 truncate">
                {USER_INFO.title}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-muted/80 font-mono mt-1.5">
                <span className="truncate">{USER_INFO.email}</span>
                <span>·</span>
                <span>{USER_INFO.phoneFormatted}</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">GitHub: {USER_INFO.githubUser}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg border border-stroke hover:border-white/40 flex items-center justify-center text-text-primary hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Profile Overview */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-2 sm:mb-3">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-primary/90 leading-relaxed font-light">
              Computer Science student passionate about software development, Artificial
              Intelligence, and Machine Learning. Actively building practical prototypes,
              exploring academic literature, and developing software that tackles meaningful
              real-world challenges. Seeking internship opportunities to contribute, learn from
              senior engineers, and grow within high-performing engineering teams.
            </p>
          </div>

          {/* Education */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg border border-stroke/70">
            <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-1">
              Education
            </div>
            <h4 className="text-sm sm:text-base font-medium text-text-primary">
              {USER_INFO.education.degree}
            </h4>
            <div className="text-xs text-text-primary/70 font-mono mt-0.5 mb-2.5">
              Focus: {USER_INFO.education.focus}
            </div>
            <div className="text-xs text-muted leading-relaxed font-light">
              <strong className="text-text-primary font-normal">Relevant Coursework: </strong>
              {USER_INFO.education.coursework.join(', ')}.
            </div>
          </div>

          {/* Technical Skills Categorized */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3 sm:mb-4">
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3.5 sm:p-4 rounded-xl bg-bg border border-stroke/70">
                  <h5 className="text-xs font-semibold text-text-primary mb-2">
                    {cat.title}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-stroke text-text-primary/90"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Highlight */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3 sm:mb-4">
              Notable Engineering Projects
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l border-stroke/80 pl-3 sm:pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary">
                    SmartWAF — Web Application Firewall Prototype
                  </h4>
                  <span className="text-[11px] font-mono text-muted">2026</span>
                </div>
                <div className="text-[11px] text-muted/80 font-mono mb-1">
                  Python, Flask, Scikit-learn, Random Forest, HTML/CSS
                </div>
                <p className="text-xs text-text-primary/80 leading-relaxed font-light">
                  Built an intelligent firewall prototype that extracts HTTP payload features
                  and classifies SQLi / XSS attacks with 94.2% test accuracy.
                </p>
              </div>

              <div className="border-l border-stroke/80 pl-3 sm:pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary">
                    Personal Portfolio Website
                  </h4>
                  <span className="text-[11px] font-mono text-muted">2026</span>
                </div>
                <div className="text-[11px] text-muted/80 font-mono mb-1">
                  React, TypeScript, Tailwind CSS, GSAP, Framer Motion
                </div>
                <p className="text-xs text-text-primary/80 leading-relaxed font-light">
                  Engineered a responsive single-page portfolio with HLS video integration,
                  custom animations, and verified cross-device performance.
                </p>
              </div>

              <div className="border-l border-stroke/80 pl-3 sm:pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-text-primary">
                    Adaptive Learning Knowledge Graph System
                  </h4>
                  <span className="text-[11px] font-mono text-muted">2026</span>
                </div>
                <div className="text-[11px] text-muted/80 font-mono mb-1">
                  Python, AI/ML, Graph Analytics, Pandas
                </div>
                <p className="text-xs text-text-primary/80 leading-relaxed font-light">
                  Exploratory EdTech research prototype mapping conceptual prerequisites and
                  providing individualized learning pathways.
                </p>
              </div>
            </div>
          </div>

          {/* Research Interests & Goals */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-2 sm:mb-3">
              Research Interests
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-text-primary">
              {USER_INFO.education.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-bg border border-stroke"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-stroke/60">
            <div className="text-[11px] sm:text-xs text-muted font-mono text-center sm:text-left">
              Available for Summer & Fall Internships
            </div>
            <a
              href={`mailto:${USER_INFO.email}?subject=Internship%20Opportunity`}
              className="px-6 py-2.5 rounded-full text-xs font-medium bg-text-primary text-bg hover:opacity-90 transition-opacity text-center"
            >
              Reach Out via Email
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
