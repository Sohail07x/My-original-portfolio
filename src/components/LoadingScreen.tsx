import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Counter using requestAnimationFrame over 2700ms with fail-safe timer
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2700;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(100);
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const finishTimer = setTimeout(() => {
            onComplete();
          }, 600);
          return () => clearTimeout(finishTimer);
        }, 400);
        return () => clearTimeout(exitTimer);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    // Hard fail-safe: Ensure loading screen NEVER stays stuck even if tab is in background or rAF is throttled
    const safetyTimer = setTimeout(() => {
      setCount(100);
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3400);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  // Word cycler every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-5 sm:p-10 md:p-16 select-none pointer-events-auto"
    >
      {/* Top-left: "Portfolio" label */}
      <div className="flex items-center justify-between w-full">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[11px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio · Mahammad Sohail
        </motion.span>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(onComplete, 200);
          }}
          className="text-[11px] sm:text-xs text-muted hover:text-white font-mono px-3 py-1 rounded-full border border-stroke/60 hover:border-white/40 transition-colors cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Center: Rotating words */}
      <div className="flex items-center justify-center my-auto overflow-hidden py-8 sm:py-12">
        <div className="relative h-16 sm:h-24 md:h-28 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 whitespace-nowrap"
            >
              {WORDS[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom section: Counter display & Progress bar */}
      <div className="w-full">
        <div className="flex justify-end items-baseline mb-3 sm:mb-4">
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-stroke/50 overflow-hidden rounded-full">
          <div
            className="h-full accent-gradient origin-left transition-transform duration-75 ease-linear rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
