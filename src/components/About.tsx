import React from 'react';
import { ShieldCheck, Dumbbell, Activity, Flame, CheckCircle2 } from 'lucide-react';
import { GymImage } from './GymImage';

export const About: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Dumbbell,
      title: 'Competition-Calibrated Iron',
      description: 'Eleiko IPF bars, calibrated steel plates, and zero-bend safety bars. Built for powerlifters, Olympic lifters, and serious strength enthusiasts.'
    },
    {
      icon: Activity,
      title: 'InBody 770 Body Composition',
      description: 'Track segmental muscle mass, visceral fat, and cellular hydration every 30 days to guarantee verifiable physical evolution.'
    },
    {
      icon: Flame,
      title: 'Contrast Thermal Recovery',
      description: '195°F Finnish rock saunas paired with 42°F filtered cold plunges to dramatically reduce soreness and elevate central nervous recovery.'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Biometric Access',
      description: 'Train on your terms. Secure biometric door access gives verified members round-the-clock entry 365 days a year.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Imagery Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[16/10]">
              <GymImage
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
                alt="Apex Iron Gym main training floor"
                fallbackTitle="Main Strength Floor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-semibold text-zinc-300 uppercase tracking-wider font-display">
                Floor A: 14 Olympic Lifting Platforms & Heavy Rack Vault
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3]">
                <GymImage
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop"
                  alt="Recovery sauna and thermal zone"
                  fallbackTitle="Thermal Suite"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-zinc-300 uppercase font-display">
                  Nordic Recovery Suite
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3]">
                <GymImage
                  src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop"
                  alt="Functional sprint turf and sleds"
                  fallbackTitle="Turf & Sled Sprint"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-zinc-300 uppercase font-display">
                  30m Indoor Turf Track
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                The Apex Standard
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight leading-tight">
                Built For Real Lifters. <br />
                <span className="text-zinc-400">Engineered For Longevity.</span>
              </h2>
            </div>

            <p className="text-base text-zinc-300 leading-relaxed">
              We eliminated the corporate gym nonsense: no broken pins, no 20-minute waits for a bench, 
              and no staff telling you not to make noise when deadlifting heavy. Apex Iron was founded 
              with a single vision—provide an uncompromising athletic environment where dedicated humans 
              push their physical potential safely.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all shadow-lg shadow-red-600/25 cursor-pointer"
              >
                Schedule Facility Walkthrough
              </button>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Commitment 1-Day Trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
