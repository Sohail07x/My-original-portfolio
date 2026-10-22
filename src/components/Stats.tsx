import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../data/portfolioData';

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative p-8 rounded-3xl bg-surface/40 border border-stroke hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary tabular-nums tracking-tight mb-3">
                  {stat.value}
                </div>
                <h3 className="text-lg font-medium text-text-primary tracking-tight">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted mt-6 leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
