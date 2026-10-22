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
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 -mt-2 -mx-2 px-2 py-2 bg-surface/95 backdrop-blur-md flex items-center justify-between pb-4 border-b border-stroke/60 mb-5">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted truncate pr-2">
              {entry.category} · {entry.date} · {entry.readTime}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg border border-stroke hover:border-white/40 flex items-center justify-center text-text-primary hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Article Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[260px] sm:max-h-[300px] rounded-xl sm:rounded-2xl overflow-hidden border border-stroke bg-bg mb-6">
            <img
              src={entry.image}
              alt={entry.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Title */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-display italic text-text-primary mb-5 leading-tight">
            {entry.title}
          </h2>

          {/* Article Content */}
          <div className="space-y-4 text-xs sm:text-sm md:text-base text-text-primary/80 leading-relaxed font-light">
            <p className="text-sm sm:text-base text-text-primary font-normal leading-relaxed">
              {entry.excerpt}
            </p>
            <p>
              When developing intelligent systems like web firewalls or adaptive educational
              tools, combining classical computer science algorithms with lightweight machine
              learning models yields high returns on both execution velocity and inference
              simplicity.
            </p>
            <p>
              In our experiments with SmartWAF, feature engineering on string entropy and
              keyword frequencies showed that a carefully regularized Random Forest model can
              filter malicious SQL and cross-site scripting payloads with low overhead, making
              it suitable for edge or lightweight server deployments.
            </p>
            <p>
              Continuous validation, honest documentation of edge-case limitations, and
              focusing on real-world impact remain the guiding north stars of my technical
              journey.
            </p>
          </div>

          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-stroke/60 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono text-muted">
              Written by Mahammad Sohail
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-medium bg-bg border border-stroke hover:border-white/40 text-text-primary transition-colors cursor-pointer"
            >
              Back to Journal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
