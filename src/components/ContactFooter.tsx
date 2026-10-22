import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { HLS_VIDEO_URL, USER_INFO } from '../data/portfolioData';

interface ContactFooterProps {
  onOpenContact: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenContact }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  // Initialize flipped HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Marquee: "LEARN • BUILD • SOLVE • INNOVATE • " repeated 10x
  useEffect(() => {
    if (!marqueeRef.current) return;

    const anim = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const marqueeText = Array(10).fill('LEARN • BUILD • SOLVE • INNOVATE • ').join('');

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden border-t border-stroke/40"
    >
      {/* Background Video: flipped vertically (scale-y-[-1]) with overlay bg-black/60 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="min-w-full min-h-full w-auto h-auto object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-45"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* GSAP Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden py-4 border-y border-stroke/30 select-none mb-16 md:mb-24">
        <div
          ref={marqueeRef}
          className="inline-block whitespace-nowrap text-3xl sm:text-5xl md:text-7xl font-display italic text-text-primary/20 tracking-wider uppercase font-light will-change-transform"
        >
          {marqueeText}
        </div>
      </div>

      {/* Center CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mb-20 md:mb-28">
        <div className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-4">
          Open For Opportunities
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-6">
          Let's build together
        </h2>

        <p className="text-sm md:text-base text-muted max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Seeking internships, open-source collaborations, and development roles.
          Reach out directly to discuss projects, ideas, or opportunities.
        </p>

        {/* Email button with gradient hover border ring */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            className="relative inline-flex rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsEmailHovered(true)}
            onMouseLeave={() => setIsEmailHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isEmailHovered ? 1 : 0,
              }}
            />
            <a
              href={`mailto:${USER_INFO.email}`}
              className="relative z-10 rounded-full text-xs sm:text-sm md:text-base font-medium px-8 sm:px-10 py-3.5 sm:py-4 bg-surface text-text-primary border border-stroke hover:border-transparent flex items-center gap-3 transition-all duration-300 cursor-pointer shadow-2xl"
            >
              <span>{USER_INFO.email}</span>
              <span className="transition-transform duration-200">
                ↗
              </span>
            </a>
          </div>

          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium bg-bg/80 border border-stroke hover:border-white/40 text-text-primary transition-all cursor-pointer"
          >
            Phone: {USER_INFO.phoneFormatted}
          </button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Green pulsing dot + "Available for projects" */}
          <div className="flex items-center gap-2.5 text-xs text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-text-primary/90 font-medium tracking-wide">
              Available for Internships & Projects
            </span>
            <span className="text-stroke mx-1">·</span>
            <span>{USER_INFO.location}</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 text-xs sm:text-sm text-muted font-mono">
            <a
              href={USER_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-text-primary transition-colors cursor-pointer"
            >
              GitHub ({USER_INFO.githubUser})
            </a>
            <a
              href={USER_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-text-primary transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${USER_INFO.email}`}
              className="hover:text-text-primary transition-colors cursor-pointer"
            >
              Email
            </a>
          </div>

          {/* Copyright / Scroll to top */}
          <div className="flex items-center gap-4 text-xs text-muted/70">
            <span>© 2026 {USER_INFO.name}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-text-primary transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Back to top"
            >
              <span>Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
