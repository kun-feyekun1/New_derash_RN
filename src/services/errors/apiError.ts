import type { ApiFailure } from '@/types/api';

export class DerashApiError extends Error {
  failure: ApiFailure;

  constructor(failure: ApiFailure) {
    super(failure.message);
    this.name = 'DerashApiError';
    this.failure = failure;
  }
}
