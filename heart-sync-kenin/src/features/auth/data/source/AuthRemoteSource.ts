// data/source/AuthRemoteSource.ts
import { supabase } from '@/lib/supabase'
import { Either } from '@/core/domain/Either'
import type { DataError } from '@/core/domain/DataError'
import { AuthResponseModel } from '../models/AuthResponseModel'
import { BaseRepository } from '../repository/BaseRepository'

export class AuthRemoteSource extends BaseRepository {
  async register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<Either<DataError, AuthResponseModel>> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({ email, password })
      if (error) return Either.left(this.handleErrors(error))
      if (!authData.user)
        return Either.left({
          kind: 'UnexpectedError',
          error: new Error('Registrasi gagal: Tidak ada data pengguna'),
        })

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          display_name: displayName,
        })
        .select()
        .single()

      if (profileError) return Either.left(this.handleErrors(profileError))

      return Either.right(
        AuthResponseModel.fromJson({
          id: authData.user.id,
          email: authData.user.email ?? '',
          display_name: profileData.display_name,
          partner_id: profileData.partner_id,
          created_at: profileData.created_at,
        }),
      )
    } catch (error) {
      return Either.left(this.handleErrors(error))
    }
  }

  async login(email: string, password: string): Promise<Either<DataError, AuthResponseModel>> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return Either.left(this.handleErrors(error))
      if (!authData.user)
        return Either.left({
          kind: 'UnexpectedError',
          error: new Error('Login gagal: Tidak ada data pengguna'),
        })

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', authData.user.id)
        .single()

      if (profileError) return Either.left(this.handleErrors(profileError))

      return Either.right(
        AuthResponseModel.fromJson({
          id: authData.user.id,
          email: authData.user.email ?? '',
          display_name: profileData.display_name,
          partner_id: profileData.partner_id,
          created_at: profileData.created_at,
        }),
      )
    } catch (error) {
      return Either.left(this.handleErrors(error))
    }
  }

  async getCurrentUser(): Promise<Either<DataError, AuthResponseModel | null>> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) return Either.left(this.handleErrors(error))
      if (!user) return Either.right(null)

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', user.id)
        .single()

      if (profileError) return Either.left(this.handleErrors(profileError))

      return Either.right(
        AuthResponseModel.fromJson({
          id: user.id,
          email: user.email ?? '',
          display_name: profileData.display_name,
          partner_id: profileData.partner_id,
          created_at: profileData.created_at,
        }),
      )
    } catch (error) {
      return Either.left(this.handleErrors(error))
    }
  }

  async logout(): Promise<Either<DataError, void>> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) return Either.left(this.handleErrors(error))
      return Either.right(undefined)
    } catch (error) {
      return Either.left(this.handleErrors(error))
    }
  }
}
