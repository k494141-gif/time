import React from 'react';
import { Testimonial } from '../types/gym';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { GymImage } from './GymImage';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Social Proof & Member Voices
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Athlete Testimonials
          </h2>
          <p className="text-sm text-zinc-400">
            Real feedback from powerlifters, collegiate athletes, and fitness enthusiasts who train at Apex daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Lifter</span>
                  </div>
                </div>

                {/* Highlight callout */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-semibold text-red-400">
                  "{test.highlight}"
                </div>

                {/* Main Quote */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                  <GymImage
                    src={test.avatar}
                    alt={test.name}
                    fallbackTitle={test.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white uppercase font-display">
                    {test.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    {test.role}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {test.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
