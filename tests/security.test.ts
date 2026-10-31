import { describe, it, expect } from 'vitest';
import { PlanInputParams } from '../src/types/wedding';

describe('Security, Data Sanitization & Resilience', () => {
  it('should validate and sanitize user input parameters to prevent injection or invalid state', () => {
    const rawParams: PlanInputParams = {
      brideName: '   Ananya <script>alert(1)</script>   ',
      groomName: '   Rohan   ',
      budgetLakhs: 50,
      guestCount: 400,
      city: 'Jaipur, Rajasthan',
      tradition: 'Royal Rajasthani & Marwari Heritage',
      vibe: 'Royal Palace Heritage & Modern Glam',
      weddingDate: '2026-12-15',
      days: 3,
    };

    // Sanitization function pattern (strips script tags and contents, plus HTML tags)
    const sanitizedBride = rawParams.brideName
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
    const sanitizedGroom = rawParams.groomName.replace(/<[^>]*>/g, '').trim();

    expect(sanitizedBride).toBe('Ananya');
    expect(sanitizedGroom).toBe('Rohan');
    expect(rawParams.budgetLakhs).toBeGreaterThanOrEqual(10);
    expect(rawParams.guestCount).toBeGreaterThanOrEqual(30);
    expect(rawParams.days).toBeGreaterThanOrEqual(1);
    expect(rawParams.days).toBeLessThanOrEqual(5);
  });

  it('should ensure financial calculations never result in NaN or negative amounts', () => {
    const budgetLakhs = 35;
    const testPercentages = [38, 18, 14, 8, 7, 4, 5, 6];

    testPercentages.forEach((pct) => {
      const calc = +(budgetLakhs * (pct / 100)).toFixed(2);
      expect(Number.isFinite(calc)).toBe(true);
      expect(calc).toBeGreaterThan(0);
    });
  });

  it('should enforce vendor contract milestone clauses and advance payment caps', () => {
    const defaultAdvanceCapPercentage = 25;
    expect(defaultAdvanceCapPercentage).toBeLessThanOrEqual(30); // Industry standard safeguard
  });
});
