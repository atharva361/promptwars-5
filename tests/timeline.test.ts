import { describe, it, expect } from 'vitest';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('Multi-Day Indian Ritual Timelines', () => {
  it('should contain a complete multi-day itinerary', () => {
    const events = defaultWeddingPlan.events;
    expect(events.length).toBeGreaterThanOrEqual(3);

    // Verify chronological progression
    for (let i = 0; i < events.length - 1; i++) {
      expect(events[i].dayNumber).toBeLessThanOrEqual(events[i + 1].dayNumber);
    }
  });

  it('should include authentic Indian ceremonies like Haldi, Sangeet, and Pheras', () => {
    const events = defaultWeddingPlan.events;
    const names = events.map((e) => e.name.toLowerCase());

    const hasMehendiOrSangeet = names.some((n) => n.includes('mehendi') || n.includes('sangeet'));
    const hasHaldi = names.some((n) => n.includes('haldi'));
    const hasPherasOrBaraat = names.some((n) => n.includes('pheras') || n.includes('baraat') || n.includes('varmala'));

    expect(hasMehendiOrSangeet).toBe(true);
    expect(hasHaldi).toBe(true);
    expect(hasPherasOrBaraat).toBe(true);
  });

  it('should specify dress codes, auspicious timings, and ritual highlights for every ceremony', () => {
    const events = defaultWeddingPlan.events;

    events.forEach((event) => {
      expect(event.time).toBeTruthy();
      expect(event.dressCode).toBeTruthy();
      expect(event.ritualHighlights).toBeInstanceOf(Array);
      expect(event.ritualHighlights.length).toBeGreaterThan(0);
      expect(event.keyDishes).toBeInstanceOf(Array);
      expect(event.keyDishes.length).toBeGreaterThan(0);
    });
  });

  it('should provide authentic Vedic Muhurat guidance', () => {
    expect(defaultWeddingPlan.auspiciousMuhuratAdvice).toBeTruthy();
    expect(defaultWeddingPlan.auspiciousMuhuratAdvice.length).toBeGreaterThan(20);
  });
});
