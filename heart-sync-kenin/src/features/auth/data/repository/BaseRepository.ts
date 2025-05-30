// data/repository/BaseRepository.ts
import type { DataError } from '@/core/domain/DataError'
import type { PostgrestError } from '@supabase/supabase-js'

export class BaseRepository {
  handleErrors(error: PostgrestError | Error | any): DataError {
    if ('code' in error) {
      // Supabase-specific error
      const supabaseError = error as PostgrestError
      if (supabaseError.code === '23505') {
        return { kind: 'ValidationError', error: new Error('Email sudah terdaftar') }
      }
      if (supabaseError.code === '401' || supabaseError.message.includes('credentials')) {
        return { kind: 'AuthenticationError', error: new Error('Email atau kata sandi salah') }
      }
      return {
        kind: 'ServerError',
        error: new Error(supabaseError.message),
        errorCode: parseInt(supabaseError.code),
      }
    }
    return {
      kind: 'UnexpectedError',
      error: new Error(error.message || 'Terjadi kesalahan tak terduga'),
    }
  }
}
