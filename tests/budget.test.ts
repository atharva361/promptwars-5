import { describe, it, expect } from 'vitest';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('Indian Wedding Budget Optimizer', () => {
  it('should have itemized budget allocations that sum up to 100%', () => {
    const allocations = defaultWeddingPlan.budgetAllocations;
    expect(allocations.length).toBeGreaterThan(0);

    const totalPercentage = allocations.reduce((sum, item) => sum + item.percentage, 0);
    expect(totalPercentage).toBe(100);
  });

  it('should accurately calculate amount in INR Lakhs based on percentages', () => {
    const targetBudgetLakhs = 35;
    const allocations = defaultWeddingPlan.budgetAllocations;

    allocations.forEach((item) => {
      const expectedAmount = +(targetBudgetLakhs * (item.percentage / 100)).toFixed(2);
      expect(Math.abs(item.amountLakhs - expectedAmount)).toBeLessThanOrEqual(0.1);
    });
  });

  it('should include a dedicated Emergency Buffer reserve fund', () => {
    const allocations = defaultWeddingPlan.budgetAllocations;
    const bufferFund = allocations.find(
      (a) => a.category.toLowerCase().includes('buffer') || a.category.toLowerCase().includes('emergency')
    );
    expect(bufferFund).toBeDefined();
    expect(bufferFund?.percentage).toBeGreaterThanOrEqual(5);
  });

  it('should calculate committed/spent expenses and positive remaining runway', () => {
    const allocations = defaultWeddingPlan.budgetAllocations;
    const totalAllocated = allocations.reduce((sum, a) => sum + a.amountLakhs, 0);
    const totalSpent = allocations.reduce((sum, a) => sum + (a.spentLakhs || 0), 0);

    expect(totalSpent).toBeGreaterThan(0);
    expect(totalSpent).toBeLessThanOrEqual(totalAllocated);

    const remaining = totalAllocated - totalSpent;
    expect(remaining).toBeGreaterThan(0);
  });
});
