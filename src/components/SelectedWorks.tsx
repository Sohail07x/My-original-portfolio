import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  onViewAllWork: () => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onViewAllWork,
}) => {
  const [isViewAllHovered, setIsViewAllHovered] = useState(false);

  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
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
                Applied Engineering
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal">
              Featured{' '}
              <span className="font-display italic font-normal text-text-primary">
                projects
              </span>
            </h2>

            <p className="text-sm md:text-base text-muted mt-3 max-w-lg font-light">
              Practical prototypes, machine learning experiments, and web architectures
              demonstrating hands-on technical execution.
            </p>
          </div>

          {/* "View all work" button */}
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
            <a
              href="https://github.com/Sohail07x"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 rounded-full text-xs sm:text-sm font-medium px-5 py-2.5 bg-surface text-text-primary border border-stroke hover:border-transparent flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <span>GitHub Repositories</span>
              <span>→</span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid: alternating col spans 7 / 5 / 5 / 7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectProject(project)}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl cursor-pointer ${project.colSpan} ${project.aspect} min-h-[360px] md:min-h-[460px]`}
            >
              {/* Background image */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-30" />

              {/* Default Card Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted mb-1 font-mono">
                    {project.category} · {project.year}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display italic text-text-primary">
                    {project.title}
                  </h3>
                  {project.statusNote && (
                    <span className="text-[10px] text-amber-400 font-mono block mt-1">
                      {project.statusNote}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted/80 font-mono hidden sm:inline-block">
                  {project.metrics}
                </span>
              </div>

              {/* Hover overlay with animated gradient pill */}
              <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-400 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative p-[1.5px] rounded-full animate-gradient-shift accent-gradient shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <div className="px-6 py-2.5 bg-white text-black rounded-full flex items-center gap-2 shadow-lg">
                    <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                      Inspect —
                    </span>
                    <span className="font-display italic text-base sm:text-lg font-normal text-black">
                      {project.title}
                    </span>
                    <span className="text-xs ml-0.5">↗</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-primary/90 max-w-sm mt-4 line-clamp-3 font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 mt-4 text-[11px] text-muted font-mono">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="border border-stroke/60 rounded px-2 py-0.5 bg-surface/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
