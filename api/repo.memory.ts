import { InterestRecord, InterestRepository } from './types';

function generateUuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class InMemoryInterestRepository implements InterestRepository {
  private readonly items: InterestRecord[] = [];

  async create(input: Omit<InterestRecord, 'id' | 'createdAt'>): Promise<Pick<InterestRecord, 'id' | 'createdAt'>> {
    const id = generateUuidV4();
    const createdAt = new Date().toISOString();
    this.items.push({ ...input, id, createdAt });
    return { id, createdAt };
  }

  getAll(): InterestRecord[] {
    return [...this.items];
  }
}


