import React from 'react';
import { Calendar, MapPin, Users, IndianRupee, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { PlanInputParams } from '../types/wedding';

interface HeroSectionProps {
  params: PlanInputParams;
  themeTitle: string;
  tagline: string;
  auspiciousMuhuratAdvice: string;
  onOpenPlanner: () => void;
  onQuickGenerate: () => void;
  isGenerating: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  params,
  themeTitle,
  tagline,
  auspiciousMuhuratAdvice,
  onOpenPlanner,
  onQuickGenerate,
  isGenerating,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-[#FFFDF9] to-[#FFFDF9] pt-6 pb-12 border-b border-amber-200/50">
      {/* Subtle traditional Indian floral/jali accent watermark pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Editorial Headline & Couple Identity */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Auspicious Muhurat kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300/60 w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Auspicious Vedic Muhurat & AI Orchestration</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight text-balance">
              {themeTitle || `The Royal Wedding of ${params.brideName} & ${params.groomName}`}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {tagline ||
                'Harmonizing sacred rituals, royal palace grandeur, and precision GenAI planning for your once-in-a-lifetime celebration.'}
            </p>

            {/* Auspicious Muhurat banner */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/80">
              <div className="flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    Auspicious Muhurat & Astrological Advice
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                    {auspiciousMuhuratAdvice}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick parameter pills */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-800">
              <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <IndianRupee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Total Budget</span>
                </div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  ₹{params.budgetLakhs} Lakhs
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>Guest Count</span>
                </div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  {params.guestCount} Guests
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Destination</span>
                </div>
                <div className="text-base font-bold text-stone-900 truncate" title={params.city}>
                  {params.city.split(',')[0]}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Celebration</span>
                </div>
                <div className="text-base font-bold text-stone-900 tabular-nums">
                  {params.days} Days / {params.weddingDate}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPlanner}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-900 rounded-xl shadow-md transition-all cursor-pointer border border-amber-600/30"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Customize Couple & Budget
              </button>

              <button
                onClick={onQuickGenerate}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-amber-950 bg-amber-100 hover:bg-amber-200/80 border border-amber-300 rounded-xl transition-all cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                {isGenerating ? 'AI Crafting Master Plan...' : 'Regenerate with GenAI'}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with Palace Mandap Showcase */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full relative rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-xl group">
              <img
                src="/src/assets/images/indian_wedding_hero_1793366415158.jpg"
                alt="Royal Indian Wedding Mandap in Rajasthan Palace"
                className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300 mb-1">
                  Heritage Mandap Architecture
                </span>
                <p className="font-cinzel text-lg font-bold leading-tight">
                  Palace Courtyard Mandap with Fresh Marigolds & Crystal Chandeliers
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-amber-100/90">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Vedic Agni Kund Fire Safety Approved
                  </span>
                  <span>·</span>
                  <span>East-Facing Godhuli Alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
