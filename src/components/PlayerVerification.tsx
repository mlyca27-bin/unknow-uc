import React from 'react';
import { Gamepad2, CheckCircle } from 'lucide-react';

interface PlayerVerificationProps {
  uid: string;
  onUidChange: (val: string) => void;
  savedUsername: string;
  paymentResult: any;
  onSelectPreset: (uid: string) => void;
  region?: string;
  onSelectRegion?: (region: string) => void;
  timeDate: string;
  onUpdateTime?: () => void;
  selectedGame?: string;
}

export const PlayerVerification: React.FC<PlayerVerificationProps> = ({
  uid,
  onUidChange,
  selectedGame = 'pubg',
}) => {
  const isYalla = selectedGame === 'yalla';
  const isFreeFire = selectedGame === 'freefire';

  // FREE FIRE - Photo wala Red Login Design
  if (isFreeFire) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md border">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-600 text-white font-black text-xl w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-br-lg">1</div>
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        
        <div className="bg-[#F9F9F9] p-4 rounded-xl border">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-medium text-lg">Player ID</span>
            <span className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center text-sm font-bold">?</span>
          </div>
          
          <div className="flex border rounded-xl overflow-hidden bg-white">
            <input 
              className="flex-1 p-4 outline-none text-gray-500"
              value={uid}
              onChange={(e) => onUidChange(e.target.value)}
              placeholder="Please enter player ID here"
            />
            <button className="bg-red-600 text-white px-8 font-bold text-lg hover:bg-red-700">Login</button>
          </div>
        </div>
      </div>
    )
  }

  // YALLA LUDO & PUBG - Normal Design
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border">
      <h2 className="text-lg font-bold flex items-center gap-2">
        {isYalla ? '1. User ID Verification' : '1. Character ID Verification'}
        <span className="text-xs border border-blue-500 text-blue-500 px-2 py-0.5 rounded-full">? + Link</span>
      </h2>
      
      <div className="mt-3 flex items-center border rounded-lg overflow-hidden focus-within:border-blue-500">
        <div className="p-2 bg-gray-50 w-12 h-12 flex items-center justify-center">
          {isYalla ? (
            <img src="https://cdn.midasbuy.com/images/YallaLudo.png" alt="Yalla Ludo" className="w-10 h-10 rounded" />
          ) : (
            <Gamepad2 className="w-6 h-6 text-gray-500" />
          )}
        </div>
        <input 
          className="flex-1 p-3 outline-none text-sm"
          value={uid}
          onChange={(e) => onUidChange(e.target.value)}
          placeholder={isYalla ? "Please enter user ID" : "Please enter Character ID"}
        />
      </div>

      <div className="mt-3 flex gap-3 items-center">
        <button className="flex-1 bg-[#4FA3FF] text-white py-2.5 rounded-lg font-bold">OK</button>
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-1 border border-[#4FA3FF] rounded-lg h-11"></div>
      </div>
    </div>
  )
}
