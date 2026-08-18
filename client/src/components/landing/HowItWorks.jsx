import React from 'react';
import { CalendarCheck, Shield, Truck, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Select Gear & Rental Dates',
    desc: 'Browse our cinema cameras and lenses. Pick your exact start and return dates (1 to 14 days) backed by our double-booking prevention engine.',
    icon: CalendarCheck,
  },
  {
    step: '02',
    title: 'Pay Deposit & Confirm',
    desc: 'Review total price breakdown (Daily Rate × Days + Security Deposit). Submit mock checkout for instant reservation approval.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Pick Up or Express Courier',
    desc: 'Collect your camera kit fully charged with sensor pre-cleaned and firmware updated, ready for your production set.',
    icon: Truck,
  },
  {
    step: '04',
    title: 'Shoot & Return for Refund',
    desc: 'Wrap your film shoot and return the kit. Your security deposit is 100% refunded immediately after equipment verification.',
    icon: RotateCcw,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-studio-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">
            // SIMPLE & SECURE PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            How Aperture Rental Works
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Designed for indie filmmakers, production houses, and content creators needing reliable cinema equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="glass-card p-6 rounded-2xl border border-studio-800 relative group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-studio-700 font-mono group-hover:text-amberGold-400 transition-colors">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
