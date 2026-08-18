import React, { useState } from 'react';
import { Camera, Search, ShoppingBag, User, Shield, Menu, X } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-studio-800/60 backdrop-blur-xl bg-studio-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center space-x-3 group focus-ring rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-studio-glow group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display block leading-none">
                APERTURE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-amberGold-400 font-semibold">
                CAMERA RENTALS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="/" className="text-white hover:text-cyan-400 transition-colors focus-ring rounded-md px-2 py-1">
              Catalog
            </a>
            <a href="#categories" className="text-slate-300 hover:text-cyan-400 transition-colors focus-ring rounded-md px-2 py-1">
              Categories
            </a>
            <a href="#calculator" className="text-slate-300 hover:text-cyan-400 transition-colors focus-ring rounded-md px-2 py-1">
              Rental Estimator
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors focus-ring rounded-md px-2 py-1">
              How It Works
            </a>
          </nav>

          {/* Action Tools & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Input Trigger */}
            <div className="hidden sm:flex items-center relative">
              <input
                type="text"
                placeholder="Search Sony FX3, RED, Canon..."
                className="w-48 lg:w-64 bg-studio-900 border border-studio-700/60 rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            </div>

            {/* Cart Button */}
            <button className="relative p-2 rounded-xl bg-studio-900/80 hover:bg-studio-800 text-slate-200 hover:text-white border border-studio-700/50 transition-all focus-ring min-touch-target flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amberGold-500 text-studio-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Sign In */}
            <a
              href="#login"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-studio-glow focus-ring"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-studio-900 text-slate-300 hover:text-white focus-ring min-touch-target flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-studio-800 bg-studio-950 px-4 py-4 space-y-3">
          <a href="/" className="block py-2 text-slate-200 font-medium hover:text-cyan-400">Catalog</a>
          <a href="#categories" className="block py-2 text-slate-300 hover:text-cyan-400">Categories</a>
          <a href="#calculator" className="block py-2 text-slate-300 hover:text-cyan-400">Rental Estimator</a>
          <a href="#how-it-works" className="block py-2 text-slate-300 hover:text-cyan-400">How It Works</a>
          <div className="pt-2 border-t border-studio-800">
            <a href="#login" className="w-full py-2.5 rounded-xl bg-cyan-500 text-white font-semibold text-center block text-sm">
              Sign In / Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
