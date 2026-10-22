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

  // Counter using requestAnimationFrame over 2700ms
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2700;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing for counting
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(100);
        // 400ms delay then call onComplete
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

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Word cycler every 900ms (matches 2700ms total / 3 words)
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
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none pointer-events-auto"
    >
      {/* Top-left: "Portfolio" label */}
      <div className="flex items-center justify-between w-full">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.span>
        <span className="text-xs text-muted/50 font-mono tracking-widest hidden sm:inline-block">
          2026 ARCHIVE
        </span>
      </div>

      {/* Center: Rotating words ["Design", "Create", "Inspire"] */}
      <div className="flex items-center justify-center my-auto overflow-hidden py-12">
        <div className="relative h-20 sm:h-28 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 whitespace-nowrap"
            >
              {WORDS[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom section: Counter display & Progress bar */}
      <div className="w-full">
        <div className="flex justify-end items-baseline mb-4">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight">
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
