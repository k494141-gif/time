import React from 'react';
import { MessageSquare, Phone, Dumbbell } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Quick contact and enrollment"
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 sm:gap-2.5"
    >
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/18005554766"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform hover:scale-105 active:scale-95 border border-emerald-400/30"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Call Now Button */}
      <a
        href="tel:+18005554766"
        aria-label="Call Apex Gym"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 text-red-500 flex items-center justify-center shadow-lg shadow-black/80 transition-transform hover:scale-105 active:scale-95 border border-zinc-700"
        title="Call Gym: +1 (800) 555-4766"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Quick Join CTA */}
      <button
        onClick={onOpenBooking}
        className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-600/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-red-400/40"
      >
        <Dumbbell className="w-4 h-4" />
        <span>Join Now</span>
      </button>
    </aside>
  );
};
