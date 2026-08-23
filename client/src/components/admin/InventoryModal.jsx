import React, { useState, useEffect } from 'react';
import { X, Save, Sliders, Image, DollarSign, Package } from 'lucide-react';
import api from '../../services/api.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function InventoryModal({ camera, categories, onClose, onSaveSuccess }) {
  const { showToast } = useToast();
  const isEditing = !!camera;

  const [name, setName] = useState(camera?.name || '');
  const [brand, setBrand] = useState(camera?.brand || 'Sony');
  const [categoryId, setCategoryId] = useState(camera?.categoryId?._id || camera?.categoryId || (categories?.[0]?._id || ''));
  const [dailyRate, setDailyRate] = useState(camera?.dailyRate || 100);
  const [depositAmount, setDepositAmount] = useState(camera?.depositAmount || 500);
  const [stockQuantity, setStockQuantity] = useState(camera?.stockQuantity || 3);
  const [condition, setCondition] = useState(camera?.condition || 'new');
  const [description, setDescription] = useState(camera?.description || '');
  const [imageUrl, setImageUrl] = useState(camera?.imageUrl || camera?.imageUrls?.[0] || '/images/cinema_rig_onset.jpg');
  const [specsText, setSpecsText] = useState(
    Array.isArray(camera?.specs)
      ? camera.specs.join(', ')
      : typeof camera?.specs === 'object'
      ? Object.values(camera.specs).join(', ')
      : 'Full-Frame Sensor, 4K 120fps, S-Cinetone'
  );

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    setSubmitting(true);

    try {
      const payload = {
        name,
        brand,
        categoryId,
        dailyRate: Number(dailyRate),
        depositAmount: Number(depositAmount),
        stockQuantity: Number(stockQuantity),
        condition,
        description,
        imageUrl,
        specs: specsText.split(',').map((s) => s.trim()).filter(Boolean),
      };

      let res;
      if (isEditing) {
        res = await api.put(`/cameras/${camera._id || camera.id}`, payload);
      } else {
        res = await api.post('/cameras', payload);
      }

      if (res.success || res._id || res.data) {
        soundFx.playSnapSound();
        showToast(`Equipment ${isEditing ? 'updated' : 'created'} successfully!`, 'success');
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      } else {
        throw new Error(res.message || 'Operation failed');
      }
    } catch (err) {
      showToast(err.message || 'Error saving gear item', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-white/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto font-mono text-xs">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest block mb-1">
            FLEET INVENTORY EDITOR
          </span>
          <h2 className="text-xl font-bold text-white font-display">
            {isEditing ? `Edit ${camera.name}` : 'Register New Camera Gear'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">CAMERA NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Sony FX3 Cinema Body"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">BRAND</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                placeholder="Sony / Canon / RED / DJI"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">DAILY RATE ($/day)</label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">SECURITY DEPOSIT ($)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">STOCK UNITS</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">CATEGORY</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                {categories?.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id} className="bg-black text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">CONDITION</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="new" className="bg-black text-white">New (Mint Condition)</option>
                <option value="good" className="bg-black text-white">Good (Tested & Calibrated)</option>
                <option value="fair" className="bg-black text-white">Fair (Minor Cosmetic Scratches)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">IMAGE URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/cinema_rig_onset.jpg or https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">KEY SPECS (COMMA SEPARATED)</label>
            <input
              type="text"
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              placeholder="Full-Frame CMOS, 4K 120p, Dual Native ISO 800/12800"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed equipment description..."
              className="w-full p-4 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'SAVING...' : 'SAVE GEAR'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
