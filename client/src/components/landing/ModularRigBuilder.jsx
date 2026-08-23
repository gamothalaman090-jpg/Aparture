import React, { useState } from 'react';
import { Camera, Disc, Tv, ShieldCheck, Plus, Check, RotateCcw, Wrench, PackageCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';

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

  const handleSelectBody = (item) => {
    setSelectedBody(item);
    soundFx.playSnapSound();
  };

  const handleSelectLens = (item) => {
    setSelectedLens(item);
    soundFx.playSnapSound();
  };

  const handleSelectMonitor = (item) => {
    setSelectedMonitor(item);
    soundFx.playSnapSound();
  };

  const handleSelectGimbal = (item) => {
    setSelectedGimbal(item);
    soundFx.playSnapSound();
  };

  return (
    <section id="rig-builder" className="py-24 bg-[#0A0A0E] border-b border-white/10 relative">
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
        <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Selection Columns (Modules) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Module 1: Camera Body */}
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-2">
                  MODULE A: CAMERA BODY
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BODIES.map((body) => (
                    <button
                      key={body.id}
                      onClick={() => handleSelectBody(body)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedBody.id === body.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span>{body.name}</span>
                        {selectedBody.id === body.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-white/10">
                        <span>{body.weight}</span>
                        <span className="text-amber-400 font-bold">{formatCurrency(body.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module 2: Optical Lens */}
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-2">
                  MODULE B: CINEMA LENS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LENSES.map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => handleSelectLens(lens)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedLens.id === lens.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span>{lens.name}</span>
                        {selectedLens.id === lens.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-white/10">
                        <span>{lens.weight}</span>
                        <span className="text-amber-400 font-bold">{formatCurrency(lens.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module 3: Field Monitor */}
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-2">
                  MODULE C: FIELD MONITOR & RECORDER
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MONITORS.map((mon) => (
                    <button
                      key={mon.id}
                      onClick={() => handleSelectMonitor(mon)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedMonitor.id === mon.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span>{mon.name}</span>
                        {selectedMonitor.id === mon.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-white/10">
                        <span>{mon.weight}</span>
                        <span className="text-amber-400 font-bold">{formatCurrency(mon.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module 4: Support / Gimbal */}
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-2">
                  MODULE D: RIG STABILIZER & SUPPORT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {GIMBALS.map((gimbal) => (
                    <button
                      key={gimbal.id}
                      onClick={() => handleSelectGimbal(gimbal)}
                      className={`p-3.5 rounded-xl border text-left transition-all focus-ring ${
                        selectedGimbal.id === gimbal.id
                          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                        <span>{gimbal.name}</span>
                        {selectedGimbal.id === gimbal.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-2 border-t border-white/10">
                        <span>{gimbal.weight}</span>
                        <span className="text-amber-400 font-bold">{formatCurrency(gimbal.rate)}/d</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Live Flight Case Summary */}
            <div className="lg:col-span-4 bg-black/60 rounded-2xl p-6 border border-white/10 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <PackageCheck className="w-4 h-4" />
                    <span>FLIGHT CASE MANIFEST</span>
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                    READY
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-slate-400">Body:</span>
                    <span className="font-bold text-white">{selectedBody.name}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-slate-400">Lens:</span>
                    <span className="font-bold text-white">{selectedLens.name}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-slate-400">Monitor:</span>
                    <span className="font-bold text-white">{selectedMonitor.name}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-slate-400">Support:</span>
                    <span className="font-bold text-white">{selectedGimbal.name}</span>
                  </div>
                </div>
              </div>

              {/* Total Box */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs uppercase text-slate-400">Daily Flight Rate:</span>
                  <span className="text-2xl font-extrabold text-amber-400">
                    {formatCurrency(totalDailyRate)}
                    <span className="text-xs text-slate-400 font-normal">/day</span>
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                  <span>Refundable Hold:</span>
                  <span className="text-slate-200 font-bold">{formatCurrency(totalDeposit)}</span>
                </div>

                <a
                  href="#tactile-calculator"
                  onClick={() => soundFx.playClickSound()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <span>LOCK IN FLIGHT CASE</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
