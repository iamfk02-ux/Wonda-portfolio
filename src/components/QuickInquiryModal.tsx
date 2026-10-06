import React, { useState, useEffect } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { X, ArrowUpRight, Check } from 'lucide-react';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [brief, setBrief] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Start a project with Wonderful Blessed"
      className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex items-center justify-center p-6"
    >
      <div className="w-full max-w-lg bg-[#111111] border border-white/[0.12] p-8 sm:p-10 text-[#F2F2EF] relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-8">
          <span className="text-[12px] font-mono tracking-tight text-[#F05245]">
            // Commission
          </span>
          <h3 className="text-2xl sm:text-3xl font-grotesk font-semibold tracking-tight text-white">
            Start a project
          </h3>
          <p className="text-xs text-[#F2F2EF]/60 font-normal">
            Direct inquiry to Wonderful Blessed. Response within 24 hours.
          </p>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-10 h-10 border border-[#F05245] flex items-center justify-center mx-auto text-[#F05245]">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-grotesk font-semibold text-white">Transmission Received</h4>
            <p className="text-xs text-[#F2F2EF]/70 max-w-xs mx-auto">
              Your brief has been forwarded directly to Wonderful Blessed.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#F2F2EF] text-[#111111] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#F2F2EF]/50">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#181818] border border-white/[0.10] focus:border-[#F05245] p-3 text-xs text-white outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#F2F2EF]/50">
                Email or Contact
              </label>
              <input
                type="text"
                required
                placeholder="name@organization.com or phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-[#181818] border border-white/[0.10] focus:border-[#F05245] p-3 text-xs text-white outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#F2F2EF]/50">
                Project Scope
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you are building..."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full bg-[#181818] border border-white/[0.10] focus:border-[#F05245] p-3 text-xs text-white outline-none resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#F05245] hover:bg-[#e04538] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              Send Brief →
            </button>

            <div className="text-center pt-2">
              <a
                href={STUDIO_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] font-mono text-[#F2F2EF]/50 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>Prefer instant communication? Message via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F05245]" />
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
