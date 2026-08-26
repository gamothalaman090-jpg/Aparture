import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Film, RefreshCw, X } from 'lucide-react';
import api from '../services/api.js';
import { fetchProducts } from '../services/productService.js';
import CameraCard from '../components/catalog/CameraCard.jsx';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';
import { soundFx } from '../services/audioService.js';

export default function CatalogPage() {
  const [cameras, setCameras] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const fetchCatalogData = async () => {
    setLoading(true);
    try {
      const [productList, catRes] = await Promise.all([
        fetchProducts(),
        api.get('/categories').catch(() => []),
      ]);

      setCameras(productList);

      const rawCats = Array.isArray(catRes) ? catRes : catRes.data || [];
      if (rawCats.length > 0) {
        setCategories(rawCats);
      } else {
        setCategories([
          { _id: 'cat_cinema', name: 'Cinema Cameras' },
          { _id: 'cat_mirrorless', name: 'Mirrorless Bodies' },
          { _id: 'cat_lenses', name: 'Cinema & Photo Lenses' },
          { _id: 'cat_drones', name: 'Aerial Drones & Gimbals' },
        ]);
      }
    } catch (err) {
      console.error('Error loading catalog data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    soundFx.playDialTickSound(1);
  };

  const resetFilters = () => {
    soundFx.playClickSound();
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setMaxPrice(300);
    setSortBy('rating');
  };

  // Array Filter Matrix
  const filteredCameras = cameras
    .filter((cam) => {
      const matchesSearch =
        !searchQuery ||
        cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cam.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cam.specs?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'all' ||
        cam.category?._id === selectedCategory ||
        cam.category?.name?.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesBrand = selectedBrand === 'all' || cam.brand?.toLowerCase() === selectedBrand.toLowerCase();

      const matchesCondition = selectedCondition === 'all' || cam.condition === selectedCondition;

      const matchesPrice = (cam.dailyRate || 0) <= maxPrice;

      return matchesSearch && matchesCat && matchesBrand && matchesCondition && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return (b.averageRating || 5) - (a.averageRating || 5);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const uniqueBrands = Array.from(new Set(cameras.map((c) => c.brand).filter(Boolean)));

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5 justify-center md:justify-start">
              <Film className="w-3.5 h-3.5" />
              <span>// PRODUCTION FLEET CATALOG</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Master Cinema Inventory
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2 max-w-xl">
              Inspect specs, check real-time availability, and reserve camera bodies, optics, and flight case packages.
            </p>
          </div>

          <div className="mt-6 md:mt-0 font-mono text-xs text-slate-400 flex items-center justify-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span>SHOWING</span>
            <span className="text-amber-400 font-bold text-sm">{filteredCameras.length}</span>
            <span>OF {cameras.length} GEAR ITEMS</span>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="glass-panel-cinema rounded-3xl p-6 mb-10 border border-white/10 space-y-5">
          
          {/* Top Bar: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            {/* Search Field */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sony FX3, RED 6K, Anamorphic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end font-mono text-xs">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 uppercase hidden sm:inline">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  soundFx.playDialTickSound(1.2);
                }}
                className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="rating">TOP RATED</option>
                <option value="price-asc">RATE: LOW TO HIGH</option>
                <option value="price-desc">RATE: HIGH TO LOW</option>
                <option value="name">NAME: A TO Z</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 font-mono text-xs">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 py-1.5 rounded-xl uppercase transition-all font-bold focus-ring ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              ALL FLEET ({cameras.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategorySelect(cat._id)}
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all font-bold focus-ring ${
                  selectedCategory === cat._id
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Brand, Condition, Max Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs items-center">
            
            {/* Brand Filter */}
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">BRAND</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">ALL BRANDS</option>
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">CONDITION</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">ALL CONDITIONS</option>
                <option value="new">NEW / MINT</option>
                <option value="good">GOOD / PRODUCTION READY</option>
                <option value="fair">FAIR / WORKHORSE</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold mb-1">
                <span>MAX DAILY RATE</span>
                <span className="text-amber-400 font-bold">${maxPrice}/day</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

          </div>

          {/* Reset Filters Link */}
          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedCondition !== 'all' || maxPrice < 300) && (
            <div className="flex justify-end pt-2">
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>RESET ALL FILTERS</span>
              </button>
            </div>
          )}

        </div>

        {/* Catalog Items Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              FETCHING PRODUCTION FLEET...
            </p>
          </div>
        ) : filteredCameras.length === 0 ? (
          <div className="glass-panel-cinema rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <Filter className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white font-display">No Gear Matches Criteria</h3>
            <p className="text-xs font-mono text-slate-400">
              Try adjusting your search terms, category filters, or daily rate threshold.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCameras.map((cam) => (
              <CameraCard key={cam._id || cam.id} camera={cam} />
            ))}
          </div>
        )}

      </main>

      <ApertureFooter />
    </div>
  );
}
