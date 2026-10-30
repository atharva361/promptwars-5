import React, { useState } from 'react';
import { X, Sparkles, IndianRupee, Users, MapPin, Calendar, Crown } from 'lucide-react';
import { PlanInputParams } from '../types/wedding';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams: PlanInputParams;
  onSubmit: (newParams: PlanInputParams) => void;
  isGenerating: boolean;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onSubmit,
  isGenerating,
}) => {
  const [formData, setFormData] = useState<PlanInputParams>(initialParams);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const budgetPresets = [15, 25, 35, 50, 75, 100, 150];

  const traditionOptions = [
    'North Indian & Punjabi Fusion',
    'Royal Rajasthani & Marwari Heritage',
    'South Indian (Tamil / Telugu Traditional)',
    'Gujarati Garba & Sangeet Extravaganza',
    'Bengali Shobho Bibaho & Biye',
    'Maharashtrian Lagna & Sakharpuda',
    'Contemporary Modern Fusion',
  ];

  const vibeOptions = [
    'Royal Palace Heritage & Modern Glam',
    'Intimate Eco-Luxury & Sufi Night',
    'Grand Destination Beach Fiesta',
    'High-Energy Bollywood Sangeet & Dhol Blast',
    'Traditional Temple & Silk Mandap Elegance',
  ];

  const cityOptions = [
    'Udaipur, Rajasthan (Palace Heritage)',
    'Jaipur, Rajasthan (Fort & Havelis)',
    'Goa (Sun, Sand & Beach Resort)',
    'Delhi NCR (Grand Farmhouses & Ballrooms)',
    'Mumbai (Seaside Luxury & Glamour)',
    'Kerala Backwaters (Tropical Serenity)',
    'Bengaluru / Hyderabad (Royal Palaces)',
    'Jim Corbett / Mussoorie (Mountain Retreat)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-amber-300/80 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-700/60 rounded-lg">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold tracking-tight">
                GenAI Wedding Planner Studio
              </h3>
              <p className="text-xs text-amber-200/90">
                Personalize your rituals, budget allocations, and cultural traditions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Bride's Name
              </label>
              <input
                type="text"
                required
                value={formData.brideName}
                onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm"
                placeholder="e.g. Ananya"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Groom's Name
              </label>
              <input
                type="text"
                required
                value={formData.groomName}
                onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm"
                placeholder="e.g. Rohan"
              />
            </div>
          </div>

          {/* Budget in Lakhs */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-amber-600" />
                Total Wedding Budget (₹ Lakhs)
              </label>
              <span className="text-base font-bold text-amber-900 tabular-nums font-mono">
                ₹{formData.budgetLakhs} Lakhs ({formData.budgetLakhs >= 100 ? `₹${(formData.budgetLakhs / 100).toFixed(2)} Crore` : `₹${formData.budgetLakhs}L`})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={formData.budgetLakhs}
              onChange={(e) => setFormData({ ...formData, budgetLakhs: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-xs text-stone-500 mr-1">Presets:</span>
              {budgetPresets.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setFormData({ ...formData, budgetLakhs: b })}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                    formData.budgetLakhs === b
                      ? 'bg-amber-800 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  ₹{b}L
                </button>
              ))}
            </div>
          </div>

          {/* Guests & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                Estimated Guest Count
              </label>
              <input
                type="number"
                min="30"
                max="2500"
                step="25"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) || 100 })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Celebration Duration
              </label>
              <select
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value, 10) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm bg-white"
              >
                <option value={1}>1 Day (Express Celebration)</option>
                <option value={2}>2 Days (Haldi, Sangeet & Pheras)</option>
                <option value={3}>3 Days (Traditional Royal Multi-Day)</option>
                <option value={4}>4 Days (Grand Multi-Event Festival)</option>
              </select>
            </div>
          </div>

          {/* City / Destination */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Wedding City / Destination
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm bg-white"
            >
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Cultural Traditions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Cultural & Regional Traditions
            </label>
            <select
              value={formData.tradition}
              onChange={(e) => setFormData({ ...formData, tradition: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm bg-white"
            >
              {traditionOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Theme & Vibe */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Atmosphere & Theme
            </label>
            <select
              value={formData.vibe}
              onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 text-sm bg-white"
            >
              {vibeOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Couple Photo Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Couple Photo / Wedding Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const res = ev.target?.result as string;
                    if (res) {
                      try {
                        localStorage.setItem('shaadi_hero_photo', res);
                      } catch {}
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200 cursor-pointer"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Add your own photo from your device to personalize your celebration
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-700 hover:bg-stone-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-900 shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {isGenerating ? 'AI Crafting Master Plan...' : 'Generate AI Master Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
