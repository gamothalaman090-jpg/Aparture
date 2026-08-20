import React from 'react';

export default function CoffeeFooter() {
  return (
    <footer id="footer-section" className="py-20 bg-[#F5F5F7] text-slate-400 px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <div className="text-3xl font-bold text-black tracking-tighter font-display">
            BUT FIRST COFFEE
          </div>
          <p className="max-w-sm text-xs font-mono tracking-widest leading-relaxed text-black/60">
            Crafting the ultimate sensory experience for the obsessive coffee lover.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 text-[10px] font-mono uppercase tracking-[0.3em]">
          <div className="space-y-4 flex flex-col">
            <span className="text-black/30 mb-2">Explore</span>
            <a href="#features-section" className="hover:text-black transition-colors">
              The Roast
            </a>
            <a href="#features-section" className="hover:text-black transition-colors">
              Origins
            </a>
            <a href="#features-section" className="hover:text-black transition-colors">
              Brewing
            </a>
          </div>

          <div className="space-y-4 flex flex-col">
            <span className="text-black/30 mb-2">Support</span>
            <a href="#" className="hover:text-black transition-colors">
              Shipping
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Returns
            </a>
            <a href="#" className="hover:text-black transition-colors">
              FAQ
            </a>
          </div>

          <div className="space-y-4 flex flex-col">
            <span className="text-black/30 mb-2">Social</span>
            <a href="#" className="hover:text-black transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-black/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-[#2C1810] tracking-tight mb-1 font-display">
              Get Brewing Tips & Exclusive Drops
            </h3>
            <p className="text-[10px] font-mono text-black/40 uppercase tracking-[0.2em]">
              Join 12,000+ coffee obsessives. No spam, just good beans.
            </p>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="px-5 py-3 rounded-full bg-white border border-black/10 text-sm text-[#2C1810] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#2C1810]/20 w-full md:w-64 font-mono text-xs tracking-wider"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#2C1810] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A0E09] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-black/5 flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.4em] text-black/50">
        <span>© 2026 But First Coffee.</span>
        <span className="text-black font-semibold">Obsessively Focused.</span>
      </div>
    </footer>
  );
}
