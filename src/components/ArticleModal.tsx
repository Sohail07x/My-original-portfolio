import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalEntry } from '../types';

interface ArticleModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ entry, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (entry) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
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
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stroke/60 mb-6">
            <div className="text-xs font-mono uppercase tracking-widest text-muted">
              {entry.category} · {entry.date} · {entry.readTime}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-bg border border-stroke hover:border-white/40 flex items-center justify-center text-text-primary hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Article Image */}
          <div className="relative w-full aspect-[21/9] max-h-[300px] rounded-2xl overflow-hidden border border-stroke bg-bg mb-8">
            <img
              src={entry.image}
              alt={entry.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic text-text-primary mb-6 leading-tight">
            {entry.title}
          </h2>

          {/* Article Content */}
          <div className="space-y-4 text-sm sm:text-base text-text-primary/80 leading-relaxed font-light">
            <p className="text-base sm:text-lg text-text-primary font-normal leading-relaxed">
              {entry.excerpt}
            </p>
            <p>
              When architecting digital interfaces for high-demand creative contexts,
              every visual cue must be mathematically sound. Physical inertia,
              micro-latencies, and color transitions are not merely decorative afterthoughts;
              they are the primary grammar through which users intuit systemic trust.
            </p>
            <p>
              By decoupling critical DOM transforms from continuous rendering loops, we
              maintain pristine 120 FPS frame stability across complex viewports without
              taxing battery endurance. The pairing of architectural layout honesty with
              deliberate, quiet typography anchors the user's attention right where it belongs:
              on the work itself.
            </p>
            <p>
              In our ongoing explorations, the fusion of WebGL spatial caustics and semantic
              accessibility proves that aesthetic luxury and technical rigor can coexist in
              complete harmony.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-stroke/60 flex items-center justify-between">
            <span className="text-xs font-mono text-muted">
              Written by Michael Smith
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full text-xs font-medium bg-bg border border-stroke hover:border-white/40 text-text-primary transition-colors"
            >
              Back to Journal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
