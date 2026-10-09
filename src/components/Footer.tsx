import React from 'react';
import { Dumbbell, Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBooking }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-20 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
              <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display tracking-wider uppercase">
                Apex Iron <span className="text-red-500">Gym</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier high-performance strength facility engineered for athletes, powerlifters, 
              and disciplined fitness enthusiasts. 24/7 biometric access, Eleiko competition platforms, 
              and clinical thermal recovery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/18005554766"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-semibold hover:bg-emerald-900 transition-colors"
              >
                WhatsApp Desk
              </a>
              <a
                href="tel:+18005554766"
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold hover:text-white transition-colors"
              >
                +1 (800) 555-4766
              </a>
            </div>
          </div>

          {/* Programs Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Training Protocols
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#programs" className="hover:text-red-400 transition-colors">Barbell & Powerlifting</a></li>
              <li><a href="#programs" className="hover:text-red-400 transition-colors">Metabolic Conditioning & VO2</a></li>
              <li><a href="#programs" className="hover:text-red-400 transition-colors">Titan Hypertrophy Volume</a></li>
              <li><a href="#programs" className="hover:text-red-400 transition-colors">Accelerated Fat Loss Shred</a></li>
              <li><a href="#programs" className="hover:text-red-400 transition-colors">1-on-1 Elite Coaching</a></li>
            </ul>
          </div>

          {/* Navigation Mirrors */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#schedule" className="hover:text-red-400 transition-colors">Class Schedule</a></li>
              <li><a href="#plans" className="hover:text-red-400 transition-colors">Membership Pricing</a></li>
              <li><a href="#coaches" className="hover:text-red-400 transition-colors">Master Coaches</a></li>
              <li><a href="#facility" className="hover:text-red-400 transition-colors">Equipment Gallery</a></li>
              <li><a href="#transformations" className="hover:text-red-400 transition-colors">Transformations</a></li>
              <li><a href="#calculator" className="hover:text-red-400 transition-colors">BMI & Macro Tool</a></li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Facility Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Mon – Fri:</span>
                <span className="font-semibold text-white">05:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Sat – Sun:</span>
                <span className="font-semibold text-white">06:00 AM – 09:00 PM</span>
              </div>
              <div className="flex justify-between text-red-400 pt-1 font-semibold">
                <span>Biometric Members:</span>
                <span>24/7 / 365 Days</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md shadow-red-600/20 cursor-pointer"
              >
                Claim 1-Day Trial Pass
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Apex Iron Gym & Fitness Club. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-zinc-600">Forged with Iron & Science</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors font-medium cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Staff Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
