import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, Sliders, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '../../services/api.js';
import { formatCurrency } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import InventoryModal from '../../components/admin/InventoryModal.jsx';

export default function AdminInventoryPage() {
  const { showToast } = useToast();
  const [cameras, setCameras] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedCameraForEdit, setSelectedCameraForEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const [camRes, catRes] = await Promise.all([
        api.get('/cameras'),
        api.get('/categories'),
      ]);

      if (camRes.success && Array.isArray(camRes.data)) {
        setCameras(camRes.data);
      } else if (Array.isArray(camRes)) {
        setCameras(camRes);
      }

      if (catRes.success && Array.isArray(catRes.data)) {
        setCategories(catRes.data);
      } else if (Array.isArray(catRes)) {
        setCategories(catRes);
      }
    } catch {
      // Mock data fallback
      setCameras([
        {
          _id: 'c1',
          name: 'Sony FX3 Cinema Camera',
          brand: 'Sony',
          dailyRate: 110,
          depositAmount: 500,
          stockQuantity: 3,
          condition: 'new',
          imageUrl: '/images/cinema_rig_onset.jpg',
          category: { name: 'Cinema Cameras' },
        },
        {
          _id: 'c2',
          name: 'Canon EOS R5 C',
          brand: 'Canon',
          dailyRate: 125,
          depositAmount: 600,
          stockQuantity: 2,
          condition: 'good',
          imageUrl: '/images/wireless_follow_focus.jpg',
          category: { name: 'Mirrorless Cameras' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCamera = async (id, name) => {
    soundFx.playClickSound();
    if (!window.confirm(`Are you sure you want to retire camera "${name}" from the fleet?`)) return;

    try {
      const res = await api.delete(`/cameras/${id}`);
      if (res.success || res.message) {
        soundFx.playSnapSound();
        showToast(`Retired ${name} from inventory`, 'info');
        fetchInventory();
      }
    } catch (err) {
      showToast(err.message || 'Error deleting camera', 'error');
    }
  };

  const handleOpenAddModal = () => {
    soundFx.playClickSound();
    setSelectedCameraForEdit(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (camera) => {
    soundFx.playClickSound();
    setSelectedCameraForEdit(camera);
    setModalOpen(true);
  };

  const filteredCameras = cameras.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1 font-bold">
              // FLEET INVENTORY MANAGEMENT
            </span>
            <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
              Camera Gear Master List
            </h1>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-mono text-xs uppercase tracking-widest flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Gear</span>
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear title or brand..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">{filteredCameras.length} Items</span>
        </div>

        {/* Inventory Master Table */}
        <div className="glass-panel-cinema rounded-3xl p-6 border border-white/10">
          {loading ? (
            <div className="py-16 text-center font-mono text-xs text-slate-500">
              LOADING INVENTORY FLEET...
            </div>
          ) : filteredCameras.length === 0 ? (
            <div className="py-16 text-center font-mono text-xs text-slate-400 space-y-3">
              <div>No gear items match search query "{searchQuery}".</div>
              <button onClick={handleOpenAddModal} className="text-cyan-400 hover:underline">
                + Add Equipment
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                    <th className="pb-3 pl-2">Equipment Unit</th>
                    <th className="pb-3">Brand</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Daily Rate</th>
                    <th className="pb-3">Deposit</th>
                    <th className="pb-3">Stock Units</th>
                    <th className="pb-3">Condition</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredCameras.map((cam) => (
                    <tr key={cam._id || cam.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={cam.imageUrl || cam.imageUrls?.[0] || '/images/cinema_rig_onset.jpg'}
                            alt={cam.name}
                            className="w-10 h-10 rounded-lg object-cover border border-white/10"
                          />
                          <span className="font-bold text-white line-clamp-1">{cam.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 font-bold text-cyan-400">{cam.brand}</td>
                      <td className="py-3.5 text-slate-400">{cam.category?.name || 'Gear'}</td>
                      <td className="py-3.5 font-bold text-amber-400">{formatCurrency(cam.dailyRate)}/d</td>
                      <td className="py-3.5 text-slate-300">{formatCurrency(cam.depositAmount)}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold">
                          {cam.stockQuantity} Units
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {cam.condition || 'New'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2 space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(cam)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 hover:border-cyan-400/50"
                          title="Edit Equipment"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCamera(cam._id || cam.id, cam.name)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-white/10 hover:border-rose-500/50"
                          title="Retire Equipment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {modalOpen && (
        <InventoryModal
          camera={selectedCameraForEdit}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSaveSuccess={fetchInventory}
        />
      )}
    </AdminLayout>
  );
}
