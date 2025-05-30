// domain/entities/UserEntity.ts
export interface UserEntity {
  id: string
  email: string
  displayName: string
  partnerId?: string | null
  createdAt?: string
}
