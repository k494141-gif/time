import React, { useState } from 'react';
import { EquipmentItem } from '../types/gym';
import { GymImage } from './GymImage';
import { Layers, ShieldCheck, Cpu } from 'lucide-react';

interface EquipmentGalleryProps {
  equipment: EquipmentItem[];
}

export const EquipmentGallery: React.FC<EquipmentGalleryProps> = ({ equipment }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Free Weights', 'Cardio Deck', 'Heavy Racks', 'Functional Rig', 'Recovery'];

  const filteredEquipment = activeCategory === 'All'
    ? equipment
    : equipment.filter(item => item.category === activeCategory);

  return (
    <section id="facility" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Commercial Hardware
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
              Real Gym Equipment Gallery
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              Inspect our high-performance arsenal. We invest in competition-grade machinery 
              engineered by the most trusted names in athletic performance.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col group"
            >
              {/* Media Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-950">
                <GymImage
                  src={item.image}
                  alt={item.name}
                  fallbackTitle={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2.5 py-1 rounded text-[11px] font-bold text-zinc-300 uppercase font-display">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {item.brand}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white font-display text-lg font-bold uppercase leading-tight line-clamp-1">
                  {item.name}
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.specs}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1 text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Biochemically Sanitized 3x Daily
                  </span>
                  <span className="font-semibold text-zinc-400">Apex Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
