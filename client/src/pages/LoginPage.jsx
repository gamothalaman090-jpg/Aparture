import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { soundFx } from '../services/audioService.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    setSubmitting(true);

    try {
      const user = await login(email, password);
      showToast(`Welcome back, ${user.name}!`, 'success');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/catalog');
      }
    } catch (err) {
      showToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const fillCustomerDemo = () => {
    setEmail('alex@creatives.com');
    setPassword('customer123');
    soundFx.playClickSound();
  };

  const fillAdminDemo = () => {
    setEmail('admin@aperture.com');
    setPassword('admin123');
    soundFx.playClickSound();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Background Cyan Lens Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" onClick={() => soundFx.playClickSound()} className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-xl font-extrabold tracking-[0.2em] uppercase font-display text-white">
              APERTURE
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-6 font-display">
            Access Rental Console
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Sign in to check gear availability & manage reservations.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel-cinema rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>EMAIL ADDRESS</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cinematographer@aperture.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>PASSWORD</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
            >
              <span>{submitting ? 'AUTHENTICATING...' : 'SIGN IN TO CONSOLE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block text-center">
              DEMO ACCESS ASSISTANT
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={fillCustomerDemo}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 flex items-center justify-center space-x-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>CUSTOMER</span>
              </button>
              <button
                type="button"
                onClick={fillAdminDemo}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>ADMIN</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-xs font-mono text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" onClick={() => soundFx.playClickSound()} className="text-cyan-400 font-bold hover:underline">
              Create Account &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
