// presentation/bloc/AuthBloc.ts
import type { Router } from 'vue-router';
import type { LoginUserUseCase } from '@/features/auth/domain/use-cases/login';
import type { RegisterUserUseCase } from '@/features/auth/domain/use-cases/Register';
import { Ploc } from './ploc';
import type { AuthenticationStore } from '../stores/authStore';
import type { DataError } from '@/core/domain/DataError';
import type { UserEntity } from '@/features/auth/domain/entities/UserEntity';

export class AuthBloc extends Ploc<AuthenticationStore> {
  private LoginUserUseCase: LoginUserUseCase;
  private RegisterUserUseCase: RegisterUserUseCase;

  constructor({
    store,
    router,
    LoginUserUseCase,
    RegisterUserUseCase,
  }: {
    store: AuthenticationStore;
    router: Router;
    LoginUserUseCase: LoginUserUseCase;
    RegisterUserUseCase: RegisterUserUseCase;
  }) {
    super({ store, router });
    this.LoginUserUseCase = LoginUserUseCase;
    this.RegisterUserUseCase = RegisterUserUseCase;
  }

  async login(email: string, password: string): Promise<void> {
    this.store.error = null;
    this.store.loading = true;
    const result = await this.LoginUserUseCase.execute(email, password);
    this.store.loading = false;
    result.fold(
      (error: DataError) => {
        this.store.error = this.handleErrors(error);
      },
      (user: UserEntity) => {
        this.store.user = user;
        this.router.push('/dashboard');
      },
    );
  }

  async register(email: string, password: string, displayName: string): Promise<void> {
    this.store.error = null;
    this.store.loading = true;
    const result = await this.RegisterUserUseCase.execute(email, password, displayName);
    this.store.loading = false;
    result.fold(
      (error: DataError) => {
        this.store.error = this.handleErrors(error);
      },
      (user: UserEntity) => {
        this.store.user = user;
        this.router.push('/dashboard');
      },
    );
  }

  async logout(): Promise<void> {
    this.store.error = null;
    this.store.loading = true;
    const result = await this.store.logout();
    this.store.loading = false;
    result.fold(
      (error: DataError) => {
        this.store.error = this.handleErrors(error);
      },
      () => {
        this.store.user = null;
        this.router.push('/login');
      },
    );
  }

  async fetchCurrentUser(): Promise<void> {
    const result = await this.store.fetchCurrentUser();
    result.fold(
      (error: DataError) => {
        this.store.error = this.handleErrors(error);
      },
      (user: UserEntity | null) => {
        this.store.user = user;
      },
    );
  }
}