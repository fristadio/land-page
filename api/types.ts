export type Persona = 'anfitriao' | 'arbitro' | 'nomade';

export interface InterestInput {
  persona: Persona;
  email: string;
  name?: string;
  nostr?: string;
  countries?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertySummary?: string;
  consent: boolean;
}

export interface InterestRecord extends InterestInput {
  id: string;
  createdAt: string;
  ip?: string | null;
  ua?: string | null;
}

export interface HttpRequest {
  method: string;
  url?: string;
  headers: Record<string, string | undefined>;
  body?: unknown;
  ip?: string | null;
}

export interface HttpResponse<T = unknown> {
  status: number;
  headers?: Record<string, string>;
  body?: T;
}

export interface RateLimiter {
  allow(ip: string): boolean;
}

export interface InterestRepository {
  create(input: Omit<InterestRecord, 'id' | 'createdAt'>): Promise<Pick<InterestRecord, 'id' | 'createdAt'>>;
}


