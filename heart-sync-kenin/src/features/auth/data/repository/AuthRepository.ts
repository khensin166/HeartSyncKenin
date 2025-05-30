// data/repositories/AuthRepository.ts
import { Either } from '@/core/domain/Either'
import type { DataError } from '@/core/domain/DataError'
import type { UserEntity } from '@/features/auth/domain/entities/UserEntity'
import type { IAuthRepository } from '@/features/auth/domain/repository/IAuthRepository'
import { AuthRemoteSource } from '@/features/auth/data/source/AuthRemoteSource'
import { BaseRepository } from './BaseRepository'
import type { AuthResponseModel } from '../models/AuthResponseModel'

export class AuthRepository extends BaseRepository implements IAuthRepository {
  constructor(private remote: AuthRemoteSource) {
    super()
  }

  async register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<Either<DataError, UserEntity>> {
    const result = await this.remote.register(email, password, displayName)
    return result.fold(
      (error: DataError) => Either.left(error),
      (model: AuthResponseModel) => Either.right(model.toDomain()),
    )
  }

  async login(email: string, password: string): Promise<Either<DataError, UserEntity>> {
    const result = await this.remote.login(email, password)
    return result.fold(
      (error: DataError) => Either.left(error),
      (model: AuthResponseModel) => Either.right(model.toDomain()),
    )
  }

  async getCurrentUser(): Promise<Either<DataError, UserEntity | null>> {
    const result = await this.remote.getCurrentUser()
    return result.fold(
      (error: DataError) => Either.left(error),
      (model: AuthResponseModel | null) => Either.right(model ? model.toDomain() : null),
    )
  }

  async logout(): Promise<Either<DataError, void>> {
    return this.remote.logout()
  }
}
