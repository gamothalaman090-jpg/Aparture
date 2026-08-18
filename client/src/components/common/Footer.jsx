import React from 'react';
import { Camera, ShieldCheck, Lock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-studio-950 border-t border-studio-850 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white font-display">APERTURE RENTALS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier camera and cinema gear rental platform offering full-frame bodies, cinema rigs, optical glass, and drones for creators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-mono text-xs uppercase mb-4 tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              <li><a href="/" className="hover:text-cyan-400 transition-colors">Camera Catalog</a></li>
              <li><a href="#categories" className="hover:text-cyan-400 transition-colors">Categories</a></li>
              <li><a href="#calculator" className="hover:text-cyan-400 transition-colors">Rental Estimator</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div>
            <h4 className="text-white font-bold font-mono text-xs uppercase mb-4 tracking-wider">Rental Terms</h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-slate-300">Min 1 Day - Max 14 Days</span></li>
              <li><span className="hover:text-slate-300">Security Deposit Policy</span></li>
              <li><span className="hover:text-slate-300">Damage & Late Fee Terms</span></li>
              <li><span className="hover:text-slate-300">Cancellation Policy</span></li>
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-mono text-xs uppercase mb-4 tracking-wider">Security & Trust</h4>
            <div className="flex items-center space-x-2 bg-studio-900 p-3 rounded-xl border border-studio-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Double-Booking Protection Engine Active</span>
            </div>
            <div className="flex items-center space-x-2 bg-studio-900 p-3 rounded-xl border border-studio-800">
              <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>JWT Encrypted Session & Data Shield</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-studio-850 flex flex-col sm:flex-row items-center justify-between text-slate-500 font-mono text-[11px]">
          <p>&copy; {new Date().getFullYear()} Aperture Camera Rentals. Software Requirements Specification Project.</p>
          <p className="mt-2 sm:mt-0">React (Vite) + Node.js + Express + Mongoose + Anime.js</p>
        </div>
      </div>
    </footer>
  );
}
