import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const TechnicalSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories =
    activeTab === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeTab);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Proficient':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Familiar':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <section id="skills" className="bg-bg py-16 md:py-24 border-t border-stroke/40 relative">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Verified Capabilities
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal">
              Technical{' '}
              <span className="font-display italic font-normal text-text-primary">
                skills
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-muted mt-2 sm:mt-3 max-w-lg font-light">
              Technologies and tools I have actively worked with, transparently categorized
              by practical proficiency.
            </p>
          </div>

          {/* Filter Tabs (Horizontal scroll on mobile with clean pill border) */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="inline-flex items-center gap-1.5 p-1 bg-surface rounded-full border border-stroke shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-text-primary text-bg font-semibold'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                All Skills
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === cat.id
                      ? 'bg-text-primary text-bg font-semibold'
                      : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="p-5 sm:p-7 md:p-8 rounded-3xl bg-surface/50 border border-stroke hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-medium text-text-primary">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-muted">
                    {category.skills.length} skills
                  </span>
                </div>
                <p className="text-xs text-muted mb-5 sm:mb-6 font-light">
                  {category.description}
                </p>

                <div className="space-y-2.5 sm:space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 sm:p-3.5 rounded-2xl bg-bg/70 border border-stroke/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="text-xs sm:text-sm font-medium text-text-primary">
                          {skill.name}
                        </span>
                        {skill.note && (
                          <span className="text-[11px] sm:text-xs text-muted/80 block sm:inline sm:ml-2 sm:border-l sm:border-stroke/80 sm:pl-2 font-light">
                            {skill.note}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border self-start sm:self-center shrink-0 ${getLevelBadgeClass(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest disclosure note */}
        <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-surface/20 border border-stroke/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted font-mono">
          <span>
            Note: All displayed technologies are grounded in actual hands-on projects and university coursework.
          </span>
          <span className="text-text-primary/70 shrink-0">
            Sohail07x · GitHub Verified
          </span>
        </div>
      </div>
    </section>
  );
};
