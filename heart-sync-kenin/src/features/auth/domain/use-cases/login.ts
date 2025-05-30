// domain/use-cases/LoginUserUseCase.ts
import type { Either } from "@/core/domain/Either";
import type { DataError } from "@/core/domain/DataError";
import type { IAuthRepository } from "../repository/IAuthRepository";
import type { UserEntity } from "../entities/UserEntity";

export class LoginUserUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(email: string, password: string): Promise<Either<DataError, UserEntity>> {
    return this.authRepo.login(email, password);
  }
}