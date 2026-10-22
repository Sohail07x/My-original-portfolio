import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPLORATIONS, USER_INFO } from '../data/portfolioData';
import { ExplorationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsProps {
  onSelectExploration: (item: ExplorationItem) => void;
}

export const Explorations: React.FC<ExplorationsProps> = ({
  onSelectExploration,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  useEffect(() => {
    // Only activate 300vh parallax scroll on large desktop screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (colLeftRef.current && colRightRef.current && sectionRef.current) {
        gsap.fromTo(
          colLeftRef.current,
          { y: 120 },
          {
            y: -180,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          colRightRef.current,
          { y: -60 },
          {
            y: 160,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const col1Items = EXPLORATIONS.slice(0, 3);
  const col2Items = EXPLORATIONS.slice(3, 6);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative bg-bg overflow-hidden border-t border-stroke/40 lg:min-h-[280vh]"
    >
      {/* ================= DESKTOP EXPERIENCE (lg: and above) ================= */}
      <div className="hidden lg:block">
        {/* Layer 1: Pinned Center (z-10) */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
          <div className="pointer-events-auto max-w-xl mx-auto backdrop-blur-sm p-8 rounded-3xl bg-bg/60 border border-white/10 shadow-2xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Research & Lab
              </span>
              <span className="w-8 h-px bg-stroke" />
            </div>

            {/* Heading */}
            <h2 className="text-5xl lg:text-7xl text-text-primary tracking-tight font-normal mb-4">
              Technical{' '}
              <span className="font-display italic font-normal text-text-primary">
                playground
              </span>
            </h2>

            <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8 font-light">
              Exploratory sketches in model architectures, decision boundaries, concept DAGs,
              and software prototypes.
            </p>

            {/* GitHub button */}
            <div
              className="inline-flex relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
            >
              <span
                className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                  opacity: isGithubHovered ? 1 : 0,
                }}
              />
              <a
                href={USER_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 rounded-full text-xs sm:text-sm font-medium px-6 py-3 bg-surface text-text-primary border border-stroke hover:border-transparent flex items-center gap-2 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <span>Explore GitHub Repos ({USER_INFO.githubUser})</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Layer 2: Parallax Columns (z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex justify-center items-start pt-32 pb-40">
          <div className="w-full max-w-[1300px] mx-auto px-6 grid grid-cols-2 gap-36 lg:gap-48 pointer-events-auto">
            {/* Column 1 */}
            <div ref={colLeftRef} className="flex flex-col gap-48 items-start">
              {col1Items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectExploration(item)}
                  className={`group relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:border-white/40 ${item.rotation}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-display italic text-xl text-text-primary">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-muted/70 mt-1">
                      {item.tools}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div ref={colRightRef} className="flex flex-col gap-48 items-end pt-48">
              {col2Items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectExploration(item)}
                  className={`group relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:border-white/40 ${item.rotation}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-display italic text-xl text-text-primary">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-muted/70 mt-1">
                      {item.tools}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE & TABLET EXPERIENCE (< lg) ================= */}
      <div className="block lg:hidden py-16 sm:py-20 px-5 sm:px-8 max-w-[1200px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Research & Lab
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-normal mb-3">
            Technical{' '}
            <span className="font-display italic font-normal text-text-primary">
              playground
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-6 font-light">
            Exploratory sketches in model architectures, decision boundaries, concept DAGs,
            and software prototypes.
          </p>

          <a
            href={USER_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-surface text-text-primary border border-stroke hover:border-white/40 transition-colors"
          >
            <span>GitHub Repos ({USER_INFO.githubUser})</span>
            <span>↗</span>
          </a>
        </div>

        {/* Responsive Grid for mobile & tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {EXPLORATIONS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectExploration(item)}
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-stroke bg-surface cursor-pointer shadow-lg active:scale-95 transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Permanent bottom gradient on mobile so text is always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="font-display italic text-lg text-text-primary truncate">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between mt-1 text-[11px] text-muted/80">
                  <span className="truncate">{item.tools}</span>
                  <span className="font-mono text-text-primary">Inspect ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
