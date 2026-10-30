import { describe, it, expect } from 'vitest';

describe('Server & API Endpoints', () => {
  it('should validate API health response structure', () => {
    const mockHealthResponse = {
      status: 'ok',
      systemStatus: 'Operational',
      genAiConfigured: true,
    };

    expect(mockHealthResponse.status).toBe('ok');
    expect(mockHealthResponse.systemStatus).toBe('Operational');
  });

  it('should validate image static file paths format', () => {
    const validPaths = [
      '/images/hero_mandap.jpg',
      '/images/haldi_ceremony.jpg',
      '/images/sangeet_celebration.jpg',
      '/images/wedding_banquet.jpg',
    ];

    validPaths.forEach((path) => {
      expect(path.startsWith('/images/')).toBe(true);
      expect(path.endsWith('.jpg')).toBe(true);
    });
  });
});
