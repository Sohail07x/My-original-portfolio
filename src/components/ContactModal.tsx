import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(USER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(USER_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-surface border border-stroke rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10"
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 -mt-2 -mx-2 px-2 py-2 bg-surface/95 backdrop-blur-md flex items-start justify-between pb-4 border-b border-stroke/60 mb-5 sm:mb-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-muted mb-1">
                Connect & Collaborate
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-text-primary leading-tight">
                Contact Mahammad
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bg border border-stroke hover:border-white/40 flex items-center justify-center text-text-primary hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Quick contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 sm:mb-6">
            {/* Email Card */}
            <div className="p-3.5 rounded-2xl bg-bg border border-stroke flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase block mb-0.5">
                  Direct Email
                </span>
                <span className="text-xs font-medium text-text-primary truncate block">
                  {USER_INFO.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="mt-2 text-[11px] font-mono py-1 px-2.5 rounded border border-stroke hover:border-white/40 text-text-primary transition-colors cursor-pointer self-start"
              >
                {copiedEmail ? 'Copied ✓' : 'Copy Email'}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-3.5 rounded-2xl bg-bg border border-stroke flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase block mb-0.5">
                  Phone / WhatsApp
                </span>
                <span className="text-xs font-medium text-text-primary truncate block">
                  {USER_INFO.phoneFormatted}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <a
                  href={`tel:${USER_INFO.phone}`}
                  className="text-[11px] font-mono py-1 px-2.5 rounded bg-surface border border-stroke hover:border-white/40 text-text-primary transition-colors"
                >
                  Call
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="text-[11px] font-mono py-1 px-2.5 rounded border border-stroke hover:border-white/40 text-text-primary transition-colors cursor-pointer"
                >
                  {copiedPhone ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Message Form */}
          {submitted ? (
            <div className="py-8 sm:py-10 text-center">
              <div className="w-12 h-12 rounded-full accent-gradient mx-auto flex items-center justify-center text-white text-xl mb-4">
                ✓
              </div>
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-2">
                Message Dispatched
              </h3>
              <p className="text-xs text-muted max-w-xs mx-auto">
                Thank you for reaching out! Mahammad will review your message and reply promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recruiter / Engineer"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  Inquiry Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Discuss an internship, project collaboration, or technical idea..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-muted/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-muted font-mono text-center sm:text-left">
                  Direct Response Guarantee
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-medium bg-text-primary text-bg hover:opacity-90 transition-opacity cursor-pointer text-center"
                >
                  Send Inquiry →
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
