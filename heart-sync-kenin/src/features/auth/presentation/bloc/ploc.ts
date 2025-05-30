// presentation/bloc/ploc.ts
import type { Router } from 'vue-router'
import type { DataError } from '@/core/domain/DataError'

export class Ploc<T> {
  public store: T
  public router: Router
  constructor({ store, router }: { store: T; router: Router }) {
    this.store = store
    this.router = router
  }

  handleErrors(error: DataError): string {
    switch (error.kind) {
      case 'AuthenticationError':
        this.router.push({ name: 'Login' })
        return error.error.message
      case 'ValidationError':
        return error.error.message
      case 'ServerError':
        return error.error.message
      case 'UnexpectedError':
        return error.error.message
      default:
        return 'Terjadi kesalahan'
    }
  }
}
