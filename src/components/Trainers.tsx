import React, { useState } from 'react';
import { Trainer } from '../types/gym';
import { GymImage } from './GymImage';
import { Award, Users, Quote, ArrowRight, Instagram } from 'lucide-react';

interface TrainersProps {
  trainers: Trainer[];
  onSelectTrainerForBooking: (trainerId: string, trainerName: string) => void;
}

export const Trainers: React.FC<TrainersProps> = ({
  trainers,
  onSelectTrainerForBooking
}) => {
  const [selectedTrainerModal, setSelectedTrainerModal] = useState<Trainer | null>(null);

  return (
    <section id="coaches" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Elite Coaching Cadre
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
              Professional Master Trainers
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              Every Apex coach holds recognized clinical or collegiate strength certifications. 
              No weekend certificate instructors—only proven mentors who practice what they preach.
            </p>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((coach) => (
            <div
              key={coach.id}
              className="rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              {/* Trainer Portrait with zero-broken image fallback */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <GymImage
                  src={coach.image}
                  alt={coach.name}
                  fallbackTitle={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Experience Chip */}
                <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2.5 py-1 rounded text-[11px] font-bold text-zinc-300 tabular-nums uppercase">
                  {coach.experienceYears}+ Yrs Exp
                </div>

                {/* Name & Role overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-bold text-white uppercase font-display leading-tight">
                    {coach.name}
                  </h3>
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mt-0.5">
                    {coach.role}
                  </p>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed italic border-l-2 border-red-600 pl-3">
                  "{coach.quote}"
                </p>

                {/* Specialties */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Core Specializations:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.specialties.map((spec, i) => (
                      <span key={i} className="text-[11px] text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/80">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications Preview */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Award className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-semibold">{coach.certifications[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="tabular-nums">{coach.athletesTrained}+ Athletes Coached</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectTrainerForBooking(coach.id, coach.name)}
                    className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600/90 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 cursor-pointer"
                  >
                    <span>Book 1-on-1 Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
