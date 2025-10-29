import { getHealthHandler, postInterestHandler } from './handlers';
import { HttpRequest } from './types';

export async function handleRequest(req: HttpRequest) {
  const path = (req.url || '').split('?')[0];
  const method = req.method.toUpperCase();

  if (method === 'GET' && path.endsWith('/api/health')) {
    return getHealthHandler();
  }
  if (method === 'POST' && path.endsWith('/api/interest')) {
    return postInterestHandler(req);
  }
  return { status: 404, body: { error: 'NOT_FOUND' } };
}


