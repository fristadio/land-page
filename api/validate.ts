import { InterestInput, Persona } from './types';
import { sanitizeString, isValidEmail } from './sanitize';
import { validationError } from './errors';

const PERSONAS: Persona[] = ['anfitriao', 'arbitro', 'nomade'];

export function validateAndNormalizeInterest(input: any): InterestInput {
  const errors: Record<string, string> = {};

  const persona = sanitizeString(input?.persona, 32) as Persona | undefined;
  if (!persona || !PERSONAS.includes(persona)) {
    errors.persona = 'invalid persona';
  }

  const emailRaw = sanitizeString(input?.email, 256);
  if (!emailRaw || !isValidEmail(emailRaw)) {
    errors.email = 'invalid format';
  }

  const consent = input?.consent === true;
  if (!consent) {
    errors.consent = 'must be true';
  }

  const name = sanitizeString(input?.name, 120);
  const nostr = sanitizeString(input?.nostr, 128);
  const countries = sanitizeString(input?.countries, 300);
  const propertyTitle = sanitizeString(input?.propertyTitle, 120);
  const propertyLocation = sanitizeString(input?.propertyLocation, 120);
  const propertySummary = sanitizeString(input?.propertySummary, 300);

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    persona: persona!,
    email: emailRaw!,
    name,
    nostr,
    countries,
    propertyTitle,
    propertyLocation,
    propertySummary,
    consent: true,
  };
}


