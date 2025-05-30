// domain/repository/IAuthRepository.ts
import type { Either } from '@/core/domain/Either'
import type { DataError } from '@/core/domain/DataError'
import type { UserEntity } from '../entities/UserEntity'

export interface IAuthRepository {
  register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<Either<DataError, UserEntity>>
  login(email: string, password: string): Promise<Either<DataError, UserEntity>>
  getCurrentUser(): Promise<Either<DataError, UserEntity | null>>
  logout(): Promise<Either<DataError, void>>
}
