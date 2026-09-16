import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Command,
  Camera,
  ShoppingBag,
  History,
  Shield,
  Sliders,
  Sparkles,
  Zap,
  ArrowRight,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { soundFx } from '../../services/audioService.js';
import { createCameraFlashDOM, createParticleExplosion } from '../../utils/domFx.js';

const QUICK_ACTIONS = [
  { id: 'catalog', title: 'Browse Full Gear Catalog', path: '/catalog', category: 'Navigation', icon: Camera },
  { id: 'cart', title: 'Review Rental Cart & Basket', path: '/cart', category: 'Navigation', icon: ShoppingBag },
  { id: 'orders', title: 'View Rental History & Active Bookings', path: '/orders', category: 'Navigation', icon: History },
  { id: 'admin', title: 'Admin Command Center', path: '/admin', category: 'Admin', icon: Shield },
  { id: 'fx_shutter', title: 'Trigger Camera Shutter & DOM Flash', action: 'shutter', category: 'DOM Tools', icon: Zap },
  { id: 'fx_particles', title: 'Fire DOM Particle Explosion', action: 'particles', category: 'DOM Tools', icon: Sparkles },
];

const POPULAR_CAMERAS = [
  { name: 'Sony FX3 Full-Frame Cinema Body', brand: 'Sony', rate: '$110/day', path: '/catalog' },
  { name: 'RED Komodo 6K Cinema Package', brand: 'RED', rate: '$195/day', path: '/catalog' },
  { name: 'ARRI Alexa Mini LF Cinema Kit', brand: 'ARRI', rate: '$380/day', path: '/catalog' },
  { name: 'Canon EOS R5 C 8K Hybrid Body', brand: 'Canon', rate: '$95/day', path: '/catalog' },
  { name: 'Blackmagic Cinema Camera 6K Pro', brand: 'Blackmagic', rate: '$75/day', path: '/catalog' },
];

export default function DomCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Global DOM Keyboard Event Listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        soundFx.playClickSound();
      }

      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredActions = QUICK_ACTIONS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCameras = POPULAR_CAMERAS.filter(
    (cam) =>
      cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allResults = [
    ...filteredActions.map((a) => ({ ...a, type: 'action' })),
    ...filteredCameras.map((c) => ({ ...c, type: 'camera' })),
  ];

  const handleSelect = (item, e) => {
    soundFx.playSnapSound();
    if (item.action === 'shutter') {
      createCameraFlashDOM({ duration: 300 });
      setIsOpen(false);
      return;
    }
    if (item.action === 'particles') {
      createParticleExplosion(e || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, { count: 32 });
      setIsOpen(false);
      return;
    }

    if (item.path) {
      setIsOpen(false);
      navigate(item.path);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          soundFx.playClickSound();
          setIsOpen(true);
        }}
        title="Open DOM Command Palette (Ctrl+K)"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-cyan-500/40 text-cyan-400 hover:text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all group flex items-center space-x-2"
      >
        <Command className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-cyan-400">
          CMD+K
        </span>
      </button>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 sm:px-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel-cinema w-full max-w-2xl rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col max-h-[80vh] animate-scaleUp"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-black/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, camera, or action (e.g. 'Sony', 'Shutter', 'Cart')..."
            className="w-full bg-transparent text-white placeholder-slate-500 font-mono text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4 max-h-[60vh]">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Quick Actions & DOM Utilities
              </div>
              <div className="mt-1 space-y-1">
                {filteredActions.map((action, idx) => {
                  const Icon = action.icon || Command;
                  return (
                    <button
                      key={action.id}
                      onClick={(e) => handleSelect(action, e)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 text-cyan-400 border border-white/5 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-cyan-300 font-display">
                            {action.title}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase">{action.category}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Popular Inventory Matching */}
          {filteredCameras.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Cameras & Gear Catalog
              </div>
              <div className="mt-1 space-y-1">
                {filteredCameras.map((cam, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleSelect(cam, e)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all hover:bg-amber-500/10 hover:border-amber-500/30 border border-transparent group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-white/5 group-hover:bg-amber-500/20 text-amber-400 border border-white/5 transition-colors">
                        <Camera className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-300 font-display">
                          {cam.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase">{cam.brand}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">{cam.rate}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {allResults.length === 0 && (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No matching gear or command found for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-black/70 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">ESC</kbd> to close
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span className="text-cyan-400 font-bold uppercase text-[10px]">Aperture DOM Palette</span>
        </div>
      </div>
    </div>
  );
}
