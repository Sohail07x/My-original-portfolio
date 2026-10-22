import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { USER_INFO, CAREER_GOALS } from '../data/portfolioData';

interface AboutMeProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onOpenResume, onOpenContact }) => {
  const [isResumeHovered, setIsResumeHovered] = useState(false);

  return (
    <section id="about" className="bg-bg py-16 md:py-24 border-t border-stroke/40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Professional Story
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal">
              About{' '}
              <span className="font-display italic font-normal text-text-primary">
                myself
              </span>
            </h2>

            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              Background, technical interests, and academic direction.
            </p>
          </div>

          {/* Quick Resume Button */}
          <div
            className="relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105 shrink-0"
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isResumeHovered ? 1 : 0,
              }}
            />
            <button
              onClick={onOpenResume}
              className="relative z-10 rounded-full text-xs sm:text-sm font-medium px-5 py-2.5 bg-surface text-text-primary border border-stroke hover:border-transparent flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <span>View Full CV</span>
              <span>↗</span>
            </button>
          </div>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Narrative Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-surface border border-stroke"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
                The Journey & Direction
              </div>
              <div className="space-y-5 text-sm sm:text-base text-text-primary/90 leading-relaxed font-light">
                {USER_INFO.bioParagraphs.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-stroke/60 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted font-mono">
                Location: <span className="text-text-primary">{USER_INFO.location}</span>
              </div>
              <button
                onClick={onOpenContact}
                className="text-xs font-medium text-text-primary underline hover:text-white transition-colors cursor-pointer"
              >
                Let's connect for internships →
              </button>
            </div>
          </motion.div>

          {/* Education & Research Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 p-8 rounded-3xl bg-surface/50 border border-stroke flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
                Education & Learning
              </div>
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-2">
                {USER_INFO.education.degree}
              </h3>
              <p className="text-xs text-muted font-mono mb-6">
                {USER_INFO.education.status} · Focus: {USER_INFO.education.focus}
              </p>

              <div className="mb-6">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                  Key Coursework
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono text-text-primary/80">
                  {USER_INFO.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded bg-bg border border-stroke/70"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                  Research Interests
                </span>
                <ul className="space-y-1.5 text-xs text-text-primary/90 font-light">
                  {USER_INFO.education.researchInterests.map((interest) => (
                    <li key={interest} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gradient inline-block" />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Career Goals Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-stroke" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted">
              Career Goals & Objectives
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAREER_GOALS.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="p-6 rounded-2xl bg-surface/30 border border-stroke hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-bg border border-stroke text-muted inline-block mb-3">
                    {goal.badge}
                  </span>
                  <h4 className="text-base font-medium text-text-primary mb-2">
                    {goal.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-light">
                    {goal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
