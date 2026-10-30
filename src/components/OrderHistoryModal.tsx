import React, { useState } from 'react';
import { X, Search, CheckCircle2, XCircle, Clock, Trash2, Printer } from 'lucide-react';
import { OrderRecord } from '../types/store';
import { formatPrice } from '../utils/currency';
import { sound } from '../utils/audio';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onClearHistory: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onClearHistory,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.uid.includes(search) ||
      o.username.toLowerCase().includes(search.toLowerCase()) ||
      o.packTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#101c44] border-2 border-[#ffcc00] rounded-2xl shadow-[0_0_35px_rgba(255,204,0,0.3)] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0a122e] border-b border-[#24376f] px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold uppercase text-[#ffcc00] tracking-wider flex items-center gap-2">
              <span>🧾 ORDER & TOP-UP HISTORY</span>
              <span className="text-xs bg-amber-400 text-black px-2 py-0.5 rounded-full font-black">
                {orders.length}
              </span>
            </h3>
            <p className="text-xs text-slate-400">All recorded test purchases & dispatch telemetry</p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2d6a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 bg-[#08102a] border-b border-[#1c2c62] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by UID, Order ID..."
              className="w-full bg-[#030717] border border-[#273a77] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcc00]"
            />
          </div>

          {orders.length > 0 && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => window.print()}
                className="text-xs px-3 py-1.5 rounded bg-[#13224f] hover:bg-[#1b2f6b] text-slate-200 border border-[#263a75] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all order history?')) {
                    sound.playClick();
                    onClearHistory();
                  }
                }}
                className="text-xs px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <div className="text-3xl">📦</div>
              <p className="font-bold text-sm text-slate-300">No Orders Found</p>
              <p className="text-xs text-slate-500">
                Purchase any package above to see real-time order confirmation receipts here.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusBadge = {
                success: {
                  icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
                  label: 'SUCCESS',
                  bg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
                },
                failed: {
                  icon: <XCircle className="w-4 h-4 text-red-400" />,
                  label: 'FAILED',
                  bg: 'bg-red-950/60 border-red-500/40 text-red-400',
                },
                pending: {
                  icon: <Clock className="w-4 h-4 text-amber-400 animate-spin" />,
                  label: 'PENDING',
                  bg: 'bg-amber-950/60 border-amber-500/40 text-amber-400',
                },
              }[order.status];

              return (
                <div
                  key={order.id}
                  className="bg-[#09112e] border border-[#23356e] rounded-xl p-3.5 space-y-2 hover:border-amber-400/50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b2a5a] pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{order.id}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{order.timestamp}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border ${statusBadge.bg}`}
                    >
                      {statusBadge.icon}
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="text-sm font-black text-white">{order.packTitle}</div>
                      <div className="text-slate-400 mt-0.5">
                        UID: <span className="font-mono text-white font-bold">{order.uid}</span> ({order.username})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-[#ffcc00]">
                        {formatPrice(order.price, order.currency)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {order.cardName} (•••• {order.cardLast4})
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
