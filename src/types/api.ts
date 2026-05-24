export type ApiResponse<T> = {
  data: T;
  message: string;
  requestId: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  nextCursor: string | null;
}>;

export type ApiErrorCode =
  | 'NETWORK_UNAVAILABLE'
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR'
  | 'TIMEOUT'
  | 'SERVER_ERROR'
  | 'UNKNOWN';

export type ApiFailure = {
  code: ApiErrorCode;
  message: string;
  status?: number | undefined;
  requestId?: string | undefined;
};
