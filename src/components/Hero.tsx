import React, { useEffect, useState } from 'react';
import { ChevronRight, Award, Zap, Phone, MessageSquare, Flame } from 'lucide-react';
import { GymImage } from './GymImage';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePrograms }) => {
  // Animated counters
  const [memberCount, setMemberCount] = useState(3800);
  const [trainerCount, setTrainerCount] = useState(20);
  const [machineCount, setMachineCount] = useState(150);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setMemberCount(Math.floor(3800 + (4500 - 3800) * progress));
      setTrainerCount(Math.floor(20 + (35 - 20) * progress));
      setMachineCount(Math.floor(150 + (220 - 150) * progress));

      if (step >= steps) {
        clearInterval(timer);
        setMemberCount(4500);
        setTrainerCount(35);
        setMachineCount(220);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-900">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-red-600/15 via-red-900/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Athletic Kicker (Clean unboxed text, no pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-red-500">
              <Flame className="w-4 h-4 fill-red-500" />
              <span>Uncompromising High-Performance Center</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">Open 24/7 Biometric</span>
            </div>

            {/* Marquee Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase font-display leading-[0.95] text-balance">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600">
                Ultimate Physique
              </span>
            </h1>

            {/* Body Proposition */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              Raw iron, calibrated Olympic platforms, and science-driven periodization. 
              Apex Iron Gym is built for athletes who demand real progressive overload, zero machine queues, 
              and world-class coaching standards.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 text-sm font-bold tracking-wider text-white uppercase bg-red-600 rounded-lg hover:bg-red-500 transition-all shadow-xl shadow-red-600/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>Claim 1-Day Free Pass</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="px-6 py-4 text-sm font-bold tracking-wider text-zinc-200 uppercase bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
              >
                View Workout Programs
              </button>
            </div>

            {/* Quick Contact Micro-Actions */}
            <div className="flex items-center gap-6 pt-2 text-xs text-zinc-400">
              <a
                href="https://wa.me/18005554766"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Instant WhatsApp Desk</span>
              </a>
              <span className="text-zinc-700">|</span>
              <a
                href="tel:+18005554766"
                className="flex items-center gap-2 hover:text-red-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call +1 (800) 555-4766</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Athlete Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              {/* Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
                <GymImage
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                  alt="Muscular athletes training with heavy barbell"
                  fallbackTitle="Apex Iron Training Facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Contrast Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                {/* Floating Athlete Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs font-semibold text-zinc-200 tracking-wide uppercase font-display">
                      Iron Zone Open
                    </span>
                  </div>
                  <div className="bg-red-600/90 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase font-display tracking-wider">
                    24/7 Access
                  </div>
                </div>

                {/* Overlaid Card Info Box */}
                <div className="absolute bottom-4 left-4 right-4 p-5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-red-400 font-semibold uppercase tracking-wider">Apex Standard</span>
                    <span className="tabular-nums">Eleiko IPF Calibrated</span>
                  </div>
                  <p className="text-sm font-bold text-white uppercase font-display">
                    Olympic Lifting & Tactical Hypertrophy
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-xs text-zinc-300">
                    <span>Drop-pad approved</span>
                    <span className="text-red-500 font-semibold">Free Chalk Stations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Statistics Strip (Full Width Below Split) */}
        <div className="mt-16 pt-10 border-t border-zinc-900 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-white font-display tabular-nums tracking-tight">
              {memberCount.toLocaleString()}+
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Active Lifters & Athletes
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-white font-display tabular-nums tracking-tight">
              {trainerCount}+
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">
              CSCS & Master Coaches
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-white font-display tabular-nums tracking-tight">
              {machineCount}+
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Hammer & Rogue Stations
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-red-500 font-display tabular-nums tracking-tight">
              98.4%
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Transformation Success
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
