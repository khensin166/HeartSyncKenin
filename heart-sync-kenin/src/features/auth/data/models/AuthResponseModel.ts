// data/models/AuthResponseModel.ts
import type { UserEntity } from '@/features/auth/domain/entities/UserEntity'

export class AuthResponseModel {
  public id: string
  public email: string
  public display_name: string
  public partner_id: string | null
  public created_at: string

  constructor({
    id,
    email,
    display_name,
    partner_id,
    created_at,
  }: {
    id: string
    email: string
    display_name: string
    partner_id: string | null
    created_at: string
  }) {
    this.id = id
    this.email = email
    this.display_name = display_name
    this.partner_id = partner_id
    this.created_at = created_at
  }

  static fromJson(json: any): AuthResponseModel {
    return new AuthResponseModel({
      id: json.id,
      email: json.email || '',
      display_name: json.display_name,
      partner_id: json.partner_id,
      created_at: json.created_at,
    })
  }

  toDomain(): UserEntity {
    return {
      id: this.id,
      email: this.email,
      displayName: this.display_name,
      partnerId: this.partner_id,
      createdAt: this.created_at,
    }
  }
}
