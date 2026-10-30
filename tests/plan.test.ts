import { describe, it, expect } from 'vitest';
import { PlanInputParams, WeddingPlan } from '../src/types/wedding';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('Wedding Plan Customization & Data Integrity', () => {
  it('should initialize with valid default wedding plan', () => {
    expect(defaultWeddingPlan.themeTitle).toContain('Ananya & Rohan');
    expect(defaultWeddingPlan.events.length).toBe(5);
    expect(defaultWeddingPlan.budgetAllocations.length).toBe(8);
    expect(defaultWeddingPlan.vendorChecklist.length).toBe(6);
    expect(defaultWeddingPlan.personalizedIdeas.length).toBe(4);
  });

  it('should support customizing couple parameters and traditions', () => {
    const customParams: PlanInputParams = {
      brideName: 'Priya',
      groomName: 'Vikram',
      budgetLakhs: 50,
      guestCount: 500,
      city: 'Jaipur, Rajasthan (Fort & Havelis)',
      tradition: 'Royal Rajasthani & Marwari Heritage',
      vibe: 'Royal Palace Heritage & Modern Glam',
      weddingDate: '2026-12-10',
      days: 3,
    };

    expect(customParams.brideName).toBe('Priya');
    expect(customParams.groomName).toBe('Vikram');
    expect(customParams.budgetLakhs).toBe(50);
    expect(customParams.guestCount).toBe(500);
    expect(customParams.days).toBe(3);
  });
});
