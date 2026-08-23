import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Edit3, ShieldCheck, AlertTriangle, CheckCircle2, RefreshCcw } from 'lucide-react';
import api from '../../services/api.js';
import { formatCurrency, formatDate, getStatusBadgeStyle } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import OrderStatusModal from '../../components/admin/OrderStatusModal.jsx';

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedBookingForStatus, setSelectedBookingForStatus] = useState(null);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/admin/all');
      if (res.success && Array.isArray(res.data)) {
        setBookings(res.data);
      } else if (Array.isArray(res)) {
        setBookings(res);
      }
    } catch {
      // Mock data fallback
      setBookings([
        {
          _id: 'b101',
          bookingNumber: 'BK-928410',
          status: 'confirmed',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
          totalDays: 3,
          rentalFee: 330,
          depositAmount: 500,
          totalPrice: 830,
          user: { name: 'Alex Rivera', email: 'alex@creatives.com' },
          camera: { name: 'Sony FX3 Cinema Camera', brand: 'Sony' },
        },
        {
          _id: 'b102',
          bookingNumber: 'BK-491203',
          status: 'ongoing',
          startDate: new Date(Date.now() - 2 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
          totalDays: 4,
          rentalFee: 500,
          depositAmount: 600,
          totalPrice: 1100,
          user: { name: 'Sophia Chen', email: 'sophia@filmmaker.org' },
          camera: { name: 'Canon EOS R5 C Hybrid Body', brand: 'Canon' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'all', label: 'ALL ORDERS' },
    { key: 'confirmed', label: 'CONFIRMED' },
    { key: 'ongoing', label: 'ONGOING' },
    { key: 'returned', label: 'RETURNED' },
    { key: 'overdue', label: 'OVERDUE' },
    { key: 'damaged', label: 'DAMAGED' },
  ];

  const filteredBookings = bookings.filter((b) => {
    const matchesTab = activeTab === 'all' || b.status?.toLowerCase() === activeTab;
    const matchesSearch =
      b.bookingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.camera?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1 font-bold">
            // MASTER RESERVATION CONTROLLER
          </span>
          <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Order Lifecycle Manager
          </h1>
        </div>

        {/* Search & Tabs Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search booking #, customer, or camera..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <span className="text-xs font-mono text-slate-400">{filteredBookings.length} Orders Listed</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 font-mono text-xs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveTab(tab.key);
                }}
                className={`px-3.5 py-1.5 rounded-xl uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Table */}
        <div className="glass-panel-cinema rounded-3xl p-6 border border-white/10">
          {loading ? (
            <div className="py-16 text-center font-mono text-xs text-slate-500">
              LOADING PLATFORM RESERVATIONS...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center font-mono text-xs text-slate-400">
              No orders found matching filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto font-mono text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                    <th className="pb-3 pl-2">Booking #</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Equipment Unit</th>
                    <th className="pb-3">Dates</th>
                    <th className="pb-3">Rental Fee</th>
                    <th className="pb-3">Deposit Hold</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pl-2 font-bold text-white">#{b.bookingNumber || b._id?.slice(-6)}</td>
                      <td className="py-3.5 text-slate-300">
                        <div className="font-bold text-white">{b.user?.name || 'Customer'}</div>
                        <div className="text-[10px] text-slate-500">{b.user?.email}</div>
                      </td>
                      <td className="py-3.5 text-cyan-400 font-bold">{b.camera?.name || 'Gear Item'}</td>
                      <td className="py-3.5 text-slate-400">{formatDate(b.startDate)} &rarr; {formatDate(b.endDate)}</td>
                      <td className="py-3.5 text-amber-400 font-bold">{formatCurrency(b.rentalFee)}</td>
                      <td className="py-3.5 text-slate-300">{formatCurrency(b.depositAmount)}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => {
                            soundFx.playClickSound();
                            setSelectedBookingForStatus(b);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 hover:border-cyan-400/50 font-bold"
                        >
                          Update Status
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

      {selectedBookingForStatus && (
        <OrderStatusModal
          booking={selectedBookingForStatus}
          onClose={() => setSelectedBookingForStatus(null)}
          onUpdateSuccess={fetchAllBookings}
        />
      )}
    </AdminLayout>
  );
}
