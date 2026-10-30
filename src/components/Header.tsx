import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

interface HeaderProps {
  onOpenPlanner: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onCelebration: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPlanner,
  activeSection,
  setActiveSection,
  onCelebration,
}) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group text-decoration-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 flex items-center justify-center text-white shadow-sm ring-1 ring-amber-400/40">
            <Crown className="w-5 h-5 text-amber-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xl font-bold tracking-tight text-amber-950 flex items-center gap-1.5">
              ShaadiAI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600" />
            </span>
          </div>
        </a>

        {/* Zone 2: 4 single line concise nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => scrollTo('timelines')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeSection === 'timelines'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            Ritual Timelines
          </button>
          <button
            onClick={() => scrollTo('budget')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeSection === 'budget'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            INR Budget
          </button>
          <button
            onClick={() => scrollTo('vendors')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeSection === 'vendors'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            Vendor Checklists
          </button>
          <button
            onClick={() => scrollTo('ideas')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activeSection === 'ideas'
                ? 'border-amber-700 text-amber-900 font-semibold'
                : 'border-transparent hover:text-amber-800'
            }`}
          >
            GenAI Ideas
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCelebration}
            title="Throw Marigold Flower Petals"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            aria-label="Shower auspicious marigold petals"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
          </button>
          <button
            onClick={onOpenPlanner}
            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-lg shadow-sm hover:from-amber-900 hover:to-amber-900 transition-all cursor-pointer whitespace-nowrap shrink-0 border border-amber-600/30"
          >
            Customize Plan
          </button>
        </div>
      </div>
    </header>
  );
};
