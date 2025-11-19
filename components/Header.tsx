import React from 'react';
import { Building2, TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">PropVision AI</h1>
            <p className="text-xs text-slate-500 font-medium">Real Estate Advisor</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-1">
            <TrendingUp size={16} className="text-emerald-500" />
            Market Analysis
          </span>
          <span>v1.0</span>
        </div>
      </div>
    </header>
  );
};