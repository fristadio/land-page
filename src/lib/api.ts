export interface InterestPayload {
  persona: 'nomade';
  email: string;
  name: string;
  nostr?: string;
  cities: string[];
  needs: string[];
  accommodationType: string;
  budget: string;
  duration: string;
  startDate?: string;
  languages: string[];
  bio?: string;
  consent: boolean;
}

export interface InterestResponse {
  id: string;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;

function getApiBase(): string {
  // Em dev, usar caminho relativo ('') para acionar o proxy do Vite
  const fallbackDev = (import.meta.env.DEV ? '' : undefined);
  const base = (API_BASE ?? fallbackDev);
  if (base === undefined) {
    throw new Error('VITE_API_BASE_URL não configurada');
  }
  return base.replace(/\/$/, '');
}

export async function postInterest(payload: InterestPayload, signal?: AbortSignal): Promise<InterestResponse> {
  const res = await fetch(`${getApiBase()}/api/interest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  if (res.ok) {
    return res.json();
  }

  let err: any = undefined;
  try { err = await res.json(); } catch {}
  const detail = err?.error || res.statusText || 'Unknown error';
  throw new Error(`API error ${res.status}: ${detail}`);
}

export async function getHealth(signal?: AbortSignal): Promise<{ ok: boolean; time: string; version?: string }> {
  const res = await fetch(`${getApiBase()}/api/health`, { signal });
  if (!res.ok) throw new Error(`Health error ${res.status}`);
  return res.json();
}











