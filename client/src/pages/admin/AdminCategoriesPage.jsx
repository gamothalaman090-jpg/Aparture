import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit3, Trash2, Save } from 'lucide-react';
import api from '../../services/api.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import AdminLayout from '../../components/admin/AdminLayout.jsx';

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (Array.isArray(res)) {
        setCategories(res);
      }
    } catch {
      // Mock fallback
      setCategories([
        { _id: 'cat1', name: 'Mirrorless Cameras', description: 'Hybrid photo/video bodies.' },
        { _id: 'cat2', name: 'Cinema Cameras', description: 'RAW video cinema packages.' },
        { _id: 'cat3', name: 'Cinema & Photo Lenses', description: 'Primes and zoom lenses.' },
        { _id: 'cat4', name: 'Aerial Drones & Gimbals', description: 'Stabilized flight gear.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const payload = { name, description, imageUrl };
      let res;
      if (editingId) {
        res = await api.put(`/categories/${editingId}`, payload);
      } else {
        res = await api.post('/categories', payload);
      }

      if (res.success || res._id || res.data) {
        soundFx.playSnapSound();
        showToast(`Category ${editingId ? 'updated' : 'created'} successfully!`, 'success');
        resetForm();
        fetchCategories();
      }
    } catch (err) {
      showToast(err.message || 'Error saving category', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cat) => {
    soundFx.playClickSound();
    setEditingId(cat._id || cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.imageUrl || '');
  };

  const handleDelete = async (id, catName) => {
    soundFx.playClickSound();
    if (!window.confirm(`Delete category "${catName}"?`)) return;

    try {
      const res = await api.delete(`/categories/${id}`);
      if (res.success || res.message) {
        soundFx.playSnapSound();
        showToast(`Deleted category ${catName}`, 'info');
        fetchCategories();
      }
    } catch (err) {
      showToast(err.message || 'Error deleting category', 'error');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 font-mono text-xs">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs text-cyan-400 uppercase tracking-widest block mb-1 font-bold">
            // EQUIPMENT CATEGORY TAXONOMY
          </span>
          <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Gear Category Manager
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-5 glass-panel-cinema rounded-3xl p-6 border border-white/10 space-y-4">
            <span className="text-xs text-cyan-400 font-bold uppercase block border-b border-white/10 pb-2">
              {editingId ? 'EDIT CATEGORY' : 'CREATE NEW CATEGORY'}
            </span>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">CATEGORY NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Cinema Primes"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter category description..."
                  className="w-full p-4 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">IMAGE URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{submitting ? 'SAVING...' : 'SAVE CATEGORY'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="lg:col-span-7 glass-panel-cinema rounded-3xl p-6 border border-white/10">
            <span className="text-xs text-slate-400 font-bold uppercase block border-b border-white/10 pb-2 mb-4">
              EXISTING CATEGORIES ({categories.length})
            </span>

            {loading ? (
              <div className="py-12 text-center text-slate-500">LOADING CATEGORIES...</div>
            ) : (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat._id || cat.id} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div>
                      <div className="font-bold text-white text-sm font-display">{cat.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{cat.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id || cat.id, cat.name)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-white/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
