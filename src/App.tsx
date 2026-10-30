/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlannerModal } from './components/PlannerModal';
import { TimelineView } from './components/TimelineView';
import { BudgetManager } from './components/BudgetManager';
import { VendorChecklist } from './components/VendorChecklist';
import { IdeasStudio } from './components/IdeasStudio';
import { WeddingPlan, PlanInputParams } from './types/wedding';
import { defaultWeddingPlan } from './data/defaultPlan';
import { Sparkles, Printer, Heart } from 'lucide-react';

export default function App() {
  const [params, setParams] = useState<PlanInputParams>({
    brideName: 'Ananya',
    groomName: 'Rohan',
    budgetLakhs: 35,
    guestCount: 350,
    city: 'Udaipur, Rajasthan (Palace Heritage)',
    tradition: 'North Indian & Punjabi Fusion',
    vibe: 'Royal Palace Heritage & Modern Glam',
    weddingDate: '2026-11-20',
    days: 3,
  });

  const [plan, setPlan] = useState<WeddingPlan>(defaultWeddingPlan);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('timelines');

  // Trigger marigold & rose confetti
  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EA580C', '#DC2626', '#CA8A04', '#FEF08A'],
    });
  };

  // Generate Master Plan from API
  const generatePlan = async (currentParams: PlanInputParams) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentParams),
      });
      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
        triggerCelebration();
      }
    } catch (err) {
      console.error('Plan generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Initial load
  useEffect(() => {
    generatePlan(params);
  }, []);

  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-900 flex flex-col font-sans">
      {/* Royal Header */}
      <Header
        onOpenPlanner={() => setIsPlannerOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCelebration={triggerCelebration}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          params={params}
          themeTitle={plan?.themeTitle || `The Royal Wedding of ${params.brideName} & ${params.groomName}`}
          tagline={plan?.tagline || ''}
          auspiciousMuhuratAdvice={plan?.auspiciousMuhuratAdvice || 'Loading Vedic guidance...'}
          onOpenPlanner={() => setIsPlannerOpen(true)}
          onQuickGenerate={() => generatePlan(params)}
          isGenerating={isGenerating}
        />

        {/* Sticky Quick Navigation Tabs */}
        <div className="sticky top-18 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveSection('timelines');
                  document.getElementById('timelines')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'timelines'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                Ritual Timelines
              </button>
              <button
                onClick={() => {
                  setActiveSection('budget');
                  document.getElementById('budget')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'budget'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                INR Budget (₹{params.budgetLakhs}L)
              </button>
              <button
                onClick={() => {
                  setActiveSection('vendors');
                  document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'vendors'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                Vendor Checklist
              </button>
              <button
                onClick={() => {
                  setActiveSection('ideas');
                  document.getElementById('ideas')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'ideas'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                GenAI Ideas
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="text-amber-800 font-bold">Vedic Muhurat Planning</span>
              <span>·</span>
              <span>INR Lakhs Financial Guard</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Section: Multi-Day Ritual Timelines */}
          <section id="timelines" className="scroll-mt-24">
            {plan?.events && <TimelineView events={plan.events} />}
          </section>

          {/* Section: INR Budget Optimizer */}
          <section id="budget" className="scroll-mt-24">
            {plan?.budgetAllocations && (
              <BudgetManager
                totalBudgetLakhs={params.budgetLakhs}
                budgetAllocations={plan.budgetAllocations}
                onUpdateAllocations={(newAllocations) => {
                  setPlan({ ...plan, budgetAllocations: newAllocations });
                }}
              />
            )}
          </section>

          {/* Section: Vendor Checklist & Negotiation Guide */}
          <section id="vendors" className="scroll-mt-24">
            {plan?.vendorChecklist && (
              <VendorChecklist
                vendors={plan.vendorChecklist}
                onUpdateVendors={(newVendors) => {
                  setPlan({ ...plan, vendorChecklist: newVendors });
                }}
              />
            )}
          </section>

          {/* Section: Personalized GenAI Ideas Studio */}
          <section id="ideas" className="scroll-mt-24">
            {plan?.personalizedIdeas && (
              <IdeasStudio
                ideas={plan.personalizedIdeas}
                coupleName={`${params.brideName} & ${params.groomName}`}
                tradition={params.tradition}
              />
            )}
          </section>
        </div>
      </main>

      {/* Action Strip: Print & Celebration */}
      <div className="bg-amber-100/60 border-t border-amber-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="font-semibold text-amber-950">ShaadiAI:</span>
            <span>Comprehensive Royal Indian Wedding Itinerary & Budget Manager</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSchedule}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 font-semibold cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Wedding Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Royal Footer */}
      <footer className="bg-stone-900 text-stone-300 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-cinzel text-xl font-bold text-amber-300 tracking-wide">
              ShaadiAI
            </span>
            <p className="text-xs text-stone-400 mt-1 max-w-md">
              ॥ यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः ॥<br />
              GenAI-powered luxury Indian wedding planning system.
            </p>
          </div>

          <div className="text-xs text-stone-400">
            <p>Designed for Indian Weddings with Vedic Muhurat and INR Budget Precision.</p>
            <p className="mt-1">Timelines, Vendor Checklists & Personalized Celebrations.</p>
          </div>
        </div>
      </footer>

      {/* Planner Modal */}
      <PlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialParams={params}
        onSubmit={(newParams) => {
          setParams(newParams);
          setIsPlannerOpen(false);
          generatePlan(newParams);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
}
