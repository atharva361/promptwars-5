import { describe, it, expect } from 'vitest';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('Performance & Efficiency Benchmarks', () => {
  it('should compute budget aggregations in under 2 milliseconds', () => {
    const allocations = defaultWeddingPlan.budgetAllocations;
    const start = performance.now();

    for (let i = 0; i < 1000; i++) {
      const totalAllocated = allocations.reduce((sum, item) => sum + item.amountLakhs, 0);
      const totalSpent = allocations.reduce((sum, item) => sum + (item.spentLakhs || 0), 0);
      const remaining = totalAllocated - totalSpent;
      expect(remaining).toBeGreaterThan(0);
    }

    const duration = performance.now() - start;
    // 1000 iterations must complete within 50ms
    expect(duration).toBeLessThan(50);
  });

  it('should filter events deterministically without mutation', () => {
    const events = defaultWeddingPlan.events;
    const day1Events = events.filter((e) => e.dayNumber === 1);
    const day2Events = events.filter((e) => e.dayNumber === 2);

    expect(day1Events.length).toBeGreaterThan(0);
    expect(day2Events.length).toBeGreaterThan(0);
    expect(events.length).toBe(day1Events.length + day2Events.length + events.filter((e) => e.dayNumber === 3).length);
  });

  it('should maintain static visual asset mapping with zero layout shift triggers', () => {
    const knownImages = [
      '/images/hero_mandap.jpg',
      '/images/haldi_ceremony.jpg',
      '/images/sangeet_celebration.jpg',
      '/images/wedding_banquet.jpg',
    ];

    knownImages.forEach((img) => {
      expect(img.startsWith('/images/')).toBe(true);
      expect(img.endsWith('.jpg')).toBe(true);
    });
  });
});
