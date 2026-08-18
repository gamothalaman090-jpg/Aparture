import React from 'react';
import Navbar from '../components/common/Navbar.jsx';
import TactileViewfinderHero from '../components/landing/TactileViewfinderHero.jsx';
import ModularRigBuilder from '../components/landing/ModularRigBuilder.jsx';
import FilmStripCatalog from '../components/landing/FilmStripCatalog.jsx';
import TactileDialCalculator from '../components/landing/TactileDialCalculator.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import Footer from '../components/common/Footer.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-studio-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-studio-950">
      <Navbar cartCount={0} />
      <main className="flex-grow">
        <TactileViewfinderHero />
        <ModularRigBuilder />
        <FilmStripCatalog />
        <TactileDialCalculator />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
