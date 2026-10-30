import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, XCircle, Clock, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import { AppSettings, OrderRecord, UCPackage } from '../types/store';
import { formatPrice } from '../utils/currency';
import { sound } from '../utils/audio';
import { UCLogo } from './UCLogo';
import { DestinationStatusBox } from './DestinationStatusBox';
import { formatCurrentTimeDate } from '../utils/datetime';

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

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPack,
  uid,
  savedUsername,
  settings,
  currency,
  onOrderCompleted,
}) => {
  const [selectedCardKey, setSelectedCardKey] = useState<string>('');
  const [cvcInput, setCvcInput] = useState<string>('');
  const [cvcVerified, setCvcVerified] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(settings.countdownSeconds || 15);
  const [resultState, setResultState] = useState<'idle' | 'success' | 'failed' | 'pending'>('idle');
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  // Reset state when modal opens or pack changes
  useEffect(() => {
    if (isOpen) {
      setCvcInput('');
      setIsProcessing(false);
      setResultState('idle');
      setCountdown(settings.countdownSeconds || 15);
      // Auto select first enabled card
      const enabledCard = Object.entries(settings.cards).find(([, card]) => card.enabled);
      if (enabledCard) {
        setSelectedCardKey(enabledCard[0]);
      } else {
        setSelectedCardKey('');
      }
      setCvcVerified(!settings.cvcEnabled);
    }
  }, [isOpen, selectedPack, settings]);

  // Countdown timer during processing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProcessing && countdown > 0) {
      sound.playTick();
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isProcessing && countdown === 0) {
      setIsProcessing(false);
      finishPayment();
    }
    return () => clearTimeout(timer);
  }, [isProcessing, countdown]);

  if (!isOpen || !selectedPack) return null;

  const activeCard = selectedCardKey ? settings.cards[selectedCardKey as keyof typeof settings.cards] : null;

  const handleSelectCard = (key: string) => {
    sound.playSelectCard();
    setSelectedCardKey(key);
    if (settings.cvcEnabled) {
      setCvcVerified(false);
      setCvcInput('');
    } else {
      setCvcVerified(true);
    }
  };

  const handleVerifyCvc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvcInput.trim()) {
      alert('Pehle CVC dalo!');
      return;
    }
    sound.playClick();
    setCvcVerified(true);
  };

  const handleStartPay = () => {
    if (!activeCard) {
      alert('Please select an active card method!');
      return;
    }
    if (settings.cvcEnabled && !cvcVerified) {
      alert('Pehle CVC dalo!');
      return;
    }
    sound.playClick();
    setIsProcessing(true);
    setCountdown(settings.countdownSeconds || 15);
  };

  const finishPayment = () => {
    const outcome = settings.paymentResult;
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const txHash = 'TX-PUBG-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setCurrentOrderId(orderId);
    setResultState(outcome);

    const record: OrderRecord = {
      id: orderId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      uid: uid,
      username: savedUsername || 'BinRao Gaming',
      packTitle: selectedPack.title,
      totalUC: selectedPack.totalUC,
      price: selectedPack.priceAED,
      currency: currency,
      cardName: activeCard?.name || 'Card',
      cardLast4: activeCard?.last4 || '0000',
      status: outcome,
      txHash: txHash,
    };

    onOrderCompleted(record);

    if (outcome === 'success') {
      sound.playSuccess();
    } else if (outcome === 'failed') {
      sound.playFailed();
    } else {
      sound.playPending();
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#101c44] border-2 border-[#ffcc00] rounded-2xl shadow-[0_0_40px_rgba(255,204,0,0.35)] overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#0a122e] border-b border-[#24376f] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UCLogo size={24} />
            <h3 className="text-lg font-black uppercase text-white tracking-wider">
              {resultState === 'idle' ? 'CONFIRM UC TOP-UP' : 'TRANSACTION RESULT'}
            </h3>
          </div>
          {!isProcessing && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2d6a] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-slate-200">
          {/* STATE 1: IDLE - Card selection & Summary */}
          {resultState === 'idle' && !isProcessing && (
            <>
              {/* Selected Pack Summary */}
              <div className="bg-[#08102a] border border-[#273a77] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Selected Package
                  </span>
                  <div className="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                    <span>{selectedPack.title}</span>
                    <span className="text-xs bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">
                      {selectedPack.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Total UC: <b className="text-emerald-400">{selectedPack.totalUC.toLocaleString()} UC</b>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Price</div>
                  <div className="text-xl font-black text-[#ffcc00]">
                    {formatPrice(selectedPack.priceAED, currency)}
                  </div>
                </div>
              </div>

              {/* Destination UID + Status + Time Date Box */}
              <DestinationStatusBox
                uid={uid}
                shopName={savedUsername || 'BinRao Gaming'}
                status={settings.paymentResult}
                timeDate={settings.customTimeDate || formatCurrentTimeDate()}
              />

              {/* Select Payment Method */}
              <div>
                <label className="text-xs font-extrabold uppercase text-amber-300 block mb-2">
                  Select Payment Card:
                </label>
                <div className="space-y-2">
                  {Object.entries(settings.cards).map(([key, card]) => {
                    if (!card.enabled) return null;
                    const isSelected = selectedCardKey === key;
                    return (
                      <div
                        key={key}
                        onClick={() => handleSelectCard(key)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#15275e] border-[#ffcc00] shadow-[0_0_12px_rgba(255,204,0,0.3)] ring-1 ring-[#ffcc00]'
                            : 'bg-[#09112c] border-[#223366] hover:border-amber-400/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-6 rounded flex items-center justify-center font-bold text-[10px] text-white tracking-wider uppercase bg-gradient-to-r ${card.color} border border-white/20`}
                          >
                            {card.type === 'golden' ? 'VIP' : card.type.slice(0, 4)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{card.name}</span>
                              {card.type === 'golden' && (
                                <span className="text-[9px] bg-amber-400 text-black px-1 rounded font-black">
                                  VIP 0% FEE
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-slate-400">
                              •••• •••• •••• {card.last4 || '1234'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#ffcc00] bg-[#ffcc00] text-black'
                              : 'border-slate-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <span className="text-[10px] font-black">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CVC Box (Shown if CVC enabled in settings and not yet verified) */}
              {settings.cvcEnabled && !cvcVerified && (
                <div
                  id="cvcBox"
                  className="bg-[#000000] border border-dashed border-[#ffcc00] p-3.5 rounded-xl space-y-2 animate-fadeIn"
                >
                  <label className="text-xs font-bold text-white flex items-center justify-between">
                    <span>🔒 Enter Card Security Code (CVC / CVV):</span>
                    <span className="text-[10px] text-amber-400 font-mono">3 or 4 digits</span>
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    id="cvcInput"
                    value={cvcInput}
                    onChange={(e) => setCvcInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="CVC
                    className="w-full bg-[#0a122e] border border-[#2a3d7a] focus:border-[#ffcc00] text-white font-mono font-bold text-center text-lg py-2 rounded-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCvc}
                    className="w-full bg-[#ffcc00] hover:bg-amber-400 text-black font-extrabold text-xs py-2.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next / Verify CVC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Pay With Card Button */}
              <div>
                <button
                  type="button"
                  id="payBtn"
                  disabled={settings.cvcEnabled && !cvcVerified}
                  onClick={handleStartPay}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 ${
                    settings.cvcEnabled && !cvcVerified
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                      : 'bg-gradient-to-r from-amber-400 via-[#ffcc00] to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-[0_0_20px_rgba(255,204,0,0.4)] cursor-pointer active:scale-95'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>
                    PAY WITH {activeCard?.name?.toUpperCase() || 'CARD'} - {formatPrice(selectedPack.priceAED, currency)}
                  </span>
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                  Encrypted via PUBG In-Game Direct Merchant Token • 100% Guaranteed Delivery
                </p>
              </div>
            </>
          )}

          {/* STATE 2: LOADING BOX (With Spinning Loader & Real-time Countdown) */}
          {isProcessing && (
            <div id="loadingBox" className="text-center py-8 space-y-4 animate-fadeIn">
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  border: '4px solid #223366',
                  borderTop: '4px solid #ffcc00',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <div className="space-y-1">
                <div className="text-xl font-black text-white uppercase tracking-wider">
                  Processing Payment...
                </div>
                <div className="text-amber-400 font-mono text-2xl font-black">
                  <span id="count">{countdown}s</span>
                </div>
                <p className="text-xs text-slate-400">
                  Contacting {activeCard?.name || 'Card Network'} and verifying Character UID {uid}...
                </p>
              </div>
              <div className="max-w-xs mx-auto bg-[#08102a] rounded-lg p-2.5 border border-[#23356e] text-[11px] text-slate-400">
                Please do not close this window or refresh the page.
              </div>
            </div>
          )}

          {/* STATE 3: RESULT POPUP (Matches exact specification for SUCCESS, FAILED, PENDING) */}
          {resultState !== 'idle' && !isProcessing && (
            <div id="resultPopup" className="text-center py-4 space-y-4 animate-fadeIn">
              {/* SUCCESS */}
              {resultState === 'success' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-wide">
                      PAYMENT SUCCESSFUL!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      UC sent successfully to in-game mailbox!
                    </p>
                  </div>

                  {/* Receipt breakdown */}
                  <div className="bg-[#09112e] border border-[#273a77] rounded-xl p-3.5 text-xs text-left space-y-2">
                    <div className="flex justify-between border-b border-[#1c2c62] pb-1.5">
                      <span className="text-slate-400">Order ID:</span>
                      <span className="font-mono font-bold text-white">{currentOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pack:</span>
                      <span className="font-bold text-white">{selectedPack.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total UC Delivered:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedPack.totalUC.toLocaleString()} UC
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">UID:</span>
                      <span className="font-mono font-bold text-white">{uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Username:</span>
                      <span className="font-bold text-amber-300">{savedUsername || 'BinRao Gaming'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payment Card:</span>
                      <span className="text-slate-200">
                        {activeCard?.name} (•••• {activeCard?.last4})
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#1c2c62] pt-1.5 font-bold">
                      <span className="text-slate-300">Amount Charged:</span>
                      <span className="text-[#ffcc00] font-black">
                        {formatPrice(selectedPack.priceAED, currency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handlePrintReceipt}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#142352] hover:bg-[#1c3070] text-slate-200 border border-[#263a75] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Receipt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onClose();
                      }}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#00c853] hover:bg-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,200,83,0.5)] transition-all cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}

              {/* FAILED */}
              {resultState === 'failed' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                    <XCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-red-400 uppercase tracking-wide">
                      PAYMENT FAILED!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Transaction declined by the small pack issuer or ID.
                    </p>
                  </div>

                  <div className="bg-[#18090d] border border-red-900/50 rounded-xl p-3.5 text-xs text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pack:</span>
                      <span className="font-bold text-white">{selectedPack.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">UID:</span>
                      <span className="font-mono font-bold text-white">{uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Username:</span>
                      <span className="font-bold text-amber-300">{savedUsername}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Card Used:</span>
                      <span className="text-red-300">
                        {activeCard?.name} (•••• {activeCard?.last4})
                      </span>
                    </div>
                    <p className="text-red-400/90 pt-1 text-[11px] border-t border-red-900/40">
                      Reason: Your level is to low please buy another big pack . Please check pack big or retry.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onClose();
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#142352] text-slate-300 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setResultState('idle');
                      }}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#ff3333] hover:bg-red-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(255,51,51,0.5)] transition-all cursor-pointer"
                    >
                      RETRY
                    </button>
                  </div>
                </div>
              )}

              {/* PENDING */}
              {resultState === 'pending' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    <Clock className="w-10 h-10 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-amber-400 uppercase tracking-wide">
                      PAYMENT PENDING!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Waiting for bank confirmation... UC will be credited once confirmed.
                    </p>
                  </div>

                  <div className="bg-[#191407] border border-amber-900/50 rounded-xl p-3.5 text-xs text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Order ID:</span>
                      <span className="font-mono font-bold text-white">{currentOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pack:</span>
                      <span className="font-bold text-white">{selectedPack.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">UID:</span>
                      <span className="font-mono font-bold text-white">{uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Username:</span>
                      <span className="font-bold text-amber-300">{savedUsername}</span>
                    </div>
                  </div>
                   </div>

    <div className="flex justify-between">
      <span className="text-slate-400">Time:</span>
      <span className="font-mono font-bold text-white text-xs">{new Date().toLocaleString()}</span>
    </div>
    <button
      type="button"
      onClick={() => {
        sound.playClick();
        onClose();
      }}
      className="w-full py-2.5 px-4"
    >
      OK
    </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
