import { describe, it, expect } from 'vitest';
import { formatDate, getTodayDateString } from './date';

describe('date utils', () => {
  it('should format timestamps correctly', () => {
    const date = new Date(2024, 2, 31).getTime(); // March 31, 2024
    const formatted = formatDate(date);
    expect(formatted).toContain('31');
    // We check if it matches Spanish formatting (e.g. 31 mar 2024 or 31 de mar)
    expect(formatted.toLowerCase()).toContain('mar');
  });

  it('should return today date string in YYYY-MM-DD format', () => {
    const todayStr = getTodayDateString();
    expect(todayStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
