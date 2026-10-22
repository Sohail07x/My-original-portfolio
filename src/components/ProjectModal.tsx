import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ExplorationItem } from '../types';

interface ProjectModalProps {
  item: Project | ExplorationItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isProject = 'description' in item;
  const project = isProject ? (item as Project) : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 md:p-10"
        >
          {/* Top Bar with Close button (sticky on mobile) */}
          <div className="sticky top-0 z-20 -mt-2 -mx-2 px-2 py-2 bg-surface/95 backdrop-blur-md flex items-center justify-between pb-4 border-b border-stroke/60 mb-5">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted truncate pr-2">
              {item.category} {project && `· ${project.year}`}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg border border-stroke hover:border-white/40 flex items-center justify-center text-text-primary hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Media Container */}
          <div className="relative w-full aspect-[16/10] max-h-[440px] rounded-xl sm:rounded-2xl overflow-hidden border border-stroke bg-bg mb-6">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Status Badge */}
          <div className="mb-6">
            {project?.statusNote && (
              <span className="inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full mb-2">
                {project.statusNote}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display italic text-text-primary leading-tight">
              {item.title}
            </h2>
          </div>

          {/* Details */}
          {project ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-text-primary/90 leading-relaxed font-light">
                {project.description}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg border border-stroke/70 font-mono text-xs">
                <div>
                  <span className="text-muted block mb-0.5 text-[11px]">Role / Focus</span>
                  <span className="text-text-primary font-medium">{project.role}</span>
                </div>
                <div>
                  <span className="text-muted block mb-0.5 text-[11px]">Domain</span>
                  <span className="text-text-primary font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="text-muted block mb-0.5 text-[11px]">Key Milestone</span>
                  <span className="text-text-primary font-medium">{project.metrics}</span>
                </div>
              </div>

              {/* Architecture Section */}
              {project.architecture && (
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface/50 border border-stroke">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3 sm:mb-4">
                    System Architecture & Flow
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-text-primary/90 font-mono">
                    {project.architecture.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-bg/60 border border-stroke/40 leading-relaxed"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Inputs and Outputs */}
              {project.sampleInputsOutputs && (
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-surface/50 border border-stroke">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3 sm:mb-4">
                    Sample Inputs & Output Verifications
                  </h3>
                  <div className="space-y-2.5">
                    {project.sampleInputsOutputs.map((sample, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-3.5 rounded-xl bg-bg border border-stroke font-mono text-xs flex flex-col gap-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1 text-muted text-[11px]">
                          <span>Input Payload</span>
                          <span className="text-sky-400 font-medium">
                            {sample.detectedType}
                          </span>
                        </div>
                        <code className="text-text-primary bg-surface/80 p-2 rounded border border-stroke/40 text-[11px] overflow-x-auto whitespace-pre-wrap sm:whitespace-nowrap">
                          {sample.input}
                        </code>
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] pt-1">
                          <span className="text-text-primary/80">{sample.output}</span>
                          <span className="font-semibold text-emerald-400">
                            {sample.action}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Cases & Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {project.testCases && (
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-surface/40 border border-stroke">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-2.5">
                      Test Cases & Verification
                    </h3>
                    <ul className="space-y-1.5 text-xs text-text-primary/80">
                      {project.testCases.map((tc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-mono">✓</span>
                          <span>{tc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.limitations && (
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-surface/40 border border-stroke">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-2.5">
                      Known Limitations
                    </h3>
                    <ul className="space-y-1.5 text-xs text-text-primary/80">
                      {project.limitations.map((lim, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-mono">!</span>
                          <span>{lim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags & Action Links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-stroke/60">
                <div className="flex flex-wrap gap-1.5 text-xs font-mono text-muted">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-stroke px-2 py-0.5 rounded-full bg-bg text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial text-center inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium border border-stroke hover:border-white/40 text-text-primary transition-colors"
                    >
                      <span>Source</span>
                      <span>↗</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial text-center inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium bg-text-primary text-bg hover:opacity-90 transition-opacity"
                    >
                      <span>Repository</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs font-mono text-muted pt-4 border-t border-stroke/50">
              <span>Medium: {(item as ExplorationItem).tools}</span>
              <span className="text-text-primary">Exploration Series '26</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
