// core/domain/Either.ts
export type Either<L, R> = Left<L, R> | Right<L, R>

export class Left<L, R> {
  constructor(public readonly value: L) {}
  isLeft(): this is Left<L, R> {
    return true
  }
  isRight(): this is Right<L, R> {
    return false
  }
  fold<T>(onLeft: (value: L) => T, onRight: (value: R) => T): T {
    return onLeft(this.value)
  }
}

export class Right<L, R> {
  constructor(public readonly value: R) {}
  isLeft(): this is Left<L, R> {
    return false
  }
  isRight(): this is Right<L, R> {
    return true
  }
  fold<T>(onLeft: (value: L) => T, onRight: (value: R) => T): T {
    return onRight(this.value)
  }
}

export const Either = {
  left: <L, R>(value: L): Either<L, R> => new Left(value),
  right: <L, R>(value: R): Either<L, R> => new Right(value),
}
