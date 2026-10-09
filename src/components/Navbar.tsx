import React, { useState } from 'react';
import { Dumbbell, Menu, X, Shield, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (planId?: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Plans', href: '#plans' },
    { name: 'Coaches', href: '#coaches' },
    { name: 'Facility', href: '#facility' },
    { name: 'Calculator', href: '#calculator' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20 group-hover:bg-red-500 transition-colors">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <span className="font-display tracking-wider text-xl uppercase">
            Apex Iron <span className="text-red-500">Gym</span>
          </span>
        </a>

        {/* Zone 2: 4-6 Clean Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-zinc-300 hover:text-red-500 transition-colors whitespace-nowrap shrink-0 text-sm font-semibold tracking-wide uppercase hover:underline underline-offset-8 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Portal'}
            className={`p-2.5 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-red-950/40 border-red-500/50 text-red-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="hidden xl:inline">{isAdminLoggedIn ? 'Admin Active' : 'Admin'}</span>
          </button>

          <a
            href="tel:+18005554766"
            className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-400 hover:border-zinc-700 transition-colors"
            title="Call Gym: +1 (800) 555-4766"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 text-xs font-bold tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-500 transition-all uppercase whitespace-nowrap shrink-0 shadow-lg shadow-red-600/25 active:scale-95 cursor-pointer"
          >
            Join Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-md"
          >
            Join
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-800">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 px-3 text-sm font-semibold text-zinc-300 hover:text-red-400 hover:bg-zinc-900 rounded-md transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-500 shadow-md shadow-red-600/30"
            >
              Start Free Trial / Join
            </button>

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/18005554766"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="tel:+18005554766"
                className="flex-1 py-2.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-semibold"
                title="Admin"
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
