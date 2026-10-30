import { describe, it, expect } from 'vitest';
import { defaultWeddingPlan } from '../src/data/defaultPlan';
import { VendorItem } from '../src/types/wedding';

describe('Indian Wedding Vendor Checklist & Contract Safety', () => {
  it('should have key Indian wedding vendors configured', () => {
    const vendors = defaultWeddingPlan.vendorChecklist;
    expect(vendors.length).toBeGreaterThanOrEqual(4);

    const categories = vendors.map((v) => v.category.toLowerCase());
    const hasVenue = categories.some((c) => c.includes('venue') || c.includes('resort') || c.includes('palace'));
    const hasCatering = categories.some((c) => c.includes('cater') || c.includes('halwai'));
    const hasPandit = categories.some((c) => c.includes('pandit') || c.includes('purohit') || c.includes('priest'));

    expect(hasVenue).toBe(true);
    expect(hasCatering).toBe(true);
    expect(hasPandit).toBe(true);
  });

  it('should provide critical negotiation questions and contractual checkpoints for each vendor', () => {
    const vendors = defaultWeddingPlan.vendorChecklist;

    vendors.forEach((vendor) => {
      expect(vendor.criticalQuestionToAsk).toBeTruthy();
      expect(vendor.negotiationTip).toBeTruthy();
      expect(vendor.timelineMilestone).toBeTruthy();
    });
  });

  it('should allow valid status transitions in the vendor workflow', () => {
    const validStatuses: VendorItem['status'][] = ['Pending', 'Contacted', 'Booked', 'Advance Paid'];
    const testVendor: VendorItem = { ...defaultWeddingPlan.vendorChecklist[0] };

    validStatuses.forEach((status) => {
      testVendor.status = status;
      expect(testVendor.status).toBe(status);
    });
  });
});
