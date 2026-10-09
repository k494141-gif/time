import React, { useState } from 'react';
import { ScheduleItem } from '../types/gym';
import { Clock, MapPin, User, Check, Users, Sparkles, AlertCircle } from 'lucide-react';

interface ScheduleProps {
  scheduleItems: ScheduleItem[];
  onOpenBooking: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ scheduleItems, onOpenBooking }) => {
  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const [activeDay, setActiveDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [reservedClassId, setReservedClassId] = useState<string | null>(null);
  const [reservationModal, setReservationModal] = useState<ScheduleItem | null>(null);

  const categories = ['All', 'Strength', 'HIIT', 'Conditioning', 'Mobility', 'Hypertrophy'];

  const daySchedule = scheduleItems.filter(item => {
    const matchesDay = item.day === activeDay;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesDay && matchesCategory;
  });

  const handleReserveSpot = (item: ScheduleItem) => {
    setReservationModal(item);
  };

  const confirmReservation = () => {
    if (reservationModal) {
      setReservedClassId(reservationModal.id);
      setTimeout(() => {
        setReservationModal(null);
      }, 1800);
    }
  };

  return (
    <section id="schedule" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Weekly Class Timetable
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Workout Schedule & Timings
          </h2>
          <p className="text-sm text-zinc-400">
            High-energy strength labs, conditioning gauntlets, and mobility resets led by certified master coaches. 
            All spots are limited to maintain coaching quality.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto gap-2 pb-4 mb-6 border-b border-zinc-900 scrollbar-none">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer ${
                activeDay === day
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/60 border border-zinc-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-red-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing {daySchedule.length} session{daySchedule.length === 1 ? '' : 's'} on {activeDay}</span>
          </div>
        </div>

        {/* Schedule Grid / Table */}
        <div className="space-y-3">
          {daySchedule.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-zinc-900/30 border border-zinc-800 text-zinc-500 space-y-2">
              <p className="text-sm font-semibold text-zinc-400">No classes found in this category for {activeDay}.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="text-xs text-red-400 hover:underline"
              >
                View all {activeDay} classes
              </button>
            </div>
          ) : (
            daySchedule.map((item) => {
              const spotsLeft = Math.max(0, item.capacity - item.enrolled);
              const isFull = spotsLeft === 0;
              const isAlreadyReserved = reservedClassId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Time & Class Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-red-500 font-display text-base font-bold sm:w-44 shrink-0 tabular-nums">
                      <Clock className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{item.time}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-white uppercase font-display group-hover:text-red-400 transition-colors">
                          {item.className}
                        </h3>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-medium text-zinc-400">
                          · {item.intensity}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="text-zinc-300 font-medium">{item.trainer}</span>
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{item.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Capacity & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        <span className={`tabular-nums font-semibold ${isFull ? 'text-amber-500' : 'text-zinc-300'}`}>
                          {item.enrolled}/{item.capacity} booked
                        </span>
                      </div>
                      <span className={`text-[11px] ${spotsLeft <= 2 ? 'text-red-400 font-semibold' : 'text-zinc-500'}`}>
                        {isFull ? 'Waitlist Open' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} remaining`}
                      </span>
                    </div>

                    <button
                      disabled={isAlreadyReserved}
                      onClick={() => handleReserveSpot(item)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        isAlreadyReserved
                          ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-400'
                          : isFull
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                          : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 active:scale-95'
                      }`}
                    >
                      {isAlreadyReserved ? 'Spot Confirmed' : isFull ? 'Join Waitlist' : 'Reserve Spot'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Timetable Notice */}
        <div className="mt-8 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
            <span>Need personalized one-on-one time? Dedicated private coaching slots can be booked anytime.</span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
          >
            Book 1-on-1 Trainer Session →
          </button>
        </div>
      </div>

      {/* Instant Reservation Modal */}
      {reservationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase font-display">
                Confirm Class Spot
              </h3>
              <p className="text-xs text-zinc-400">
                You are reserving a guest/member spot for:
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-sm font-bold text-white uppercase font-display">
                {reservationModal.className}
              </div>
              <div className="text-xs text-red-400 font-medium">
                {reservationModal.day} · {reservationModal.time}
              </div>
              <div className="text-xs text-zinc-400 flex items-center justify-between pt-2 border-t border-zinc-800">
                <span>Coach: {reservationModal.trainer}</span>
                <span>Room: {reservationModal.room}</span>
              </div>
            </div>

            {reservedClassId === reservationModal.id ? (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs text-center font-semibold">
                ✓ Reservation Confirmed! A pass has been assigned to you.
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setReservationModal(null)}
                  className="flex-1 py-3 text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider bg-zinc-800 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReservation}
                  className="flex-1 py-3 text-xs font-bold text-white uppercase tracking-wider bg-red-600 hover:bg-red-500 rounded-lg shadow-lg shadow-red-600/25 cursor-pointer"
                >
                  Confirm Spot
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
