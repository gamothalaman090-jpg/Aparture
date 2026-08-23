import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { soundFx } from '../services/audioService.js';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const user = await register(name, email, password, phone);
      showToast(`Account created! Welcome to Aperture, ${user.name}!`, 'success');
      navigate('/catalog');
    } catch (err) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setSubmitting(false);
    }
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
            Create Cinematographer Account
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Unlock date-locked reservations & verified gear reviews.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel-cinema rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>FULL NAME</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Vance"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>EMAIL ADDRESS</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@studio.com"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>PHONE NUMBER</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>PASSWORD</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>CONFIRM PASSWORD</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 mt-4"
            >
              <span>{submitting ? 'CREATING ACCOUNT...' : 'REGISTER ACCOUNT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs font-mono text-slate-400 border-t border-white/10">
            Already have an account?{' '}
            <Link to="/login" onClick={() => soundFx.playClickSound()} className="text-cyan-400 font-bold hover:underline">
              Sign In &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
