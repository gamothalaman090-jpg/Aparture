import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Calculator, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

const SAMPLE_GEAR = [
  { id: 'fx3', name: 'Sony FX3 Cinema Camera', dailyRate: 110, deposit: 500, brand: 'Sony' },
  { id: 'r5c', name: 'Canon EOS R5 C 8K Hybrid', dailyRate: 125, deposit: 600, brand: 'Canon' },
  { id: 'red', name: 'RED Komodo 6K Cinema Package', dailyRate: 210, deposit: 1200, brand: 'RED' },
  { id: 'gm', name: 'Sony FE 24-70mm f/2.8 GM II', dailyRate: 45, deposit: 250, brand: 'Sony' },
  { id: 'mavic', name: 'DJI Mavic 3 Pro Cine Drone', dailyRate: 150, deposit: 700, brand: 'DJI' },
];

export default function RentalCalculator() {
  const [selectedGear, setSelectedGear] = useState(SAMPLE_GEAR[0]);
  const [rentalDays, setRentalDays] = useState(3);
  const totalFeeRef = useRef(null);
  const depositRef = useRef(null);

  // Compute pricing
  const subtotalRentalFee = selectedGear.dailyRate * rentalDays;
  const depositAmount = selectedGear.deposit;
  const totalAmountDue = subtotalRentalFee + depositAmount;

  const previousTotal = useRef(totalAmountDue);

  useEffect(() => {
    // Anime.js number animation when pricing updates
    const animObj = { val: previousTotal.current };
    anime({
      targets: animObj,
      val: totalAmountDue,
      round: 1,
      duration: 600,
      easing: 'easeOutQuad',
      update: () => {
        if (totalFeeRef.current) {
          totalFeeRef.current.innerText = formatCurrency(animObj.val);
        }
      },
    });
    previousTotal.current = totalAmountDue;
  }, [totalAmountDue]);

  return (
    <section id="calculator" className="py-20 bg-studio-950 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-studio-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Instant Rental Estimator
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Select your camera equipment and rental duration. Zero hidden service fees. Security deposit is 100% refunded upon equipment return.
          </p>
        </div>

        {/* Calculator Widget Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-studio-800 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Gear Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold">
                  1. Select Camera or Lens Package
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {SAMPLE_GEAR.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedGear(item)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between focus-ring ${
                        selectedGear.id === item.id
                          ? 'bg-studio-850 border-cyan-500 text-white shadow-studio-glow'
                          : 'bg-studio-900/60 border-studio-800 text-slate-300 hover:border-studio-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-amberGold-400 font-bold font-mono">{formatCurrency(item.dailyRate)}/day</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rental Duration Slider (FR18: 1 to 14 days) */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold">
                    2. Duration (Min 1 - Max 14 Days)
                  </label>
                  <span className="px-3 py-1 rounded-lg bg-amberGold-500/10 text-amberGold-400 font-mono font-bold text-xs border border-amberGold-500/20">
                    {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full h-2 bg-studio-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus-ring"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 Day (Shoot)</span>
                  <span>7 Days (Weekly)</span>
                  <span>14 Days (Max Limit)</span>
                </div>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 bg-studio-900/90 rounded-2xl p-6 border border-studio-800 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between border-b border-studio-800 pb-3 mb-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ESTIMATE BREAKDOWN</span>
                  <Sparkles className="w-4 h-4 text-amberGold-400" />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Equipment:</span>
                    <span className="font-semibold text-white truncate max-w-[160px] text-right">{selectedGear.name}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Daily Rate:</span>
                    <span className="font-mono text-white">{formatCurrency(selectedGear.dailyRate)} / day</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Duration:</span>
                    <span className="font-mono text-white">{rentalDays} Days</span>
                  </div>

                  <div className="flex justify-between text-slate-300 pt-2 border-t border-studio-800">
                    <span>Rental Subtotal:</span>
                    <span className="font-mono font-bold text-white">{formatCurrency(subtotalRentalFee)}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center space-x-1">
                      <span>Refundable Deposit:</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <span className="font-mono font-bold text-amberGold-400">{formatCurrency(depositAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Total Card */}
              <div className="mt-6 pt-4 border-t border-studio-800">
                <div className="text-[11px] text-slate-400 mb-1">Total Checkout Amount (Rental + Deposit):</div>
                <div
                  ref={totalFeeRef}
                  className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight mb-4"
                >
                  {formatCurrency(totalAmountDue)}
                </div>

                <a
                  href="#catalog"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs text-center block shadow-studio-glow focus-ring transition-all"
                >
                  Reserve This Gear Now &rarr;
                </a>

                <div className="mt-3 flex items-center justify-center space-x-1.5 text-[10px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Deposit Refunded Upon Safe Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
