import React, { useState, useEffect } from "react";
import { X, CheckCircle2, XCircle, Clock, ShieldCheck } from "lucide-react";
import { AppSettings, OrderRecord, UCPackage } from "../types";
import { formatPrice } from "../utils/currency";
import { sound } from "../utils/audio";
import { UCLogo } from "./UCLogo";
import { DestinationStatusBox } from "./DestinationStatusBox";
import { formatCurrentTimeDate } from "../utils/time";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPack: UCPackage | null;
  uid: string;
  savedUsername: string;
  settings: AppSettings;
  currency: string;
  onOrderCompleted: (order: OrderRecord) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPack,
  uid,
  savedUsername,
  settings,
  currency,
  onOrderCompleted,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [uidHistory, setUidHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("unknow_uid_history");
      return saved ? JSON.parse(saved) : ["5123456783", "5829104821"];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(formatCurrentTimeDate(new Date()));
      const interval = setInterval(() => {
        setCurrentTime(formatCurrentTimeDate(new Date()));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem("unknow_uid_history", JSON.stringify(uidHistory));
  }, [uidHistory]);

  const handleClearHistory = () => {
    setUidHistory([]);
    localStorage.removeItem("unknow_uid_history");
  };

  const handleExpiryChange = (val: string) => {
    let v = val.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 3) {
      v = v.substring(0, 2) + "/" + v.substring(2);
    }
    setExpiry(v);
  };

  if (!isOpen) return null;

  const handlePay = () => {
    sound.playClick();
    const newOrder: OrderRecord = {
      id: Date.now().toString(),
      uid: uid,
      pack: selectedPack,
      username: savedUsername,
      status: settings.defaultStatus || "PENDING",
      time: new Date().toISOString(),
      price: selectedPack?.price || 0,
    } as any;
    onOrderCompleted(newOrder);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-[420px] bg-[#0a1433] border border-yellow-500/20 rounded-[20px] overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <UCLogo size={28} />
            <h2 className="text-white font-bold">Checkout</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-[#101c3a] border border-dashed border-yellow-500/20 rounded-xl p-3">
            <label className="text-sm text-white font-semibold">UID / Player ID:</label>
            <div className="relative mt-2">
              <div className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 text-sm">
                {uid || "5123456783"}
              </div>
              <span className="absolute right-3 top-3 text-green-400"><CheckCircle2 size={16} /></span>
            </div>

            {uidHistory.length > 0 && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-white/40">Quick use:</span>
                  <button onClick={handleClearHistory} className="text-[11px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded hover:bg-red-500/30">
                    Clear
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {uidHistory.map((id) => (
                    <span key={id} className="text-[11px] bg-white/10 text-white/70 px-2 py-1 rounded-full">{id}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 p-2 rounded-lg text-xs">
              <ShieldCheck size={14} /> Account Verified - {savedUsername || "BINRAO 876"}
              <span className="ml-auto text-white/30 flex items-center gap-1"><Clock size={10} />{currentTime}</span>
            </div>
          </div>

          <DestinationStatusBox uid={uid} username={savedUsername} pack={selectedPack} />

          <div>
            <h3 className="text-white font-bold text-sm mb-3">SELECT PAYMENT CARD:</h3>
            <div className="space-y-3 bg-[#101c3a] p-3 rounded-xl border border-white/5">
              <input value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="Card Holder Name" className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" />
              <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").substring(0, 16))} placeholder="Card Number" className="w-full bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" />
              <div className="flex gap-3">
                <input value={expiry} onChange={(e) => handleExpiryChange(e.target.value)} placeholder="MM/YY" className="flex-1 bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" />
                <input value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 4))} placeholder="CVC" className="flex-1 bg-black/50 text-white p-3 rounded-lg border border-white/10 outline-none text-sm" />
              </div>
            </div>
          </div>

          <button onClick={handlePay} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-xl">
            PAY NOW - {selectedPack ? formatPrice(selectedPack.price, currency) : "1319 AED"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
