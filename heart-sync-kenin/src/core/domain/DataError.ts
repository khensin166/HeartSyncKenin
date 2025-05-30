// core/domain/DataError.ts
export type DataError =
  | { kind: 'AuthenticationError'; error: Error }
  | { kind: 'ValidationError'; error: Error }
  | { kind: 'ServerError'; error: Error; errorCode?: number }
  | { kind: 'UnexpectedError'; error: Error }
