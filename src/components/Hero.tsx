import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { HLS_VIDEO_URL, USER_INFO } from '../data/portfolioData';

interface HeroProps {
  onSeeWorks: () => void;
  onAboutMe: () => void;
  onReachOut: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSeeWorks,
  onAboutMe,
  onReachOut,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isSeeWorksHovered, setIsSeeWorksHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isReachOutHovered, setIsReachOutHovered] = useState(false);

  // Initialize HLS video
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
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_VIDEO_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Roles cycle every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % USER_INFO.roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.0, stagger: 0.1 },
        '-=0.8'
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="min-w-full min-h-full w-auto h-auto object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 font-medium">
          PORTFOLIO '26 · COMPUTER SCIENCE
        </div>

        {/* Name: Mahammad Sohail */}
        <h1 className="name-reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.95] tracking-tight text-text-primary mb-5 selection:bg-white/20">
          {USER_INFO.name}
        </h1>

        {/* Subtitle / Roles */}
        <div className="blur-in mb-4">
          <p className="text-sm sm:text-base md:text-lg text-text-primary/90 font-medium tracking-wide">
            Computer Science Student <span className="text-muted/60 mx-1">|</span>{' '}
            <span
              key={roleIndex}
              className="font-display italic text-text-primary animate-role-fade-in inline-block font-normal text-xl sm:text-2xl px-1"
            >
              {USER_INFO.roles[roleIndex]}
            </span>{' '}
            <span className="text-muted/60 mx-1">|</span> Software Developer
          </p>
        </div>

        {/* Description: Exactly user prompt */}
        <p className="blur-in text-sm md:text-base text-muted max-w-xl mx-auto mb-10 leading-relaxed font-light">
          {USER_INFO.tagline}
        </p>

        {/* 3 Buttons: View Projects · About Me · Contact */}
        <div className="blur-in inline-flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Button 1: "View Projects" (Solid) */}
          <div
            className="relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsSeeWorksHovered(true)}
            onMouseLeave={() => setIsSeeWorksHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isSeeWorksHovered ? 1 : 0,
              }}
            />
            <button
              onClick={onSeeWorks}
              className={`relative z-10 rounded-full text-xs sm:text-sm font-medium px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 cursor-pointer ${
                isSeeWorksHovered
                  ? 'bg-bg text-text-primary'
                  : 'bg-text-primary text-bg'
              }`}
            >
              View Projects
            </button>
          </div>

          {/* Button 2: "About Me" (Outlined) */}
          <div
            className="relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isAboutHovered ? 1 : 0,
              }}
            />
            <button
              onClick={onAboutMe}
              className={`relative z-10 rounded-full text-xs sm:text-sm font-medium px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 cursor-pointer ${
                isAboutHovered
                  ? 'bg-bg text-text-primary border-2 border-transparent'
                  : 'bg-bg text-text-primary border-2 border-stroke'
              }`}
            >
              About Me
            </button>
          </div>

          {/* Button 3: "Contact" (Outlined with accent ring) */}
          <div
            className="relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsReachOutHovered(true)}
            onMouseLeave={() => setIsReachOutHovered(false)}
          >
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                opacity: isReachOutHovered ? 1 : 0,
              }}
            />
            <button
              onClick={onReachOut}
              className={`relative z-10 rounded-full text-xs sm:text-sm font-medium px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 cursor-pointer ${
                isReachOutHovered
                  ? 'bg-bg text-text-primary border-2 border-transparent'
                  : 'bg-bg text-text-primary border-2 border-stroke'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none select-none">
        <span className="text-[11px] text-muted uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 bg-text-primary/70 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
