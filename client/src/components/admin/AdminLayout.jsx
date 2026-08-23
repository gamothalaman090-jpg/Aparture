import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, LayoutDashboard, Sliders, ShoppingBag, Layers, LogOut, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { soundFx } from '../../services/audioService.js';
import CustomCursor from '../landing/CustomCursor.jsx';

export default function AdminLayout({ children }) {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'OVERVIEW', path: '/admin', icon: LayoutDashboard },
    { label: 'INVENTORY FLEET', path: '/admin/inventory', icon: Sliders },
    { label: 'ORDERS MANAGER', path: '/admin/orders', icon: ShoppingBag },
    { label: 'CATEGORIES', path: '/admin/categories', icon: Layers },
  ];

  const handleLogout = () => {
    soundFx.playClickSound();
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans flex flex-col md:flex-row overflow-x-hidden">
      <CustomCursor />

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 glass-panel-cinema border-r border-white/10 p-6 flex flex-col justify-between shrink-0 z-20">
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <Link to="/" onClick={() => soundFx.playClickSound()} className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-[0.2em] uppercase font-display text-white">
                APERTURE
              </div>
              <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                STUDIO COMMAND
              </div>
            </div>
          </Link>

          {/* Nav List */}
          <nav className="space-y-1.5 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => soundFx.playClickSound()}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold tracking-wider transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* User Account Info Footer */}
        <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 font-bold text-xs">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="truncate">
              <div className="text-white font-bold truncate">{user?.name || 'Studio Admin'}</div>
              <div className="text-[10px] text-amber-400 flex items-center space-x-1 uppercase font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Level 1</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <Link to="/catalog" onClick={() => soundFx.playClickSound()} className="text-slate-400 hover:text-cyan-400 flex items-center space-x-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Public Store</span>
            </Link>

            <button onClick={handleLogout} className="text-rose-400 hover:underline flex items-center space-x-1">
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
