import { errorResponse } from './errors';
import { validateAndNormalizeInterest } from './validate';
import { InMemoryInterestRepository } from './repo.memory';
import { FixedWindowRateLimiter } from './rateLimit.memory';
import { HttpRequest, HttpResponse } from './types';

const repo = new InMemoryInterestRepository();
const env = (typeof globalThis !== 'undefined' && (globalThis as any).process && (globalThis as any).process.env) || {};
const rlWindowMs = Number(env.RATE_LIMIT_WINDOW_MS || 60000);
const rlMax = Number(env.RATE_LIMIT_MAX || 60);
const limiter = new FixedWindowRateLimiter(rlWindowMs, rlMax);

function getIp(req: HttpRequest): string {
  return (
    req.ip ||
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.headers['cf-connecting-ip'] ||
    '0.0.0.0'
  ) as string;
}

export async function postInterestHandler(req: HttpRequest): Promise<HttpResponse> {
  try {
    const ip = getIp(req);
    if (!limiter.allow(ip)) {
      return { status: 429, body: { error: 'RATE_LIMIT' } };
    }

    const input = validateAndNormalizeInterest(req.body);
    const ua = (req.headers['user-agent'] as string | undefined) || undefined;
    const result = await repo.create({ ...input, ip, ua });
    return { status: 201, body: result };
  } catch (err) {
    const { status, body } = errorResponse(err);
    return { status, body };
  }
}

export async function getHealthHandler(): Promise<HttpResponse> {
  return {
    status: 200,
    body: { ok: true, time: new Date().toISOString() },
  };
}


