import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, User, LogOut, ShieldCheck, ShoppingBag, Film } from 'lucide-react';
import { soundFx } from '../../services/audioService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartTotals } = useCart();
  const navigate = useNavigate();
  const cartTotals = getCartTotals();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = () => {
    soundFx.playClickSound();
  };

  const handleLogout = () => {
    soundFx.playClickSound();
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-out)' }}
    >
      <div className="flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-2.5 rounded-full backdrop-blur-2xl border transition-all shadow-2xl bg-black/80 border-white/15 text-white">
        
        {/* Brand */}
        <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="text-xs font-extrabold tracking-[0.2em] uppercase whitespace-nowrap font-display text-white">
            APERTURE
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300">
          <Link to="/catalog" onClick={handleNavClick} className="hover:text-cyan-400 transition-colors flex items-center space-x-1">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span>Catalog</span>
          </Link>
          <a href="/#film-strip" onClick={handleNavClick} className="hover:text-cyan-400 transition-colors">
            Fleet
          </a>
          <a href="/#rig-builder" onClick={handleNavClick} className="hover:text-cyan-400 transition-colors">
            Rig Builder
          </a>
          <a href="/#tactile-calculator" onClick={handleNavClick} className="hover:text-cyan-400 transition-colors">
            Calculator
          </a>
        </div>

        {/* Action Group: Cart & Auth */}
        <div className="flex items-center space-x-3">
          
          {/* Cart Counter Badge */}
          <Link
            to="/cart"
            onClick={handleNavClick}
            className="relative p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Rental Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartTotals.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-mono font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                {cartTotals.itemCount}
              </span>
            )}
          </Link>

          {/* User Auth Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  soundFx.playClickSound();
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono font-bold transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-black font-extrabold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate text-slate-200">{user.name}</span>
                {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 glass-panel-cinema rounded-2xl p-2 border border-white/15 shadow-2xl text-xs font-mono space-y-1">
                  <div className="px-3 py-2 border-b border-white/10 text-[10px] text-slate-400">
                    <div>{user.name}</div>
                    <div className="text-cyan-400 font-bold uppercase">{user.role} Account</div>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => {
                      handleNavClick();
                      setUserMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-xl hover:bg-white/10 text-cyan-400 font-bold"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/catalog"
                    onClick={() => {
                      handleNavClick();
                      setUserMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white"
                  >
                    Browse Catalog
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => {
                        handleNavClick();
                        setUserMenuOpen(false);
                      }}
                      className="block px-3 py-2 rounded-xl hover:bg-amber-500/20 text-amber-300 font-bold"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/20 text-rose-300 font-bold flex items-center space-x-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                onClick={handleNavClick}
                className="px-3 py-1.5 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                onClick={handleNavClick}
                className="px-4 py-2 font-bold text-[10px] uppercase tracking-widest rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
