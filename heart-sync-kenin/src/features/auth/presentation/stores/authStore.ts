// presentation/stores/authStore.ts
import { defineStore } from 'pinia'
import type { UserEntity } from '@/features/auth/domain/entities/UserEntity'
import { AuthRepository } from '@/features/auth/data/repository/AuthRepository'
import { AuthRemoteSource } from '@/features/auth/data/source/AuthRemoteSource'
import type { Either } from '@/core/domain/Either'
import type { DataError } from '@/core/domain/DataError'

interface State {
  user: UserEntity | null
  loading: boolean
  error: string | null
}

const authRepo = new AuthRepository(new AuthRemoteSource())

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async logout(): Promise<Either<DataError, void>> {
      return authRepo.logout()
    },
    async fetchCurrentUser(): Promise<Either<DataError, UserEntity | null>> {
      return authRepo.getCurrentUser()
    },
  },
})

export type AuthenticationStore = ReturnType<typeof useAuthStore>
