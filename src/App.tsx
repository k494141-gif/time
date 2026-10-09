import React, { useState, useEffect } from 'react';
import {
  INITIAL_PROGRAMS,
  INITIAL_TRAINERS,
  INITIAL_PLANS,
  INITIAL_EQUIPMENT,
  INITIAL_TRANSFORMATIONS,
  INITIAL_TESTIMONIALS,
  INITIAL_SCHEDULE,
  INITIAL_BOOKINGS,
  INITIAL_ENQUIRIES,
  STORAGE_KEYS,
  loadStoredData,
  saveStoredData
} from './data/gymData';
import { Booking, Trainer, MembershipPlan, Enquiry } from './types/gym';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Schedule } from './components/Schedule';
import { Pricing } from './components/Pricing';
import { Trainers } from './components/Trainers';
import { EquipmentGallery } from './components/EquipmentGallery';
import { Transformations } from './components/Transformations';
import { Testimonials } from './components/Testimonials';
import { BMICalculator } from './components/BMICalculator';
import { BookingForm } from './components/BookingForm';
import { LocationContact } from './components/LocationContact';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  // Application Data States with LocalStorage Persistence
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadStoredData(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS)
  );
  const [trainers, setTrainers] = useState<Trainer[]>(() =>
    loadStoredData(STORAGE_KEYS.TRAINERS, INITIAL_TRAINERS)
  );
  const [plans, setPlans] = useState<MembershipPlan[]>(() =>
    loadStoredData(STORAGE_KEYS.PLANS, INITIAL_PLANS)
  );
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() =>
    loadStoredData(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES)
  );

  // Admin Modal and Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Pre-fill state for the Booking section
  const [preSelectedPlanId, setPreSelectedPlanId] = useState<string>('plan-pro');
  const [preSelectedTrainerId, setPreSelectedTrainerId] = useState<string>('');
  const [preSelectedGoal, setPreSelectedGoal] = useState<string>('');

  // Save to LocalStorage whenever modified
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.TRAINERS, trainers);
  }, [trainers]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.PLANS, plans);
  }, [plans]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.ENQUIRIES, enquiries);
  }, [enquiries]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (planId?: string) => {
    if (planId) {
      setPreSelectedPlanId(planId);
    }
    scrollToSection('booking');
  };

  const handleExplorePrograms = () => {
    scrollToSection('programs');
  };

  const handleSelectProgramForBooking = (programName: string) => {
    setPreSelectedGoal(`Focus on ${programName} curriculum`);
    scrollToSection('booking');
  };

  const handleSelectPlan = (planId: string) => {
    setPreSelectedPlanId(planId);
    scrollToSection('booking');
  };

  const handleSelectTrainerForBooking = (trainerId: string, trainerName: string) => {
    setPreSelectedTrainerId(trainerId);
    setPreSelectedGoal(`1-on-1 Consultation requested with Coach ${trainerName}`);
    scrollToSection('booking');
  };

  const handleBookingSubmitted = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleEnquirySubmitted = (newEnquiry: Enquiry) => {
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all bookings, trainers, and plans to initial default records?')) {
      setBookings(INITIAL_BOOKINGS);
      setTrainers(INITIAL_TRAINERS);
      setPlans(INITIAL_PLANS);
      setEnquiries(INITIAL_ENQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.TRAINERS);
      localStorage.removeItem(STORAGE_KEYS.PLANS);
      localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Muscular Athletes, Bold Tagline, Live Stats */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExplorePrograms={handleExplorePrograms}
        />

        {/* 3. Gym Introduction & Pillars */}
        <About
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Workout Programs with Modal Syllabus */}
        <Programs
          programs={INITIAL_PROGRAMS}
          onSelectProgramForBooking={handleSelectProgramForBooking}
        />

        {/* 5. Class Schedule & Timings with Spot Reservation */}
        <Schedule
          scheduleItems={INITIAL_SCHEDULE}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Membership Plans with Pricing Toggle */}
        <Pricing
          plans={plans}
          onSelectPlan={handleSelectPlan}
        />

        {/* 7. Master Coaches with Profiles & Bookings */}
        <Trainers
          trainers={trainers}
          onSelectTrainerForBooking={handleSelectTrainerForBooking}
        />

        {/* 8. Real Gym Equipment Gallery */}
        <EquipmentGallery
          equipment={INITIAL_EQUIPMENT}
        />

        {/* 9. Before/After Transformation Section with Interactive Slider */}
        <Transformations
          transformations={INITIAL_TRANSFORMATIONS}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 10. Customer Testimonials */}
        <Testimonials
          testimonials={INITIAL_TESTIMONIALS}
        />

        {/* 11. Interactive BMI & Macro Calculator */}
        <BMICalculator
          onSelectRecommendedProgram={handleSelectProgramForBooking}
        />

        {/* 12. Online Membership Booking Form & Instant Pass Generator */}
        <BookingForm
          plans={plans}
          trainers={trainers}
          preSelectedPlanId={preSelectedPlanId}
          preSelectedTrainerId={preSelectedTrainerId}
          preSelectedGoal={preSelectedGoal}
          onBookingSubmitted={handleBookingSubmitted}
        />

        {/* 13. Location, Operating Hours, Google Maps, WhatsApp & Direct Contact */}
        <LocationContact
          onEnquirySubmitted={handleEnquirySubmitted}
        />
      </main>

      {/* 14. Footer with Links & Admin Trigger */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 15. Floating Quick Action Bar (WhatsApp, Call, Join) */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 16. Secure Operations Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        trainers={trainers}
        plans={plans}
        enquiries={enquiries}
        onUpdateBookings={setBookings}
        onUpdateTrainers={setTrainers}
        onUpdatePlans={setPlans}
        onUpdateEnquiries={setEnquiries}
        onResetData={handleResetData}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />
    </div>
  );
}
