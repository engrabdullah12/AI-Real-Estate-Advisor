import React, { useState } from 'react';
import { Search, MapPin, Wallet, Clock, Home, Loader2, CreditCard } from 'lucide-react';
import { UserPreferences } from '../types';

interface AdvisorFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export const AdvisorForm: React.FC<AdvisorFormProps> = ({ onSubmit, isLoading }) => {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<UserPreferences['propertyType']>('Residential');
  const [duration, setDuration] = useState<UserPreferences['duration']>('Medium Term (3-5 years)');
  const [paymentMode, setPaymentMode] = useState<UserPreferences['paymentMode']>('Cash');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budget && location) {
      onSubmit({ budget, location, propertyType, duration, paymentMode });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-emerald-600 px-6 py-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Find Your Next Investment</h2>
        <p className="text-emerald-100 max-w-lg mx-auto">
          Enter your criteria to get an AI-powered analysis of Pakistan's real estate market.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Wallet size={18} className="text-emerald-600" />
              Budget (PKR)
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 50 Lac, 2 Crore"
              className="w-full px-5 py-4 bg-white text-slate-900 font-bold placeholder-slate-500 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 outline-none transition-all text-lg"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-base font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-600" />
              Target Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., DHA Lahore, Blue Area Isb"
              className="w-full px-5 py-4 bg-white text-slate-900 font-bold placeholder-slate-500 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 outline-none transition-all text-lg"
              required
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <label className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Home size={18} className="text-emerald-600" />
              Property Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {(['Residential', 'Commercial', 'Plot', 'Apartment', 'File'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`w-full px-4 py-5 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center text-center ${
                    propertyType === type
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CreditCard size={18} className="text-emerald-600" />
              Payment Mode
            </label>
            <div className="grid grid-cols-2 gap-6">
              {(['Cash', 'Installments'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPaymentMode(mode)}
                  className={`w-full px-4 py-5 rounded-xl border-2 text-sm font-bold transition-all ${
                    paymentMode === mode
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-emerald-400 hover:text-emerald-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-emerald-600" />
              Investment Horizon
            </label>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as UserPreferences['duration'])}
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 outline-none transition-all bg-white text-slate-900 font-bold cursor-pointer appearance-none text-lg"
              >
                <option>Short Term (1-2 years)</option>
                <option>Medium Term (3-5 years)</option>
                <option>Long Term (5+ years)</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:shadow-slate-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Analyzing Market Data...
            </>
          ) : (
            <>
              <Search size={24} />
              Generate Investment Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};
