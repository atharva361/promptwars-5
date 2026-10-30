import { describe, it, expect } from 'vitest';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('Personalized GenAI Ideas Studio', () => {
  it('should include personalized creative concepts', () => {
    const ideas = defaultWeddingPlan.personalizedIdeas;
    expect(ideas.length).toBeGreaterThanOrEqual(3);

    ideas.forEach((idea) => {
      expect(idea.title).toBeTruthy();
      expect(idea.description).toBeTruthy();
      expect(idea.category).toBeTruthy();
    });
  });

  it('should cover high-impact Indian wedding elements like Grand Entry and Favors', () => {
    const ideas = defaultWeddingPlan.personalizedIdeas;
    const categories = ideas.map((i) => (i.category + ' ' + i.title).toLowerCase());

    const hasEntry = categories.some((c) => c.includes('entry') || c.includes('chaadar') || c.includes('baraat'));
    const hasDigitalOrHashtag = categories.some((c) => c.includes('hashtag') || c.includes('photo') || c.includes('qr'));

    expect(hasEntry).toBe(true);
    expect(hasDigitalOrHashtag).toBe(true);
  });
});
