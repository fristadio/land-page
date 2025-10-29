import { RateLimiter } from './types';

export class FixedWindowRateLimiter implements RateLimiter {
  private readonly windowMs: number;
  private readonly max: number;
  private readonly store: Map<string, { count: number; windowStart: number }> = new Map();

  constructor(windowMs: number, max: number) {
    this.windowMs = windowMs;
    this.max = max;
  }

  allow(ip: string): boolean {
    const now = Date.now();
    const entry = this.store.get(ip);
    if (!entry || now - entry.windowStart >= this.windowMs) {
      this.store.set(ip, { count: 1, windowStart: now });
      return true;
    }
    if (entry.count < this.max) {
      entry.count += 1;
      return true;
    }
    return false;
  }
}


