import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/Header';
import { HeroSection } from '../src/components/HeroSection';
import { BudgetManager } from '../src/components/BudgetManager';
import { VendorChecklist } from '../src/components/VendorChecklist';
import { IdeasStudio } from '../src/components/IdeasStudio';
import { defaultWeddingPlan } from '../src/data/defaultPlan';

describe('React Component UI Tests', () => {
  it('renders Header with royal branding and single-line navigation links', () => {
    const onOpenPlanner = vi.fn();
    const setActiveSection = vi.fn();
    const onCelebration = vi.fn();

    render(
      <Header
        onOpenPlanner={onOpenPlanner}
        activeSection="timelines"
        setActiveSection={setActiveSection}
        onCelebration={onCelebration}
      />
    );

    expect(screen.getByText(/ShaadiAI/i)).toBeDefined();
    expect(screen.getByText(/Ritual Timelines/i)).toBeDefined();
    expect(screen.getByText(/INR Budget/i)).toBeDefined();
    expect(screen.getByText(/Vendor Checklists/i)).toBeDefined();
    expect(screen.getByText(/GenAI Ideas/i)).toBeDefined();
  });

  it('renders HeroSection with couple names and budget metrics', () => {
    const params = {
      brideName: 'Ananya',
      groomName: 'Rohan',
      budgetLakhs: 35,
      guestCount: 350,
      city: 'Udaipur, Rajasthan',
      tradition: 'North Indian & Punjabi Fusion',
      vibe: 'Royal Palace Heritage & Modern Glam',
      weddingDate: '2026-11-20',
      days: 3,
    };

    render(
      <HeroSection
        params={params}
        themeTitle="The Royal Rajasthani Symphony: Ananya & Rohan"
        tagline="A royal confluence of timeless Vedic traditions"
        auspiciousMuhuratAdvice="Godhuli Muhurat (5:45 PM - 7:15 PM) is auspicious"
        onOpenPlanner={vi.fn()}
        onQuickGenerate={vi.fn()}
        isGenerating={false}
      />
    );

    expect(screen.getByText(/Ananya & Rohan/i)).toBeDefined();
    expect(screen.getByText(/₹35 Lakhs/i)).toBeDefined();
    expect(screen.getByText(/350 Guests/i)).toBeDefined();
    expect(screen.getByText(/Godhuli Muhurat/i)).toBeDefined();
  });

  it('renders BudgetManager with categorized allocations', () => {
    render(
      <BudgetManager
        totalBudgetLakhs={35}
        budgetAllocations={defaultWeddingPlan.budgetAllocations}
        onUpdateAllocations={vi.fn()}
      />
    );

    expect(screen.getByText(/Indian Wedding Budget Optimizer/i)).toBeDefined();
    expect(screen.getByText(/Venue & Palace Banqueting/i)).toBeDefined();
    expect(screen.getByText(/Emergency & Overrun Buffer Fund/i)).toBeDefined();
  });

  it('renders VendorChecklist with milestone questions and negotiation tips', () => {
    render(
      <VendorChecklist
        vendors={defaultWeddingPlan.vendorChecklist}
        onUpdateVendors={vi.fn()}
      />
    );

    expect(screen.getByText(/Indian Wedding Vendor Checklist/i)).toBeDefined();
    expect(screen.getByText(/Heritage Palace \/ Resort Venue/i)).toBeDefined();
    expect(screen.getByText(/Vedic Pandit Ji & Purohit/i)).toBeDefined();
  });

  it('renders IdeasStudio with personalized concepts', () => {
    render(
      <IdeasStudio
        ideas={defaultWeddingPlan.personalizedIdeas}
        coupleName="Ananya & Rohan"
        tradition="North Indian & Punjabi Fusion"
      />
    );

    expect(screen.getByText(/Royal Ideas & Concept Studio/i)).toBeDefined();
    expect(screen.getAllByText(/Grand Entry/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sangeet Choreography/i).length).toBeGreaterThan(0);
  });
});
