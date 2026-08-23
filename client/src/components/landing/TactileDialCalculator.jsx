import React, { useState } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';

const DURATION_DIALS = [1, 2, 3, 5, 7, 10, 14];

const GEAR_OPTIONS = [
  { id: 'fx3', name: 'Sony FX3 Cinema Camera', dailyRate: 110, deposit: 500 },
  { id: 'r5c', name: 'Canon EOS R5 C 8K Hybrid', dailyRate: 125, deposit: 600 },
  { id: 'red', name: 'RED Komodo 6K Cinema Package', dailyRate: 210, deposit: 1200 },
  { id: 'lens', name: 'Sony 24-70mm f/2.8 GM II', dailyRate: 45, deposit: 250 },
  { id: 'drone', name: 'DJI Mavic 3 Pro Cine Drone', dailyRate: 150, deposit: 700 },
];

export default function TactileDialCalculator() {
  const [selectedGear, setSelectedGear] = useState(GEAR_OPTIONS[0]);
  const [rentalDays, setRentalDays] = useState(3);

  const rentalFee = selectedGear.dailyRate * rentalDays;
  const depositAmount = selectedGear.deposit;
  const grandTotal = rentalFee + depositAmount;

  const handleSelectGear = (gear) => {
    setSelectedGear(gear);
    soundFx.playClickSound();
  };

  const handleSelectDays = (days) => {
    setRentalDays(days);
    soundFx.playDialTickSound(days / 7 + 0.8);
  };

  return (
    <section id="tactile-calculator" className="py-24 bg-[#050508] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center justify-center space-x-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>// MECHANICAL DIAL ESTIMATOR</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Transparent Rental Calculator
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
            Min 1 day, max 14 days per reservation. 100% deposit held safe & refunded upon return.
          </p>
        </div>

        {/* Tactical Dial Console Container */}
        <div className="max-w-4xl mx-auto glass-panel-cinema rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Dial & Gear Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Select Equipment */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-bold">
                  STEP 1: SELECT CAMERA / LENS PACKAGE
                </label>
                <div className="space-y-2">
                  {GEAR_OPTIONS.map((gear) => (
                    <button
                      key={gear.id}
                      onClick={() => handleSelectGear(gear)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono font-semibold transition-all focus-ring flex items-center justify-between ${
                        selectedGear.id === gear.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{gear.name}</span>
                      <span className="text-amber-400 font-bold">{formatCurrency(gear.dailyRate)}/day</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Mechanical Duration Dial (Buttons styled like Shutter Dial) */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-bold flex justify-between">
                  <span>STEP 2: RENTAL DAYS (SHUTTER DIAL)</span>
                  <span className="text-amber-400 font-bold">{rentalDays} {rentalDays === 1 ? 'DAY' : 'DAYS'}</span>
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {DURATION_DIALS.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleSelectDays(d)}
                      className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all focus-ring ${
                        rentalDays === d
                          ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)] border-amber-400 scale-105'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Ticket */}
            <div className="lg:col-span-5 bg-black/70 rounded-2xl p-6 border border-white/10 space-y-4">
              
              <div className="border-b border-white/10 pb-3 flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase">CHECKOUT TICKET</span>
                <span className="text-slate-500">REF #8821</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Gear:</span>
                  <span className="text-white font-bold truncate max-w-[150px]">{selectedGear.name}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Daily Rate:</span>
                  <span className="text-white font-bold">{formatCurrency(selectedGear.dailyRate)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Rental Duration:</span>
                  <span className="text-white font-bold">{rentalDays} Days</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                  <span>Rental Subtotal:</span>
                  <span className="text-white font-bold">{formatCurrency(rentalFee)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Refundable Deposit:</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{formatCurrency(depositAmount)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL CHECKOUT DUE:</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight mb-4">
                  {formatCurrency(grandTotal)}
                </div>

                <a
                  href="#film-strip"
                  onClick={() => soundFx.playClickSound()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest text-center block shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                >
                  Reserve Equipment Now &rarr;
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
