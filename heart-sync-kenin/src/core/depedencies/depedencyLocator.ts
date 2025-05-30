// // core/dependencies/dependencyLocator.ts
// import { AuthRepository } from '@/features/auth/data/repository/AuthRepository'
// import { AuthRemoteSource } from '@/features/auth/data/source/AuthRemoteSource'
// import { LoginUserUseCase } from '@/features/auth/domain/use-cases/login'
// import { RegisterUserUseCase } from '@/features/auth/domain/use-cases/Register'
// import { AuthBloc } from '@/features/auth/presentation/bloc/AuthBloc'
// import type { AuthenticationStore } from '@/features/auth/presentation/stores/authStore'
// import type { Router } from 'vue-router'

// export class DependencyLocator {
//   private static authRepository: AuthRepository | null = null
//   private static loginUseCase: LoginUserUseCase | null = null
//   private static registerUseCase: RegisterUserUseCase | null = null

//   static provideAuthRepository(): AuthRepository {
//     if (!this.authRepository) {
//       this.authRepository = new AuthRepository(new AuthRemoteSource())
//     }
//     return this.authRepository
//   }

//   static provideLoginUseCase(): LoginUserUseCase {
//     if (!this.loginUseCase) {
//       this.loginUseCase = new LoginUserUseCase(this.provideAuthRepository())
//     }
//     return this.loginUseCase
//   }

//   static provideRegisterUseCase(): RegisterUserUseCase {
//     if (!this.registerUseCase) {
//       this.registerUseCase = new RegisterUserUseCase(this.provideAuthRepository())
//     }
//     return this.registerUseCase
//   }

//   static provideAuthBloc(store: AuthenticationStore, router: Router): AuthBloc {
//     return new AuthBloc({
//       store,
//       router,
//       loginUseCase: this.provideLoginUseCase(),
//       registerUseCase: this.provideRegisterUseCase(),
//     })
//   }
// }
