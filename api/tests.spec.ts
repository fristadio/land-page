import { validateAndNormalizeInterest } from './validate';
import { postInterestHandler, getHealthHandler } from './handlers';
import { HttpRequest } from './types';

function makeReq(method: string, path: string, body?: any, headers?: Record<string, string>): HttpRequest {
  return {
    method,
    url: path,
    headers: headers || { 'content-type': 'application/json', 'user-agent': 'custom', 'x-forwarded-for': '1.2.3.4' },
    body,
    ip: '1.2.3.4',
  };
}

// Testes simples ad-hoc (sem runner) apenas para ilustrar o uso das funções.
async function run() {
  // validação ok
  const out = validateAndNormalizeInterest({ persona: 'nomade', email: 'a@b.com', consent: true, name: ' Ana ' });
  if (out.email !== 'a@b.com' || out.name !== 'Ana') throw new Error('validate ok failed');

  // validação erro
  let threw = false;
  try { validateAndNormalizeInterest({ persona: 'nomade', email: 'x', consent: false }); } catch { threw = true; }
  if (!threw) throw new Error('validate error not thrown');

  // post interest ok
  const resOk = await postInterestHandler(makeReq('POST', '/api/interest', { persona: 'anfitriao', email: 'host@example.com', consent: true }));
  if (resOk.status !== 201 || !((resOk.body as any).id)) throw new Error('post interest ok failed');

  // post interest inválido
  const resBad = await postInterestHandler(makeReq('POST', '/api/interest', { persona: 'x', email: 'bad', consent: true }));
  if (resBad.status !== 400 || (resBad.body as any).error !== 'VALIDATION_ERROR') throw new Error('post interest invalid failed');

  // health
  const health = await getHealthHandler();
  if (health.status !== 200 || !(health.body as any).ok) throw new Error('health failed');
}

run().catch(err => {
  console.error(err);
  const g: any = globalThis as any;
  if (g && g.process) g.process.exitCode = 1;
});


