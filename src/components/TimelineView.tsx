import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, Plus, Utensils, Shirt, ChevronRight, CheckCircle2, Music } from 'lucide-react';
import { WeddingEvent } from '../types/wedding';

interface TimelineViewProps {
  events: WeddingEvent[];
  onAddEvent?: (newEvent: WeddingEvent) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events, onAddEvent }) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(events[0]?.id || null);

  // Group days
  const dayNumbers = Array.from(new Set(events.map((e) => e.dayNumber))).sort((a, b) => a - b);

  const filteredEvents =
    selectedDay === 'all' ? events : events.filter((e) => e.dayNumber === selectedDay);

  // Map appropriate generated visual asset according to ceremony type
  const getEventVisual = (eventName: string) => {
    const name = eventName.toLowerCase();
    if (name.includes('haldi')) {
      return {
        image: '/src/assets/images/indian_haldi_ceremony_1793366416386.jpg',
        badge: 'Turmeric & Marigolds',
      };
    }
    if (name.includes('sangeet') || name.includes('mehendi') || name.includes('cocktail')) {
      return {
        image: '/src/assets/images/indian_sangeet_celebration_1793366415709.jpg',
        badge: 'Dhol, Beats & Henna',
      };
    }
    if (name.includes('reception') || name.includes('banquet') || name.includes('dinner')) {
      return {
        image: '/src/assets/images/indian_wedding_banquet_1793366417138.jpg',
        badge: 'Royal Awadhi Feast',
      };
    }
    return {
      image: '/src/assets/images/indian_wedding_hero_1793366415158.jpg',
      badge: 'Vedic Mandap & Vows',
    };
  };

  return (
    <div id="timelines" className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md border border-amber-300/50">
            Sacred Rituals & Celebrations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 font-cinzel">
            Multi-Day Wedding Ritual Timeline
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Chronological itinerary tailored with Vedic Muhurats, dress codes, and culinary highlights
          </p>
        </div>

        {/* Day selection tabs */}
        <div className="inline-flex p-1 bg-stone-100/80 rounded-xl border border-stone-200/80">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Days ({events.length})
          </button>
          {dayNumbers.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedDay === d
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid / Timeline */}
      <div className="space-y-6">
        {filteredEvents.map((event, idx) => {
          const visual = getEventVisual(event.name);
          const isExpanded = expandedEventId === event.id;

          return (
            <div
              key={event.id || idx}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Event Photo Preview */}
                <div className="lg:col-span-4 relative h-52 sm:h-64 lg:h-auto overflow-hidden">
                  <img
                    src={visual.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Day {event.dayNumber} Ceremony
                  </div>
                  <div className="absolute bottom-3 left-3 bg-amber-950/80 backdrop-blur-xs text-amber-200 text-xs px-2.5 py-0.5 rounded font-medium">
                    {visual.badge}
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    {/* Top Meta info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span className="bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{event.venueStyle}</span>
                      </div>
                    </div>

                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                      {event.name}
                    </h3>

                    {/* Dress Code & Special Accent */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                      <div className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-800 px-3 py-1 rounded-lg">
                        <Shirt className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-medium">{event.dressCode}</span>
                      </div>
                      {event.specialElement && (
                        <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-900 px-3 py-1 rounded-lg border border-orange-200/60">
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>{event.specialElement}</span>
                        </div>
                      )}
                    </div>

                    {/* Ritual highlights */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Key Sacred Rituals & Timeline Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {event.ritualHighlights?.map((ritual, rIdx) => (
                          <div
                            key={rIdx}
                            className="text-xs text-stone-700 bg-stone-50/80 p-2.5 rounded-lg border border-stone-100 flex items-start gap-2"
                          >
                            <span className="text-amber-600 font-bold">·</span>
                            <span>{ritual}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Culinary menu highlights */}
                    {event.keyDishes && event.keyDishes.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          Signature Culinary Live Counters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.keyDishes.map((dish, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-xs text-stone-700 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-md"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom buffer note */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="italic">
                      Buffer Cushion: 30–45 mins built in for ceremonial dhol, photography & guest arrival
                    </span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Print Call Sheet
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
