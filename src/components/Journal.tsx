import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_ENTRIES } from '../data/portfolioData';
import { JournalEntry } from '../types';

interface JournalProps {
  onSelectArticle: (entry: JournalEntry) => void;
  onViewAllArticles: () => void;
}

export const Journal: React.FC<JournalProps> = ({
  onSelectArticle,
  onViewAllArticles,
}) => {
  const [isViewAllHovered, setIsViewAllHovered] = useState(false);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header: same pattern as Selected Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading: "Recent *thoughts*" */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal">
              Recent{' '}
              <span className="font-display italic font-normal text-text-primary">
                thoughts
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              Notes on creative technology, spatial interfaces, and visual craft.
            </p>
          </div>

          {/* "View all" button */}
          <div
            className="hidden md:inline-flex relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105 shrink-0"
            onMouseEnter={() => setIsViewAllHovered(true)}
            onMouseLeave={() => setIsViewAllHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isViewAllHovered ? 1 : 0,
              }}
            />
            <button
              onClick={onViewAllArticles}
              className="relative z-10 rounded-full text-xs sm:text-sm font-medium px-5 py-2.5 bg-surface text-text-primary border border-stroke hover:border-transparent flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <span>View all</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills (rounded-[40px] sm:rounded-full) */}
        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectArticle(entry)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 sm:pr-8 bg-surface/30 hover:bg-surface border border-stroke hover:border-white/20 rounded-[32px] sm:rounded-full transition-all duration-300 cursor-pointer"
            >
              {/* Left side: Thumbnail image + Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke/80 group-hover:border-text-primary/40 transition-colors">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors truncate">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-muted truncate max-w-md hidden sm:block mt-0.5">
                    {entry.excerpt}
                  </p>
                </div>
              </div>

              {/* Right side: Read time, date, and link indicator */}
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 shrink-0 text-xs text-muted pl-18 sm:pl-0 font-mono">
                <span className="hidden md:inline-block">{entry.category}</span>
                <span>{entry.readTime}</span>
                <span>{entry.date}</span>
                <span className="w-8 h-8 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary group-hover:border-white/30 group-hover:translate-x-0.5 transition-all">
                  ↗
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
