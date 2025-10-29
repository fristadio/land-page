export type ErrorCode = 'VALIDATION_ERROR' | 'RATE_LIMIT' | 'INTERNAL_ERROR';

export class HttpError extends Error {
  public readonly status: number;
  public readonly code: ErrorCode;
  public readonly details?: Record<string, string>;
  constructor(status: number, code: ErrorCode, message?: string, details?: Record<string, string>) {
    super(message || code);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function validationError(details: Record<string, string>): HttpError {
  return new HttpError(400, 'VALIDATION_ERROR', 'Validation failed', details);
}

export function rateLimitError(): HttpError {
  return new HttpError(429, 'RATE_LIMIT', 'Too many requests');
}

export function internalError(message?: string): HttpError {
  return new HttpError(500, 'INTERNAL_ERROR', message || 'Internal error');
}

export function errorResponse(err: unknown): { status: number; body: any } {
  if (err instanceof HttpError) {
    if (err.code === 'VALIDATION_ERROR') {
      return { status: err.status, body: { error: err.code, details: err.details || {} } };
    }
    return { status: err.status, body: { error: err.code } };
  }
  return { status: 500, body: { error: 'INTERNAL_ERROR' } };
}


