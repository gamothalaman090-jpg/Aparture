import React, { useState } from 'react';
import { Camera, Disc, Tv, ShieldCheck, Plus, Check, RotateCcw, Wrench } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

const BODIES = [
  { id: 'fx3', name: 'Sony FX3 Cinema Body', rate: 110, deposit: 500, weight: '715g', mount: 'Sony E' },
  { id: 'r5c', name: 'Canon EOS R5 C Body', rate: 125, deposit: 600, weight: '680g', mount: 'Canon RF' },
  { id: 'komodo', name: 'RED Komodo 6K Body', rate: 210, deposit: 1200, weight: '950g', mount: 'Canon RF' },
];

const LENSES = [
  { id: 'gm2470', name: 'Sony 24-70mm f/2.8 GM II', rate: 45, deposit: 250, weight: '695g' },
  { id: 'canon50', name: 'Canon RF 50mm f/1.2 L USM', rate: 40, deposit: 220, weight: '950g' },
  { id: 'cooke35', name: 'Cooke Anamorphic/i 35mm T2.3', rate: 180, deposit: 1500, weight: '1800g' },
];

const MONITORS = [
  { id: 'shinobi', name: 'Atomos Ninja V 5" 4K Monitor', rate: 25, deposit: 120, weight: '360g' },
  { id: 'smallhd', name: 'SmallHD 702 Touch 7" Monitor', rate: 45, deposit: 250, weight: '510g' },
  { id: 'none', name: 'No External Monitor', rate: 0, deposit: 0, weight: '0g' },
];

const GIMBALS = [
  { id: 'rs3', name: 'DJI RS 3 Pro Gimbal Stabilizer', rate: 35, deposit: 180, weight: '1500g' },
  { id: 'easyrig', name: 'EasyRig Vario 5 Support System', rate: 65, deposit: 400, weight: '3100g' },
  { id: 'none', name: 'Handheld / Tripod Mount', rate: 0, deposit: 0, weight: '0g' },
];

export default function ModularRigBuilder() {
  const [selectedBody, setSelectedBody] = useState(BODIES[0]);
  const [selectedLens, setSelectedLens] = useState(LENSES[0]);
  const [selectedMonitor, setSelectedMonitor] = useState(MONITORS[0]);
  const [selectedGimbal, setSelectedGimbal] = useState(GIMBALS[2]); // None

  // Combined totals
  const totalDailyRate = selectedBody.rate + selectedLens.rate + selectedMonitor.rate + selectedGimbal.rate;
  const totalDeposit = selectedBody.deposit + selectedLens.deposit + selectedMonitor.deposit + selectedGimbal.deposit;

  return (
    <section id="rig-builder" className="py-20 bg-studio-900/50 border-b border-studio-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>// MODULAR RIG ASSEMBLER</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Build Your Production Flight Case
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mt-2 md:mt-0 leading-relaxed font-mono">
            Custom modular assembly. Snap together camera bodies, cinema lenses, field monitors & stabilizer rigs in real time.
          </p>
        </div>

        {/* Tactical Pelican Flight Case Layout */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-studio-800 shadow-2xl bg-studio-950/90">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Selection Columns (Modules) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Module 1: Camera Body */}
              <div>
                <span className="text-xs font-mono text-amberGold-400 font-bold uppercase block mb-2">
                  MODULE A: CAMERA BODY
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BODIES.map((body) => (
                    <button
                      key={body.id}
                      onClick={() => setSelectedBody(body)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedBody.id === body.id
                          ? 'bg-studio-850 border-cyan-500 text-white shadow-studio-glow'
                          : 'bg-studio-900 border-studio-800 text-slate-300 hover:border-studio-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span>{body.name}</span>
                        {selectedBody.id === body.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-studio-800">
                        <span>{body.weight}</span>
                        <span className="text-amberGold-400 font-bold">{formatCurrency(body.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module 2: Optical Lens */}
              <div>
                <span className="text-xs font-mono text-amberGold-400 font-bold uppercase block mb-2">
                  MODULE B: CINEMA LENS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LENSES.map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => setSelectedLens(lens)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedLens.id === lens.id
                          ? 'bg-studio-850 border-cyan-500 text-white shadow-studio-glow'
                          : 'bg-studio-900 border-studio-800 text-slate-300 hover:border-studio-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span className="truncate">{lens.name}</span>
                        {selectedLens.id === lens.id && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-studio-800">
                        <span>{lens.weight}</span>
                        <span className="text-amberGold-400 font-bold">{formatCurrency(lens.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module 3: Monitor & Gimbal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <span className="text-xs font-mono text-amberGold-400 font-bold uppercase block mb-2">
                    MODULE C: MONITOR
                  </span>
                  <div className="space-y-2">
                    {MONITORS.map((mon) => (
                      <button
                        key={mon.id}
                        onClick={() => setSelectedMonitor(mon)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all focus-ring flex items-center justify-between ${
                          selectedMonitor.id === mon.id
                            ? 'bg-studio-850 border-cyan-500 text-white'
                            : 'bg-studio-900 border-studio-800 text-slate-400'
                        }`}
                      >
                        <span className="truncate">{mon.name}</span>
                        <span className="text-amberGold-400 font-bold ml-2">+{formatCurrency(mon.rate)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-amberGold-400 font-bold uppercase block mb-2">
                    MODULE D: STABILIZER
                  </span>
                  <div className="space-y-2">
                    {GIMBALS.map((gim) => (
                      <button
                        key={gim.id}
                        onClick={() => setSelectedGimbal(gim)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all focus-ring flex items-center justify-between ${
                          selectedGimbal.id === gim.id
                            ? 'bg-studio-850 border-cyan-500 text-white'
                            : 'bg-studio-900 border-studio-800 text-slate-400'
                        }`}
                      >
                        <span className="truncate">{gim.name}</span>
                        <span className="text-amberGold-400 font-bold ml-2">+{formatCurrency(gim.rate)}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Summary Console */}
            <div className="lg:col-span-4 bg-studio-900 rounded-2xl p-6 border border-studio-800 flex flex-col justify-between">
              <div>
                <div className="border-b border-studio-800 pb-3 mb-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">RIG SPECIFICATIONS</span>
                  <span className="text-[10px] font-mono text-slate-400">FLIGHT CASE #1</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-studio-950 border border-studio-800 flex justify-between">
                    <span className="text-slate-400">Body:</span>
                    <span className="text-white font-bold truncate max-w-[130px]">{selectedBody.name}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-studio-950 border border-studio-800 flex justify-between">
                    <span className="text-slate-400">Lens:</span>
                    <span className="text-white font-bold truncate max-w-[130px]">{selectedLens.name}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-studio-950 border border-studio-800 flex justify-between">
                    <span className="text-slate-400">Monitor:</span>
                    <span className="text-white font-bold truncate max-w-[130px]">{selectedMonitor.name}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-studio-950 border border-studio-800 flex justify-between">
                    <span className="text-slate-400">Gimbal:</span>
                    <span className="text-white font-bold truncate max-w-[130px]">{selectedGimbal.name}</span>
                  </div>
                </div>
              </div>

              {/* Total Box */}
              <div className="mt-6 pt-4 border-t border-studio-800">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
                  <span>Combined Daily Rate:</span>
                  <span className="text-amberGold-400 font-bold text-base">{formatCurrency(totalDailyRate)} / day</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-4">
                  <span>Required Deposit Hold:</span>
                  <span className="text-cyan-400 font-bold">{formatCurrency(totalDeposit)}</span>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono shadow-studio-glow focus-ring transition-all">
                  Reserve Custom Package &rarr;
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
