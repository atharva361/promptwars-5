import React, { useState } from 'react';
import { Sparkles, Copy, Check, Lightbulb, Music, Gift, Heart, Leaf, RefreshCw } from 'lucide-react';
import { PersonalizedIdea } from '../types/wedding';

interface IdeasStudioProps {
  ideas: PersonalizedIdea[];
  coupleName: string;
  tradition: string;
}

export const IdeasStudio: React.FC<IdeasStudioProps> = ({
  ideas: initialIdeas,
  coupleName,
  tradition,
}) => {
  const [ideas, setIdeas] = useState<PersonalizedIdea[]>(initialIdeas);
  const [activeCategory, setActiveCategory] = useState<string>('Grand Entry');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  React.useEffect(() => {
    setIdeas(initialIdeas);
  }, [initialIdeas]);

  const categories = [
    { name: 'Grand Entry', icon: Sparkles },
    { name: 'Sangeet Choreography', icon: Music },
    { name: 'Return Gifts & Favors', icon: Gift },
    { name: 'Wedding Hashtags', icon: Heart },
    { name: 'Eco-Friendly Rituals', icon: Leaf },
  ];

  const handleFetchCategoryIdeas = async (category: string) => {
    setActiveCategory(category);
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, tradition, coupleName }),
      });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.ideas && data.ideas.length > 0) {
          setIdeas(data.ideas);
        }
      }
    } catch (err) {
      console.error('Failed to generate category ideas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div id="ideas" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md border border-amber-300/50">
            Personalized GenAI Ideas
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 font-cinzel">
            Royal Ideas & Concept Studio
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Bespoke wedding concepts for {coupleName} tailored to {tradition}
          </p>
        </div>

        <button
          onClick={() => handleFetchCategoryIdeas(activeCategory)}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Generating Ideas...' : 'Regenerate Category Ideas'}
        </button>
      </div>

      {/* Category selector pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = activeCategory === c.name;
          return (
            <button
              key={c.name}
              onClick={() => handleFetchCategoryIdeas(c.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {idea.category || activeCategory}
                </span>
                {idea.costLevel && (
                  <span className="text-xs font-semibold text-stone-500">
                    {idea.costLevel}
                  </span>
                )}
              </div>

              <h3 className="font-cinzel text-lg font-bold text-stone-900 mb-2">
                {idea.title}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed mb-4">
                {idea.description}
              </p>

              {idea.proTip && (
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/50 text-xs text-amber-950 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Pro-Tip for Execution:</span> {idea.proTip}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Ready to include in couple's briefing sheet
              </span>
              <button
                onClick={() =>
                  copyToClipboard(`${idea.title}\n${idea.description}\n${idea.proTip || ''}`, idx)
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Copy Idea</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
